import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetByUser {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Menu.GetByUser.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Admin.Menu.GetByUser.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Menu.GetByUser.Response
  >;
}
