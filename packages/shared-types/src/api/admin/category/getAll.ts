import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

// Admin Category GetAll Types
export namespace GetAll {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Category.GetAll.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Admin.Category.GetAll.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Category.GetAll.Response
  >;
}
