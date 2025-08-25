// Global window type for browser environment
declare global {
  var window: Window & typeof globalThis;
}

import { config } from "@qr-menu/shared-config";
import { extractSubdomain } from "./subdomain";
import {
  ApiResponse,
  ApiErrorResponse,
  MenuWithCategoriesResponse,
  CategoriesResponse,
  ItemsResponse,
  CategoryWithItemsResponse,
  Item,
  Category,
  Menu,
  MenuWithCategories,
  User,
  Subscription,
  LoginResponse,
  RegisterResponse,
  AuthCheckResponse,
  AdminLoginResponse,
  AdminAuthCheckResponse,
  AdminGetUserMenusResponse,
} from "@qr-menu/shared-types";

// HTTP Methods
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Request options
export interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  subdomain?: string; // Server-side için subdomain parametresi
  cache?:
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
  credentials?: "omit" | "same-origin" | "include";
}

// Default request options
const defaultOptions: RequestOptions = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store",
  credentials: "include",
};

// Helper function to build full URL
export const buildApiUrl = (
  endpoint: string,
  params?: Record<string, string>
): string => {
  let url = `${config.API_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, value);
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  return url;
};

// Helper function to handle response
const handleResponse = async <T>(
  response: Response
): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    try {
      const errorData = (await response.json()) as ApiErrorResponse;

      throw {
        error: errorData.error,
        message: errorData.message,
        status: response.status,
      } as ApiErrorResponse;
    } catch {
      throw {
        error: "API Error",
        message: `HTTP ${response.status}`,
        status: response.status,
      } as ApiErrorResponse;
    }
  }

  try {
    const responseData = (await response.json()) as ApiResponse<T>;
    return {
      data: responseData.data,
      message: responseData.message,
      status: response.status,
    };
  } catch {
    throw {
      error: "Invalid Response",
      message: "Response format is invalid",
      status: response.status,
    } as ApiErrorResponse;
  }
};

// Main API function
export const apiRequest = async <T = any>(
  endpoint: string,
  options: RequestOptions = {},
  params?: Record<string, string>
): Promise<ApiResponse<T>> => {
  const finalOptions = { ...defaultOptions, ...options };

  // Build full URL with params
  const url = buildApiUrl(endpoint, params);

  // Cookie tabanlı auth için Authorization header'a gerek yok
  const headers = { ...finalOptions.headers };

  // Subdomain header'ını ekle (server-side veya client-side)
  if (finalOptions.subdomain) {
    // Server-side'da parametre olarak verilen subdomain
    headers["x-subdomain"] = finalOptions.subdomain;
  } else if (typeof window !== "undefined") {
    // Client-side'da hostname'den çıkarılan subdomain
    headers["x-subdomain"] = extractSubdomain(window.location.host);
  }

  // Prepare request config
  const requestConfig: RequestInit = {
    method: finalOptions.method,
    headers,
    credentials: finalOptions.credentials,
  };

  // Add body for non-GET requests
  if (finalOptions.method !== "GET" && finalOptions.body) {
    requestConfig.body = JSON.stringify(finalOptions.body);
  }

  try {
    const response = await fetch(url, requestConfig);
    return await handleResponse<T>(response);
  } catch (error) {
    throw {
      error: "Network Error",
      message: error instanceof Error ? error.message : "Unknown error",
      status: 0,
    } as any;
  }
};

// Convenience functions for common HTTP methods
export const apiGet = <T = any>(
  endpoint: string,
  params?: Record<string, string>
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { method: "GET" }, params);
};

export const apiPost = <T = any>(
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { method: "POST", body: data });
};

export const apiPut = <T = any>(
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { method: "PUT", body: data });
};

export const apiDelete = <T = any>(
  endpoint: string
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { method: "DELETE" });
};

export const apiPatch = <T = any>(
  endpoint: string,
  data?: any
): Promise<ApiResponse<T>> => {
  return apiRequest<T>(endpoint, { method: "PATCH", body: data });
};

// Specific API functions for common operations with proper types
export const apiClient = {
  // Menu operations

  getMenuByUser: (): Promise<ApiResponse<Menu>> =>
    apiGet<Menu>(`${config.API_ENDPOINTS.ADMIN.MENU}`),

  updateMenu: (data: Partial<Menu>): Promise<ApiResponse<Menu>> =>
    apiPut<Menu>(`${config.API_ENDPOINTS.ADMIN.MENU}`, data),

  getCategories: (): Promise<ApiResponse<CategoryWithItemsResponse>> =>
    apiGet<CategoryWithItemsResponse>(`${config.API_ENDPOINTS.ADMIN.CATEGORY}`),

  getCategoriesByMenu: (): Promise<ApiResponse<CategoriesResponse>> =>
    apiGet<CategoriesResponse>(`${config.API_ENDPOINTS.ADMIN.CATEGORY}`),

  getMenuBySubdomainPublic: (
    options?: RequestOptions
  ): Promise<ApiResponse<MenuWithCategories>> =>
    apiRequest<MenuWithCategories>(config.API_ENDPOINTS.PUBLIC.MENU, options),

  getCategoryBySlugPublic: (
    slug: string,
    options?: RequestOptions
  ): Promise<ApiResponse<any>> =>
    apiRequest<any>(`${config.API_ENDPOINTS.PUBLIC.CATEGORY}/${slug}`, options),

  // Public Auth operations
  publicLogin: (
    email: string,
    password: string
  ): Promise<ApiResponse<LoginResponse>> =>
    apiPost(`${config.API_ENDPOINTS.PUBLIC.AUTH}/login`, { email, password }),

  publicRegister: (
    email: string,
    password: string
  ): Promise<ApiResponse<RegisterResponse>> =>
    apiPost(`${config.API_ENDPOINTS.PUBLIC.AUTH}/register`, {
      email,
      password,
    }),

  publicLogout: (): Promise<ApiResponse<void>> =>
    apiPost(`${config.API_ENDPOINTS.PUBLIC.AUTH}/logout`, {}),

  publicCheckAuth: (): Promise<ApiResponse<User>> =>
    apiGet<User>(`${config.API_ENDPOINTS.PUBLIC.AUTH}/check`),

  getItemsByCategory: (
    categoryId: string
  ): Promise<ApiResponse<ItemsResponse>> =>
    apiGet<ItemsResponse>(
      `${config.API_ENDPOINTS.ADMIN.ITEM}/categories/${categoryId}`
    ),

  getItemsByMenu: (): Promise<ApiResponse<ItemsResponse>> =>
    apiGet<ItemsResponse>(`${config.API_ENDPOINTS.ADMIN.ITEM}`),

  // Admin Auth operations
  adminLogin: (
    email: string,
    password: string
  ): Promise<ApiResponse<AdminLoginResponse>> =>
    apiPost(config.API_ENDPOINTS.ADMIN_AUTH.LOGIN, {
      email,
      password,
    }),

  adminLogout: (): Promise<ApiResponse<void>> =>
    apiPost(config.API_ENDPOINTS.ADMIN_AUTH.LOGOUT, {}),

  adminCheckAuth: (): Promise<ApiResponse<AdminAuthCheckResponse>> =>
    apiGet(config.API_ENDPOINTS.ADMIN_AUTH.CHECK),

  adminGetUserMenus: (): Promise<ApiResponse<AdminGetUserMenusResponse>> =>
    apiGet(config.API_ENDPOINTS.ADMIN_AUTH.MENUS),

  // Admin Menu operations
  adminCreateMenu: (
    name: string,
    subdomain: string
  ): Promise<ApiResponse<any>> =>
    apiPost(config.API_ENDPOINTS.ADMIN.MENU, {
      name,
      subdomain,
    }),

  // Category operations
  createCategory: (data: Partial<Category>): Promise<ApiResponse<Category>> =>
    apiPost(`${config.API_ENDPOINTS.ADMIN.CATEGORY}`, data),

  updateCategory: (
    categoryId: string,
    data: Partial<Category>
  ): Promise<ApiResponse<Category>> =>
    apiPut(`${config.API_ENDPOINTS.ADMIN.CATEGORY}/${categoryId}`, data),

  deleteCategory: (categoryId: string): Promise<ApiResponse<void>> =>
    apiDelete(`${config.API_ENDPOINTS.ADMIN.CATEGORY}/${categoryId}`),

  reorderCategories: (
    changes: Array<{ id: string; newSortOrder: number }>
  ): Promise<ApiResponse<{ updatedCount: number }>> =>
    apiPut(`${config.API_ENDPOINTS.ADMIN.CATEGORY}/reorder`, {
      changes,
    }),

  // Item operations
  createItem: (data: Partial<Item>): Promise<ApiResponse<Item>> =>
    apiPost(`${config.API_ENDPOINTS.ADMIN.ITEM}`, data),

  updateItem: (
    itemId: string,
    data: Partial<Item>
  ): Promise<ApiResponse<Item>> =>
    apiPut(`${config.API_ENDPOINTS.ADMIN.ITEM}/${itemId}`, data),

  deleteItem: (itemId: string): Promise<ApiResponse<void>> =>
    apiDelete(`${config.API_ENDPOINTS.ADMIN.ITEM}/${itemId}`),

  reorderItemsInCategory: (
    changes: Array<{ id: string; newSortOrder: number }>
  ): Promise<ApiResponse<{ updatedCount: number }>> =>
    apiPut(`${config.API_ENDPOINTS.ADMIN.ITEM}/reorder`, {
      changes,
    }),

  // Subscription operations
  getUserSubscription: (): Promise<
    ApiResponse<{ subscription: Subscription | null }>
  > =>
    apiGet<{ subscription: Subscription | null }>(
      `${config.API_ENDPOINTS.ADMIN.SUBSCRIPTION}`
    ),
};
