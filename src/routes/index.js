//This is a Barrel File that exports all the routes in the routes folder

import express from "express";
import authRoute from "./auth.route.js";

const router = express.Router();

router.use("/auth", authRoute);

export default router;
