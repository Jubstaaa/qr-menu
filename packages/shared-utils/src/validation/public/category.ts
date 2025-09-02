import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Public Category API Validation Functions
export const getBySlug = (data: ApiType.Public.Category.GetBySlug.Request) => {
  return ApiValidation.Public.Category.GetBySlug.parse(data);
};
