import winston from "winston";
import moment from "moment-timezone";
import { MongoDB } from "winston-mongodb";
import { Config } from "./index.js";

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
        new MongoDB({
            db: Config.MONGODB_LOGS_DATABASE_URI,
            collection: Config.MONGODB_LOGS_COLLECTION_NAME,
            level: "info",
            silent: Config.NODE_ENV === "test",
        }),
        new MongoDB({
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
