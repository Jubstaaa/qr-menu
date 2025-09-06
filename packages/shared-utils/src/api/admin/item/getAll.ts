import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "@/api/api-client";

export const getAll = () =>
  apiClient.get<ApiType.Admin.Item.GetAll.Response[]>(
    ENDPOINTS.ADMIN.ITEM.GET_ALL
  );
