import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";

export const checkAuth = () =>
  apiClient.get<ApiType.Common.Auth.CheckAuth.Response>(
    ENDPOINTS.AUTH.CHECK_AUTH
  );
