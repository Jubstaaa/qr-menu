import { z } from "zod";
import { ApiValidation } from "@qr-menu/shared-validation";

export namespace Get {
  export type Response = z.infer<typeof ApiValidation.Admin.Menu.Get.Response>;
}
