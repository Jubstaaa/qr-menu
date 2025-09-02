import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { MenuAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const getCurrentUserMenu = async (
  req: Request,
  res: Response<ApiResponse<MenuAPI.Admin.GetMenusByUserResponse> | ApiError>
) => {
  try {
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
        updated_at
      `
      )
      .eq("user_id", req.user.id)
      .eq("is_active", true)
      .single();

    if (error) {
      console.error("Get current user menu error:", error);
      return res.status(500).json({
        message: "Menü bilgileri getirilemedi",
      });
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
  } catch (error: any) {
    console.error("Get current user menu error:", error);
    res.status(500).json({
      message: "Menü bilgileri getirilemedi",
    });
  }
};
