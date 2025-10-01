import { Router } from "express";
import { pool } from "../database.js";
import type { ResultSetHeader } from "mysql2/promise";
import type { Article, ArticleWithUser } from "../interfaces.js";
import { validate } from "../middleware/validation.js";
import { authenticateToken } from "../middleware/validation.js";
import { createArticleSchema } from "../middleware/schemas.js";

const router = Router();

/**
 * @swagger
 * /articles:
 *   post:
 *     summary: Submit a new article
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - body
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: My first article
 *               body:
 *                 type: string
 *                 example: This is the body of my article
 *               category:
 *                 type: string
 *                 example: Tech
 *     responses:
 *       201:
 *         description: Article created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized / missing token
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /articles:
 *   get:
 *     summary: Get all articles
 *     responses:
 *       200:
 *         description: List of articles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       title:
 *                         type: string
 *                         example: My first article
 *                       body:
 *                         type: string
 *                         example: This is the body of my article
 *                       category:
 *                         type: string
 *                         example: Tech
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       username:
 *                         type: string
 *                         example: johndoe
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT a.id, a.title, a.body, a.category, a.created_at, u.username
       FROM articles a
       JOIN users u ON a.submitted_by = u.id
       ORDER BY a.created_at DESC`
    );

    const articles = rows as ArticleWithUser[];

    res.json({
      success: true,
      data: articles,
    });
  } catch (error) {
    console.error("Fetch articles error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch articles",
    });
  }
});

export default router;
