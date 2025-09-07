"use client";

import React from "react";
import { ApiType } from "@qr-menu/shared-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RestaurantFormUI from "./RestaurantFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";
import { ApiValidation } from "@qr-menu/shared-validation";

interface UpdateRestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: ApiType.Admin.Menu.Update.Request.Data & {
      file?: File;
      image_url?: string;
    }
  ) => Promise<void>;
  editingRestaurant: ApiType.Admin.Menu.Get.Response;
}

export default function UpdateRestaurantForm({
  isOpen,
  onClose,
  onSubmit,
  editingRestaurant,
}: UpdateRestaurantFormProps) {
  const methods = useForm<ApiType.Admin.Menu.Update.Request.Data>({
    resolver: zodResolver(ApiValidation.Admin.Menu.Update.Request.Data),
    defaultValues: editingRestaurant,
  });

  const { files, setFiles, preparePayload, resetFiles } = useFileUpload(
    editingRestaurant.logo_url
  );

  const handleFormSubmit = async (
    data: ApiType.Admin.Menu.Update.Request.Data
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
    <RestaurantFormUI
      isOpen={isOpen}
      onClose={onClose}
      title="Restoran Düzenle"
      submitButtonText="Güncelle"
      submitButtonIcon="🔄"
      files={files}
      setFiles={setFiles}
      handleSubmit={handleFormSubmit}
      methods={methods}
    />
  );
}
