import { z } from "zod";

// Register schema
export const registerSchema = z
  .object({
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
  })
  .strict();

// Login schema
export const loginSchema = z
  .object({
    email: z
      .string()
      .email("Email must be a valid email")
      .transform((val) => val.trim().toLowerCase()),
    password: z.string(),
  })
  .strict();

// Create articles schema
export const createArticleSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must not exceed 255 characters")
      .refine((val) => /[a-zA-Z]/.test(val), "Title must contain letters"),
    body: z
      .string()
      .min(1, "Body is required")
      .max(5000, "Body must not exceed 5000 characters")
      .refine((val) => /[a-zA-Z]/.test(val), "Body must contain letters"),
    category: z
      .string()
      .min(1, "Category is required")
      .max(100, "Category must not exceed 100 characters")
      .refine((val) => /[a-zA-Z]/.test(val), "Category must contain letters"),
  })
  .strict();
