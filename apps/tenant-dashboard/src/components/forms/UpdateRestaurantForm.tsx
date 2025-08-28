"use client";

import React from "react";
import {
  updateRestaurantSchema,
  type UpdateRestaurantDto,
} from "@qr-menu/shared-validation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RestaurantFormUI from "./RestaurantFormUI";
import { useFileUpload } from "@qr-menu/shared-components";
import { Menu } from "@qr-menu/shared-types";

interface UpdateRestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: UpdateRestaurantDto & { file?: File; image_url?: string }
  ) => Promise<void>;
  editingRestaurant: Menu;
}

export default function UpdateRestaurantForm({
  isOpen,
  onClose,
  onSubmit,
  editingRestaurant,
}: UpdateRestaurantFormProps) {
  const methods = useForm<UpdateRestaurantDto>({
    resolver: zodResolver(updateRestaurantSchema),
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

  const handleFormSubmit = async (data: UpdateRestaurantDto) => {
    try {
      const payload = preparePayload(data);
      await onSubmit(payload);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <FormProvider {...methods}>
      <RestaurantFormUI
        isOpen={isOpen}
        onClose={onClose}
        title="Restoran Düzenle"
        submitButtonText="Güncelle"
        submitButtonIcon="🔄"
        files={files}
        setFiles={setFiles}
        onSubmit={handleFormSubmit}
      />
    </FormProvider>
  );
}
