import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiType } from "@qr-menu/shared-types";
import { apiUtils } from "@qr-menu/shared-utils";

export const useItemsQuery = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async (): Promise<ApiType.Admin.Item.GetAll.Response> => {
      const response = await apiUtils.admin.item.getAll();
      return response.data as unknown as ApiType.Admin.Item.GetAll.Response;
    },
  });
};

export const useItemsByCategoryQuery = (categoryId: string) => {
  return useQuery({
    queryKey: ["items", categoryId],
    queryFn: async (): Promise<ApiType.Admin.Item.GetAll.Response> => {
      const response = await apiUtils.admin.item.getAll();
      return response.data.filter(
        (item: any) => item.category_id === categoryId
      ) as unknown as ApiType.Admin.Item.GetAll.Response;
    },
    enabled: !!categoryId,
  });
};

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: ApiType.Admin.Item.Create.Request.Data & { file?: File | null }
    ): Promise<ApiType.Admin.Item.Create.Response> => {
      const response = await apiUtils.admin.item.create(data);
      return response.data;
    },
    onSuccess: (newItem: ApiType.Admin.Item.Create.Response, variables) => {
      queryClient.setQueryData(["categories"], (prev: any) =>
        prev.map((category: any) => {
          if (category.id === variables.category_id) {
            return {
              ...category,
              menu_items: [...(category.menu_items || []), newItem],
            };
          }
          return category;
        })
      );
    },
  });
};

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ApiType.Admin.Item.Update.Request.Data & { file?: File | null };
    }): Promise<ApiType.Admin.Item.Update.Response> => {
      const response = await apiUtils.admin.item.update({ id }, data);
      return response.data;
    },
    onSuccess: (updatedItem: ApiType.Admin.Item.Update.Response, variables) => {
      queryClient.setQueryData(["categories"], (prev: any) =>
        prev.map((category: any) => ({
          ...category,
          menu_items:
            category.menu_items?.map((item: any) =>
              item.id === variables.id ? updatedItem : item
            ) || [],
        }))
      );
    },
  });
};

export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      id: string
    ): Promise<ApiType.Admin.Item.Delete.Response> => {
      const response = await apiUtils.admin.item.delete({ id });
      return response.data as ApiType.Admin.Item.Delete.Response;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(["categories"], (prev: any) =>
        prev.map((category: any) => ({
          ...category,
          menu_items:
            category.menu_items?.filter((item: any) => item.id !== variables) ||
            [],
        }))
      );
    },
  });
};

export const useReorderItemsInCategoryMutation = () => {
  return useMutation({
    mutationFn: async (
      changes: Array<{ id: string; newSortOrder: number }>
    ): Promise<ApiType.Admin.Item.Reorder.Response> => {
      const response = await apiUtils.admin.item.reorder({
        itemIds: changes.map((item) => item.id),
      });
      return response.data as ApiType.Admin.Item.Reorder.Response;
    },
  });
};
