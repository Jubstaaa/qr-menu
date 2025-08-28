"use client";

import React from "react";
import {
  updateCategorySchema,
  type UpdateCategoryDto,
} from "@qr-menu/shared-validation";
import { Category } from "@qr-menu/shared-types";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryFormUI from "./CategoryFormUI";
import { useFileUpload } from "@qr-menu/shared-components";

interface UpdateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: UpdateCategoryDto & { file?: File; image_url?: string }
  ) => Promise<void>;
  editingCategory: Category;
}

export default function UpdateCategoryForm({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}: UpdateCategoryFormProps) {
  const methods = useForm<UpdateCategoryDto>({
    resolver: zodResolver(updateCategorySchema),
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

  const handleFormSubmit = async (data: UpdateCategoryDto) => {
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
      <CategoryFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Kategori Düzenle"
        submitButtonText="Güncelle"
        submitButtonIcon="🔄"
        files={files}
        setFiles={setFiles}
        onSubmit={handleFormSubmit}
      />
    </FormProvider>
  );
}
