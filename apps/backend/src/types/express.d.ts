import "express-serve-static-core";

declare module "express-serve-static-core" {
  interface Request {
    cookies: Record<string, string>;
    signedCookies: Record<string, string>;
  }
}
