import { apiClient } from "../../api-client";
import { CategoryAPI } from "@qr-menu/shared-types";

// Public Category API
export const publicCategoryApi = {
  // Get categories by menu
  getCategoriesByMenu: (
    menuId: string
  ): Promise<CategoryAPI.Public.GetCategoriesByMenuResponse> =>
    apiClient.getData<CategoryAPI.Public.GetCategoriesByMenuResponse>(
      apiClient.buildUrl("category.getByMenu", { menuId })
    ),

  // Get category by slug
  getCategoryBySlug: (
    slug: string
  ): Promise<CategoryAPI.Public.GetCategoryBySlugResponse> =>
    apiClient.getData<CategoryAPI.Public.GetCategoryBySlugResponse>(
      apiClient.buildUrl("category.getBySlug", { slug })
    ),
};
