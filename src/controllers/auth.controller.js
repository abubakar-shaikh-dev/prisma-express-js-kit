//Services
import * as userServices from "../services/user.service.js";
import * as tokenServices from "../services/token.service.js";

//Validations
import * as authValidation from "../validations/auth.validation.js";

export const registerUser = async (req, res, next) => {
    try {
        const validData = authValidation.registerSchema.parse(req.body);
        const registeredUser = await userServices.registerUser(validData); //user will return user

        //generate access token and refresh token
        const access_token = await tokenServices.generateAccessToken(registeredUser.id);
        const refresh_token = await tokenServices.generateRefreshToken(registeredUser.id);

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: {
                access_token,
                refresh_token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const validData = authValidation.loginSchema.parse(req.body);

        //authenticate the user
        const authenticatedUser = await userServices.loginUser(validData); //user will return user

        //generate access token and refresh token
        const access_token = await tokenServices.generateAccessToken(authenticatedUser.id);
        const refresh_token = await tokenServices.generateRefreshToken(authenticatedUser.id);

        res.status(200).json({
            status: true,
            message: "User logged in successfully",
            data: {
                access_token,
                refresh_token,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req, res, next) => {
    try {
        //validate the request body
        const valid_data = authValidation.refreshTokenSchema.parse(req.body);

        //verify the refresh token
        const verify_refresh_token = await tokenServices.verifyRefreshToken(
            valid_data.refresh_token,
        ); //user will return user_id

        //revoking the old refresh token
        await tokenServices.revokeRefreshToken(valid_data.refresh_token);

        //generate a new access token and refresh token
        const access_token = await tokenServices.generateAccessToken(verify_refresh_token);
        const refresh_token = await tokenServices.generateRefreshToken(verify_refresh_token);

        res.status(200).json({
            status: true,
            message: "Token refreshed successfully",
            data: {
                access_token,
                refresh_token,
            },
        });
    } catch (error) {
        next(error);
    }
};
