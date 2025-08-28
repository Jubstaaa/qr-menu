"use client";

import React from "react";
import {
  createCategorySchema,
  type CreateCategoryDto,
} from "@qr-menu/shared-validation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CategoryFormUI from "./CategoryFormUI";
import { useFileUpload } from "@qr-menu/shared-components";

interface CreateCategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: CreateCategoryDto & { file?: File; image_url?: string }
  ) => Promise<void>;
}

export default function CreateCategoryForm({
  isOpen,
  onClose,
  onSubmit,
}: CreateCategoryFormProps) {
  const methods = useForm<CreateCategoryDto>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      name: "",
      description: "",
      is_active: true,
    },
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload();

  const handleFormSubmit = async (data: CreateCategoryDto) => {
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
        title="Yeni Kategori Oluştur"
        submitButtonText="Oluştur"
        submitButtonIcon="✨"
        files={files}
        setFiles={setFiles}
        onSubmit={handleFormSubmit}
      />
    </FormProvider>
  );
}
