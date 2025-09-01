import { apiClient } from "../../api-client";
import { ItemAPI } from "@qr-menu/shared-types";

// Public Item API
export const publicItemApi = {
  // Get active items by subdomain
  getActiveItemsBySubdomain:
    (): Promise<ItemAPI.Public.GetActiveItemsBySubdomainResponse> =>
      apiClient.getData<ItemAPI.Public.GetActiveItemsBySubdomainResponse>(
        apiClient.buildUrl("item.getActiveBySubdomain")
      ),

  // Get item by subdomain and ID
  getItemBySubdomainAndId: (
    itemId: string
  ): Promise<ItemAPI.Public.GetItemBySubdomainAndIdResponse> =>
    apiClient.getData<ItemAPI.Public.GetItemBySubdomainAndIdResponse>(
      apiClient.buildUrl("item.getBySubdomainAndId", { itemId })
    ),
};
