import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace CheckAuth {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Common.Auth.CheckAuth.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Common.Auth.CheckAuth.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Common.Auth.CheckAuth.Response
  >;
}
