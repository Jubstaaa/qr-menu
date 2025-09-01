import { config } from "@qr-menu/shared-config";

export const extractSubdomain = (host: string): string => {
  const cleanHost = host.replace(/^https?:\/\//, "").replace(/^www\./, "");

  const parts = cleanHost.split(".");

  if (parts.length >= 2 && !cleanHost.includes("localhost")) {
    return parts[0];
  }

  return config.TEST_SUBDOMAIN || "ilker-cafe";
};
