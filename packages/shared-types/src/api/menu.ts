import { z } from "zod";
import {
  createMenuRequestSchema,
  updateMenuRequestSchema,
  getMenuBySubdomainRequestSchema,
  getMenusByUserRequestSchema,
  baseRequestSchema,
} from "@qr-menu/shared-validation";

// Menu API Types
export namespace MenuAPI {
  // Request Types (from Zod schemas)
  export type GetMenuBySubdomainRequest = z.infer<
    typeof getMenuBySubdomainRequestSchema
  >;
  export type GetMenusByUserRequest = z.infer<
    typeof getMenusByUserRequestSchema
  >;

  // Response Types
  export namespace Admin {
    // Request Types (from Zod schemas)
    export type CreateMenuRequest = z.infer<typeof createMenuRequestSchema>;
    export type UpdateMenuRequest = z.infer<typeof updateMenuRequestSchema>;
    export type GetAllMenusRequest = z.infer<typeof baseRequestSchema>;

    // Create Menu
    export type CreateMenuResponse = {
      id: string;
      user_id: string;
      restaurant_name: string;
      restaurant_description?: string | null;
      restaurant_address?: string | null;
      restaurant_phone?: string | null;
      restaurant_email?: string | null;
      subdomain: string;
      is_active: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };

    // Get Menu by Subdomain
    export type GetMenuBySubdomainResponse = {
      id: string;
      subdomain: string;
      restaurant_name: string;
      restaurant_description?: string | null;
      restaurant_address?: string | null;
      restaurant_phone?: string | null;
      restaurant_email?: string | null;
      is_active: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };

    // Update Menu
    export type UpdateMenuResponse = {
      id: string;
      user_id: string;
      restaurant_name: string;
      restaurant_description?: string | null;
      restaurant_address?: string | null;
      restaurant_phone?: string | null;
      restaurant_email?: string | null;
      subdomain: string;
      is_active: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };

    // Get Menus by User
    export type GetMenusByUserResponse = {
      id: string;
      restaurant_name: string;
      restaurant_description?: string | null;
      restaurant_address?: string | null;
      restaurant_phone?: string | null;
      restaurant_email?: string | null;
      logo_url?: string | null;
      opening_time?: string | null;
      closing_time?: string | null;
      wifi_ssid?: string | null;
      wifi_password?: string | null;
      subdomain: string;
      is_active: boolean | null;
      created_at: string | null;
      updated_at: string | null;
    };
  }

  export namespace Public {
    // Get Menu by Subdomain
    export type GetMenuBySubdomainResponse = {
      id: string;
      subdomain: string;
      restaurant_name: string;
      restaurant_description?: string | null;
      restaurant_address?: string | null;
      restaurant_phone?: string | null;
      restaurant_email?: string | null;
      logo_url?: string | null;
      is_active: boolean | null;
      created_at: string | null;
      updated_at: string | null;
      menu_categories: {
        id: string;
        name: string;
        description?: string | null;
        image_url?: string | null;
        slug?: string | null;
        is_active?: boolean | null;
        sort_order?: number | null;
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
    };
  }
}
