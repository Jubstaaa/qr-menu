import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { MenuAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { uploadImage } from "../../../utils/upload";

export const createMenu = async (
  req: Request<{}, {}, MenuAPI.Admin.CreateMenuRequest>,
  res: Response<ApiResponse<MenuAPI.Admin.CreateMenuResponse> | ApiError>
) => {
  try {
    const { name, subdomain } = req.body;

    if (!name || !subdomain) {
      return res.status(400).json({
        message: "Restoran bilgileri ve subdomain gerekli",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Kullanıcı bilgisi bulunamadı",
      });
    }

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
        restaurant_name: name,
        subdomain: subdomain,
        is_active: true,
      })
      .select()
      .single();

    if (createError) {
      console.error("Menu creation error:", createError);
      return res.status(500).json({
        message: "Menü oluşturulamadı",
      });
    }

    res.status(201).json({
      data: menu,
      message: "Menü başarıyla oluşturuldu!",
    });
  } catch (error: any) {
    console.error("Create menu error:", error);
    res.status(500).json({
      message: "Menü oluşturulamadı",
    });
  }
};
