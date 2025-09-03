"use client";

import React from "react";
import UpdateRestaurantForm from "./UpdateRestaurantForm";
import { ApiType } from "@qr-menu/shared-types";

interface RestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editingRestaurant: ApiType.Admin.Menu.Get.Response;
}

export default function RestaurantForm({
  isOpen,
  onClose,
  onSubmit,
  editingRestaurant,
}: RestaurantFormProps) {
  return (
    <UpdateRestaurantForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      editingRestaurant={editingRestaurant}
    />
  );
}
