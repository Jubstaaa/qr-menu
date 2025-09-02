import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const checkAuth = async (
  req: Request<{}, {}, AuthAPI.CheckAuthRequest>,
  res: Response<ApiResponse<AuthAPI.CheckAuthResponse> | ApiError>
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

    const { data: menu } = await supabase
      .from("menus")
      .select("id, restaurant_name, subdomain, is_active")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    res.json({
      data: {
        user: {
          id: user.id,
          email: user.email || "",
        },
        menu: menu
          ? {
              id: menu.id,
              restaurant_name: menu.restaurant_name,
              subdomain: menu.subdomain,
            }
          : undefined,
      },
      message: "Token geçerli",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Token kontrol edilemedi",
    });
  }
};

