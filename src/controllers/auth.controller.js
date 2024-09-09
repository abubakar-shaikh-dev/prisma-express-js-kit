//Services
import * as userService from "../services/user.service.js";

//Validations
import * as authValidation from "../validations/auth.validation.js";

export const registerUser = async (req, res, next) => {
    try {
        const validData = authValidation.registerSchema.parse(req.body);
        const tokens = await userService.registerUser(validData); //user will return access_token

        res.status(201).json({
            status: true,
            message: "User registered successfully",
            data: {
                ...tokens,
            },
        });
    } catch (error) {
        next(error);
    }
};

export const loginUser = async (req, res, next) => {
    try {
        const validData = authValidation.loginSchema.parse(req.body);
        const token = await userService.loginUser(validData); //user will return access_token
        res.status(200).json({
            status: true,
            message: "User logged in successfully",
            data: {
                access_token: token,
            },
        });
    } catch (error) {
        next(error);
    }
};
