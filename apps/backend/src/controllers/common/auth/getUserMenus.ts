import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const getUserMenus = async (
  req: Request<{}, {}, AuthAPI.GetUserMenusRequest>,
  res: Response<ApiResponse<AuthAPI.GetUserMenusResponse> | ApiError>
) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({
        message: "Token bulunamadı",
      });
    }

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        message: "Geçersiz token",
      });
    }

    const { data: menus, error: menusError } = await supabase
      .from("menus")
      .select("id, restaurant_name, subdomain, is_active")
      .eq("user_id", user.id)
      .eq("is_active", true);

    if (menusError) {
      return res.status(500).json({
        message: "Menüler alınırken hata oluştu",
      });
    }

    res.json({
      data: {
        user: {
          id: user.id,
          email: user.email || "",
        },
        menus: menus || [],
      },
      message: "Kullanıcı menüleri başarıyla alındı",
    });
  } catch (error: any) {
    console.error("Get user menus error:", error);
    res.status(500).json({
      message: "Kullanıcı menüleri alınırken hata oluştu",
    });
  }
};
