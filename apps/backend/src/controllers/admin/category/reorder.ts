import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";
import { validationUtils } from "@qr-menu/shared-utils";

export const reorderCategories = async (
  req: Request<
    ApiType.Admin.Category.Reorder.Request.Params,
    {},
    ApiType.Admin.Category.Reorder.Request.Data
  >,
  res: Response<
    ApiResponse<ApiType.Admin.Category.Reorder.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const params = validationUtils.admin.category.reorder.request.params(
    req.params
  );
  const data = validationUtils.admin.category.reorder.request.data(req.body);

  const { data: existingCategories, error: fetchError } = await supabase
    .from("menu_categories")
    .select("id")
    .eq("menu_id", req.userMenu!.id)
    .in(
      "id",
      data.changes.map((change) => change.id)
    );

  if (fetchError) {
    throw new Error(`Kategoriler getirilemedi: ${fetchError.message}`);
  }

  if (existingCategories.length !== data.changes.length) {
    throw new Error("Bazı kategoriler size ait değil");
  }

  const updates = [];
  for (let i = 0; i < data.changes.length; i++) {
    const { error: updateError } = await supabase
      .from("menu_categories")
      .update({ sort_order: i })
      .eq("id", data.changes[i].id);

    if (updateError) {
      throw new Error(
        `Kategori sıralaması güncellenemedi: ${updateError.message}`
      );
    }
    updates.push(data.changes[i]);
  }

  res.json({
    message: "Sıralama başarıyla güncellendi",
  });
};
