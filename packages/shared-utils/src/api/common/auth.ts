import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";

// Auth API
export const authApi = {
  // Login
  login: (
    data: ApiType.Common.Auth.Login.Request
  ): Promise<ApiType.Common.Auth.Login.Response> =>
    apiClient.postData<ApiType.Common.Auth.Login.Response>(
      apiClient.buildUrl(ENDPOINTS.COMMON.AUTH.LOGIN),
      data
    ),

  // Register
  register: (
    data: ApiType.Common.Auth.Register.Request
  ): Promise<ApiType.Common.Auth.Register.Response> =>
    apiClient.postData<ApiType.Common.Auth.Register.Response>(
      apiClient.buildUrl(ENDPOINTS.COMMON.AUTH.REGISTER),
      data
    ),

  // Logout
  logout: (): Promise<ApiType.Common.Auth.Logout.Response> =>
    apiClient.postData<ApiType.Common.Auth.Logout.Response>(
      apiClient.buildUrl(ENDPOINTS.COMMON.AUTH.LOGOUT)
    ),

  // Get current user
  getCurrentUser: (): Promise<ApiType.Common.Auth.GetCurrentUser.Response> =>
    apiClient.getData<ApiType.Common.Auth.GetCurrentUser.Response>(
      apiClient.buildUrl(ENDPOINTS.COMMON.AUTH.GET_CURRENT_USER)
    ),
};
