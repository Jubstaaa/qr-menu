import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const updateMenu = async (
  req: Request<
    ApiType.Admin.Menu.Update.Request.Params,
    {},
    ApiType.Admin.Menu.Update.Request.Data
  >,
  res: Response<
    ApiResponse<ApiType.Admin.Menu.Update.Response> | ApiErrorResponse
  >
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Kullanıcı bilgisi bulunamadı",
    });
  }

  const { id } = req.params;
  const requestData = req.body;

  const { data: existingMenu, error: menuError } = await supabase
    .from("menus")
    .select("id, user_id")
    .eq("id", id)
    .single();

  if (menuError || !existingMenu) {
    throw new Error("Menü bulunamadı");
  }

  if (existingMenu.user_id !== req.user.id) {
    return res.status(403).json({
      message: "Bu menüyü güncelleme yetkiniz yok",
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
    throw new Error(`Menü güncellenemedi: ${updateError.message}`);
  }

  res.json({
    data: updatedMenu,
    message: "Menü başarıyla güncellendi!",
  });
};
