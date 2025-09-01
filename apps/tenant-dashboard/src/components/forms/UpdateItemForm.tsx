"use client";

import React from "react";
import { ItemAPI, CategoryAPI } from "@qr-menu/shared-types";
import { updateItemRequestSchema } from "@qr-menu/shared-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemFormUI from "./ItemFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";

interface UpdateItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ItemAPI.Admin.UpdateItemRequest & { file?: File; image_url?: string }
  ) => Promise<void>;
  editingItem: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0];
  categories: CategoryAPI.Admin.GetAllCategoriesResponse;
}

export default function UpdateItemForm({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  categories,
}: UpdateItemFormProps) {
  const methods = useForm<ItemAPI.Admin.UpdateItemRequest>({
    resolver: zodResolver(updateItemRequestSchema),
    defaultValues: {
      name: editingItem.name,
      description: editingItem.description || "",
      price: editingItem.price,
      is_available: editingItem.is_available ?? true,
      is_popular: editingItem.is_popular ?? false,
      is_chef_special: editingItem.is_chef_special ?? false,
      preparation_time: editingItem.preparation_time || 0,
      category_id: editingItem.category_id,
    },
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload(
    editingItem.image_url
  );

  const handleFormSubmit = async (data: ItemAPI.Admin.UpdateItemRequest) => {
    try {
      const payload = preparePayload(data);
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleFormSubmit}>
      <ItemFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Ürün Düzenle"
        submitButtonText="Güncelle"
        submitButtonIcon="🔄"
        files={files}
        setFiles={setFiles}
        categories={categories}
      />
    </FormProvider>
  );
}
