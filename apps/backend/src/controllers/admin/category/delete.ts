import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiResponse, ApiErrorResponse, ApiType } from "@qr-menu/shared-types";

export const deleteCategory = async (
  req: Request<ApiType.Admin.Category.Delete.Request.Params>,
  res: Response<
    ApiResponse<ApiType.Admin.Category.Delete.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const { id } = req.params;

  const { data: category, error: categoryError } = await supabase
    .from("menu_categories")
    .select("id, menu_id")
    .eq("id", id)
    .eq("menu_id", req.userMenu.id)
    .single();

  if (categoryError || !category) {
    throw new Error("Kategori bulunamadı");
  }

  const { error: deleteError } = await supabase
    .from("menu_categories")
    .delete()
    .eq("id", id);

  if (deleteError) {
    throw new Error(`Kategori silinemedi: ${deleteError.message}`);
  }

  res.json({
    data: { id },
    message: "Kategori başarıyla silindi!",
  });
};
