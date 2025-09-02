import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const reorder = (data: ApiType.Admin.Category.Reorder.Request.Data) =>
  apiClient.post<
    ApiType.Admin.Category.Reorder.Response,
    ApiType.Admin.Category.Reorder.Request.Data
  >(ENDPOINTS.ADMIN.CATEGORY.REORDER, data);
