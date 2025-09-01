import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminCategoryApi } from "@qr-menu/shared-utils";
import { CategoryAPI } from "@qr-menu/shared-types";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<CategoryAPI.Admin.GetAllCategoriesResponse> => {
      const response = await adminCategoryApi.getCategories();
      return response;
    },
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: CategoryAPI.Admin.CreateCategoryRequest & { file?: File | null }
    ): Promise<CategoryAPI.Admin.CreateCategoryResponse> => {
      const response = await adminCategoryApi.createCategory(data);
      return response;
    },
    onSuccess: (newCategory: CategoryAPI.Admin.CreateCategoryResponse) => {
      queryClient.setQueryData(
        ["categories"],
        (prev: CategoryAPI.Admin.GetAllCategoriesResponse | undefined) => [
          ...(prev || []),
          newCategory,
        ]
      );
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: CategoryAPI.Admin.UpdateCategoryRequest & { file?: File | null };
    }): Promise<CategoryAPI.Admin.UpdateCategoryResponse> => {
      const response = await adminCategoryApi.updateCategory(id, data);
      return response;
    },
    onSuccess: (
      updatedCategory: CategoryAPI.Admin.UpdateCategoryResponse,
      variables
    ) => {
      queryClient.setQueryData(
        ["categories"],
        (prev: CategoryAPI.Admin.GetAllCategoriesResponse | undefined) =>
          (prev || []).map((category) =>
            category.id === variables.id ? updatedCategory : category
          )
      );
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await adminCategoryApi.deleteCategory(id);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories"],
        (prev: CategoryAPI.Admin.GetAllCategoriesResponse | undefined) =>
          (prev || []).filter((category) => category.id !== variables)
      );
    },
  });
};
export const useReorderCategoriesMutation = () => {
  return useMutation({
    mutationFn: async (
      changes: Array<{ id: string; newSortOrder: number }>
    ) => {
      const response = await adminCategoryApi.reorderCategories(changes);
      return response;
    },
  });
};
