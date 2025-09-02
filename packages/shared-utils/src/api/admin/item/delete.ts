import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const remove = (params: ApiType.Admin.Item.Delete.Request.Params) =>
  apiClient.delete<ApiType.Admin.Item.Delete.Response>(
    ENDPOINTS.ADMIN.ITEM.DELETE,
    { pathParams: params }
  );
