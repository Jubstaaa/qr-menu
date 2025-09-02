import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Update {
  export namespace Request {
    export type Params = z.infer<
      typeof ApiValidation.Admin.Item.Update.Request.Params
    >;
    export type Data = z.infer<
      typeof ApiValidation.Admin.Item.Update.Request.Data
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Item.Update.Response
  >;
}
