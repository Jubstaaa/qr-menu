import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { extractSubdomain } from "@qr-menu/shared-utils";

export const publicItemController = {
  // Get active items by subdomain
  async getActiveItemsBySubdomain(req: Request, res: Response) {
    try {
      // Subdomain'i request'ten al
      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);

      // Önce subdomain'e ait menüyü bul
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, restaurant_name, status")
        .eq("subdomain", subdomain)
        .eq("status", "active")
        .single();

      if (menuError || !menu) {
        return res.status(404).json({
          error: "Menü bulunamadı",
        });
      }

      // Aktif ürünleri getir (aktif kategorilerden)
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
          error: "Ürünler getirilemedi",
        });
      }

      res.json({
        message: "Ürünler başarıyla getirildi",
        data: items || [],
      });
    } catch (error: any) {
      console.error("Get active items error:", error);
      res.status(500).json({
        error: "Ürünler getirilemedi",
      });
    }
  },

  // Get item by subdomain and item ID
  async getItemBySubdomainAndId(req: Request, res: Response) {
    try {
      const { itemId } = req.params;

      // Subdomain'i request'ten al
      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);

      // Önce subdomain'e ait menüyü bul
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, restaurant_name, status")
        .eq("subdomain", subdomain)
        .eq("status", "active")
        .single();

      if (menuError || !menu) {
        return res.status(404).json({
          error: "Menü bulunamadı",
        });
      }

      // Ürünü ID ile bul
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
          error: "Ürün bulunamadı",
        });
      }

      res.json({
        message: "Ürün başarıyla getirildi",
        data: item,
      });
    } catch (error: any) {
      console.error("Get item by ID error:", error);
      res.status(500).json({
        error: "Ürün getirilemedi",
      });
    }
  },

  // Get popular items by subdomain
  async getPopularItemsBySubdomain(req: Request, res: Response) {
    try {
      // Subdomain'i request'ten al
      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);

      // Önce subdomain'e ait menüyü bul
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, restaurant_name, status")
        .eq("subdomain", subdomain)
        .eq("status", "active")
        .single();

      if (menuError || !menu) {
        return res.status(404).json({
          error: "Menü bulunamadı",
        });
      }

      // Popüler ürünleri getir
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
        .eq("is_popular", true)
        .order("sort_order", { ascending: true });

      if (error) {
        console.error("Get popular items error:", error);
        return res.status(500).json({
          error: "Popüler ürünler getirilemedi",
        });
      }

      res.json({
        message: "Popüler ürünler başarıyla getirildi",
        data: items || [],
      });
    } catch (error: any) {
      console.error("Get popular items error:", error);
      res.status(500).json({
        error: "Popüler ürünler getirilemedi",
      });
    }
  },
};
