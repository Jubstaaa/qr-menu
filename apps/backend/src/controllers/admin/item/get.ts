import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const getItems = async (
  req: Request<{}, {}, ApiType.Admin.Item.GetAll.Request>,
  res: Response<
    ApiResponse<ApiType.Admin.Item.GetAll.Response> | ApiErrorResponse
  >
) => {
  const { data: items, error } = await supabase
    .from("menu_items")
    .select(
      `
      id,
      name,
      description,
      price,
      image_url,
      category_id,
      is_active,
      created_at,
      updated_at,
      menu_categories!inner(menu_id)
    `
    )
    .eq("menu_categories.menu_id", req.userMenu!.id)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Ürünler getirilemedi: ${error.message}`);
  }

  res.json({
    data: items,
    message: "Ürünler başarıyla getirildi",
  });
};
