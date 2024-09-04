import jwt from "jsonwebtoken";
import { Config } from "../config/index.js";

export const generateAccessToken = (userId) => {
    const payload = {
        userId,
    };

    return jwt.sign(payload, Config.JWT_SECRET, {
        expiresIn: Config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
};

export const verifyJWTToken = (token) => {
    return jwt.verify(token, Config.JWT_SECRET);
};
