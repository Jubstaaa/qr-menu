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
import { Category } from "@qr-menu/shared-types";

interface CreateItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateItemDto & { file?: File; image_url?: string }
  ) => Promise<void>;
  categories: Category[];
  selectedCategoryId?: string;
}

export default function CreateItemForm({
  isOpen,
  onClose,
  onSubmit,
  categories,
  selectedCategoryId,
}: CreateItemFormProps) {
  const methods = useForm<CreateItemDto>({
    resolver: zodResolver(createItemSchema),
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

  const handleFormSubmit = async (data: CreateItemDto) => {
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
    <FormProvider {...methods}>
      <ItemFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Yeni Ürün Ekle"
        submitButtonText="Ürün Ekle"
        submitButtonIcon="✨"
        files={files}
        setFiles={setFiles}
        onSubmit={handleFormSubmit}
        categories={categories}
      />
    </FormProvider>
  );
}
