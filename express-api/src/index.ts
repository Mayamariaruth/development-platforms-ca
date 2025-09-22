import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get("/auth/register", (req, res) => {
  res.json({ message: "Register" });
});

app.get("/auth/login", (req, res) => {
  res.json({ message: "Login" });
});

app.get("/articles", (req, res) => {
  res.json({ message: "Articles" });
});

//Middleware
// 404 handler - catches all unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Cannot ${req.method} ${req.originalUrl}`,
  });
});

// Error handling middleware (last in the stack)
app.use((err: Error, req, res, next) => {
  console.error("Error occurred:", err.message);

  res.status(500).json({
    error: "Internal server error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
