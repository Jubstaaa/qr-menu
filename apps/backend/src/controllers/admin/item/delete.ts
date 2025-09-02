import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const deleteItem = async (
  req: Request<ApiType.Admin.Item.Delete.Request.Params>,
  res: Response<
    ApiResponse<ApiType.Admin.Item.Delete.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const { id } = req.params;

  const { data: item, error: itemError } = await supabase
    .from("menu_items")
    .select("id, menu_categories!inner(menu_id)")
    .eq("id", id)
    .single();

  if (itemError || !item) {
    throw new Error("Ürün bulunamadı");
  }

  const { error: deleteError } = await supabase
    .from("menu_items")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error(`Ürün silinemedi: ${deleteError.message}`);
  }

  res.json({
    data: { id },
    message: "Ürün başarıyla silindi!",
  });
};
