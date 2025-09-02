import { CookieOptions, Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { config, isProduction } from "@qr-menu/shared-config";

const cookieConfig: Pick<CookieOptions, "secure" | "sameSite" | "domain"> = {
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? `.${config.BASE_DOMAIN}` : undefined,
};

export const login = async (
  req: Request<{}, {}, AuthAPI.LoginRequest>,
  res: Response<ApiResponse<AuthAPI.LoginResponse> | ApiError>
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email ve şifre gerekli",
      });
    }

    const { data: authData, error: authError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      console.error("Login error:", authError);
      return res.status(401).json({
        message: "Geçersiz email veya şifre",
      });
    }

    if (!authData.user) {
      return res.status(401).json({
        message: "Kullanıcı bulunamadı",
      });
    }

    const maxAge = authData.session?.expires_in
      ? authData.session.expires_in * 1000
      : 30 * 24 * 60 * 60 * 1000;

    res.cookie("auth_token", authData.session?.access_token, {
      httpOnly: true,
      ...cookieConfig,
      path: "/",
      maxAge: maxAge,
    });

    const { data: menu } = await supabase
      .from("menus")
      .select("id, restaurant_name, subdomain, is_active")
      .eq("user_id", authData.user.id)
      .eq("is_active", true)
      .single();

    res.json({
      data: {
        user: {
          id: authData.user.id,
          email: authData.user.email || "",
        },
        menu: menu
          ? {
              id: menu.id,
              restaurant_name: menu.restaurant_name,
              subdomain: menu.subdomain,
            }
          : undefined,
      },
      message: "Giriş başarılı",
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Giriş yapılamadı",
    });
  }
};
