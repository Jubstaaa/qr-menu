import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { ApiType, ApiResponse, ApiErrorResponse } from "@qr-menu/shared-types";

export const createMenu = async (
  req: Request<{}, {}, ApiType.Admin.Menu.Create.Request.Data>,
  res: Response<
    ApiResponse<ApiType.Admin.Menu.Create.Response> | ApiErrorResponse
  >
) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Kullanıcı bilgisi bulunamadı",
    });
  }

  const { restaurant_name, subdomain } = req.body;

  const { data: existingMenu, error: checkError } = await supabase
    .from("menus")
    .select("id")
    .eq("subdomain", subdomain)
    .single();

  if (existingMenu) {
    return res.status(400).json({
      message: "Bu subdomain zaten kullanılıyor",
    });
  }

  const { data: menu, error: createError } = await supabase
    .from("menus")
    .insert({
      user_id: req.user.id,
      restaurant_name,
      subdomain,
      is_active: true,
    })
    .select()
    .single();

  if (createError) {
    throw new Error(`Menü oluşturulamadı: ${createError.message}`);
  }

  res.status(201).json({
    data: menu,
    message: "Menü başarıyla oluşturuldu!",
  });
};
