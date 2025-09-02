// Get Item By ID API Types
import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetById {
  export namespace Request {
    export type Params = z.infer<
      typeof ApiValidation.Admin.Item.GetById.Request.Params
    >;
    export type Data = z.infer<
      typeof ApiValidation.Admin.Item.GetById.Request.Data
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Item.GetById.Response
  >;
}
