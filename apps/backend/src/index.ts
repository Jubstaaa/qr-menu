import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Admin routes
import adminCategoryRoutes from "./routes/admin/category";
import adminItemRoutes from "./routes/admin/item";
import adminMenuRoutes from "./routes/admin/menu";
import { adminSubscriptionRoutes } from "./routes/admin/subscription";
import { adminAuthRoutes } from "./routes/admin/auth";

// Public routes
import publicCategoryRoutes from "./routes/public/category";
import publicItemRoutes from "./routes/public/item";
import publicMenuRoutes from "./routes/public/menu";
import publicAuthRoutes from "./routes/public/auth";

// Load environment variables
dotenv.config({ path: "../../.env" });
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(helmet());
// CORS origins from environment variable
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
  : ["http://localhost:3000", "http://localhost:3024"];

app.use(
  cors({
    origin: allowedOrigins,
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

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
