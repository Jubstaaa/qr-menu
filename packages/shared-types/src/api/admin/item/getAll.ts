import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetAll {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Item.GetAll.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Admin.Item.GetAll.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Item.GetAll.Response
  >;
}
