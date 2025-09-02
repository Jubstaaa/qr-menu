import { Request, Response } from "express";
import { supabase } from "../../../../supabase/supabase";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";

export const register = async (
  req: Request<{}, {}, AuthAPI.RegisterRequest>,
  res: Response<ApiResponse<AuthAPI.RegisterResponse> | ApiError>
) => {
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
};
