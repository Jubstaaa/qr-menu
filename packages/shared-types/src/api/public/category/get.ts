import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Get {
  export namespace Request {
    export type Headers = z.infer<
      typeof ApiValidation.Public.Category.Get.Request.Headers
    >;
  }

  export type Response = z.infer<
    typeof ApiValidation.Public.Category.Get.Response
  >;
}
