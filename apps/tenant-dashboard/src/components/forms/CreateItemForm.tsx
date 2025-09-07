"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemFormUI from "./ItemFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

interface CreateItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ApiType.Admin.Item.Update.Request.Data & {
      file?: File;
      image_url?: string;
    }
  ) => Promise<void>;
  categories: ApiType.Admin.Category.GetAll.Response;
  selectedCategoryId?: string;
}

export default function CreateItemForm({
  isOpen,
  onClose,
  onSubmit,
  categories,
  selectedCategoryId,
}: CreateItemFormProps) {
  const methods = useForm<ApiType.Admin.Item.Update.Request.Data>({
    resolver: zodResolver(ApiValidation.Admin.Item.Update.Request.Data),
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

  const handleFormSubmit = async (
    data: ApiType.Admin.Item.Update.Request.Data
  ) => {
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
        methods={methods}
        handleFormSubmit={handleFormSubmit}
      />
    </FormProvider>
  );
}
