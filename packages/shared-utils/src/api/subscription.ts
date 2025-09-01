import { apiClient } from "../api-client";
import { SubscriptionAPI } from "@qr-menu/shared-types";

// Subscription API
export const subscriptionApi = {
  // Get user subscription
  getUserSubscription:
    (): Promise<SubscriptionAPI.Admin.GetUserSubscriptionResponse> =>
      apiClient.getData<SubscriptionAPI.Admin.GetUserSubscriptionResponse>(
        apiClient.buildUrl("subscription.getUserSubscription")
      ),
};
