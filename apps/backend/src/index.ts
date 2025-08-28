import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth";
import adminCategoryRoutes from "./routes/admin/category";
import adminItemRoutes from "./routes/admin/item";
import adminMenuRoutes from "./routes/admin/menu";
import { adminSubscriptionRoutes } from "./routes/admin/subscription";

import publicCategoryRoutes from "./routes/public/category";
import publicItemRoutes from "./routes/public/item";
import publicMenuRoutes from "./routes/public/menu";

dotenv.config({ path: "../../.env" });

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());

const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    if (!origin) return callback(null, true);

    const allowedDomains = process.env.ALLOWED_DOMAINS
      ? process.env.ALLOWED_DOMAINS.split(",").map((d) => d.trim())
      : ["localhost:3000", "localhost:3024"];

    const isAllowed = allowedDomains.some((domain) => {
      if (origin === `https://${domain}` || origin === `http://${domain}`) {
        return true;
      }
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

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);

app.use("/api/admin/categories", adminCategoryRoutes);
app.use("/api/admin/items", adminItemRoutes);
app.use("/api/admin/menu", adminMenuRoutes);
app.use("/api/admin/subscription", adminSubscriptionRoutes);

app.use("/api/public/categories", publicCategoryRoutes);
app.use("/api/public/items", publicItemRoutes);
app.use("/api/public/menu", publicMenuRoutes);

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

app.use("*", (req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
