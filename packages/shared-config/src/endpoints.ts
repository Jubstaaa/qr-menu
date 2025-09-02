// All Endpoints
export const ENDPOINTS = {
  ADMIN: {
    MENU: {
      CREATE: "/admin/menus",
      GET_CURRENT_USER: "/admin/menus",
      UPDATE: "/admin/menus/:id",
    },
    CATEGORY: {
      CREATE: "/admin/categories",
      GET_ALL: "/admin/categories",
      GET_BY_ID: "/admin/categories/:id",
      UPDATE: "/admin/categories/:id",
      DELETE: "/admin/categories/:id",
      REORDER: "/admin/categories/reorder",
    },
    ITEM: {
      CREATE: "/admin/items",
      GET_ALL: "/admin/items",
      GET_BY_ID: "/admin/items/:id",
      UPDATE: "/admin/items/:id",
      DELETE: "/admin/items/:id",
    },
    SUBSCRIPTION: {
      GET_CURRENT: "/admin/subscriptions",
    },
  },
  COMMON: {
    AUTH: {
      LOGIN: "/common/auth/login",
      REGISTER: "/common/auth/register",
      LOGOUT: "/common/auth/logout",
      CHECK_AUTH: "/common/auth/check",
      GET_CURRENT_USER: "/common/auth/me",
      GET_USER_MENUS: "/common/auth/menus",
    },
  },
  PUBLIC: {
    MENU: {
      GET_BY_SUBDOMAIN: "/public/menus",
    },
    CATEGORY: {
      GET_BY_SLUG: "/public/categories/:slug",
    },
    ITEM: {
      GET_ALL: "/public/items",
      GET_BY_ID: "/public/items/:itemId",
    },
  },
} as const;
