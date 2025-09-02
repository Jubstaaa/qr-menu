import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";

export const checkAuth = () =>
  apiClient.get<ApiType.Common.Auth.CheckAuth.Response>(
    ENDPOINTS.COMMON.AUTH.CHECK_AUTH
  );
