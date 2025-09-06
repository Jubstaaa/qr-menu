import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const get = () =>
  apiClient.get<ApiType.Admin.Menu.Get.Response>(
    ENDPOINTS.ADMIN.MENU.GET
  );
