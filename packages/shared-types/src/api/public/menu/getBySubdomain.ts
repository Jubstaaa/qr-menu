// Get Menu By Subdomain API Types
import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace GetBySubdomain {
  export namespace Request {
    export type Data = z.infer<
      typeof ApiValidation.Public.Menu.GetBySubdomain.Request.Data
    >;
    export type Params = z.infer<
      typeof ApiValidation.Public.Menu.GetBySubdomain.Request.Params
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Public.Menu.GetBySubdomain.Response
  >;
}
