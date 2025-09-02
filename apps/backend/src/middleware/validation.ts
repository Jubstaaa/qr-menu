import { Request, Response, NextFunction } from "express";

export type ValidationRequest<B = unknown, P = unknown, Q = unknown> = {
  data?: (data: unknown) => B;
  params?: (data: unknown) => P;
  query?: (data: unknown) => Q;
};

export type ValidationModule<B = unknown, P = unknown, Q = unknown> = {
  request?: ValidationRequest<B, P, Q>;
};

export function validate<B = unknown, P = unknown, Q = unknown>(
  module: ValidationModule<B, P, Q>
) {
  return (req: Request<P, any, B, Q>, res: Response, next: NextFunction) => {
    try {
      if (module.request?.params) {
        req.params = module.request.params(req.params) as P;
      }
      if (module.request?.query) {
        req.query = module.request.query(req.query) as Q;
      }
      if (module.request?.data) {
        req.body = module.request.data(req.body) as B;
      }

      next();
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message || err?.message || "Validation error";
      return res.status(400).json({ message });
    }
  };
}
