import winston from "winston";
import moment from "moment-timezone";
import fs from "fs";
import path from "path";

//Config
import { Config } from "./index.js";

// Ensure log directory exists
const logDirectory = path.resolve(process.cwd(), "logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const logger = winston.createLogger({
    level: "info",
    defaultMeta: {
        serviceName: "prisma-express-js-kit",
    },
    format: winston.format.combine(
        winston.format.timestamp({
            format: () => moment().tz(Config.TZ).format(),
        }),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        }),
    ),
    transports: [
        new winston.transports.File({
            dirname: "logs",
            filename: "combined.log",
            level: "info",
            silent: Config.NODE_ENV === "test",
        }),
        new winston.transports.File({
            dirname: "logs",
            filename: "error.log",
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
