export interface FeatureFlags {
  darkMode: boolean;
  microfrontends: boolean;
  analytics: boolean;
  notifications: boolean;
  realTimeUpdates: boolean;
  offlineSupport: boolean;
}

export const DEFAULT_FEATURE_FLAGS: FeatureFlags = {
  darkMode: true,
  microfrontends: true,
  analytics: false,
  notifications: true,
  realTimeUpdates: false,
  offlineSupport: false,
};

export const getFeatureFlags = (): FeatureFlags => {
  // Environment-based feature flags
  const envFlags: Partial<FeatureFlags> = {
    darkMode: process.env.NEXT_PUBLIC_DARK_MODE === "true",
    microfrontends: process.env.NEXT_PUBLIC_MICROFRONTENDS === "true",
    analytics: process.env.NEXT_PUBLIC_ANALYTICS === "true",
    notifications: process.env.NEXT_PUBLIC_NOTIFICATIONS !== "false",
    realTimeUpdates: process.env.NEXT_PUBLIC_REALTIME === "true",
    offlineSupport: process.env.NEXT_PUBLIC_OFFLINE === "true",
  };

  return {
    ...DEFAULT_FEATURE_FLAGS,
    ...envFlags,
  };
};

export const isFeatureEnabled = (feature: keyof FeatureFlags): boolean => {
  const flags = getFeatureFlags();
  return flags[feature];
};
