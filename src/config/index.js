import { config } from "dotenv";
import path from "path";
import { object, string, number } from "zod";

/**
 * Define the path to the environment file based on the current environment
 * @type {string}
 */
const envSuffix = process.env.NODE_ENV === "production" ? "" : `.${process.env.NODE_ENV}`;
const pathName = path.resolve(process.cwd(), `.env${envSuffix}`);

// Load environment variables from the specified file
config({ path: pathName });

/**
 * Define the schema for validating environment variables
 * @type {object}
 */
const ConfigSchema = object({
    NODE_ENV: string(),
    TZ: string(),
    PORT: number(),
    SERVER_DOMAIN: string().url(),
    DATABASE_URL: string().url(),
    MONGODB_LOGS_DATABASE_URI: string().url(),
    MONGODB_LOGS_COLLECTION_NAME: string(),
    JWT_SECRET: string(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: string(),
    OTP_EXPIRY: number(),
});

/**
 * Extract environment variables
 * @type {object}
 */
const envVariables = {
    NODE_ENV: process.env.NODE_ENV,
    TZ: process.env.TZ || "Asia/Kolkata",
    PORT: Number(process.env.PORT),
    SERVER_DOMAIN: process.env.SERVER_DOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    MONGODB_LOGS_DATABASE_URI: process.env.MONGODB_LOGS_DATABASE_URI,
    MONGODB_LOGS_COLLECTION_NAME: process.env.MONGODB_LOGS_COLLECTION_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_ACCESS_TOKEN_EXPIRES_IN: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    OTP_EXPIRY: Number(process.env.OTP_EXPIRY),
};

let Config;

try {
    /**
     * Parse and validate environment variables
     * @type {object}
     */
    Config = ConfigSchema.parse(envVariables);
} catch (error) {
    // Log and exit if validation fails
    console.error("Invalid environment variables:", error.errors);
    process.exit(1);
}

/**
 * Exported configuration object
 * @type {object}
 */
export { Config };
