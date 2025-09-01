import { apiClient } from "../../api-client";
import { CategoryAPI } from "@qr-menu/shared-types";

// Admin Category API
export const adminCategoryApi = {
  // Get all categories
  getCategories: (): Promise<CategoryAPI.Admin.GetAllCategoriesResponse> =>
    apiClient.getData<CategoryAPI.Admin.GetAllCategoriesResponse>(
      apiClient.buildUrl("category.getAll")
    ),

  // Create category
  createCategory: (
    data: CategoryAPI.Admin.CreateCategoryRequest
  ): Promise<CategoryAPI.Admin.CreateCategoryResponse> =>
    apiClient.postData<CategoryAPI.Admin.CreateCategoryResponse>(
      apiClient.buildUrl("category.create"),
      data
    ),

  // Update category
  updateCategory: (
    categoryId: string,
    data: CategoryAPI.Admin.UpdateCategoryRequest
  ): Promise<CategoryAPI.Admin.UpdateCategoryResponse> =>
    apiClient.putData<CategoryAPI.Admin.UpdateCategoryResponse>(
      apiClient.buildUrl("category.update", { id: categoryId }),
      data
    ),

  // Delete category
  deleteCategory: (
    categoryId: string
  ): Promise<CategoryAPI.Admin.DeleteCategoryResponse> =>
    apiClient.deleteData<CategoryAPI.Admin.DeleteCategoryResponse>(
      apiClient.buildUrl("category.delete", { id: categoryId })
    ),

  // Get category by ID
  getCategoryById: (
    categoryId: string
  ): Promise<CategoryAPI.Admin.GetCategoryByIdResponse> =>
    apiClient.getData<CategoryAPI.Admin.GetCategoryByIdResponse>(
      apiClient.buildUrl("category.getById", { id: categoryId })
    ),

  // Reorder categories
  reorderCategories: (
    changes: Array<{ id: string; newSortOrder: number }>
  ): Promise<CategoryAPI.Admin.ReorderCategoriesResponse> =>
    apiClient.postData<CategoryAPI.Admin.ReorderCategoriesResponse>(
      apiClient.buildUrl("category.reorder"),
      { changes }
    ),
};
