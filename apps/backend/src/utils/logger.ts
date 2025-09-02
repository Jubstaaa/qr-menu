import { isProduction } from "@qr-menu/shared-config";
import fs from "fs";
import path from "path";

interface ErrorLog {
  timestamp: string;
  method: string;
  url: string;
  userAgent?: string;
  ip?: string;
  duration: string;
  error: {
    message: string;
    stack?: string;
    statusCode: number;
  };
  body?: any;
  query?: any;
  params?: any;
  headers?: any;
}

class Logger {
  private logDir: string;
  private logFile: string;

  constructor() {
    this.logDir = path.join(process.cwd(), "logs");
    this.logFile = path.join(this.logDir, "errors.log");
    this.ensureLogDirectory();
  }

  private ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  async logToFile(errorLog: ErrorLog) {
    try {
      const logEntry = `[${errorLog.timestamp}] ${errorLog.method} ${errorLog.url} - ${errorLog.error.statusCode} - ${errorLog.error.message}\n`;
      fs.appendFileSync(this.logFile, logEntry);
    } catch (error) {
      console.error("Log dosyasına yazma hatası:", error);
    }
  }

  async logToConsole(errorLog: ErrorLog) {
    console.error("🚨 API Error:", JSON.stringify(errorLog, null, 2));
  }

  async logError(errorLog: ErrorLog) {
    // Console'a logla (her zaman)
    await this.logToConsole(errorLog);

    // Dosyaya logla (production'da)
    if (isProduction) {
      await this.logToFile(errorLog);
    }
  }
}

export const logger = new Logger();
