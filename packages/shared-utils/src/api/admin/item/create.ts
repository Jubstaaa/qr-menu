import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const create = (data: ApiType.Admin.Item.Create.Request.Data) =>
  apiClient.post<
    ApiType.Admin.Item.Create.Response,
    ApiType.Admin.Item.Create.Request.Data
  >(ENDPOINTS.ADMIN.ITEM.CREATE, data);
