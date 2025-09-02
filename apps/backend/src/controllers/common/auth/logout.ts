import { CookieOptions, Request, Response } from "express";
import { AuthAPI, ApiResponse, ApiError } from "@qr-menu/shared-types";
import { config, isProduction } from "@qr-menu/shared-config";

const cookieConfig: Pick<CookieOptions, "secure" | "sameSite" | "domain"> = {
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  domain: isProduction ? `.${config.BASE_DOMAIN}` : undefined,
};

export const logout = async (
  req: Request<{}, {}, AuthAPI.LogoutRequest>,
  res: Response<ApiResponse<AuthAPI.LogoutResponse> | ApiError>
) => {
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
};
