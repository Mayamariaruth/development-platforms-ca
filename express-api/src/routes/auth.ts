import express from "express";
import { pool } from "../database.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { User } from "../interfaces.js";
import { validateAuthData } from "../middleware/validation.js";

const router = express.Router();

router.post("/register", validateAuthData, async (req, res) => {});

router.post("/login", validateAuthData, async (req, res) => {});

export default router;
