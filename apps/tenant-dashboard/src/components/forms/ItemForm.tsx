"use client";

import React from "react";
import { ItemAPI, CategoryAPI } from "@qr-menu/shared-types";
import CreateItemForm from "./CreateItemForm";
import UpdateItemForm from "./UpdateItemForm";

interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editingItem?:
    | CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0]
    | null;
  categories: CategoryAPI.Admin.GetAllCategoriesResponse;
  selectedCategoryId?: string;
}

export default function ItemForm({
  isOpen,
  onClose,
  onSubmit,
  editingItem,
  categories,
  selectedCategoryId,
}: ItemFormProps) {
  if (editingItem) {
    return (
      <UpdateItemForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        editingItem={editingItem}
        categories={categories}
      />
    );
  }

  return (
    <CreateItemForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      categories={categories}
      selectedCategoryId={selectedCategoryId}
    />
  );
}
