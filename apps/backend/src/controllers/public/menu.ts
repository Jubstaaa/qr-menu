import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";

export const publicMenuController = {
  async getMenuBySubdomain(req: Request, res: Response) {
    try {
      const subdomain = req.headers["x-subdomain"] as string;

      if (!subdomain) {
        return res.status(400).json({
          error: "X-Subdomain header'ı gerekli",
        });
      }

      const { data: menu, error } = await supabase
        .from("menus")
        .select(
          `
          restaurant_name,
          restaurant_description,
          restaurant_phone,
          restaurant_address,
          opening_time,
          closing_time,
          logo_url,
          wifi_ssid,
          wifi_password,
          menu_categories (
            id,
            name,
            slug,
            description,
            sort_order,
            is_active,
            image_url,
            menu_items (
              id
            )
          )
        `
        )
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .order("sort_order", {
          ascending: true,
          foreignTable: "menu_categories",
        })
        .order("sort_order", {
          ascending: true,
          foreignTable: "menu_categories.menu_items",
        })
        .single();

      if (error || !menu) {
        return res.status(404).json({
          error: "Menü bulunamadı",
        });
      }

      res.json({
        message: "Menü başarıyla getirildi",
        data: menu,
      });
    } catch (error: any) {
      console.error("Get menu by subdomain error:", error);
      res.status(500).json({
        error: "Menü getirilemedi",
      });
    }
  },
};
