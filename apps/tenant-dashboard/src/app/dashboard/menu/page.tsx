"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Plus } from "lucide-react";

import CategoryForm from "@/components/forms/CategoryForm";
import ItemForm from "@/components/forms/ItemForm";
import DeleteConfirmModal from "@/components/modals/DeleteConfirmModal";
import SortableCategories from "@/components/dnd/SortableCategories";
import SortableItems from "@/components/dnd/SortableItems";
import { useMenuManagement } from "@/hooks/useMenuManagement";
import { Loading } from "@qr-menu/shared-components";

export default function MenuManagementPage() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    editingCategory,
    editingItem,
    deleteTarget,
    loadingStates,
    modals,
    handlers,
    getItemsByCategory,
  } = useMenuManagement();

  if (loadingStates.categories) {
    return <Loading size="lg" text="Menü yükleniyor..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Menü Yönetimi</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Kategoriler
              </h3>
              <Button
                size="sm"
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={modals.category.onOpen}
                isLoading={loadingStates.creatingCategory}
              >
                Ekle
              </Button>
            </CardHeader>
            <CardBody>
              {categories.length > 0 ? (
                <SortableCategories
                  categories={categories}
                  onReorder={handlers.category.reorder}
                  onEdit={handlers.category.edit}
                  onDelete={handlers.category.delete}
                  onSelect={setSelectedCategory}
                  selectedCategoryId={selectedCategory?.id}
                  getItemCount={(categoryId) =>
                    getItemsByCategory(categoryId).length
                  }
                />
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>Henüz kategori bulunmuyor</p>
                  <Button
                    color="primary"
                    size="sm"
                    className="mt-4"
                    onPress={modals.category.onOpen}
                  >
                    İlk Kategoriyi Oluştur
                  </Button>
                </div>
              )}
            </CardBody>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Ürünler {selectedCategory && `- ${selectedCategory.name}`}
              </h3>
              <Button
                size="sm"
                color="primary"
                startContent={<Plus className="w-4 h-4" />}
                onPress={modals.item.onOpen}
                isDisabled={!selectedCategory}
                isLoading={loadingStates.creatingItem}
              >
                Ürün Ekle
              </Button>
            </CardHeader>
            <CardBody>
              {!selectedCategory ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <p>Ürün eklemek için bir kategori seçin</p>
                </div>
              ) : (
                <div>
                  {getItemsByCategory(selectedCategory.id).length > 0 ? (
                    <SortableItems
                      items={getItemsByCategory(selectedCategory.id)}
                      onReorder={handlers.item.reorder}
                      onEdit={handlers.item.edit}
                      onDelete={handlers.item.delete}
                    />
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p>Bu kategoride henüz ürün bulunmuyor</p>
                      <Button
                        color="primary"
                        size="sm"
                        className="mt-4"
                        onPress={modals.item.onOpen}
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
        isOpen={modals.category.isOpen}
        onClose={handlers.category.modalClose}
        onSubmit={handlers.category.submit}
        editingCategory={editingCategory}
      />

      <ItemForm
        isOpen={modals.item.isOpen}
        onClose={handlers.item.modalClose}
        onSubmit={handlers.item.submit}
        editingItem={editingItem}
        categories={categories}
        selectedCategoryId={selectedCategory?.id}
      />

      <DeleteConfirmModal
        isOpen={modals.delete.isOpen}
        onClose={modals.delete.onClose}
        onConfirm={handlers.delete.confirm}
        title={`${deleteTarget?.type === "category" ? "Kategori" : "Ürün"} Sil`}
        message={`"${deleteTarget?.name}" ${deleteTarget?.type === "category" ? "kategorisini" : "ürününü"} silmek istediğinizden emin misiniz?`}
        isLoading={loadingStates.deleting}
      />
    </div>
  );
}
