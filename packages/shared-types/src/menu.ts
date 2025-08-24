import { Database } from "./database";

// Supabase generated types from supabase-pink-island project
export type Menu = Database["public"]["Tables"]["menus"]["Row"];
export type Category = Database["public"]["Tables"]["menu_categories"]["Row"];
export type Item = Database["public"]["Tables"]["menu_items"]["Row"];
export type CustomDomain =
  Database["public"]["Tables"]["custom_domains"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];

// Extended Menu type with categories
export interface MenuWithCategories extends Menu {
  menu_categories?: CategoryWithItems[];
}

export interface CategoryWithItems extends Category {
  menu_items?: Item[];
}

// Legacy types for backward compatibility (if needed)
export interface LegacyItem {
  id: string;
  category_id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  ingredients?: string[];
  allergens?: string[];
  nutrition_info?: {
    calories?: number;
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  preparation_time?: number;
  spice_level?: "mild" | "medium" | "hot" | "extra_hot";
  is_available: boolean;
  is_active: boolean;
  is_popular: boolean;
  is_chef_special: boolean;
  created_at: string;
  updated_at: string;
}
