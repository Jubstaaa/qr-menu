import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";
import { uploadImage } from "../../../utils/upload";
import { validationUtils } from "@qr-menu/shared-utils";

export const createCategory = async (
  req: Request<
    ApiType.Admin.Category.Create.Request.Params,
    {},
    ApiType.Admin.Category.Create.Request.Data
  >,
  res: Response<
    ApiResponse<ApiType.Admin.Category.Create.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const params = validationUtils.admin.category.create.request.params(req.params);
  const data = validationUtils.admin.category.create.request.data(req.body);

  let uploadedUrl: string | null = null;
  try {
    uploadedUrl = await uploadImage({
      req,
      folder: "categories",
      menuId: req.userMenu.id,
    });
  } catch (e) {
    throw new Error("Kategori resmi yüklenemedi");
  }

  const { data: category, error: createError } = await supabase
    .from("menu_categories")
    .insert({
      ...data,
      menu_id: req.userMenu.id,
      sort_order: 0,
      image_url: uploadedUrl ?? data.image_url ?? null,
    })
    .select()
    .single();

  if (createError) {
    throw new Error(`Kategori oluşturulamadı: ${createError.message}`);
  }

  res.status(201).json({
    data: validationUtils.admin.category.create.response(category),
    message: "Kategori başarıyla oluşturuldu!",
  });
};
