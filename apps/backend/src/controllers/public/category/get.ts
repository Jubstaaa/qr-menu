import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { CategoryAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const getCategoryBySubdomainAndSlug = async (
  req: Request<{ slug: string }>,
  res: Response<
    ApiResponse<CategoryAPI.Public.GetCategoryBySlugResponse> | ApiError
  >
) => {
  try {
    const { slug } = req.params;
    const subdomain = req.headers["x-subdomain"] as string;

    if (!subdomain) {
      return res.status(400).json({
        message: "X-Subdomain header'ı gerekli",
      });
    }

    if (!slug) {
      return res.status(400).json({
        message: "Slug parametresi gerekli",
      });
    }

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

    const { data: category, error } = await supabase
      .from("menu_categories")
      .select(
        `
        id,
        name,
        description,
        slug,
        image_url,
        menu_items (
          id,
          name,
          description,
          price,
          image_url,
          is_popular,
          is_chef_special,
          spice_level
        )
      `
      )
      .eq("menu_id", menu.id)
      .eq("slug", slug)
      .eq("is_active", true)
      .eq("menu_items.is_available", true)
      .order("sort_order", { ascending: true })
      .order("sort_order", { foreignTable: "menu_items", ascending: true })
      .single();

    if (error || !category) {
      return res.status(404).json({
        message: "Kategori bulunamadı",
      });
    }

    res.json({
      data: category,
      message: "Kategori başarıyla getirildi",
    });
  } catch (error: any) {
    console.error("Get category by slug error:", error);
    res.status(500).json({
      message: "Kategori getirilemedi",
    });
  }
};
