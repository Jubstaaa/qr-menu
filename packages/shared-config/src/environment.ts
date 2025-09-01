import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export interface EnvironmentConfig {
  NODE_ENV: "development" | "production" | "test";
  API_URL: string;
  SUPABASE_URL: string;
  SUPABASE_HOSTNAME: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SUPABASE_STORAGE_BUCKET: string;
  BASE_DOMAIN: string;
  TEST_SUBDOMAIN?: string;
  MICROFRONTENDS_PROXY?: string;
}

export const config: EnvironmentConfig = {
  NODE_ENV:
    (process.env.NODE_ENV as EnvironmentConfig["NODE_ENV"]) || "development",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_HOSTNAME: process.env.SUPABASE_HOSTNAME || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  SUPABASE_STORAGE_BUCKET: process.env.SUPABASE_STORAGE_BUCKET || "",
  BASE_DOMAIN: process.env.BASE_DOMAIN || "",
  TEST_SUBDOMAIN: process.env.TEST_SUBDOMAIN,
  MICROFRONTENDS_PROXY: process.env.MICROFRONTENDS_PROXY,
};

export const isDevelopment = process.env.NODE_ENV === "development";
export const isProduction = process.env.NODE_ENV === "production";
export const isTest = process.env.NODE_ENV === "test";

export const getNextImagesConfig = () => {
  let hostname = config.SUPABASE_HOSTNAME?.trim();

  if (!hostname && config.SUPABASE_URL) {
    try {
      const parsed = new URL(config.SUPABASE_URL);
      hostname = parsed.hostname;
    } catch (_err) {
      hostname = "";
    }
  }

  if (!hostname || hostname === "") {
    return {};
  }

  return {
    images: {
      remotePatterns: [
        {
          protocol: "https" as const,
          hostname: hostname,
          port: "",
          pathname: "/storage/v1/object/public/**",
        },
      ],
    },
  };
};
