import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

// Admin Category GetById Types
export namespace GetById {
  export namespace Request {
    export type Params = z.infer<
      typeof ApiValidation.Admin.Category.GetById.Request.Params
    >;
    export type Data = z.infer<
      typeof ApiValidation.Admin.Category.GetById.Request.Data
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Category.GetById.Response
  >;
}
