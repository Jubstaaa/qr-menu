import { z } from "zod";
import { Json } from "../supabase-types";
import {
  createItemRequestSchema,
  updateItemRequestSchema,
  deleteItemRequestSchema,
  reorderItemsRequestSchema,
  getItemByIdRequestSchema,
  getItemBySubdomainAndIdRequestSchema,
  baseRequestSchema,
} from "@qr-menu/shared-validation";

// Item API Types
export namespace ItemAPI {
  // Response Types
  export namespace Admin {
    // Request Types (from Zod schemas)
    export type CreateItemRequest = z.infer<typeof createItemRequestSchema>;
    export type UpdateItemRequest = z.infer<typeof updateItemRequestSchema>;
    export type DeleteItemRequest = z.infer<typeof deleteItemRequestSchema>;
    export type ReorderItemsRequest = z.infer<typeof reorderItemsRequestSchema>;
    export type GetItemByIdRequest = z.infer<typeof getItemByIdRequestSchema>;
    export type GetAllItemsRequest = z.infer<typeof baseRequestSchema>;
    // Create Item
    export type CreateItemResponse = {
      id: string;
      name: string;
      description?: string | null;
      price: number;
      category_id: string;
      image_url?: string | null;
      is_popular?: boolean | null;
      is_chef_special?: boolean | null;
      spice_level?: number | null;
      created_at: string | null;
    };

    // Get All Items
    export type GetAllItemsResponse = {
      id: string;
      name: string;
      description?: string | null;
      price: number;
      category_id: string;
      image_url?: string | null;
      is_popular?: boolean | null;
      is_chef_special?: boolean | null;
      spice_level?: number | null;
      created_at: string | null;
      menu_categories?: {
        id: string;
        name: string;
        menu_id: string;
      };
    }[];

    // Get Item by ID
    export type GetItemByIdResponse = {
      id: string;
      name: string;
      description?: string | null;
      price: number;
      category_id: string;
      image_url?: string | null;
      is_popular: boolean;
      is_chef_special: boolean;
      spice_level?: string | null;
      created_at: string | null;
    };

    // Update Item
    export type UpdateItemResponse = {
      id: string;
      name: string;
      description?: string | null;
      price: number;
      category_id: string;
      image_url?: string | null;
      is_popular?: boolean | null;
      is_chef_special?: boolean | null;
      spice_level?: number | null;
      updated_at: string | null;
    };

    // Delete Item
    export type DeleteItemResponse = {
      success: boolean;
    };

    // Reorder Items
    export type ReorderItemsResponse = {
      success: boolean;
    };
  }

  export namespace Public {
    // Request Types (from Zod schemas)
    export type GetItemBySubdomainAndIdRequest = z.infer<
      typeof getItemBySubdomainAndIdRequestSchema
    >;

    // Get Active Items by Subdomain
    export type GetActiveItemsBySubdomainResponse = {
      id: string;
      name: string;
      description?: string | null;
      price: number;
      image_url?: string | null;
      ingredients?: string | null;
      allergens?: Json | null;
      nutrition_info?: Json | null;
      preparation_time?: number | null;
      spice_level?: number | null;
      is_popular?: boolean | null;
      is_chef_special?: boolean | null;
      sort_order?: number | null;
      is_available?: boolean | null;
      menu_categories?: {
        id: string;
        name: string;
        slug?: string | null;
        is_active?: boolean | null;
      };
    }[];

    // Get Item by Subdomain and ID
    export type GetItemBySubdomainAndIdResponse = {
      id: string;
      name: string;
      description?: string | null;
      price: number;
      image_url?: string | null;
      ingredients?: string | null;
      allergens?: any;
      nutrition_info?: any;
      preparation_time?: number | null;
      spice_level?: number | null;
      is_popular?: boolean | null;
      is_chef_special?: boolean | null;
      sort_order?: number | null;
      is_available?: boolean | null;
      menu_categories?: {
        id: string;
        name: string;
        slug?: string | null;
        is_active?: boolean | null;
      };
    };
  }
}
