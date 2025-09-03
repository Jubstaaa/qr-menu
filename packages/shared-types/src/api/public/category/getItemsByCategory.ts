import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetItemsByCategory {
  export namespace Request {
    export type Params = z.infer<
      typeof ApiValidation.Public.Category.GetItemsByCategory.Request.Params
    >;
    export type Headers = z.infer<
      typeof ApiValidation.Public.Category.GetItemsByCategory.Request.Headers
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Public.Category.GetItemsByCategory.Response
  >;
}
