import { apiClient } from "../api-client";
import { AuthAPI } from "@qr-menu/shared-types";

// Auth API
export const authApi = {
  // Login
  login: (data: AuthAPI.LoginRequest): Promise<AuthAPI.LoginResponse> =>
    apiClient.postData<AuthAPI.LoginResponse>(
      apiClient.buildUrl("auth.login"),
      data
    ),

  // Register
  register: (
    data: AuthAPI.RegisterRequest
  ): Promise<AuthAPI.RegisterResponse> =>
    apiClient.postData<AuthAPI.RegisterResponse>(
      apiClient.buildUrl("auth.register"),
      data
    ),

  // Logout
  logout: (): Promise<AuthAPI.LogoutResponse> =>
    apiClient.postData<AuthAPI.LogoutResponse>(
      apiClient.buildUrl("auth.logout")
    ),

  // Get current user
  getCurrentUser: (): Promise<AuthAPI.GetCurrentUserResponse> =>
    apiClient.getData<AuthAPI.GetCurrentUserResponse>(
      apiClient.buildUrl("auth.getCurrentUser")
    ),
};
