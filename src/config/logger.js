import winston from "winston";
import moment from "moment-timezone";
import { Config } from "./index.js";
import TransportStreamOptions from "winston-transport";
import mongoose from "mongoose";

class MongoDBTransport extends TransportStreamOptions {
    constructor(opts) {
        super(opts);
        this.collection = opts.collection;
        this.db = mongoose.createConnection(opts.db);

        this.db.once("open", () => {
            console.log("Connected to MongoDB");
        });

        this.db.on("error", (err) => {
            console.error("MongoDB connection error:", err);
        });
    }

    log(info, callback) {
        const { level, message, timestamp } = info;
        const logEntry = { level, message, timestamp };

        this.db.collection(this.collection).insertOne(logEntry, (err) => {
            if (err) {
                console.error("Error logging to MongoDB:", err);
            }
            callback();
        });
    }
}

const logger = winston.createLogger({
    level: "info",
    defaultMeta: { serviceName: "prisma-express-js-kit" },
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => moment().tz(Config.TZ).format(),
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
    ),
    transports: [
        new MongoDBTransport({
            db: Config.MONGODB_LOGS_DATABASE_URI,
            collection: Config.MONGODB_LOGS_COLLECTION_NAME,
            level: "info",
            silent: Config.NODE_ENV === "test",
        }),
        new MongoDBTransport({
            db: Config.MONGODB_LOGS_DATABASE_URI,
            collection: Config.MONGODB_LOGS_COLLECTION_NAME,
            level: "error",
            silent: Config.NODE_ENV === "test",
        }),
        new winston.transports.Console({
            level: "info",
            silent: Config.NODE_ENV === "test",
        }),
    ],
});

export default logger;
