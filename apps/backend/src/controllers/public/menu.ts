import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { MenuAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const publicMenuController = {
  async getMenuBySubdomain(
    req: Request,
    res: Response<
      ApiResponse<MenuAPI.Public.GetMenuBySubdomainResponse> | ApiError
    >
  ) {
    try {
      const subdomain = req.headers["x-subdomain"] as string;

      if (!subdomain) {
        return res.status(400).json({
          message: "X-Subdomain header'ı gerekli",
        });
      }

      const { data: menu, error } = await supabase
        .from("menus")
        .select(
          `
          id,
          subdomain,
          restaurant_name,
          restaurant_description,
          restaurant_address,
          restaurant_phone,
          restaurant_email,
          is_active,
          created_at,
          updated_at,
          menu_categories (
            id,
            name,
            description,
            image_url,
            slug,
            is_active,
            sort_order,
            menu_items (
              id,
              name,
              description,
              price,
              image_url,
              is_popular,
              is_chef_special,
              spice_level,
              preparation_time,
              allergens,
              nutrition_info,
              is_available,
              sort_order
            )
          )
        `
        )
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      if (error || !menu) {
        return res.status(404).json({
          message: "Menü bulunamadı",
        });
      }

      res.json({
        data: menu,
        message: "Menü başarıyla getirildi",
      });
    } catch (error: any) {
      console.error("Get menu by subdomain error:", error);
      res.status(500).json({
        message: "Menü getirilemedi",
      });
    }
  },
};
