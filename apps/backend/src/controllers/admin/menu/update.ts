import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { MenuAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { uploadImage, deleteImage } from "../../../utils/upload";

export const updateMenu = async (
  req: Request<{ id: string }, {}, MenuAPI.Admin.UpdateMenuRequest>,
  res: Response<ApiResponse<MenuAPI.Admin.UpdateMenuResponse> | ApiError>
) => {
  try {
    const { id } = req.params;
    const requestData: MenuAPI.Admin.UpdateMenuRequest = req.body;

    const { data: existingMenu, error: menuError } = await supabase
      .from("menus")
      .select("id, menu_id")
      .eq("id", id)
      .single();

    if (menuError || !existingMenu) {
      return res.status(404).json({
        message: "Menü bulunamadı",
      });
    }

    const { data: updatedMenu, error: updateError } = await supabase
      .from("menus")
      .update({
        ...requestData,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (updateError) {
      return res.status(500).json({
        message: "Menü güncellenemedi",
      });
    }

    res.json({
      data: updatedMenu,
      message: "Menü başarıyla güncellendi!",
    });
  } catch (error: any) {
    console.error("Update menu error:", error);
    res.status(500).json({
      message: "Menü güncellenemedi",
    });
  }
};
