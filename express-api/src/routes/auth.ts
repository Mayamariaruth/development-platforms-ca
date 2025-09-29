import express from "express";
import type { Request, Response } from "express";
import { pool } from "../database.js";

const router = express.Router();
