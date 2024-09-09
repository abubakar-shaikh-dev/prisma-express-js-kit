import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(255),
});

export const refreshTokenSchema = z.object({
    refresh_token: z.string().min(1),
});
