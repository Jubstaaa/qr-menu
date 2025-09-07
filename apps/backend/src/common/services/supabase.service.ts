import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@qr-menu/shared-types";
import { config } from "@qr-menu/shared-config";

@Injectable()
export class SupabaseService {
  private supabaseAdmin: SupabaseClient<Database>;
  private supabaseUrl: string;

  constructor() {
    const supabaseUrl = config.SUPABASE_URL;
    const supabaseServiceKey = config.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase environment variables");
    }

    this.supabaseUrl = supabaseUrl;

    this.supabaseAdmin = createClient<Database>(
      supabaseUrl,
      supabaseServiceKey
    );
  }

  // Admin client - RLS bypass eder
  getAdminClient(): SupabaseClient<Database> {
    return this.supabaseAdmin;
  }

  // User client - RLS politikaları aktif
  getUserClient(userToken: string): SupabaseClient<Database> {
    return createClient<Database>(this.supabaseUrl, config.SUPABASE_ANON_KEY, {
      global: {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    });
  }

  // Backward compatibility için eski method
  getClient(): SupabaseClient<Database> {
    return this.supabaseAdmin;
  }

  async getUser(token: string) {
    const {
      data: { user },
      error,
    } = await this.supabaseAdmin.auth.getUser(token);
    return { user, error };
  }

  async getMenuByUserId(userId: string) {
    const { data: menu, error } = await this.supabaseAdmin
      .from("menus")
      .select("id, user_id, subdomain, restaurant_name")
      .eq("user_id", userId)
      .eq("is_active", true)
      .single();

    return { menu, error };
  }

  async checkItemOwnership(itemId: string, menuId: string) {
    const { data: item, error } = await this.supabaseAdmin
      .from("menu_items")
      .select(
        `
        id,
        menu_categories!inner(
          id,
          menu_id
        )
      `
      )
      .eq("id", itemId)
      .eq("menu_categories.menu_id", menuId)
      .single();

    return { item, error };
  }
}
