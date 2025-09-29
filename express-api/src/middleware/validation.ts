import type { Request, Response, NextFunction } from "express";

// Validate auth routes
export function validateAuthData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  next();
}
