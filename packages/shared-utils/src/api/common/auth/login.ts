import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";

export const login = (data: ApiType.Common.Auth.Login.Request.Data) =>
  apiClient.post<
    ApiType.Common.Auth.Login.Response,
    ApiType.Common.Auth.Login.Request.Data
  >(ENDPOINTS.AUTH.LOGIN, data);
