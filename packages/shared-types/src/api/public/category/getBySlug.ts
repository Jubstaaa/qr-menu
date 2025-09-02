import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetBySlug {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Public.Category.GetBySlug.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Public.Category.GetBySlug.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Public.Category.GetBySlug.Response
  >;
}
