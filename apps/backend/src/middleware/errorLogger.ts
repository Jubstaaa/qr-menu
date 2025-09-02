import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

// Request interface'ini extend et
declare global {
  namespace Express {
    interface Request {
      startTime?: number;
    }
  }
}

// Request timing middleware (error logger için)
export const requestTimer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.startTime = Date.now();
  next();
};

// Global error handling middleware
export const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Request başlangıç zamanını al
  const startTime = req.startTime || Date.now();
  const duration = Date.now() - startTime;

  // Error detaylarını hazırla
  const errorLog = {
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url,
    userAgent: req.get("User-Agent"),
    ip: req.ip || req.connection.remoteAddress,
    duration: `${duration}ms`,
    error: {
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode || 500,
    },
    body: req.body,
    query: req.query,
    params: req.params,
    headers: {
      authorization: req.headers.authorization ? "***" : undefined,
      "content-type": req.headers["content-type"],
    },
  };

  // Logla
  logger.logError(errorLog);

  res.status(error.statusCode || 500).json({
    message: error.message || "Internal Server Error",
  });
};
