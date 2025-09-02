import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";
import { validationUtils } from "@qr-menu/shared-utils";

export const getCategories = async (
  req: Request<
    ApiType.Admin.Category.GetAll.Request.Params,
    {},
    ApiType.Admin.Category.GetAll.Request.Data
  >,
  res: Response<
    ApiResponse<ApiType.Admin.Category.GetAll.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const params = validationUtils.admin.category.getAll.request.params(
    req.params
  );
  const data = validationUtils.admin.category.getAll.request.data(req.body);

  const { data: categories, error } = await supabase
    .from("menu_categories")
    .select(
      `
      id,
      name,
      description,
      image_url,
      menu_id,
      created_at,
      updated_at,
      menu_items(*)
    `
    )
    .eq("menu_id", req.userMenu!.id)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(`Kategoriler getirilemedi: ${error.message}`);
  }

  res.json({
    data: validationUtils.admin.category.getAll.response(categories),
    message: "Kategoriler başarıyla getirildi",
  });
};
