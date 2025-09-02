import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Public Menu API Validation Functions
export const getBySubdomain = (
  data: ApiType.Public.Menu.GetBySubdomain.Request
) => {
  return ApiValidation.Public.Menu.GetBySubdomain.parse(data);
};
