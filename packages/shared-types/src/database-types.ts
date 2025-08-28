import type { Database } from "./database";

export type Menu = Database["public"]["Tables"]["menus"]["Row"];
export type Category = Database["public"]["Tables"]["menu_categories"]["Row"];
export type Item = Database["public"]["Tables"]["menu_items"]["Row"];
export type Subscription = Database["public"]["Tables"]["subscriptions"]["Row"];
export type CustomDomain =
  Database["public"]["Tables"]["custom_domains"]["Row"];
