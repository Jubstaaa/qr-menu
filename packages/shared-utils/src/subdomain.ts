import { config, isDevelopment } from "@qr-menu/shared-config";

// TypeScript declarations for browser environment
declare global {
  interface Window {
    location: {
      host: string;
    };
  }
}

export const extractSubdomain = (host: string): string => {
  // Remove protocol and www
  const cleanHost = host.replace(/^https?:\/\//, "").replace(/^www\./, "");

  // Split by dots
  const parts = cleanHost.split(".");

  // If we have at least 2 parts and not localhost
  if (parts.length >= 2 && !cleanHost.includes("localhost")) {
    return parts[0];
  }
  console.log(config.TEST_SUBDOMAIN || "ilker-cafe");

  // For localhost or development, use TEST_SUBDOMAIN
  return config.TEST_SUBDOMAIN || "ilker-cafe";
};

export const getSubdomainFromHeaders = (headers: Headers): string => {
  // Önce x-subdomain header'ını kontrol et (middleware'den gelir)
  const subdomainHeader = headers.get("x-subdomain");
  if (subdomainHeader) {
    return subdomainHeader;
  }

  // Fallback olarak host'tan çıkar
  const host = headers.get("host") || "";
  return extractSubdomain(host);
};

export const getSubdomainFromRequest = (request: Request): string => {
  const url = new URL(request.url);
  return extractSubdomain(url.host);
};

export const getSubdomainFromUrl = (url: string): string => {
  return extractSubdomain(url);
};

export const isLocalhost = (host: string): boolean => {
  return host.includes("localhost") || host.includes("127.0.0.1");
};

export const getFullDomain = (subdomain: string): string => {
  if (isDevelopment()) {
    return `http://localhost:3000`;
  }

  return `https://${subdomain}.qrmenu.com`;
};
