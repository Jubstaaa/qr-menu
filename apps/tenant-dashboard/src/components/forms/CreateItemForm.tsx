"use client";

import React from "react";
import { ItemAPI, CategoryAPI } from "@qr-menu/shared-types";
import { createItemRequestSchema } from "@qr-menu/shared-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemFormUI from "./ItemFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";

interface CreateItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ItemAPI.Admin.CreateItemRequest & { file?: File; image_url?: string }
  ) => Promise<void>;
  categories: CategoryAPI.Admin.GetAllCategoriesResponse;
  selectedCategoryId?: string;
}

export default function CreateItemForm({
  isOpen,
  onClose,
  onSubmit,
  categories,
  selectedCategoryId,
}: CreateItemFormProps) {
  const methods = useForm<ItemAPI.Admin.CreateItemRequest>({
    resolver: zodResolver(createItemRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      is_available: true,
      is_popular: false,
      is_chef_special: false,
      preparation_time: 0,
      category_id: selectedCategoryId || "",
    },
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload();

  const handleFormSubmit = async (data: ItemAPI.Admin.CreateItemRequest) => {
    try {
      const payload = preparePayload(data);
      await onSubmit(payload);
      methods.reset();
      resetFiles();
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
        title="Yeni Ürün Ekle"
        submitButtonText="Ürün Ekle"
        submitButtonIcon="✨"
        files={files}
        setFiles={setFiles}
        categories={categories}
      />
    </FormProvider>
  );
}
