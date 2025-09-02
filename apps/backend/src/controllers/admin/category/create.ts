import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiResponse, ApiErrorResponse, ApiType } from "@qr-menu/shared-types";
import { uploadImage } from "../../../utils/upload";

export const createCategory = async (
  req: Request<{}, {}, ApiType.Admin.Category.Create.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Category.Create.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

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
      ...req.body,
      menu_id: req.userMenu.id,
      sort_order: 0,
      image_url: uploadedUrl ?? req.body.image_url ?? null,
    })
    .select()
    .single();

  if (createError) {
    throw new Error(`Kategori oluşturulamadı: ${createError.message}`);
  }

  res.status(201).json({
    data: category,
    message: "Kategori başarıyla oluşturuldu!",
  });
};
