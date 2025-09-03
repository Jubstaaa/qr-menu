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
    defaultValues: {
      restaurant_name: editingRestaurant.restaurant_name,
      restaurant_description: editingRestaurant.restaurant_description || "",
      restaurant_address: editingRestaurant.restaurant_address || "",
      restaurant_phone: editingRestaurant.restaurant_phone || "",
      restaurant_email: editingRestaurant.restaurant_email || "",
      logo_url: editingRestaurant.logo_url || "",
      opening_time: editingRestaurant.opening_time || "",
      closing_time: editingRestaurant.closing_time || "",
      wifi_ssid: editingRestaurant.wifi_ssid || "",
      wifi_password: editingRestaurant.wifi_password || "",
    },
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
