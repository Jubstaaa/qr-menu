// API Endpoint Configuration
export interface ApiEndpoint {
  path: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  requiresAuth?: boolean;
  adminOnly?: boolean;
}

// Auth Endpoints
export const AUTH_ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  GET_CURRENT_USER: "/auth/me",
} as const;

// Menu Endpoints
export const MENU_ENDPOINTS = {
  CREATE: "/admin/menu",
  GET_BY_SUBDOMAIN: "/public/menu/:subdomain",
  UPDATE: "/admin/menu/:id",
  DELETE: "/admin/menu/:id",
} as const;

// Category Endpoints
export const CATEGORY_ENDPOINTS = {
  CREATE: "/admin/categories",
  GET_ALL: "/admin/categories",
  GET_BY_ID: "/admin/categories/:id",
  UPDATE: "/admin/categories/:id",
  DELETE: "/admin/categories/:id",
  GET_PUBLIC: "/public/categories/:menuId",
} as const;

// Item Endpoints
export const ITEM_ENDPOINTS = {
  CREATE: "/admin/items",
  GET_ALL: "/admin/items",
  GET_BY_ID: "/admin/items/:id",
  UPDATE: "/admin/items/:id",
  DELETE: "/admin/items/:id",
  GET_BY_CATEGORY: "/public/items/:categoryId",
} as const;

// Subscription Endpoints
export const SUBSCRIPTION_ENDPOINTS = {
  GET_CURRENT: "/admin/subscription",
  UPGRADE: "/admin/subscription/upgrade",
  CANCEL: "/admin/subscription/cancel",
} as const;

// Endpoint Configuration
export const ENDPOINT_CONFIG: Record<string, ApiEndpoint> = {
  // Auth
  "auth.login": {
    path: AUTH_ENDPOINTS.LOGIN,
    method: "POST",
    requiresAuth: false,
  },
  "auth.register": {
    path: AUTH_ENDPOINTS.REGISTER,
    method: "POST",
    requiresAuth: false,
  },
  "auth.logout": {
    path: AUTH_ENDPOINTS.LOGOUT,
    method: "POST",
    requiresAuth: true,
  },
  "auth.getCurrentUser": {
    path: AUTH_ENDPOINTS.GET_CURRENT_USER,
    method: "GET",
    requiresAuth: true,
  },

  // Menu
  "menu.create": {
    path: MENU_ENDPOINTS.CREATE,
    method: "POST",
    requiresAuth: true,
    adminOnly: true,
  },
  "menu.getBySubdomain": {
    path: MENU_ENDPOINTS.GET_BY_SUBDOMAIN,
    method: "GET",
    requiresAuth: false,
  },
  "menu.update": {
    path: MENU_ENDPOINTS.UPDATE,
    method: "PUT",
    requiresAuth: true,
    adminOnly: true,
  },
  "menu.delete": {
    path: MENU_ENDPOINTS.DELETE,
    method: "DELETE",
    requiresAuth: true,
    adminOnly: true,
  },

  // Category
  "category.create": {
    path: CATEGORY_ENDPOINTS.CREATE,
    method: "POST",
    requiresAuth: true,
    adminOnly: true,
  },
  "category.getAll": {
    path: CATEGORY_ENDPOINTS.GET_ALL,
    method: "GET",
    requiresAuth: true,
    adminOnly: true,
  },
  "category.getById": {
    path: CATEGORY_ENDPOINTS.GET_BY_ID,
    method: "GET",
    requiresAuth: true,
    adminOnly: true,
  },
  "category.update": {
    path: CATEGORY_ENDPOINTS.UPDATE,
    method: "PUT",
    requiresAuth: true,
    adminOnly: true,
  },
  "category.delete": {
    path: CATEGORY_ENDPOINTS.DELETE,
    method: "DELETE",
    requiresAuth: true,
    adminOnly: true,
  },
  "category.getPublic": {
    path: CATEGORY_ENDPOINTS.GET_PUBLIC,
    method: "GET",
    requiresAuth: false,
  },

  // Item
  "item.create": {
    path: ITEM_ENDPOINTS.CREATE,
    method: "POST",
    requiresAuth: true,
    adminOnly: true,
  },
  "item.getAll": {
    path: ITEM_ENDPOINTS.GET_ALL,
    method: "GET",
    requiresAuth: true,
    adminOnly: true,
  },
  "item.getById": {
    path: ITEM_ENDPOINTS.GET_BY_ID,
    method: "GET",
    requiresAuth: true,
    adminOnly: true,
  },
  "item.update": {
    path: ITEM_ENDPOINTS.UPDATE,
    method: "PUT",
    requiresAuth: true,
    adminOnly: true,
  },
  "item.delete": {
    path: ITEM_ENDPOINTS.DELETE,
    method: "DELETE",
    requiresAuth: true,
    adminOnly: true,
  },
  "item.getByCategory": {
    path: ITEM_ENDPOINTS.GET_BY_CATEGORY,
    method: "GET",
    requiresAuth: false,
  },

  // Subscription
  "subscription.getCurrent": {
    path: SUBSCRIPTION_ENDPOINTS.GET_CURRENT,
    method: "GET",
    requiresAuth: true,
    adminOnly: true,
  },
  "subscription.upgrade": {
    path: SUBSCRIPTION_ENDPOINTS.UPGRADE,
    method: "POST",
    requiresAuth: true,
    adminOnly: true,
  },
  "subscription.cancel": {
    path: SUBSCRIPTION_ENDPOINTS.CANCEL,
    method: "POST",
    requiresAuth: true,
    adminOnly: true,
  },
};
