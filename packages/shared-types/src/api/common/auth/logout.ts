import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Logout {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Common.Auth.Logout.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Common.Auth.Logout.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Common.Auth.Logout.Response
  >;
}
