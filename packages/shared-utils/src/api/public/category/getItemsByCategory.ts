import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const getItemsByCategory = (
  params: ApiType.Public.Category.GetItemsByCategory.Request.Params,
  headers: ApiType.Public.Category.GetItemsByCategory.Request.Headers
) =>
  apiClient.get<ApiType.Public.Category.GetItemsByCategory.Response>(
    ENDPOINTS.PUBLIC.CATEGORY.GET_ITEMS_BY_CATEGORY,
    { pathParams: params, headers: headers }
  );
