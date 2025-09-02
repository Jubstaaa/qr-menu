import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Delete {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Category.Delete.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Admin.Category.Delete.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Category.Delete.Response
  >;
}
