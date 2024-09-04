import createHttpError from "http-errors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Services
import * as tokenService from "./token.service.js";

//Utils
import { hashPassword, comparePassword } from "../utils/password.utils.js";

export const registerUser = async (userData) => {
    const { name, email, password } = userData;

    //check if the user already exists
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (user) {
        throw new createHttpError.Conflict("User already exists!");
    }

    //hash the password
    const hashedPassword = await hashPassword(password);

    //create the user
    const newUser = await prisma.users.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    });

    //generate a token
    const access_token = tokenService.generateAccessToken(newUser.id);

    return access_token;
};

export const loginUser = async (userData) => {
    const { email, password } = userData;

    //check if the user exists
    const user = await prisma.users.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new createHttpError.NotFound("User not found!");
    }

    //compare the passwords
    const isPasswordMatch = await comparePassword(password, user.password);

    if (!isPasswordMatch) {
        throw new createHttpError.Unauthorized("Invalid credentials!");
    }

    //generate a token
    const access_token = tokenService.generateAccessToken(user.id);

    return access_token;
};
