import jwt from "jsonwebtoken";
import { Config } from "../config/index.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateAccessToken = (userId) => {
    const payload = {
        userId,
    };

    return jwt.sign(payload, Config.JWT_SECRET, {
        expiresIn: Config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
};

export const generateRefreshToken = async (userId) => {
    const payload = {
        userId,
    };

    const refreshToken = jwt.sign(payload, Config.JWT_SECRET, {
        expiresIn: Config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    //store the refresh token in the database
    await prisma.refreshToken.create({
        data: {
            token: refreshToken,
            userId,
            expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
        },
    });

    return refreshToken;
};

export const verifyJWTToken = (token) => {
    return jwt.verify(token, Config.JWT_SECRET);
};
