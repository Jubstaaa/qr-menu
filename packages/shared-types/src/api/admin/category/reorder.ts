import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

// Admin Category Reorder Types
export namespace Reorder {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Category.Reorder.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Admin.Category.Reorder.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Category.Reorder.Response
  >;
}
