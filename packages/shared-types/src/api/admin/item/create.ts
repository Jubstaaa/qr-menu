import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Create {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Item.Create.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Admin.Item.Create.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Item.Create.Response
  >;
}
