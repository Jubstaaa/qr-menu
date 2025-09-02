import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";

// Subscription API
export const subscriptionApi = {
  // Get user subscription
  getUserSubscription:
    (): Promise<ApiType.Admin.Subscription.GetUserSubscription.Response> =>
      apiClient.getData<ApiType.Admin.Subscription.GetUserSubscription.Response>(
        apiClient.buildUrl(ENDPOINTS.ADMIN.SUBSCRIPTION.GET_CURRENT)
      ),
};
