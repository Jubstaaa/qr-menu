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
  editingItem: ApiType.Admin.Item.GetAll.Response[0];
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
    defaultValues: editingItem,
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
    <ItemFormUI
      isOpen={isOpen}
      onClose={onClose}
      title="Ürün Düzenle"
      submitButtonText="Güncelle"
      submitButtonIcon="🔄"
      files={files}
      setFiles={setFiles}
      categories={categories}
      methods={methods}
      handleFormSubmit={handleFormSubmit}
    />
  );
}
