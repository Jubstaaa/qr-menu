import { apiClient } from "../../api-client";
import { MenuAPI } from "@qr-menu/shared-types";

// Public Menu API
export const publicMenuApi = {
  // Get menu by subdomain
  getMenuBySubdomain: (
    subdomain: string
  ): Promise<MenuAPI.Public.GetMenuBySubdomainResponse> =>
    apiClient.getData<MenuAPI.Public.GetMenuBySubdomainResponse>(
      apiClient.buildUrl("menu.getBySubdomain", { subdomain })
    ),
};
