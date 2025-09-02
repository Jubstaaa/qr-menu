import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const remove = (
  params: ApiType.Admin.Category.Delete.Request.Params
) =>
  apiClient.delete<ApiType.Admin.Category.Delete.Response>(
    ENDPOINTS.ADMIN.CATEGORY.DELETE,
    { pathParams: params }
  );
