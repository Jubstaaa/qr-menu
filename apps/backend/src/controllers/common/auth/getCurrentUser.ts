import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const getCurrentUser = async (
  req: Request<{}, {}, AuthAPI.GetCurrentUserRequest>,
  res: Response<ApiResponse<AuthAPI.GetCurrentUserResponse> | ApiError>
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    const { data: menu } = await supabase
      .from("menus")
      .select("id, restaurant_name, subdomain, is_active")
      .eq("user_id", req.user.id)
      .eq("is_active", true)
      .single();

    res.json({
      data: {
        user: {
          id: req.user.id,
          email: req.user.email || "",
        },
        menu: menu
          ? {
              id: menu.id,
              restaurant_name: menu.restaurant_name,
              subdomain: menu.subdomain,
            }
          : undefined,
      },
      message: "Kullanıcı bilgileri getirildi",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Kullanıcı bilgileri getirilemedi",
    });
  }
};

