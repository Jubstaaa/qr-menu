import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";
import { uploadImage } from "../../../utils/upload";
import { validationUtils } from "@qr-menu/shared-utils";

export const createItem = async (
  req: Request<{}, {}, ApiType.Admin.Item.Create.Request>,
  res: Response<
    ApiResponse<ApiType.Admin.Item.Create.Response> | ApiErrorResponse
  >
) => {
  // userMenu kontrolü
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
      error: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const requestData = req.body;
  const validatedData = validationUtils.admin.item.create(requestData);

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
      ...validatedData,
      category_id: validatedData.category_id,
      image_url: uploadedUrl ?? validatedData.image_url ?? null,
    })
    .select()
    .single();

  if (createError) {
    throw new Error(`Ürün oluşturulamadı: ${createError.message}`);
  }

  res.status(201).json({
    data: item,
    message: "Ürün başarıyla oluşturuldu!",
  });
};
