import { Request, Response, NextFunction } from "express";
import { supabase } from "../../supabase/supabase";
import { isProduction } from "@qr-menu/shared-config";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
      userMenu?: {
        id: string;
        user_id: string;
      };
    }
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.auth_token;
    if (!token) {
      return res.status(401).json({
        error: "Authorization token gerekli",
      });
    }

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      res.clearCookie("auth_token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
      });

      return res.status(401).json({
        error: "Geçersiz token",
      });
    }

    const { data: menu, error: menuError } = await supabase
      .from("menus")
      .select("id, user_id")
      .eq("user_id", user.id)
      .eq("is_active", true)
      .single();

    req.user = {
      id: user.id,
      email: user.email || "",
    };

    if (menu) {
      req.userMenu = {
        id: menu.id,
        user_id: menu.user_id,
      };
    }
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Kimlik doğrulama hatası",
    });
  }
};

export const checkItemOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userMenuId = req.userMenu?.id;
    if (!userMenuId) {
      return res.status(401).json({
        error: "Kimlik doğrulama gerekli",
      });
    }

    const { data: item, error } = await supabase
      .from("menu_items")
      .select(
        `
        id,
        menu_categories!inner(
          id,
          menu_id
        )
      `
      )
      .eq("id", id)
      .eq("menu_categories.menu_id", userMenuId)
      .single();

    if (error || !item) {
      return res.status(404).json({
        error: "Ürün bulunamadı veya erişim izniniz yok",
      });
    }

    next();
  } catch (error) {
    console.error("Item ownership check error:", error);
    return res.status(500).json({
      error: "Ürün kontrolü hatası",
    });
  }
};

export const checkCategoryOwnership = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userMenuId = req.userMenu?.id;

    if (!userMenuId) {
      return res.status(401).json({
        error: "Kimlik doğrulama gerekli",
      });
    }

    const { data: category, error } = await supabase
      .from("menu_categories")
      .select("id, menu_id")
      .eq("id", id)
      .eq("menu_id", userMenuId)
      .single();

    if (error || !category) {
      return res.status(404).json({
        error: "Kategori bulunamadı veya erişim izniniz yok",
      });
    }

    next();
  } catch (error) {
    console.error("Category ownership check error:", error);
    return res.status(500).json({
      error: "Kategori kontrolü hatası",
    });
  }
};
