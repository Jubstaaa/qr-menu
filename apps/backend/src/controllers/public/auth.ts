import { Request, Response } from "express";
import { supabase } from "../../../supabase/supabase";

export const publicAuthController = {
  // Public login for landing page
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email ve şifre gerekli",
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
          error: "Geçersiz email veya şifre",
        });
      }

      // Cookie'yi set et
      res.cookie("auth_token", authData.session?.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", // Cross-site için gerekli
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
        path: "/", // Root path
        // Cross-domain için domain belirtmiyoruz
      });

      res.json({
        message: "Giriş başarılı",
        data: {
          user: {
            id: authData.user.id,
            email: authData.user.email,
            created_at: authData.user.created_at,
          },
          access_token: authData.session?.access_token,
        },
      });
    } catch (error: any) {
      console.error("Login error:", error);
      res.status(500).json({
        error: "Giriş yapılamadı",
      });
    }
  },

  // Public register for landing page
  async register(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({
          error: "Email ve şifre gerekli",
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
          error: "Kayıt oluşturulamadı",
        });
      }

      // Cookie'yi set et
      res.cookie("auth_token", authData.session?.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none", // Cross-site için gerekli
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 gün
        path: "/", // Root path
        // Cross-domain için domain belirtmiyoruz
      });

      res.status(201).json({
        message: "Kayıt başarılı",
        data: {
          user: {
            id: authData.user?.id,
            email: authData.user?.email,
            created_at: authData.user?.created_at,
            hasMenu: false,
          },
          access_token: authData.session?.access_token,
        },
      });
    } catch (error: any) {
      console.error("Register error:", error);
      res.status(500).json({
        error: "Kayıt oluşturulamadı",
      });
    }
  },

  // Public logout
  async logout(req: Request, res: Response) {
    try {
      // Cookie'yi temizle
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
        path: "/", // Root path
        // Cross-domain için domain belirtmiyoruz
      });

      res.json({
        message: "Çıkış başarılı",
      });
    } catch (error: any) {
      console.error("Logout error:", error);
      res.status(500).json({
        error: "Çıkış yapılamadı",
      });
    }
  },

  // Public auth check
  async checkAuth(req: Request, res: Response) {
    try {
      const token = req.cookies.auth_token;
      if (!token) {
        return res.status(401).json({
          error: "Token bulunamadı",
        });
      }

      // Token'ı doğrula
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser(token);

      if (error || !user) {
        return res.status(401).json({
          error: "Geçersiz token",
        });
      }

      // Kullanıcı bilgilerini getir
      const { data: menuData } = await supabase
        .from("menus")
        .select(
          "id, user_id, restaurant_name, restaurant_description, created_at, subdomain, is_active"
        )
        .eq("user_id", user.id)
        .eq("is_active", true)
        .single();

      res.json({
        message: "Token geçerli",
        data: {
          id: user.id,
          email: user.email,
          restaurant_name: menuData?.restaurant_name,
          created_at: user.created_at,
          hasMenu: !!menuData,
          menuSubdomain: menuData?.subdomain,
        },
      });
    } catch (error: any) {
      console.error("Check auth error:", error);
      res.status(500).json({
        error: "Token kontrol edilemedi",
      });
    }
  },
};
