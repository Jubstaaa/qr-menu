import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";
import { extractSubdomain } from "@qr-menu/shared-utils";

export const adminAuthController = {
  // Admin Login - subdomain kontrolü ile
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email ve şifre gerekli",
        });
      }

      // Subdomain'i request'ten al
      const host = req.headers.host || "";
      const subdomain = extractSubdomain(host);

      // Önce kullanıcıyı doğrula
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) {
        return res.status(401).json({
          error: "Geçersiz email veya şifre",
        });
      }

      if (!authData.user) {
        return res.status(401).json({
          error: "Kullanıcı bulunamadı",
        });
      }

      // Kullanıcının subdomain ile eşleşen menüsünü kontrol et
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, user_id, restaurant_name, subdomain, is_active")
        .eq("user_id", authData.user.id)
        .eq("subdomain", subdomain)
        .eq("is_active", true)
        .single();

      if (menuError || !menu) {
        return res.status(403).json({
          error: "Bu subdomain için yetkiniz bulunmuyor",
        });
      }

      // Cookie'yi set et
      res.cookie("auth_token", authData.session?.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 gün
        path: "/",
      });

      // Token'ı döndür
      res.json({
        message: "Admin girişi başarılı",
        data: {
          user: authData.user,
          menu: menu,
          access_token: authData.session?.access_token,
        },
      });
    } catch (error: any) {
      console.error("Admin login error:", error);
      res.status(500).json({
        error: "Admin girişi yapılırken hata oluştu",
      });
    }
  },

  // Admin Logout
  async logout(req: Request, res: Response) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({
          error: "Authorization token gerekli",
        });
      }

      const { error } = await supabase.auth.signOut();

      if (error) {
        return res.status(500).json({
          error: "Çıkış yapılırken hata oluştu",
        });
      }

      // Cookie'yi temizle
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      res.json({
        message: "Admin başarıyla çıkış yapıldı",
      });
    } catch (error: any) {
      console.error("Admin logout error:", error);
      res.status(500).json({
        error: "Admin çıkışı yapılırken hata oluştu",
      });
    }
  },

  // Check admin auth status
  async checkAuth(req: Request, res: Response) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({
          error: "Authorization token gerekli",
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

      // Get user's active menu
      const { data: menu, error: menuError } = await supabase
        .from("menus")
        .select("id, user_id, restaurant_name, subdomain, is_active")
        .eq("user_id", user.id)
        .eq("is_active", true)
        .single();

      if (menuError || !menu) {
        return res.status(403).json({
          error: "Aktif menü bulunamadı",
        });
      }

      res.json({
        message: "Admin token geçerli",
        data: {
          user,
          menu,
        },
      });
    } catch (error: any) {
      console.error("Admin check auth error:", error);
      res.status(500).json({
        error: "Admin kimlik doğrulama kontrolü hatası",
      });
    }
  },

  // Get user's menus (for subdomain selection)
  async getUserMenus(req: Request, res: Response) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({
          error: "Authorization token gerekli",
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

      // Get all user's menus
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
          user,
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
