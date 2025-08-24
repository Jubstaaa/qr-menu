import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { extractSubdomain } from "@qr-menu/shared-utils";

export const publicCategoryController = {
  // Get active categories by subdomain

  // Get category with items by subdomain and slug
  async getCategoryBySubdomainAndSlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;

      // Subdomain'i request'ten al
      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);
      // Önce subdomain'e ait menüyü bul
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, restaurant_name, is_active")
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      console.log(menu);

      if (menuError || !menu) {
        return res.status(404).json({
          error: "Menü bulunamadı",
        });
      }

      // Kategoriyi slug ile bul
      const { data: category, error } = await supabase
        .from("menu_categories")
        .select(
          `
          id,
          name,
          description,
          slug,
          sort_order,
          menu_items(
            id,
            name,
            description,
            price,
            image_url,
            is_available,
            sort_order
          )
        `
        )
        .eq("menu_id", menu.id)
        .eq("slug", slug)
        .eq("is_active", true)
        .single();

      if (error || !category) {
        return res.status(404).json({
          error: "Kategori bulunamadı",
        });
      }

      // Sadece mevcut ürünleri filtrele
      const availableItems = category.menu_items?.filter(
        (item) => item.is_available
      );

      res.json({
        message: "Kategori başarıyla getirildi",
        data: {
          ...category,
          menu_items: availableItems || [],
        },
      });
    } catch (error: any) {
      console.error("Get category by slug error:", error);
      res.status(500).json({
        error: "Kategori getirilemedi",
      });
    }
  },
};
