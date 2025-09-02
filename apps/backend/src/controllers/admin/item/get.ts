import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const getItems = async (
  req: Request<{}, {}, ApiType.Admin.Item.GetAll.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Item.GetAll.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const { data: items, error } = await supabase
    .from("menu_items")
    .select(
      `
      id,
      name,
      description,
      image_url,
      category_id,
      is_available,
      sort_order
    `
    )
    .eq("menu_categories.menu_id", req.userMenu.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Ürünler getirilemedi: ${error.message}`);
  }

  res.json({
    data: items,
    message: "Ürünler başarıyla getirildi",
  });
};
