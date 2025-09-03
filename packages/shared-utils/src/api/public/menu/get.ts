import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const get = (
  headers: ApiType.Public.Menu.Get.Request.Headers
) =>
  apiClient.get<ApiType.Public.Menu.Get.Response>(
    ENDPOINTS.PUBLIC.MENU.GET,
    { headers: headers }
  );
