import { supabase } from "../../supabase/supabase";
import { config } from "@qr-menu/shared-config";
import { Request } from "express";
import sharp from "sharp";

export interface UploadOptions {
  req: Request;
  folder: string;
  menuId: string;
}

export const uploadImage = async (
  options: UploadOptions
): Promise<string | null> => {
  const { req, folder, menuId } = options;
  const file = (req as any).file as Express.Multer.File | undefined;
  if (!file) return null;

  try {
    const optimizedBuffer = await sharp(file.buffer)
      .resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 80,
        effort: 6,
      })
      .toBuffer();

    const fileName = `${menuId}/${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.webp`;

    const { error: uploadError } = await supabase.storage
      .from(config.SUPABASE_STORAGE_BUCKET)
      .upload(fileName, optimizedBuffer, {
        contentType: "image/webp",
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(config.SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl || null;
  } catch (error) {
    const fileExt = (file.originalname.split(".").pop() || "jpg").toLowerCase();
    const fileName = `${menuId}/${folder}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from(config.SUPABASE_STORAGE_BUCKET)
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from(config.SUPABASE_STORAGE_BUCKET)
      .getPublicUrl(fileName);

    return data.publicUrl || null;
  }
};

export interface DeleteImageOptions {
  imageUrl: string;
  folder: string;
  menuId: string;
}

export const deleteImage = async (
  options: DeleteImageOptions
): Promise<boolean> => {
  const { imageUrl, folder, menuId } = options;

  if (!imageUrl) return true;

  try {
    const fileName = imageUrl.split("/").pop();
    if (!fileName) return false;

    const { error } = await supabase.storage
      .from(config.SUPABASE_STORAGE_BUCKET)
      .remove([`${menuId}/${folder}/${fileName}`]);

    if (error) {
      console.warn("Image deletion error:", error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn("Image deletion error:", error);
    return false;
  }
};
