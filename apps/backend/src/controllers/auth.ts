import { CookieOptions, Request, Response } from "express";
import { supabase } from "../../supabase/supabase";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { config, isProduction } from "@qr-menu/shared-config";

const cookieConfig: Pick<CookieOptions, "secure" | "sameSite" | "domain"> = {
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? `.${config.BASE_DOMAIN}` : undefined,
};

export const authController = {
  async login(
    req: Request<{}, {}, AuthAPI.LoginRequest>,
    res: Response<ApiResponse<AuthAPI.LoginResponse> | ApiError>
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
  },

  async register(
    req: Request<{}, {}, AuthAPI.RegisterRequest>,
    res: Response<ApiResponse<AuthAPI.RegisterResponse> | ApiError>
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

      res.status(201).json({
        data: {
          user: {
            id: authData.user.id,
            email: authData.user.email || "",
          },
        },
        message: "Kayıt başarılı",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Kayıt oluşturulamadı",
      });
    }
  },

  async logout(
    req: Request<{}, {}, AuthAPI.LogoutRequest>,
    res: Response<ApiResponse<AuthAPI.LogoutResponse> | ApiError>
  ) {
    try {
      res.clearCookie("auth_token", {
        httpOnly: true,
        ...cookieConfig,
        path: "/",
      });

      res.json({
        data: {
          message: "Çıkış başarılı",
        },
        message: "Çıkış yapıldı",
      });
    } catch (error: any) {
      res.status(500).json({
        message: "Çıkış yapılamadı",
      });
    }
  },

  async getCurrentUser(
    req: Request<{}, {}, AuthAPI.GetCurrentUserRequest>,
    res: Response<ApiResponse<AuthAPI.GetCurrentUserResponse> | ApiError>
  ) {
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
  },

  async checkAuth(
    req: Request<{}, {}, AuthAPI.CheckAuthRequest>,
    res: Response<ApiResponse<AuthAPI.CheckAuthResponse> | ApiError>
  ) {
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
  },

  async getUserMenus(
    req: Request<{}, {}, AuthAPI.GetUserMenusRequest>,
    res: Response<ApiResponse<AuthAPI.GetUserMenusResponse> | ApiError>
  ) {
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
  },
};
