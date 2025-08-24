export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface EnvironmentConfig {
  apiUrl: string;
  appName: string;
  version: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

export interface FeatureFlags {
  darkMode: boolean;
  analytics: boolean;
  notifications: boolean;
  advancedFeatures: boolean;
}

export interface StorageConfig {
  prefix: string;
  encryption: boolean;
  expiration?: number;
}

export interface LoggerConfig {
  level: "debug" | "info" | "warn" | "error";
  enableConsole: boolean;
  enableFile: boolean;
  maxFileSize: number;
}
