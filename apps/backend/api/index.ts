import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Admin routes
import adminCategoryRoutes from "../src/routes/admin/category";
import adminItemRoutes from "../src/routes/admin/item";
import adminMenuRoutes from "../src/routes/admin/menu";
import { adminSubscriptionRoutes } from "../src/routes/admin/subscription.js";
import { adminAuthRoutes } from "../src/routes/admin/auth.js";

// Public routes
import publicCategoryRoutes from "../src/routes/public/category";
import publicItemRoutes from "../src/routes/public/item";
import publicMenuRoutes from "../src/routes/public/menu";
import publicAuthRoutes from "../src/routes/public/auth";

// Load environment variables
dotenv.config({ path: "../../.env" });
const app: express.Application = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3024"],
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Admin routes
app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/items", adminItemRoutes);
app.use("/api/admin/menu", adminMenuRoutes);
app.use("/api/admin/subscription", adminSubscriptionRoutes);

// Public routes
app.use("/api/public/categories", publicCategoryRoutes);
app.use("/api/public/items", publicItemRoutes);
app.use("/api/public/menu", publicMenuRoutes);
app.use("/api/public/auth", publicAuthRoutes);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({
      error: "Something went wrong!",
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal server error",
    });
  }
);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Export for Vercel
export default app;
