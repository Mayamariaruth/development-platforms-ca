import express from "express";
import type { Request, Response } from "express";
import { pool } from "../database.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { User } from "../interfaces.js";

const router = express.Router();
