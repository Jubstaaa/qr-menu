import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const reorder = (data: ApiType.Admin.Item.Reorder.Request.Data) =>
  apiClient.post<
    ApiType.Admin.Item.Reorder.Response,
    ApiType.Admin.Item.Reorder.Request.Data
  >(ENDPOINTS.ADMIN.ITEM.REORDER, data);
