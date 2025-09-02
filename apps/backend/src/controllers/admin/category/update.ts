import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../../utils/upload";
import { validationUtils } from "@qr-menu/shared-utils";

export const updateCategory = async (
  req: Request<
    ApiType.Admin.Category.Update.Request.Params,
    {},
    ApiType.Admin.Category.Update.Request.Data
  >,
  res: Response<
    ApiResponse<ApiType.Admin.Category.Update.Response> | ApiErrorResponse
  >
) => {
  if (!req.userMenu?.id) {
    return res.status(401).json({
      message: "Aktif menü bulunamadı. Lütfen önce bir menü oluşturun.",
    });
  }

  const params = validationUtils.admin.category.update.request.params(
    req.params
  );
  const data = validationUtils.admin.category.update.request.data(req.body);

  const { data: existingCategory, error: categoryError } = await supabase
    .from("menu_categories")
    .select("id, menu_id, image_url")
    .eq("id", params.id)
    .single();

  if (categoryError || !existingCategory) {
    throw new Error("Kategori bulunamadı");
  }

  let finalImageUrl: string | null = data.image_url as any;

  const hasNewFile = (req as any).file;

  if (hasNewFile) {
    try {
      const uploadedUrl = await uploadImage({
        req,
        folder: "categories",
        menuId: req.userMenu.id,
      });

      if (uploadedUrl) {
        finalImageUrl = uploadedUrl;

        if (existingCategory.image_url) {
          await deleteImage({
            imageUrl: existingCategory.image_url,
            folder: "categories",
            menuId: req.userMenu.id,
          });
        }
      }
    } catch (uploadError: any) {
      console.error("Category image upload error:", uploadError);
    }
  } else if (data.image_url === null) {
    finalImageUrl = null;

    if (existingCategory.image_url) {
      await deleteImage({
        imageUrl: existingCategory.image_url,
        folder: "categories",
        menuId: req.userMenu!.id,
      });
    }
  }

  const { data: updatedCategory, error: updateError } = await supabase
    .from("menu_categories")
    .update({
      ...data,
      image_url: finalImageUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", params.id)
    .select()
    .single();

  if (updateError) {
    throw new Error(`Kategori güncellenemedi: ${updateError.message}`);
  }

  res.json({
    data: updatedCategory,
    message: "Kategori başarıyla güncellendi!",
  });
};
