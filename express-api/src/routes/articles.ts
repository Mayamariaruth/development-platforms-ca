import { Router } from "express";
import { pool } from "../database.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { Article, ArticleWithUser } from "../interfaces.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/validation.js";
import { createArticleSchema } from "../middleware/schemas.js";

const router = Router();

router.post(
  "/",
  authenticateToken,
  validate(createArticleSchema),
  async (req, res) => {}
);

export default router;
