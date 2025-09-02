import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";

// Public Category API
export const publicCategoryApi = {
  // Get category by slug
  getCategoryBySlug: (
    slug: string
  ): Promise<ApiType.Public.Category.GetBySlug.Response> =>
    apiClient.getData<ApiType.Public.Category.GetBySlug.Response>(
      apiClient.buildUrl(ENDPOINTS.PUBLIC.CATEGORY.GET_BY_SLUG, { slug })
    ),
};
