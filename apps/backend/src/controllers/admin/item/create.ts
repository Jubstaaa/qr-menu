import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse, Json } from "@qr-menu/shared-types";
import { uploadImage } from "../../../utils/upload";
import { validationUtils } from "@qr-menu/shared-utils";

export const createItem = async (
  req: Request<{}, {}, ApiType.Admin.Item.Create.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Item.Create.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const requestData = req.body;

  let uploadedUrl: string | null = null;
  try {
    uploadedUrl = await uploadImage({
      req,
      folder: "items",
      menuId: req.userMenu.id,
    });
  } catch (e) {
    console.error("Item image upload error:", e);
  }

  const { data: item, error: createError } = await supabase
    .from("menu_items")
    .insert({
      ...requestData,
      category_id: requestData.category_id,
      image_url: uploadedUrl ?? requestData.image_url ?? null,
    })
    .select()
    .single();

  if (createError) {
    throw new Error(`Ürün oluşturulamadı: ${createError.message}`);
  }

  res.status(201).json({
    data: validationUtils.admin.item.create.response(item),
    message: "Ürün başarıyla oluşturuldu!",
  });
};
