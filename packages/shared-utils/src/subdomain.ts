import { config } from "@qr-menu/shared-config";

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
