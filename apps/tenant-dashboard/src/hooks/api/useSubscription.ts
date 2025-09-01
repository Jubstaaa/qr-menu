import { useQuery } from "@tanstack/react-query";
import { subscriptionApi } from "@qr-menu/shared-utils";

export const useSubscriptionQuery = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await subscriptionApi.getUserSubscription();
      return response;
    },
  });
};
