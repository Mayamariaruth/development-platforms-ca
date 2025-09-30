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
  async (req, res) => {
    try {
      const { title, body, category } = req.body;
      const userId = req.user!.id;

      // Insert article into database
      const [result]: [ResultSetHeader, any] = await pool.execute(
        "INSERT INTO articles (title, body, category, submitted_by) VALUES (?, ?, ?, ?)",
        [title, body, category, userId]
      );

      const article: Article = {
        id: result.insertId,
        title,
        body,
        category,
        submitted_by: userId,
        created_at: new Date(),
      };

      res.status(201).json({
        success: true,
        message: "Article submitted successfully",
        data: article,
      });
    } catch (error) {
      console.error("Article submission error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to submit article",
      });
    }
  }
);

export default router;
