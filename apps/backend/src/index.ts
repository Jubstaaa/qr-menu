import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

// Routes
import authRoutes from "./routes/auth";
import adminCategoryRoutes from "./routes/admin/category";
import adminItemRoutes from "./routes/admin/item";
import adminMenuRoutes from "./routes/admin/menu";
import { adminSubscriptionRoutes } from "./routes/admin/subscription";

// Public routes
import publicCategoryRoutes from "./routes/public/category";
import publicItemRoutes from "./routes/public/item";
import publicMenuRoutes from "./routes/public/menu";

// Load environment variables
dotenv.config({ path: "../../.env" });
const app = express();
const PORT = process.env.PORT || 4000;

// Trust proxy - reverse proxy arkasında çalışırken gerekli
app.set("trust proxy", true);

// Middleware
app.use(helmet());
// CORS configuration
const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Get allowed domains from environment
    const allowedDomains = process.env.ALLOWED_DOMAINS
      ? process.env.ALLOWED_DOMAINS.split(",").map((d) => d.trim())
      : ["localhost:3000", "localhost:3024", "ilkerbalcilar.com.tr"];

    // Check if origin matches any allowed domain
    const isAllowed = allowedDomains.some((domain) => {
      // Exact match
      if (origin === `https://${domain}` || origin === `http://${domain}`) {
        return true;
      }
      // Subdomain match (e.g., ilker-cafe.ilkerbalcilar.com.tr)
      if (origin.includes(`.${domain}`)) {
        return true;
      }
      return false;
    });

    if (isAllowed) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Auth routes (hem public hem admin için)
app.use("/api/auth", authRoutes);

// Admin routes
app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/items", adminItemRoutes);
app.use("/api/admin/menu", adminMenuRoutes);
app.use("/api/admin/subscription", adminSubscriptionRoutes);

// Public routes
app.use("/api/public/categories", publicCategoryRoutes);
app.use("/api/public/items", publicItemRoutes);
app.use("/api/public/menu", publicMenuRoutes);

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
