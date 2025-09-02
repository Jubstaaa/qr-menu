import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const getCurrentUserMenu = async (
  req: Request<{}, {}, ApiType.Admin.Menu.GetByUser.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Menu.GetByUser.Response> | ApiErrorResponse
  >
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Kullanıcı bilgisi bulunamadı",
    });
  }

  const { data: menu, error } = await supabase
    .from("menus")
    .select(
      `
      id,
      subdomain,
      restaurant_name,
      restaurant_description,
      restaurant_address,
      restaurant_phone,
      restaurant_email,
      is_active,
      created_at,
      updated_at,
      logo_url,
      opening_time,
      closing_time,
      wifi_ssid,
      wifi_password,
      theme_color,
      custom_css
    `
    )
    .eq("user_id", req.user.id)
    .eq("is_active", true)
    .single();

  if (error) {
    throw new Error(`Menü bilgileri getirilemedi: ${error.message}`);
  }

  if (!menu) {
    return res.status(404).json({
      message: "Menü bulunamadı",
    });
  }

  res.json({
    data: menu,
    message: "Menü bilgileri başarıyla getirildi",
  });
};
