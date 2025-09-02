import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";

export const logout = () =>
  apiClient.post<ApiType.Common.Auth.Logout.Response>(
    ENDPOINTS.COMMON.AUTH.LOGOUT
  );
