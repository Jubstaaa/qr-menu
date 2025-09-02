import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Delete {
  export namespace Request {
    export type Params = z.infer<
      typeof ApiValidation.Admin.Item.Delete.Request.Params
    >;
    export type Data = z.infer<
      typeof ApiValidation.Admin.Item.Delete.Request.Data
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Item.Delete.Response
  >;
}
