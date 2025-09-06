import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";

export const register = (data: ApiType.Common.Auth.Register.Request.Data) =>
  apiClient.post<
    ApiType.Common.Auth.Register.Response,
    ApiType.Common.Auth.Register.Request.Data
  >(ENDPOINTS.AUTH.REGISTER, data);
