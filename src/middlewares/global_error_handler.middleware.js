import logger from "../config/logger.js";
import { ZodError } from "zod";

export default function errorHandler(err, req, res, next) {
    const { name, message, statusCode = 500 } = err;

    // Log the error message
    logger.error(message);

    let response = {
        status: false,
        message: message || "Something went wrong",
        error: {
            type: name,
            path: req.path,
            location: req.originalUrl,
        },
    };

    // If the error is a ZodError, format the validation errors
    if (err instanceof ZodError) {
        response.error.details = err.errors.map((e) => ({
            field: e.path[0],
            error: e.message,
        }));
        response.message = "Validation error";
        // Set the status code to 400 for validation errors
        res.status(400).json(response);
    } else {
        // Send the error response to the client
        res.status(statusCode).json(response);
    }
}
