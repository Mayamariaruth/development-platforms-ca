import { z } from "zod";

// Register schema
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must not exceed 50 characters")
    .transform((val) => val.trim()),
  email: z
    .string()
    .email("Email must be a valid email")
    .transform((val) => val.trim().toLowerCase()),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      "Password must be at least 8 characters long and include uppercase, lowercase, number, and a special character"
    ),
});

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .email("Email must be a valid email")
    .transform((val) => val.trim().toLowerCase()),
  password: z.string(),
});
