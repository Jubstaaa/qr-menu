import dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export interface EnvironmentConfig {
  NODE_ENV: "development" | "production" | "test";
  API_URL: string;
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  TEST_SUBDOMAIN?: string;
  MICROFRONTENDS_PROXY?: string;
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: string;
      REGISTER: string;
      LOGOUT: string;
      CHECK: string;
      MENUS: string;
    };
    ADMIN: {
      CATEGORY: string;
      ITEM: string;
      MENU: string;
      SUBSCRIPTION: string;
    };
    PUBLIC: {
      CATEGORY: string;
      ITEM: string;
      MENU: string;
    };
  };
}

export const config: EnvironmentConfig = {
  NODE_ENV:
    (process.env.NODE_ENV as EnvironmentConfig["NODE_ENV"]) || "development",
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  TEST_SUBDOMAIN: process.env.TEST_SUBDOMAIN,
  MICROFRONTENDS_PROXY: process.env.MICROFRONTENDS_PROXY,
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: "/api/auth/login",
      REGISTER: "/api/auth/register",
      LOGOUT: "/api/auth/logout",
      CHECK: "/api/auth/check",
      MENUS: "/api/auth/menus",
    },
    ADMIN: {
      CATEGORY: "/api/admin/categories",
      ITEM: "/api/admin/items",
      MENU: "/api/admin/menu",
      SUBSCRIPTION: "/api/admin/subscription",
    },
    PUBLIC: {
      CATEGORY: "/api/public/categories",
      ITEM: "/api/public/items",
      MENU: "/api/public/menu",
    },
  },
};

export const isDevelopment = () => process.env.NODE_ENV === "development";
export const isProduction = () => process.env.NODE_ENV === "production";
export const isTest = () => process.env.NODE_ENV === "test";
