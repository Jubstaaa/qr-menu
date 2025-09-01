"use client";

import React from "react";
import { MenuAPI } from "@qr-menu/shared-types";
import { updateMenuRequestSchema } from "@qr-menu/shared-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RestaurantFormUI from "./RestaurantFormUI";
import { useFileUpload, FormProvider } from "@qr-menu/shared-components";

interface UpdateRestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: MenuAPI.Admin.UpdateMenuRequest & { file?: File; image_url?: string }
  ) => Promise<void>;
  editingRestaurant: MenuAPI.Admin.GetMenusByUserResponse;
}

export default function UpdateRestaurantForm({
  isOpen,
  onClose,
  onSubmit,
  editingRestaurant,
}: UpdateRestaurantFormProps) {
  const methods = useForm<MenuAPI.Admin.UpdateMenuRequest>({
    resolver: zodResolver(updateMenuRequestSchema),
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

  const handleFormSubmit = async (data: MenuAPI.Admin.UpdateMenuRequest) => {
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
      <RestaurantFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Restoran Düzenle"
        submitButtonText="Güncelle"
        submitButtonIcon="🔄"
        files={files}
        setFiles={setFiles}
      />
    </FormProvider>
  );
}
