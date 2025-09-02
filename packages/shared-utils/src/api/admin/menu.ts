import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";

// Admin Menu API
export const adminMenuApi = {
  // Create menu
  createMenu: (
    data: ApiType.Admin.Menu.Create.Request
  ): Promise<ApiType.Admin.Menu.Create.Response> =>
    apiClient.postData<ApiType.Admin.Menu.Create.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.MENU.CREATE),
      data
    ),

  // Get current user menu
  getCurrentUserMenu: (): Promise<ApiType.Admin.Menu.GetCurrentUser.Response> =>
    apiClient.getData<ApiType.Admin.Menu.GetCurrentUser.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.MENU.GET_CURRENT_USER)
    ),

  // Update menu
  updateMenu: (
    menuId: string,
    data: ApiType.Admin.Menu.Update.Request
  ): Promise<ApiType.Admin.Menu.Update.Response> =>
    apiClient.putData<ApiType.Admin.Menu.Update.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.MENU.UPDATE, { id: menuId }),
      data
    ),
};
