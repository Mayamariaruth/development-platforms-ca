import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { registerSchema } from "./schemas.js"

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
