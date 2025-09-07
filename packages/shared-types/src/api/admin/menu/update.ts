// Update Menu API Types
import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Update {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Admin.Menu.Update.Request.Data
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Admin.Menu.Update.Response
  >;
}
