import { apiClient } from "../api-client";
import { ENDPOINTS } from "@qr-menu/shared-config";
import { ApiType } from "@qr-menu/shared-types";

// Admin Category API
export const Category = {
  // Get all categories
  getAll: (): Promise<ApiType.Admin.Category.GetAll.Response[]> =>
    apiClient.getData<ApiType.Admin.Category.GetAll.Response[]>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.CATEGORY.GET_ALL)
    ),

  // Create category
  create: (
    data: ApiType.Admin.Category.Create.Request.Data
  ): Promise<ApiType.Admin.Category.Create.Response> =>
    apiClient.postData<
      ApiType.Admin.Category.Create.Request.Data,
      ApiType.Admin.Category.Create.Response
    >(apiClient.buildUrl(ENDPOINTS.ADMIN.CATEGORY.CREATE), data),

  // Update category
  updateCategory: (
    params: ApiType.Admin.Category.Update.Request.Params,
    data: ApiType.Admin.Category.Update.Request.Data
  ): Promise<ApiType.Admin.Category.Update.Response> =>
    apiClient.putData<
      ApiType.Admin.Category.Update.Request.Data,
      ApiType.Admin.Category.Update.Response
    >(
      apiClient.buildUrl<ApiType.Admin.Category.Update.Request.Params>(
        ENDPOINTS.ADMIN.CATEGORY.UPDATE,
        params
      ),
      data
    ),

  // Delete category
  deleteCategory: (
    categoryId: string
  ): Promise<ApiType.Admin.Category.Delete.Response> =>
    apiClient.deleteData<ApiType.Admin.Category.Delete.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.CATEGORY.DELETE, { id: categoryId })
    ),

  // Get category by ID
  getCategoryById: (
    categoryId: string
  ): Promise<ApiType.Admin.Category.GetById.Response> =>
    apiClient.getData<ApiType.Admin.Category.GetById.Response>(
      apiClient.buildUrl(ENDPOINTS.ADMIN.CATEGORY.GET_BY_ID, { id: categoryId })
    ),

  // Reorder categories
  reorderCategories: (
    changes: Array<{ id: string; newSortOrder: number }>
  ): Promise<ApiType.Admin.Category.Reorder.Response> =>
    apiClient.postData<
      { changes: Array<{ id: string; newSortOrder: number }> },
      ApiType.Admin.Category.Reorder.Response
    >(apiClient.buildUrl(ENDPOINTS.ADMIN.CATEGORY.REORDER), { changes }),
};
