import express from "express";
import { pool } from "../database.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { User } from "../interfaces.js";
import { validateAuthData } from "../middleware/validation.js";

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
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Missing email or password
 *       409:
 *         description: Email already registered
 *       500:
 *         description: Server error
 */
router.post("/register", validateAuthData, async (req, res) => {});

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
 *     responses:
 *       200:
 *         description: Returns JWT
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validateAuthData, async (req, res) => {});

export default router;
