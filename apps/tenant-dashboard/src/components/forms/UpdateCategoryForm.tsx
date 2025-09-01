"use client";

import React from "react";
import { CategoryAPI } from "@qr-menu/shared-types";
import { updateCategoryRequestSchema } from "@qr-menu/shared-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryFormUI from "./CategoryFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";

interface UpdateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CategoryAPI.Admin.UpdateCategoryRequest & {
      file?: File;
      image_url?: string;
    }
  ) => Promise<void>;
  editingCategory: CategoryAPI.Admin.GetAllCategoriesResponse[0];
}

export default function UpdateCategoryForm({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}: UpdateCategoryFormProps) {
  const methods = useForm<CategoryAPI.Admin.UpdateCategoryRequest>({
    resolver: zodResolver(updateCategoryRequestSchema),
    defaultValues: {
      name: editingCategory.name,
      description: editingCategory.description || "",
      is_active: editingCategory.is_active ?? true,
    },
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload(
    editingCategory.image_url
  );

  React.useEffect(() => {
    if (editingCategory) {
      methods.reset({
        name: editingCategory.name,
        description: editingCategory.description || "",
        is_active: editingCategory.is_active ?? true,
      });
    }
  }, [editingCategory, methods]);

  const handleFormSubmit = async (
    data: CategoryAPI.Admin.UpdateCategoryRequest
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
      <CategoryFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Kategori Düzenle"
        submitButtonText="Güncelle"
        submitButtonIcon="🔄"
        files={files}
        setFiles={setFiles}
      />
    </FormProvider>
  );
}
