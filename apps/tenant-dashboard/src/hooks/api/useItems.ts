import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminItemApi } from "@qr-menu/shared-utils";
import { ItemAPI } from "@qr-menu/shared-types";

export const useItemsQuery = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async (): Promise<ItemAPI.Admin.GetAllItemsResponse> => {
      const response = await adminItemApi.getAllItems();
      return response;
    },
  });
};

export const useItemsByCategoryQuery = (categoryId: string) => {
  return useQuery({
    queryKey: ["items", categoryId],
    queryFn: async (): Promise<ItemAPI.Admin.GetAllItemsResponse> => {
      const response = await adminItemApi.getAllItems();
      return response.filter((item) => item.category_id === categoryId);
    },
    enabled: !!categoryId,
  });
};

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: ItemAPI.Admin.CreateItemRequest & { file?: File | null }
    ): Promise<ItemAPI.Admin.CreateItemResponse> => {
      const response = await adminItemApi.createItem(data);
      return response;
    },
    onSuccess: (newItem: ItemAPI.Admin.CreateItemResponse, variables) => {
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
      data: ItemAPI.Admin.UpdateItemRequest & { file?: File | null };
    }): Promise<ItemAPI.Admin.UpdateItemResponse> => {
      const response = await adminItemApi.updateItem(id, data);
      return response;
    },
    onSuccess: (updatedItem: ItemAPI.Admin.UpdateItemResponse, variables) => {
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
    ): Promise<ItemAPI.Admin.DeleteItemResponse> => {
      const response = await adminItemApi.deleteItem(id);
      return response;
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
    ): Promise<ItemAPI.Admin.ReorderItemsResponse> => {
      const response = await adminItemApi.reorderItemsInCategory(changes);
      return response;
    },
  });
};
