import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const getAll = () =>
  apiClient.get<ApiType.Admin.Category.GetAll.Response>(
    ENDPOINTS.ADMIN.CATEGORY.GET_ALL
  );
