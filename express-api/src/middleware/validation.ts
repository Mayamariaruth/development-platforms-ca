import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { verifyToken } from "../utils/jwt.js";

// Universal validator
export function validate(schema: z.ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: result.error.issues.map((issue) => issue.message),
      });
    }
    req.body = result.data;
    next();
  };
}

// JWT Authentication Middleware
export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  // Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({
      error: "Access token required",
    });
  }

  // Check if header follows Bearer format
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "Token must be in format: Bearer <token>",
    });
  }

  // Extract token from "Bearer <token>"
  const token = authHeader.substring(7);

  // Verify the token
  const payload = verifyToken(token);

  if (!payload) {
    return res.status(403).json({
      error: "Invalid or expired token",
    });
  }

  // Add user info to request object
  req.user = { id: payload.userId };
  next();
}
