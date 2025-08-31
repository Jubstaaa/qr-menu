import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@qr-menu/shared-utils";
import {
  Menu,
  Category,
  Item,
  CategoryWithItemsDto,
  ItemDto,
} from "@qr-menu/shared-types";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateItemDto,
  UpdateItemDto,
} from "@qr-menu/shared-validation";

export const useMenu = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const response = await apiClient.getMenuByUser();
      return response.data;
    },
  });
};

export const useUpdateMenu = () => {
  return useMutation({
    mutationFn: async (data: Partial<Menu> & { file?: File | null }) => {
      const response = await apiClient.updateMenu(data);
      return response.data;
    },
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await apiClient.getCategories();
      return response.data;
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCategoryDto & { file?: File | null }) => {
      const response = await apiClient.createCategory(data);
      return response.data;
    },
    onSuccess: (newCategory) => {
      // Success durumunda cache'e yeni kategori ekle
      queryClient.setQueryData(["categories"], (prev: any) => [
        ...prev,
        newCategory,
      ]);
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateCategoryDto & { file?: File | null };
    }) => {
      const response = await apiClient.updateCategory(id, data);
      return response.data;
    },
    onSuccess: (updatedCategory, variables) => {
      // Success durumunda cache'i güncelle
      queryClient.setQueryData(["categories"], (prev: any) =>
        prev.map((category: any) =>
          category.id === variables.id ? updatedCategory : category
        )
      );
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.deleteCategory(id);
      return response;
    },
    onSuccess: (_, variables) => {
      // Success durumunda cache'den kategoriyi kaldır
      queryClient.setQueryData(["categories"], (prev: any) =>
        prev.filter((category: any) => category.id !== variables)
      );
    },
  });
};

// Item hooks
export const useItems = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const response = await apiClient.getItemsByMenu();
      return response.data;
    },
  });
};

export const useItemsByCategory = (categoryId: string) => {
  return useQuery({
    queryKey: ["items", categoryId],
    queryFn: async () => {
      const response = await apiClient.getItemsByCategory(categoryId);
      return response.data;
    },
    enabled: !!categoryId,
  });
};

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateItemDto & { file?: File | null }) => {
      const response = await apiClient.createItem(data);
      return response.data;
    },
    onSuccess: (newItem, variables) => {
      // Success durumunda cache'e yeni ürün ekle
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

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateItemDto & { file?: File | null };
    }) => {
      const response = await apiClient.updateItem(id, data);
      return response.data;
    },
    onSuccess: (updatedItem, variables) => {
      // Success durumunda cache'i güncelle
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

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiClient.deleteItem(id);
      return response;
    },
    onSuccess: (_, variables) => {
      // Success durumunda cache'den ürünü kaldır
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

// Reorder hooks
export const useReorderCategories = () => {
  return useMutation({
    mutationFn: async (
      changes: Array<{ id: string; newSortOrder: number }>
    ) => {
      const response = await apiClient.reorderCategories(changes);
      return response.data;
    },
  });
};

export const useReorderItemsInCategory = () => {
  return useMutation({
    mutationFn: async (
      changes: Array<{ id: string; newSortOrder: number }>
    ) => {
      const response = await apiClient.reorderItemsInCategory(changes);
      return response.data;
    },
  });
};

// Subscription hooks
export const useSubscription = () => {
  return useQuery({
    queryKey: ["subscription"],
    queryFn: async () => {
      const response = await apiClient.getUserSubscription();
      return response.data;
    },
  });
};
