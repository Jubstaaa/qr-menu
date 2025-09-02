import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Menu API Validation Functions
export const create = (data: ApiType.Admin.Menu.Create.Request) => {
  return ApiValidation.Admin.Menu.Create.parse(data);
};

export const update = (data: ApiType.Admin.Menu.Update.Request) => {
  return ApiValidation.Admin.Menu.Update.parse(data);
};
