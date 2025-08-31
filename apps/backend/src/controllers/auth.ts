import { CookieOptions, Request, Response } from "express";
import { supabase } from "../../supabase/supabase";
import {
  ApiResult,
  AuthResponseDto,
  LoginDto,
  RegisterDto,
} from "@qr-menu/shared-types";
import { config, isProduction } from "@qr-menu/shared-config";

const cookieConfig: Pick<CookieOptions, "secure" | "sameSite" | "domain"> = {
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? `.${config.BASE_DOMAIN}` : undefined,
};

export const authController = {
  async login(
    req: Request<{}, {}, LoginDto>,
    res: Response<ApiResult<AuthResponseDto>>
  ) {
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
        message: "Giriş başarılı",
        data: {
          user: {
            email: authData.user.email,
          },
          menu: {
            subdomain: menu?.subdomain,
          },
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Giriş yapılamadı",
      });
    }
  },

  async register(
    req: Request<{}, {}, RegisterDto>,
    res: Response<ApiResult<AuthResponseDto>>
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          message: "Email ve şifre gerekli",
        });
      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        console.error("Register error:", authError);
        return res.status(400).json({
          message: "Kayıt oluşturulamadı",
        });
      }

      if (!authData.user) {
        return res.status(400).json({
          message: "Kullanıcı oluşturulamadı",
        });
      }

      // Token'ın expires_in değerini kullanarak cookie maxAge'ini ayarla
      const maxAge = authData.session?.expires_in
        ? authData.session.expires_in * 1000 // saniyeyi milisaniyeye çevir
        : 30 * 24 * 60 * 60 * 1000; // fallback: 30 gün

      res.cookie("auth_token", authData.session?.access_token, {
        httpOnly: true,
        ...cookieConfig,
        path: "/",
        maxAge: maxAge,
      });

      res.status(201).json({
        message: "Kayıt başarılı",
        data: {
          user: {
            email: authData.user.email || "",
          },
        },
      });
    } catch (error: any) {
      console.error("Register error:", error);
      res.status(500).json({
        message: "Kayıt oluşturulamadı",
      });
    }
  },

  async logout(req: Request, res: Response<ApiResult<void>>) {
    try {
      const token = req.cookies.auth_token;
      if (token) {
        await supabase.auth.signOut();
      }

      res.clearCookie("auth_token", {
        httpOnly: true,
        ...cookieConfig,
        path: "/",
      });

      res.json({
        message: "Çıkış başarılı",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      res.status(500).json({
        message: "Çıkış yapılamadı",
      });
    }
  },

  async checkAuth(req: Request, res: Response<ApiResult<AuthResponseDto>>) {
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
        message: "Token geçerli",
        data: {
          user: {
            email: user.email,
          },
          menu: {
            subdomain: menu?.subdomain,
          },
        },
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Token kontrol edilemedi",
      });
    }
  },

  async getUserMenus(req: Request, res: Response) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({
          error: "Token bulunamadı",
        });
      }

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({
          error: "Geçersiz token",
        });
      }

      const { data: menus, error: menusError } = await supabase
        .from("menus")
        .select("id, restaurant_name, subdomain, is_active")
        .eq("user_id", user.id)
        .eq("is_active", true);

      if (menusError) {
        return res.status(500).json({
          error: "Menüler alınırken hata oluştu",
        });
      }

      res.json({
        message: "Kullanıcı menüleri başarıyla alındı",
        data: {
          user: {
            id: user.id,
            email: user.email,
            created_at: user.created_at,
          },
          menus: menus || [],
        },
      });
    } catch (error: any) {
      console.error("Get user menus error:", error);
      res.status(500).json({
        error: "Kullanıcı menüleri alınırken hata oluştu",
      });
    }
  },
};
