import { CookieOptions, Request, Response } from "express";
import { supabase } from "../../supabase/supabase";
import { ApiResult, AuthResponseDto, LoginDto, RegisterDto } from "@qr-menu/shared-types";

const isProd = process.env.NODE_ENV === "production";

const cookieConfig: Pick<CookieOptions, "secure" | "sameSite" | "domain"> = {
  secure: isProd,
  sameSite: isProd ? "none" : "lax",
  domain: isProd ? `.${process.env.COOKIE_DOMAIN}` : undefined,
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

      // Kullanıcıyı doğrula
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

      res.cookie("auth_token", authData.session?.access_token, {
        httpOnly: true,
        ...cookieConfig,
        path: "/",
        maxAge: 30 * 24 * 60 * 60 * 1000,
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

  // Register - sadece public için
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

      // Kullanıcıyı oluştur
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

      // Cookie'yi set et
      res.cookie("auth_token", authData.session?.access_token, {
        httpOnly: true,
        ...cookieConfig,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
        path: "/",
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

  // Logout - hem public hem admin için
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

  // Check auth - hem public hem admin için
  async checkAuth(req: Request, res: Response<ApiResult<AuthResponseDto>>) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({
          message: "Token bulunamadı",
        });
      }

      // Token'ı doğrula
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({
          message: "Geçersiz token",
        });
      }

      console.log(user);

      // Kullanıcının menülerini getir
      const { data: menu } = await supabase
        .from("menus")
        .select("id, restaurant_name, subdomain, is_active")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .single();

      console.log(user.id);

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

  // Get user menus - admin için
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

      // Kullanıcının tüm menülerini getir
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
