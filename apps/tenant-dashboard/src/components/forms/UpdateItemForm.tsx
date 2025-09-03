"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ItemFormUI from "./ItemFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

interface UpdateItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ApiType.Admin.Item.Update.Request.Data & {
      file?: File;
      image_url?: string;
    }
  ) => Promise<void>;
  editingItem: ApiType.Admin.Category.GetAll.Response[0]["menu_items"][0];
  categories: ApiType.Admin.Category.GetAll.Response;
}

export default function UpdateItemForm({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  categories,
}: UpdateItemFormProps) {
  const methods = useForm<ApiType.Admin.Item.Update.Request.Data>({
    resolver: zodResolver(ApiValidation.Admin.Item.Update.Request.Data),
    defaultValues: {
      name: editingItem.name,
      description: editingItem.description || "",
      price: editingItem.price || 0,
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

  const handleFormSubmit = async (
    data: ApiType.Admin.Item.Update.Request.Data
  ) => {
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
