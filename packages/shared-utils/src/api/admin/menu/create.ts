import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const create = (data: ApiType.Admin.Menu.Create.Request.Data) =>
  apiClient.post<
    ApiType.Admin.Menu.Create.Response,
    ApiType.Admin.Menu.Create.Request.Data
  >(ENDPOINTS.ADMIN.MENU.CREATE, data);
