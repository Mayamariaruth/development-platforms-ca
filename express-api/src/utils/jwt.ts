import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Generate JWT Token when user logs in
export function generateToken(userId: number) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
}

// Verify JWT token for authenticated requests
export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch (error) {
    return null;
  }
}
