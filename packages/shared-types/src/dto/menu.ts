import { CategoryDto } from "./category";

// Menu DTOs
export interface CreateMenuDto {
  name: string;
  subdomain: string;
}

export interface UpdateMenuDto {
  restaurant_name?: string;
  restaurant_description?: string;
  restaurant_address?: string;
  restaurant_phone?: string;
  restaurant_email?: string;
  brand_name?: string;
}

// Response DTOs
export interface CreateMenuResponseDto {
  subdomain: string;
}

export interface MenuWithCategoriesDto {
  id: string;
  subdomain: string;
  restaurant_name: string;
  restaurant_description?: string;
  restaurant_address?: string;
  restaurant_phone?: string;
  restaurant_email?: string;
  brand_name?: string;
  opening_time?: string;
  closing_time?: string;
  theme_color?: string;
  logo_url?: string;
  custom_css?: string;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
  menu_categories: CategoryDto[];
}
