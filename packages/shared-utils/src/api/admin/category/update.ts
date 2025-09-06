import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const update = (
  params: ApiType.Admin.Category.Update.Request.Params,
  data: ApiType.Admin.Category.Update.Request.Data
) =>
  apiClient.put<
    ApiType.Admin.Category.Update.Response,
    ApiType.Admin.Category.Update.Request.Data
  >(ENDPOINTS.ADMIN.CATEGORY.UPDATE, data, { pathParams: params });
