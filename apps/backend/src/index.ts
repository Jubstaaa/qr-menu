import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes";
import { config } from "@qr-menu/shared-config";
import { globalErrorHandler, requestTimer } from "./middleware/errorLogger";

const app = express();
const PORT = config.PORT;

app.use(helmet());

// Request timing middleware (error logger için)
app.use(requestTimer);

const corsOptions = {
  origin: function (origin: string | undefined, callback: any) {
    if (!origin) return callback(null, true);

    const allowedDomains = [
      "localhost:3000",
      "localhost:3024",
      config.BASE_DOMAIN,
    ];

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

app.use(routes);

// Error logging middleware (tüm route'lardan sonra)
app.use(globalErrorHandler);

app.use("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
