"use client";

import React from "react";
import { CategoryAPI } from "@qr-menu/shared-types";
import { createCategoryRequestSchema } from "@qr-menu/shared-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryFormUI from "./CategoryFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";

interface CreateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CategoryAPI.Admin.CreateCategoryRequest & {
      file?: File;
      image_url?: string;
    }
  ) => Promise<void>;
}

export default function CreateCategoryForm({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryFormProps) {
  const methods = useForm<CategoryAPI.Admin.CreateCategoryRequest>({
    resolver: zodResolver(createCategoryRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload();

  const handleFormSubmit = async (
    data: CategoryAPI.Admin.CreateCategoryRequest
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
        title="Yeni Kategori Oluştur"
        submitButtonText="Oluştur"
        submitButtonIcon="✨"
        files={files}
        setFiles={setFiles}
      />
    </FormProvider>
  );
}
