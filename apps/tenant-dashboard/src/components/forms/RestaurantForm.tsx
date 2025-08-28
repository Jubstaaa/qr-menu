"use client";

import React from "react";
import { Menu } from "@qr-menu/shared-types";
import UpdateRestaurantForm from "./UpdateRestaurantForm";

interface RestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editingRestaurant: Menu;
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
