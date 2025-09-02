import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const getById = (
  params: ApiType.Admin.Category.GetById.Request.Params,
  data: ApiType.Admin.Category.GetById.Request.Data
) =>
  apiClient.get<ApiType.Admin.Category.GetById.Response>(
    ENDPOINTS.ADMIN.CATEGORY.GET_BY_ID,
    { pathParams: params }
  );
