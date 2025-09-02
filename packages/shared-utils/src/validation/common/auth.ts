import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

// Auth API Validation Functions
export const login = (data: ApiType.Common.Auth.Login.Request) => {
  return ApiValidation.Common.Auth.Login.parse(data);
};

export const register = (data: ApiType.Common.Auth.Register.Request) => {
  return ApiValidation.Common.Auth.Register.parse(data);
};

export const checkAuth = (data: ApiType.Common.Auth.CheckAuth.Request) => {
  return ApiValidation.Common.Auth.CheckAuth.parse(data);
};

export const getUserMenus = (
  data: ApiType.Common.Auth.GetUserMenus.Request
) => {
  return ApiValidation.Common.Auth.GetUserMenus.parse(data);
};

export const logout = (data: ApiType.Common.Auth.Logout.Request) => {
  return ApiValidation.Common.Auth.Logout.parse(data);
};
