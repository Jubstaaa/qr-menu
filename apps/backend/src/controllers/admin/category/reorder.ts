import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiResponse, ApiErrorResponse, ApiType } from "@qr-menu/shared-types";

export const reorderCategories = async (
  req: Request<{}, {}, ApiType.Admin.Category.Reorder.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Category.Reorder.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const { changes } = req.body;

  const { data: existingCategories, error: fetchError } = await supabase
    .from("menu_categories")
    .select("id")
    .eq("menu_id", req.userMenu!.id)
    .in(
      "id",
      changes.map((change: any) => change.id)
    );

  if (fetchError) {
    throw new Error(`Kategoriler getirilemedi: ${fetchError.message}`);
  }

  if (existingCategories.length !== changes.length) {
    throw new Error("Bazı kategoriler size ait değil");
  }

  const updates = [];
  for (let i = 0; i < changes.length; i++) {
    const { error: updateError } = await supabase
      .from("menu_categories")
      .update({ sort_order: i })
      .eq("id", changes[i].id);

    if (updateError) {
      throw new Error(
        `Kategori sıralaması güncellenemedi: ${updateError.message}`
      );
    }
    updates.push(changes[i]);
  }

  res.json({
    data: updates,
    message: "Sıralama başarıyla güncellendi",
  });
};
