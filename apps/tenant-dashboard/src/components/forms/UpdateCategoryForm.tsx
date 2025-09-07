"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryFormUI from "./CategoryFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

interface UpdateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ApiType.Admin.Category.Update.Request.Data & {
      file?: File;
      image_url?: string;
    }
  ) => Promise<void>;
  editingCategory: ApiType.Admin.Category.GetAll.Response[0];
}

export default function UpdateCategoryForm({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}: UpdateCategoryFormProps) {
  const methods = useForm<ApiType.Admin.Category.Update.Request.Data>({
    resolver: zodResolver(ApiValidation.Admin.Category.Update.Request.Data),
    defaultValues: editingCategory,
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload(
    editingCategory.image_url
  );

  React.useEffect(() => {
    if (editingCategory) {
      methods.reset(editingCategory);
    }
  }, [editingCategory, methods]);

  const handleFormSubmit = async (
    data: ApiType.Admin.Category.Update.Request.Data
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
    <CategoryFormUI
      methods={methods}
      handleFormSubmit={handleFormSubmit}
      isOpen={isOpen}
      onClose={onClose}
      title="Kategori Düzenle"
      submitButtonText="Güncelle"
      submitButtonIcon="🔄"
      files={files}
      setFiles={setFiles}
    />
  );
}
