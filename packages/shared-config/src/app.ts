export interface AppConfig {
  name: string;
  version: string;
  description: string;
  author: string;
  repository: string;
}

export interface MicrofrontendConfig {
  tenant: {
    development: {
      fallback: string;
    };
  };
  "tenant-dashboard": {
    routing: Array<{
      paths: string[];
    }>;
    development: {
      local: string;
    };
  };
}

export const APP_CONFIG: AppConfig = {
  name: "QR Menu",
  version: "1.0.0",
  description: "Modern QR Menu Management System",
  author: "QR Menu Team",
  repository: "https://github.com/qr-menu/qr-menu",
};

export const MICROFRONTEND_CONFIG: MicrofrontendConfig = {
  tenant: {
    development: {
      fallback: "https://tenant.qrmenu.com",
    },
  },
  "tenant-dashboard": {
    routing: [
      {
        paths: ["/dashboard", "/dashboard/:path*"],
      },
    ],
    development: {
      local: "localhost:3001",
    },
  },
};

export const getAppConfig = () => APP_CONFIG;
export const getMicrofrontendConfig = () => MICROFRONTEND_CONFIG;
