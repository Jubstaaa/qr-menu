import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const getById = (
  params: ApiType.Admin.Item.GetById.Request.Params,
  data: ApiType.Admin.Item.GetById.Request.Data
) =>
  apiClient.get<ApiType.Admin.Item.GetById.Response>(
    ENDPOINTS.ADMIN.ITEM.GET_BY_ID,
    { pathParams: params }
  );
