import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../../utils/upload";
import { validationUtils } from "@qr-menu/shared-utils";

export const updateItem = async (
  req: Request<{ id: string }, {}, ApiType.Admin.Item.Update.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Item.Update.Response> | ApiErrorResponse
  >
) => {
  // userMenu kontrolü
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
      error: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const { id } = req.params;
  const requestData = req.body;

  let updateData;
  try {
    updateData = validationUtils.admin.item.update(requestData);
  } catch (validationError: any) {
    throw new Error(`Geçersiz veri formatı: ${validationError.message}`);
  }

  const { data: existingItem, error: itemError } = await supabase
    .from("menu_items")
    .select("id, image_url")
    .eq("id", id)
    .single();

  if (itemError || !existingItem) {
    throw new Error("Ürün bulunamadı");
  }

  let finalImageUrl: string | null = updateData.image_url as any;

  const hasNewFile = (req as any).file;

  if (hasNewFile) {
    try {
      const uploadedUrl = await uploadImage({
        req,
        folder: "items",
        menuId: req.userMenu.id,
      });

      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;

        if (existingItem.image_url) {
          await deleteImage({
            imageUrl: existingItem.image_url,
            folder: "items",
            menuId: req.userMenu.id,
          });
        }
      }
    } catch (uploadError: any) {
      console.error("Item image upload error:", uploadError);
    }
  } else if (updateData.image_url === null) {
    finalImageUrl = null;

    if (existingItem.image_url) {
      await deleteImage({
        imageUrl: existingItem.image_url,
        folder: "items",
        menuId: req.userMenu.id,
      });
    }
  }

  const { data: updatedItem, error: updateError } = await supabase
    .from("menu_items")
    .update({
      ...updateData,
      image_url: finalImageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    throw new Error(`Ürün güncellenemedi: ${updateError.message}`);
  }

  res.json({
    data: updatedItem,
    message: "Ürün başarıyla güncellendi!",
  });
};
