import { useState } from "react";
import { useDisclosure } from "@heroui/react";
import { Category, Item } from "@qr-menu/shared-types";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateItemDto,
} from "@qr-menu/shared-validation";
import {
  useCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
  useCreateItem,
  useUpdateItem,
  useDeleteItem,
  useReorderCategories,
  useReorderItemsInCategory,
} from "./useApi";
import { useQueryClient } from "@tanstack/react-query";

export const useMenuManagement = () => {
  const { data: categories = [], isLoading: loading } = useCategories();
  const categoriesArray = Array.isArray(categories) ? categories : [];
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "category" | "item";
    id: string;
    name: string;
  } | null>(null);

  // Modal states
  const categoryModal = useDisclosure();
  const itemModal = useDisclosure();
  const deleteModal = useDisclosure();

  const queryClient = useQueryClient();

  // Mutations
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();
  const createItemMutation = useCreateItem();
  const updateItemMutation = useUpdateItem();
  const deleteItemMutation = useDeleteItem();
  const reorderCategoriesMutation = useReorderCategories();
  const reorderItemsMutation = useReorderItemsInCategory();

  // Loading states
  const loadingStates = {
    categories: loading,
    deleting: deleteCategoryMutation.isPending || deleteItemMutation.isPending,
    creatingCategory: createCategoryMutation.isPending,
    updatingCategory: updateCategoryMutation.isPending,
    creatingItem: createItemMutation.isPending,
    updatingItem: updateItemMutation.isPending,
    reorderingCategories: reorderCategoriesMutation.isPending,
    reorderingItems: reorderItemsMutation.isPending,
  };

  // Handlers
  const handlers = {
    // Category handlers
    category: {
      submit: async (
        data:
          | CreateCategoryDto
          | (UpdateCategoryDto & { file?: File; image_url?: string })
      ) => {
        try {
          if (editingCategory) {
            await updateCategoryMutation.mutateAsync({
              id: editingCategory.id,
              data: data as UpdateCategoryDto & {
                file?: File;
                image_url?: string;
              },
            });
          } else {
            await createCategoryMutation.mutateAsync(
              data as CreateCategoryDto & { file?: File; image_url?: string }
            );
          }
          setEditingCategory(null);
          categoryModal.onClose();
        } catch (err: unknown) {
          console.error("Kategori kaydedilirken hata:", err);
        }
      },
      edit: (category: Category) => {
        setEditingCategory(category);
        categoryModal.onOpen();
      },
      delete: (category: Category) => {
        setDeleteTarget({
          type: "category",
          id: category.id,
          name: category.name,
        });
        deleteModal.onOpen();
      },
      reorder: async (reorderedCategories: Category[]) => {
        try {
          const currentCategories = categoriesArray;

          const changes = reorderedCategories
            .map((category, newIndex) => {
              const currentIndex = currentCategories.findIndex(
                (c: any) => c.id === category.id
              );
              return { category, newIndex, currentIndex };
            })
            .filter(({ newIndex, currentIndex }) => newIndex !== currentIndex)
            .map(({ category, newIndex }) => ({
              id: category.id,
              newSortOrder: newIndex,
            }));

          if (changes.length === 0) {
            return;
          }

          // Optimistic update - React Query cache'ini direkt güncelle
          queryClient.setQueryData(["categories"], reorderedCategories);

          if (selectedCategory) {
            const newSelectedCategory = reorderedCategories.find(
              (c) => c.id === selectedCategory.id
            );
            if (newSelectedCategory) {
              setSelectedCategory(newSelectedCategory);
            }
          }

          // API çağrısını yap
          await reorderCategoriesMutation.mutateAsync(changes);
        } catch (err: unknown) {
          console.error("Kategori sıralaması güncellenirken hata:", err);
          // Hata durumunda eski cache'e geri dön
          queryClient.setQueryData(["categories"], categoriesArray);
        }
      },
      modalClose: () => {
        setEditingCategory(null);
        categoryModal.onClose();
      },
    },

    // Item handlers
    item: {
      submit: async (
        data: CreateItemDto & { file?: File; image_url?: string }
      ) => {
        try {
          if (editingItem) {
            await updateItemMutation.mutateAsync({
              id: editingItem.id,
              data,
            });
          } else {
            await createItemMutation.mutateAsync(data);
          }
          setEditingItem(null);
          itemModal.onClose();
        } catch (err: unknown) {
          console.error("Ürün kaydedilirken hata:", err);
        }
      },
      edit: (item: Item) => {
        setEditingItem(item);
        itemModal.onOpen();
      },
      delete: (item: Item) => {
        setDeleteTarget({ type: "item", id: item.id, name: item.name });
        deleteModal.onOpen();
      },
      reorder: async (reorderedItems: Item[]) => {
        if (!selectedCategory) return;

        try {
          const currentItems = getItemsByCategory(selectedCategory.id);

          const changes = reorderedItems
            .map((item, newIndex) => {
              const currentIndex = currentItems.findIndex(
                (i: any) => i.id === item.id
              );
              return { item, newIndex, currentIndex };
            })
            .filter(({ newIndex, currentIndex }) => newIndex !== currentIndex)
            .map(({ item, newIndex }) => ({
              id: item.id,
              newSortOrder: newIndex,
            }));

          if (changes.length === 0) {
            return;
          }

          // Optimistic update - React Query cache'ini güncelle
          queryClient.setQueryData(["categories"], (prev: any) =>
            prev.map((category: any) => {
              if (category.id === selectedCategory.id) {
                return {
                  ...category,
                  menu_items: reorderedItems,
                };
              }
              return category;
            })
          );

          // API çağrısını yap
          await reorderItemsMutation.mutateAsync(changes);
        } catch (err: unknown) {
          console.error("Sıralama güncellenirken hata:", err);
          // Hata durumunda eski cache'e geri dön
          queryClient.setQueryData(["categories"], categoriesArray);
        }
      },
      modalClose: () => {
        setEditingItem(null);
        itemModal.onClose();
      },
    },
    // Delete handler
    delete: {
      confirm: async () => {
        if (!deleteTarget) return;

        try {
          if (deleteTarget.type === "category") {
            await deleteCategoryMutation.mutateAsync(deleteTarget.id);

            // Seçili kategori silindiyse seçimi temizle
            if (selectedCategory?.id === deleteTarget.id) {
              setSelectedCategory(null);
            }
          } else {
            await deleteItemMutation.mutateAsync(deleteTarget.id);
          }
          setDeleteTarget(null);
          deleteModal.onClose();
        } catch (err: unknown) {
          console.error("Silme işlemi sırasında hata:", err);
        }
      },
    },
  };

  // Utility functions
  const getItemsByCategory = (categoryId: string) => {
    const category = categoriesArray.find((c: any) => c.id === categoryId);
    return (category as any)?.menu_items || [];
  };

  return {
    // Data
    categories: categoriesArray,

    // State
    selectedCategory,
    setSelectedCategory,
    editingCategory,
    editingItem,
    deleteTarget,

    // Loading states
    loadingStates,

    // Modal states
    modals: {
      category: categoryModal,
      item: itemModal,
      delete: deleteModal,
    },

    // Handlers
    handlers,

    // Utilities
    getItemsByCategory,
  };
};
