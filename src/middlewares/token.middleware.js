import createHttpError from "http-errors";

//Services
import { verifyJWTToken } from "../services/token.service.js";
import * as userService from "../services/user.service.js";

export async function verifySuperAdminToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return next(createHttpError(401, "Token not provided!"));
    }

    let decoded;
    try {
        decoded = await verifyJWTToken(token);
    } catch (err) {
        return next(createHttpError(401, "Invalid token!"));
    }

    if (decoded.userId) {
        const user = await userService.getById(decoded.userId);

        if (user.role !== "SUPER_ADMIN") {
            return next(createHttpError(401, "Unauthorized access!"));
        }
        req.userId = decoded;
    } else {
        return next(createHttpError(401, "Invalid token!"));
    }

    next();
}
