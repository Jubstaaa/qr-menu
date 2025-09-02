import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";

// Public Menu API
export const publicMenuApi = {
  // Get menu by subdomain
  getMenuBySubdomain:
    (): Promise<ApiType.Public.Menu.GetBySubdomain.Response> =>
      apiClient.getData<ApiType.Public.Menu.GetBySubdomain.Response>(
        apiClient.buildUrl(ENDPOINTS.PUBLIC.MENU.GET_BY_SUBDOMAIN)
      ),
};
