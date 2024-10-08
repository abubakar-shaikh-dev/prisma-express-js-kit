import jwt from "jsonwebtoken";
import { Config } from "../config/index.js";
import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";

const prisma = new PrismaClient();

export const generateAccessToken = (user_id) => {
    const payload = {
        user_id,
    };

    return jwt.sign(payload, Config.JWT_SECRET, {
        expiresIn: Config.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
};

export const generateRefreshToken = async (user_id) => {
    const payload = {
        user_id,
    };

    const refreshToken = jwt.sign(payload, Config.JWT_SECRET, {
        expiresIn: Config.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });

    //store the refresh token in the database
    await prisma.refresh_tokens.create({
        data: {
            token: refreshToken,
            user_id: user_id,
            expiry: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
        },
    });

    return refreshToken;
};

export const verifyJWTToken = (token) => {
    //verify the token
    const decoded = jwt.verify(token, Config.JWT_SECRET);

    //if token is invalid
    if (!decoded) {
        throw new createHttpError.Unauthorized("Invalid token!");
    }

    return decoded;
};

export const verifyRefreshToken = async (refreshToken) => {
    //verify the refresh token
    const decoded = verifyJWTToken(refreshToken);

    //get the refresh token from the database
    const storedToken = await prisma.refresh_tokens.findUnique({
        where: {
            token: refreshToken,
        },
    });

    //if token not found
    if (!storedToken) {
        throw new createHttpError.Unauthorized("refresh token not found!");
    }

    return decoded.user_id;
};

export const revokeRefreshToken = async (refreshToken) => {
    await prisma.refresh_tokens.delete({
        where: {
            token: refreshToken,
        },
    });
};
