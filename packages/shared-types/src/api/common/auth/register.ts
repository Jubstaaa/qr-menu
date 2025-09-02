import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Register {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Common.Auth.Register.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Common.Auth.Register.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Common.Auth.Register.Response
  >;
}
