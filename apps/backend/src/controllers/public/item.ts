import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { ItemAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { extractSubdomain } from "@qr-menu/shared-utils";

export const publicItemController = {
  async getActiveItemsBySubdomain(
    req: Request,
    res: Response<
      ApiResponse<ItemAPI.Public.GetActiveItemsBySubdomainResponse> | ApiError
    >
  ) {
    try {
      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);

      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, restaurant_name, is_active")
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      if (menuError || !menu) {
        return res.status(404).json({
          message: "Menü bulunamadı",
        });
      }

      const { data: items, error } = await supabase
        .from("menu_items")
        .select(
          `
          id,
          name,
          description,
          price,
          image_url,
          ingredients,
          allergens,
          nutrition_info,
          preparation_time,
          spice_level,
          is_popular,
          is_chef_special,
          sort_order,
          is_available,
          menu_categories!inner(
            id,
            name,
            slug,
            is_active
          )
        `
        )
        .eq("menu_categories.menu_id", menu.id)
        .eq("menu_categories.is_active", true)
        .eq("is_available", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Get active items error:", error);
        return res.status(500).json({
          message: "Ürünler getirilemedi",
        });
      }

      res.json({
        data: items || [],
        message: "Ürünler başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get active items error:", error);
      res.status(500).json({
        message: "Ürünler getirilemedi",
      });
    }
  },

  async getItemBySubdomainAndId(
    req: Request<{ itemId: string }>,
    res: Response<
      ApiResponse<ItemAPI.Public.GetItemBySubdomainAndIdResponse> | ApiError
    >
  ) {
    try {
      const { itemId } = req.params;

      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);

      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, restaurant_name, is_active")
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      if (menuError || !menu) {
        return res.status(404).json({
          message: "Menü bulunamadı",
        });
      }

      const { data: item, error } = await supabase
        .from("menu_items")
        .select(
          `
          id,
          name,
          description,
          price,
          image_url,
          ingredients,
          allergens,
          nutrition_info,
          preparation_time,
          spice_level,
          is_popular,
          is_chef_special,
          sort_order,
          is_available,
          menu_categories!inner(
            id,
            name,
            slug,
            is_active
          )
        `
        )
        .eq("id", itemId)
        .eq("menu_categories.menu_id", menu.id)
        .eq("menu_categories.is_active", true)
        .eq("is_available", true)
        .single();

      if (error || !item) {
        return res.status(404).json({
          message: "Ürün bulunamadı",
        });
      }

      res.json({
        data: item,
        message: "Ürün başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get item by subdomain and id error:", error);
      res.status(500).json({
        message: "Ürün getirilemedi",
      });
    }
  },
};
