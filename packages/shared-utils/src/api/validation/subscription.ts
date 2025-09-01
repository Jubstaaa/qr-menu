import { getUserSubscriptionRequestSchema } from "@qr-menu/shared-validation";

// Subscription API Validation Functions
export const subscriptionValidation = {
  validateGetUserSubscriptionRequest: (data: unknown) => {
    return getUserSubscriptionRequestSchema.parse(data);
  },
};
