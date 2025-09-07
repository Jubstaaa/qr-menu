"use client";

import React from "react";
import CreateItemForm from "./CreateItemForm";
import { ApiType } from "@qr-menu/shared-types";
import UpdateItemForm from "./UpdateItemForm";

interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editingItem?: ApiType.Admin.Item.GetAll.Response[0] | null;
  categories: ApiType.Admin.Category.GetAll.Response;
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
