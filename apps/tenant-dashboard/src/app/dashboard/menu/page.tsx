"use client";

import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { Plus } from "lucide-react";
import { apiClient } from "@qr-menu/shared-utils";
import { Category, Item, Menu, ItemDto } from "@qr-menu/shared-types";
import {
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateItemDto,
} from "@qr-menu/shared-validation";

import CategoryForm from "../../../components/forms/CategoryForm";
import ItemForm from "../../../components/forms/ItemForm";
import DeleteConfirmModal from "../../../components/modals/DeleteConfirmModal";
import SortableCategories from "../../../components/dnd/SortableCategories";
import SortableItems from "../../../components/dnd/SortableItems";

export default function MenuManagementPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState<Menu | null>(null);

  const {
    isOpen: isCategoryModalOpen,
    onOpen: onCategoryModalOpen,
    onClose: onCategoryModalClose,
  } = useDisclosure();
  const {
    isOpen: isItemModalOpen,
    onOpen: onItemModalOpen,
    onClose: onItemModalClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onDeleteModalOpen,
    onClose: onDeleteModalClose,
  } = useDisclosure();

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: "category" | "item";
    id: string;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const categoriesResponse = await apiClient.getCategories();

      if (categoriesResponse.data && Array.isArray(categoriesResponse.data)) {
        setCategories(categoriesResponse.data);
      }
    } catch (err: unknown) {
      console.error("Error loading data:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Veri yüklenirken hata oluştu";
      addToast({
        title: "Hata",
        description: errorMessage,
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySubmit = async (
    data:
      | CreateCategoryDto
      | (UpdateCategoryDto & { file?: File; image_url?: string })
  ) => {
    try {
      if (editingCategory) {
        const { data: updatedCategory, message } =
          await apiClient.updateCategory(editingCategory.id, data);
        if (updatedCategory) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === editingCategory.id
                ? {
                    ...updatedCategory,
                    menu_items: (cat as any).menu_items || [],
                  }
                : cat
            )
          );
          addToast({
            title: message,
            color: "success",
          });
        }
      } else {
        const { data: newCategory, message } =
          await apiClient.createCategory(data);
        if (newCategory) {
          setCategories((prev) => [
            ...prev,
            { ...newCategory, menu_items: [] },
          ]);
          addToast({
            title: message,
            color: "success",
          });
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Kategori kaydedilirken hata oluştu";
      addToast({
        title: "Kaydetme Hatası",
        description: errorMessage,
        color: "danger",
      });
      throw err;
    }
  };

  const handleCategoryEdit = (category: Category) => {
    setEditingCategory(category);
    onCategoryModalOpen();
  };

  const handleCategoryDelete = (category: Category) => {
    setDeleteTarget({ type: "category", id: category.id, name: category.name });
    onDeleteModalOpen();
  };

  const handleItemSubmit = async (
    data: CreateItemDto & { file?: File; image_url?: string }
  ) => {
    try {
      if (editingItem) {
        const { data: updatedItem, message } = await apiClient.updateItem(
          editingItem.id,
          data
        );
        if (updatedItem) {
          setCategories((prev) =>
            prev.map((cat) => {
              const currentItems = (cat as any).menu_items || [];

              if (
                cat.id === editingItem.category_id &&
                editingItem.category_id !== data.category_id
              ) {
                return {
                  ...cat,
                  menu_items: currentItems.filter(
                    (item: ItemDto) => item.id !== editingItem.id
                  ),
                };
              }

              if (cat.id === data.category_id) {
                const existingItemIndex = currentItems.findIndex(
                  (item: ItemDto) => item.id === editingItem.id
                );

                if (existingItemIndex >= 0) {
                  return {
                    ...cat,
                    menu_items: currentItems.map((item: ItemDto) =>
                      item.id === editingItem.id ? updatedItem : item
                    ),
                  };
                } else {
                  return {
                    ...cat,
                    menu_items: [...currentItems, updatedItem],
                  };
                }
              }

              return cat;
            })
          );
          addToast({
            title: message,
            color: "success",
          });
        }
      } else {
        const { data: newItem, message } = await apiClient.createItem(data);
        if (newItem) {
          setCategories((prev) =>
            prev.map((cat) => ({
              ...cat,
              menu_items:
                cat.id === data.category_id
                  ? [...((cat as any).menu_items || []), newItem]
                  : (cat as any).menu_items || [],
            }))
          );
          addToast({
            title: message,
            color: "success",
          });
        }
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Ürün kaydedilirken hata oluştu";
      addToast({
        title: "Kaydetme Hatası",
        description: errorMessage,
        color: "danger",
      });
      throw err;
    }
  };

  const handleItemEdit = (item: Item) => {
    setEditingItem(item);
    onItemModalOpen();
  };

  const handleItemDelete = (item: Item) => {
    setDeleteTarget({ type: "item", id: item.id, name: item.name });
    onDeleteModalOpen();
  };

  const handleCategoryReorder = async (reorderedCategories: Category[]) => {
    try {
      const currentCategories = categories;

      const changes = reorderedCategories
        .map((category, newIndex) => {
          const currentIndex = currentCategories.findIndex(
            (c) => c.id === category.id
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

      setCategories(reorderedCategories);

      if (selectedCategory) {
        const newSelectedCategory = reorderedCategories.find(
          (c) => c.id === selectedCategory.id
        );
        if (newSelectedCategory) {
          setSelectedCategory(newSelectedCategory);
        }
      }

      await apiClient.reorderCategories(changes);

      addToast({
        title: "Kategori Sıralaması Güncellendi",
        color: "success",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Kategori sıralaması güncellenirken hata oluştu";
      addToast({
        title: "Sıralama Hatası",
        description: errorMessage,
        color: "danger",
      });
    }
  };

  const handleItemReorder = async (reorderedItems: Item[]) => {
    if (!selectedCategory) return;

    try {
      const currentItems = getItemsByCategory(selectedCategory.id);

      const changes = reorderedItems
        .map((item, newIndex) => {
          const currentIndex = currentItems.findIndex(
            (i: ItemDto) => i.id === item.id
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

      setCategories((prev) =>
        prev.map((cat) => ({
          ...cat,
          menu_items:
            cat.id === selectedCategory.id
              ? reorderedItems
              : (cat as any).menu_items || [],
        }))
      );

      await apiClient.reorderItemsInCategory(changes);

      addToast({
        title: "Sıralama Güncellendi",
        color: "success",
      });
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Sıralama güncellenirken hata oluştu";
      addToast({
        title: "Sıralama Hatası",
        description: errorMessage,
        color: "danger",
      });
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;

    setIsDeleting(true);
    try {
      if (deleteTarget.type === "category") {
        const { message } = await apiClient.deleteCategory(deleteTarget.id);
        setCategories((prev) =>
          prev.filter((cat) => cat.id !== deleteTarget.id)
        );
        addToast({
          title: message,
          color: "success",
        });
      } else {
        const { message } = await apiClient.deleteItem(deleteTarget.id);

        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            menu_items:
              (cat as any).menu_items?.filter(
                (item: ItemDto) => item.id !== deleteTarget.id
              ) || [],
          }))
        );
        addToast({
          title: message,
          color: "success",
        });
      }

      onDeleteModalClose();
      setDeleteTarget(null);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Silme işlemi başarısız oldu";
      addToast({
        title: "Silme Hatası",
        description: errorMessage,
        color: "danger",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCategoryModalClose = () => {
    setEditingCategory(null);
    onCategoryModalClose();
  };

  const handleItemModalClose = () => {
    setEditingItem(null);
    onItemModalClose();
  };

  const getItemsByCategory = (categoryId: string) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return (category as any)?.menu_items || [];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menü Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Kategoriler</h3>
              <Button
                size="sm"
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onCategoryModalOpen}
              >
                Ekle
              </Button>
            </CardHeader>
            <CardBody>
              {categories.length > 0 ? (
                <SortableCategories
                  categories={categories}
                  onReorder={handleCategoryReorder}
                  onEdit={handleCategoryEdit}
                  onDelete={handleCategoryDelete}
                  onSelect={setSelectedCategory}
                  selectedCategoryId={selectedCategory?.id}
                  getItemCount={(categoryId) =>
                    getItemsByCategory(categoryId).length
                  }
                />
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Henüz kategori bulunmuyor</p>
                  <Button
                    color="primary"
                    size="sm"
                    className="mt-4"
                    onPress={onCategoryModalOpen}
                  >
                    İlk Kategoriyi Oluştur
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                Ürünler {selectedCategory && `- ${selectedCategory.name}`}
              </h3>
              <Button
                size="sm"
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={onItemModalOpen}
                isDisabled={!selectedCategory}
              >
                Ürün Ekle
              </Button>
            </CardHeader>
            <CardBody>
              {!selectedCategory ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Ürün eklemek için bir kategori seçin</p>
                </div>
              ) : (
                <div>
                  {getItemsByCategory(selectedCategory.id).length > 0 ? (
                    <SortableItems
                      items={getItemsByCategory(selectedCategory.id) as Item[]}
                      onReorder={handleItemReorder}
                      onEdit={handleItemEdit}
                      onDelete={handleItemDelete}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Bu kategoride henüz ürün bulunmuyor</p>
                      <Button
                        color="primary"
                        size="sm"
                        className="mt-4"
                        onPress={onItemModalOpen}
                      >
                        İlk Ürünü Oluştur
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      <CategoryForm
        isOpen={isCategoryModalOpen}
        onClose={handleCategoryModalClose}
        onSubmit={handleCategorySubmit}
        editingCategory={editingCategory}
      />

      <ItemForm
        isOpen={isItemModalOpen}
        onClose={handleItemModalClose}
        onSubmit={handleItemSubmit}
        editingItem={editingItem}
        categories={categories}
        selectedCategoryId={selectedCategory?.id}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={onDeleteModalClose}
        onConfirm={handleDeleteConfirm}
        title={`${deleteTarget?.type === "category" ? "Kategori" : "Ürün"} Sil`}
        message={`"${deleteTarget?.name}" ${deleteTarget?.type === "category" ? "kategorisini" : "ürününü"} silmek istediğinizden emin misiniz?`}
        isLoading={isDeleting}
      />
    </div>
  );
}
