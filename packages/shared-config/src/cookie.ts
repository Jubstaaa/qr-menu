import { CookieOptions } from "express";
import { isProduction, config } from "./environment";

export const getCookieConfig = (maxAge?: number): CookieOptions => {
  return {
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    domain: isProduction ? `.${config.BASE_DOMAIN}` : undefined,
    path: "/",
    httpOnly: true,
    ...(maxAge ? { maxAge: maxAge * 1000 } : {}),
  };
};
