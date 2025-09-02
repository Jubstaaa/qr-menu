import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Subscription API Validation Functions
export const getUserSubscription = (
  data: ApiType.Admin.Subscription.GetUserSubscription.Request
) => {
  return ApiValidation.Admin.Subscription.GetUserSubscription.parse(data);
};
