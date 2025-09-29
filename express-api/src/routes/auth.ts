import express from "express";
import { pool } from "../database.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { User } from "../interfaces.js";
import { validate } from "../middleware/validation.js";
import { registerSchema, loginSchema } from "../middleware/schemas.js";

const router = express.Router();
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Validation failed
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Server error
 */
router.post("/register", validate(registerSchema), async (req, res) => {});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password123!
 *     responses:
 *       200:
 *         description: Returns JWT
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validate(loginSchema), async (req, res) => {});

export default router;
