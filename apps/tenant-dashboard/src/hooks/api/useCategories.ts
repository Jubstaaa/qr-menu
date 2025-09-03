import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiType } from "@qr-menu/shared-types";
import { apiUtils } from "@qr-menu/shared-utils";

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async (): Promise<ApiType.Admin.Category.GetAll.Response> => {
      const response = await apiUtils.admin.category.getAll();
      return response.data;
    },
  });
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: ApiType.Admin.Category.Create.Request.Data & { file?: File | null }
    ): Promise<ApiType.Admin.Category.Create.Response> => {
      const response = await apiUtils.admin.category.create(data);
      return response.data;
    },
    onSuccess: (newCategory: ApiType.Admin.Category.Create.Response) => {
      queryClient.setQueryData(
        ["categories"],
        (prev: ApiType.Admin.Category.GetAll.Response | undefined) => [
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
      data: ApiType.Admin.Category.Update.Request.Data & { file?: File | null };
    }): Promise<ApiType.Admin.Category.Update.Response> => {
      const response = await apiUtils.admin.category.update({ id }, data);
      return response.data;
    },
    onSuccess: (
      updatedCategory: ApiType.Admin.Category.Update.Response,
      variables
    ) => {
      queryClient.setQueryData(
        ["categories"],
        (prev: ApiType.Admin.Category.GetAll.Response | undefined) =>
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
      const response = await apiUtils.admin.category.delete({ id });
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["categories"],
        (prev: ApiType.Admin.Category.GetAll.Response | undefined) =>
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
      const response = await apiUtils.admin.category.reorder({ changes });
      return response;
    },
  });
};
