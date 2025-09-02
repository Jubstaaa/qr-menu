import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const update = (
  params: ApiType.Admin.Item.Update.Request.Params,
  data: ApiType.Admin.Item.Update.Request.Data
) =>
  apiClient.put<
    ApiType.Admin.Item.Update.Response,
    ApiType.Admin.Item.Update.Request.Data
  >(ENDPOINTS.ADMIN.ITEM.UPDATE, data, { pathParams: params });
