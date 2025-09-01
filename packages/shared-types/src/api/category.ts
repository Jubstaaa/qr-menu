import { z } from "zod";
import {
  createCategoryRequestSchema,
  updateCategoryRequestSchema,
  deleteCategoryRequestSchema,
  reorderCategoriesRequestSchema,
  getCategoryBySlugRequestSchema,
  baseRequestSchema,
} from "@qr-menu/shared-validation";

// Category API Types
export namespace CategoryAPI {
  // Response Types
  export namespace Admin {
    // Request Types (from Zod schemas)
    export type CreateCategoryRequest = z.infer<
      typeof createCategoryRequestSchema
    >;
    export type UpdateCategoryRequest = z.infer<
      typeof updateCategoryRequestSchema
    >;
    export type DeleteCategoryRequest = z.infer<
      typeof deleteCategoryRequestSchema
    >;
    export type ReorderCategoriesRequest = z.infer<
      typeof reorderCategoriesRequestSchema
    >;
    export type GetAllCategoriesRequest = z.infer<typeof baseRequestSchema>;
    // Create Category
    export type CreateCategoryResponse = {
      id: string;
      name: string;
      description?: string | null;
      image_url?: string | null;
      menu_id: string;
      slug?: string | null;
      sort_order?: number | null;
      is_active?: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };

    // Get Category by ID
    export type GetCategoryByIdResponse = {
      id: string;
      name: string;
      description?: string | null;
      image_url?: string | null;
      menu_id: string;
      slug?: string | null;
      sort_order?: number | null;
      is_active?: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };

    // Get All Categories
    export type GetAllCategoriesResponse = {
      id: string;
      name: string;
      description?: string | null;
      image_url?: string | null;
      menu_id: string;
      slug?: string | null;
      sort_order?: number | null;
      is_active?: boolean | null;
      created_at: string | null;
      updated_at: string | null;
      menu_items: {
        id: string;
        name: string;
        description?: string | null;
        price: number;
        category_id: string;
        image_url?: string | null;
        is_popular?: boolean | null;
        is_chef_special?: boolean | null;
        spice_level?: number | null;
        sort_order?: number | null;
        is_available?: boolean | null;
        preparation_time?: number | null;
      }[];
    }[];

    // Update Category
    export type UpdateCategoryResponse = {
      id: string;
      name: string;
      description?: string | null;
      image_url?: string | null;
      menu_id: string;
      slug?: string | null;
      sort_order?: number | null;
      is_active?: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };

    // Delete Category
    export type DeleteCategoryResponse = {
      success: boolean;
    };

    // Reorder Categories
    export type ReorderCategoriesResponse = {
      success: boolean;
    };
  }

  export namespace Public {
    // Request Types (from Zod schemas)
    export type GetCategoryBySlugRequest = z.infer<
      typeof getCategoryBySlugRequestSchema
    >;

    // Get Categories by Menu
    export type GetCategoriesByMenuResponse = {
      id: string;
      name: string;
      description?: string | null;
      image_url?: string | null;
      slug?: string | null;
      sort_order?: number | null;
      is_active?: boolean | null;
      menu_items: {
        id: string;
        name: string;
        description?: string | null;
        price: number;
        image_url?: string | null;
        is_popular?: boolean | null;
        is_chef_special?: boolean | null;
        spice_level?: number | null;
        sort_order?: number | null;
        is_available?: boolean | null;
      }[];
    }[];

    // Get Category by Slug
    export type GetCategoryBySlugResponse = {
      id: string;
      name: string;
      description?: string | null;
      image_url?: string | null;
      slug?: string | null;
      sort_order?: number | null;
      is_active?: boolean | null;
      menu_items: {
        id: string;
        name: string;
        description?: string | null;
        price: number;
        image_url?: string | null;
        is_popular?: boolean | null;
        is_chef_special?: boolean | null;
        spice_level?: number | null;
        sort_order?: number | null;
        is_available?: boolean | null;
      }[];
    };
  }
}
