import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const create = (data: ApiType.Admin.Category.Create.Request.Data) =>
  apiClient.post<
    ApiType.Admin.Category.Create.Response,
    ApiType.Admin.Category.Create.Request.Data
  >(ENDPOINTS.ADMIN.CATEGORY.CREATE, data);
