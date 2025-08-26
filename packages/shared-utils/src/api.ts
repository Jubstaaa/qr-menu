// Global window type for browser environment
declare global {
  var window: Window & typeof globalThis;
}

import { config } from "@qr-menu/shared-config";
import { extractSubdomain } from "./subdomain";
import {
  ApiResponse,
  ApiErrorResponse,
  AuthResponseDto,
  LoginDto,
  RegisterDto,
  CreateMenuDto,
  CreateMenuResponseDto,
  CategoryBySlugParams,
  Menu,
  Category,
  Item,
  Subscription,
  MenuWithCategoriesDto,
  CategoryWithItemsDto,
  CategoryDto,
  ItemDto,
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
      const error = (await response.json()) as ApiErrorResponse;

      throw error;
    } catch (error) {
      throw error;
    }
  }

  try {
    const responseData = (await response.json()) as ApiResponse<T>;
    return {
      data: responseData.data,
      message: responseData.message,
    };
  } catch {
    throw {
      message: "Response format is invalid",
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
    throw error;
  }
};

// Convenience functions for common HTTP methods
export const apiGet = <T = any>(
  endpoint: string,
  params?: Record<string, string>
) => {
  return apiRequest<T>(endpoint, { method: "GET" }, params);
};

export const apiPost = <T = any>(endpoint: string, data?: any) => {
  return apiRequest<T>(endpoint, { method: "POST", body: data });
};

export const apiPut = <T = any>(endpoint: string, data?: any) => {
  return apiRequest<T>(endpoint, { method: "PUT", body: data });
};

export const apiDelete = <T = any>(endpoint: string) => {
  return apiRequest<T>(endpoint, { method: "DELETE" });
};

export const apiPatch = <T = any>(endpoint: string, data?: any) => {
  return apiRequest<T>(endpoint, { method: "PATCH", body: data });
};

// Specific API functions for common operations with proper types
export const apiClient = {
  // Menu operations
  getMenuByUser: (): Promise<ApiResponse<Menu>> =>
    apiGet<Menu>(`${config.API_ENDPOINTS.ADMIN.MENU}`),

  updateMenu: (data: Partial<Menu>): Promise<ApiResponse<Menu>> =>
    apiPut<Menu>(`${config.API_ENDPOINTS.ADMIN.MENU}`, data),

  getCategories: (): Promise<ApiResponse<CategoryWithItemsDto>> =>
    apiGet<CategoryWithItemsDto>(`${config.API_ENDPOINTS.ADMIN.CATEGORY}`),

  getCategoriesByMenu: (): Promise<ApiResponse<CategoryDto>> =>
    apiGet<CategoryDto>(`${config.API_ENDPOINTS.ADMIN.CATEGORY}`),

  getMenuBySubdomainPublic: (
    options?: RequestOptions
  ): Promise<ApiResponse<MenuWithCategoriesDto>> =>
    apiRequest<MenuWithCategoriesDto>(
      config.API_ENDPOINTS.PUBLIC.MENU,
      options
    ),

  getCategoryBySlugPublic: (
    params: CategoryBySlugParams,
    options?: RequestOptions
  ): Promise<ApiResponse<CategoryWithItemsDto>> =>
    apiRequest<CategoryWithItemsDto>(
      `${config.API_ENDPOINTS.PUBLIC.CATEGORY}/${params.slug}`,
      options
    ),

  // Auth operations
  login: (data: LoginDto): Promise<ApiResponse<AuthResponseDto>> =>
    apiPost(`${config.API_ENDPOINTS.AUTH.LOGIN}`, data),

  register: (data: RegisterDto): Promise<ApiResponse<AuthResponseDto>> =>
    apiPost(`${config.API_ENDPOINTS.AUTH.REGISTER}`, data),

  logout: (): Promise<ApiResponse<void>> =>
    apiPost(`${config.API_ENDPOINTS.AUTH.LOGOUT}`, {}),

  checkAuth: (): Promise<ApiResponse<AuthResponseDto>> =>
    apiGet<AuthResponseDto>(`${config.API_ENDPOINTS.AUTH.CHECK}`),

  getUserMenus: (): Promise<ApiResponse<AuthResponseDto>> =>
    apiGet(config.API_ENDPOINTS.AUTH.MENUS),

  // Item operations
  getItemsByCategory: (categoryId: string): Promise<ApiResponse<ItemDto>> =>
    apiGet<ItemDto>(
      `${config.API_ENDPOINTS.ADMIN.ITEM}/categories/${categoryId}`
    ),

  getItemsByMenu: (): Promise<ApiResponse<ItemDto>> =>
    apiGet<ItemDto>(`${config.API_ENDPOINTS.ADMIN.ITEM}`),

  // Admin Menu operations
  adminCreateMenu: (
    data: CreateMenuDto
  ): Promise<ApiResponse<CreateMenuResponseDto>> =>
    apiPost(config.API_ENDPOINTS.ADMIN.MENU, data),

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
    apiPut(`${config.API_ENDPOINTS.ADMIN.CATEGORY}/reorder`, { changes }),

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
    apiPut(`${config.API_ENDPOINTS.ADMIN.ITEM}/reorder`, { changes }),

  // Subscription operations
  getUserSubscription: (): Promise<
    ApiResponse<{ subscription: Subscription | null }>
  > =>
    apiGet<{ subscription: Subscription | null }>(
      `${config.API_ENDPOINTS.ADMIN.SUBSCRIPTION}`
    ),
};
