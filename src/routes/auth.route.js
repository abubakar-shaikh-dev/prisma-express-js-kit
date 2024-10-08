import express from "express";

//Controllers
import * as authController from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/refresh-token", authController.getRefreshToken);

export default router;
