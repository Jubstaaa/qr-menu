import { Request, Response, NextFunction } from "express";
import { extractSubdomain } from "@qr-menu/shared-utils";

export interface SubdomainRequest extends Request {
  subdomain?: string;
}

export const subdomainMiddleware = (
  req: SubdomainRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Environment variable'dan subdomain alma (eğer belirtilmişse)
    const envSubdomain = process.env.SUBDOMAIN;

    if (envSubdomain) {
      req.subdomain = envSubdomain;
      console.log("Using subdomain from environment:", envSubdomain);
      return next();
    }

    // Trust proxy ile güvenli host header alma
    const forwardedHost = req.headers["x-forwarded-host"] as string;
    const originalHost = req.headers.host;
    const host = forwardedHost || originalHost || "";

    // Debug için log
    console.log("Subdomain Middleware - Headers:", {
      "x-forwarded-host": forwardedHost,
      host: originalHost,
      "final-host": host,
      "user-agent": req.headers["user-agent"],
    });

    if (!host) {
      return res.status(400).json({
        error: "Host bilgisi bulunamadı",
      });
    }

    const subdomain = extractSubdomain(host);

    // Subdomain'i request objesine ekle
    req.subdomain = subdomain;

    console.log("Extracted subdomain:", subdomain);

    next();
  } catch (error) {
    console.error("Subdomain middleware error:", error);
    res.status(400).json({
      error: "Geçersiz subdomain",
    });
  }
};
