import { Request, Response, NextFunction } from "express";

export type ValidationModule<
  B = unknown,
  P = unknown,
  Q = unknown,
  R = unknown,
> = {
  request?: {
    data?: (data: unknown) => B;
    params?: (data: unknown) => P;
    query?: (data: unknown) => Q;
  };
  response?: (data: unknown) => R;
};

export function validate<B = unknown, P = unknown, Q = unknown, R = unknown>(
  module: ValidationModule<B, P, Q, R>
) {
  const responseParser = module.response;

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

      if (responseParser) {
        const originalJson = res.json.bind(res);
        res.json = (payload: any) => {
          try {
            if (
              res.statusCode >= 200 &&
              res.statusCode < 300 &&
              payload?.data !== undefined
            ) {
              const validatedData = responseParser(payload.data);
              return originalJson({ ...payload, data: validatedData });
            }
          } catch (err: any) {
            const message = err?.errors || err?.message || "Validation error";
            return res.status(500).json({ message });
          }
          return originalJson(payload);
        };
      }

      next();
    } catch (err: any) {
      const message =
        err?.errors[0]?.message || err?.message || "Validation error";
      return res.status(400).json({ message });
    }
  };
}
