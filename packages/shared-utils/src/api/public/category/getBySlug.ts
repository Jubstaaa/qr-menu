import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";
import { apiClient } from "../../api-client";

export const getBySlug = (
  params: ApiType.Public.Category.GetBySlug.Request.Params,
  headers: ApiType.Public.Category.GetBySlug.Request.Headers
) =>
  apiClient.get<ApiType.Public.Category.GetBySlug.Response>(
    ENDPOINTS.PUBLIC.CATEGORY.GET_BY_SLUG,
    { pathParams: params, headers: headers }
  );
