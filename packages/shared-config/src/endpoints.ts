// All Endpoints
export const ENDPOINTS = {
  ADMIN: {
    MENU: {
      CREATE: "/admin/menu",
      GET: "/admin/menu",
      UPDATE: "/admin/menu",
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
      REORDER: "/admin/items/reorder",
    },
    SUBSCRIPTION: {
      GET_CURRENT: "/admin/subscriptions",
    },
  },
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/common/auth/register",
    LOGOUT: "/auth/logout",
    CHECK_AUTH: "/common/auth/check",
    GET_CURRENT_USER: "/common/auth/me",
    GET_USER_MENUS: "/common/auth/menus",
  },
  PUBLIC: {
    MENU: {
      GET: "/public/menus",
    },
    CATEGORY: {
      GET_BY_SLUG: "/public/categories/:slug",
      GET: "/public/categories",
      GET_ITEMS_BY_CATEGORY: "/public/categories/:slug/items",
    },
    ITEM: {
      GET_ALL: "/public/items",
      GET_BY_ID: "/public/items/:itemId",
    },
  },
} as const;
