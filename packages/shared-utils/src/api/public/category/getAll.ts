import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const getAll = (
  headers: ApiType.Public.Category.Get.Request.Headers
) =>
  apiClient.get<ApiType.Public.Category.Get.Response>(
    ENDPOINTS.PUBLIC.CATEGORY.GET,
    { headers: headers }
  );
