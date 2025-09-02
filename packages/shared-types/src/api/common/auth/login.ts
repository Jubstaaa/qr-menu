import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Login {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Common.Auth.Login.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Common.Auth.Login.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Common.Auth.Login.Response
  >;
}
