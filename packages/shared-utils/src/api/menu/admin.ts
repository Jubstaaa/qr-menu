import { apiClient } from "../../api-client";
import { MenuAPI } from "@qr-menu/shared-types";

// Admin Menu API
export const adminMenuApi = {
  // Create menu
  createMenu: (
    data: MenuAPI.Admin.CreateMenuRequest
  ): Promise<MenuAPI.Admin.CreateMenuResponse> =>
    apiClient.postData<MenuAPI.Admin.CreateMenuResponse>(
      apiClient.buildUrl("menu.create"),
      data
    ),

  // Get menus by user
  getMenusByUser: (): Promise<MenuAPI.Admin.GetMenusByUserResponse> =>
    apiClient.getData<MenuAPI.Admin.GetMenusByUserResponse>(
      apiClient.buildUrl("menu.getMenusByUser")
    ),

  // Get menu by subdomain
  getMenuBySubdomain: (
    subdomain: string
  ): Promise<MenuAPI.Admin.GetMenuBySubdomainResponse> =>
    apiClient.getData<MenuAPI.Admin.GetMenuBySubdomainResponse>(
      apiClient.buildUrl("menu.getBySubdomain", { subdomain })
    ),

  // Update menu
  updateMenu: (
    data: MenuAPI.Admin.UpdateMenuRequest
  ): Promise<MenuAPI.Admin.UpdateMenuResponse> =>
    apiClient.putData<MenuAPI.Admin.UpdateMenuResponse>(
      apiClient.buildUrl("menu.update"),
      data
    ),
};
