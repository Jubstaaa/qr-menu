import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const update = (data: ApiType.Admin.Menu.Update.Request.Data) =>
  apiClient.put<
    ApiType.Admin.Menu.Update.Response,
    ApiType.Admin.Menu.Update.Request.Data
  >(ENDPOINTS.ADMIN.MENU.UPDATE, data);
