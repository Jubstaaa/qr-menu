import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetBySlug {
  export namespace Request {
    export type Params = z.infer<
      typeof ApiValidation.Public.Category.GetBySlug.Request.Params
    >;
    export type Headers = z.infer<
      typeof ApiValidation.Public.Category.GetBySlug.Request.Headers
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Public.Category.GetBySlug.Response
  >;
}
