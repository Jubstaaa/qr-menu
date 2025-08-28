import { ItemDto } from "./item";

export interface CreateCategoryDto {
  name: string;
  slug: string;
  description?: string;
  sort_order?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  slug?: string;
  description?: string;
  sort_order?: number;
  is_active?: boolean;
}

export interface CategoryDto {
  id: string;
  menu_id: string;
  name: string;
  slug: string;
  description?: string;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  image_url?: string;
}

export interface CategoryWithItemsDto extends CategoryDto {
  menu_items: ItemDto[];
}

export interface CategoryByIdParams {
  id: string;
}

export interface CategoryBySlugParams {
  slug: string;
}

export interface CategoriesByMenuParams {
  menu_id: string;
  is_active?: boolean;
}

export interface CategoryWithItemsParams {
  category_id: string;
  include_items?: boolean;
}
