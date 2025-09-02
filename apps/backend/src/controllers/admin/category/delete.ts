import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const deleteCategory = async (
  req: Request,
  res: Response<ApiResponse<any> | ApiErrorResponse>
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const params = req.params;
  const data = req.body;

  const { data: category, error: categoryError } = await supabase
    .from("menu_categories")
    .select("id, menu_id")
    .eq("id", params.id)
    .eq("menu_id", req.userMenu.id)
    .single();

  if (categoryError || !category) {
    throw new Error("Kategori bulunamadı");
  }

  const { error: deleteError } = await supabase
    .from("menu_categories")
    .delete()
    .eq("id", params.id);

  if (deleteError) {
    throw new Error(`Kategori silinemedi: ${deleteError.message}`);
  }

  res.json({
    message: "Kategori başarıyla silindi!",
  });
};
