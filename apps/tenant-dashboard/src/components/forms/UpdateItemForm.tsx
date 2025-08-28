"use client";

import React from "react";
import {
  createItemSchema,
  type CreateItemDto,
} from "@qr-menu/shared-validation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemFormUI from "./ItemFormUI";
import { useFileUpload } from "@qr-menu/shared-components";
import { Item, Category } from "@qr-menu/shared-types";

interface UpdateItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateItemDto & { file?: File; image_url?: string }
  ) => Promise<void>;
  editingItem: Item;
  categories: Category[];
}

export default function UpdateItemForm({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  categories,
}: UpdateItemFormProps) {
  const methods = useForm<CreateItemDto>({
    resolver: zodResolver(createItemSchema),
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

  const handleFormSubmit = async (data: CreateItemDto) => {
    try {
      const payload = preparePayload(data);
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <ItemFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Ürün Düzenle"
        submitButtonText="Güncelle"
        submitButtonIcon="🔄"
        files={files}
        setFiles={setFiles}
        onSubmit={handleFormSubmit}
        categories={categories}
      />
    </FormProvider>
  );
}
