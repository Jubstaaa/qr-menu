import { Menu, Category, Item } from "./menu";

// API Response types
export interface MenuWithCategoriesResponse extends Menu {
  menu_categories: Array<Category>;
}

export interface CategoryWithItemsResponse extends Category {
  menu_items: Array<Item>;
}

export interface CategoriesResponse extends Array<Category> {}

export interface ItemsResponse extends Array<Item> {}

// Generic API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface ApiErrorResponse {
  error: string;
  message: string;
  status: number;
}

// Specific API Response types
export type MenuApiResponse = ApiResponse<MenuWithCategoriesResponse>;
export type CategoriesApiResponse = ApiResponse<CategoriesResponse>;
export type ItemsApiResponse = ApiResponse<ItemsResponse>;
export type CategoryWithItemsApiResponse = ApiResponse<{
  category: CategoryWithItemsResponse;
}>;

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  params?: Record<string, string | number | boolean>;
}
