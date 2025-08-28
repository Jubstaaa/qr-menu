"use client";

import React from "react";
import { Category } from "@qr-menu/shared-types";
import CreateCategoryForm from "./CreateCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: any
  ) => Promise<void>;
  editingCategory?: Category | null;
}

export default function CategoryForm({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}: CategoryFormProps) {
  if (editingCategory) {
    return (
      <UpdateCategoryForm
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={onSubmit}
        editingCategory={editingCategory}
      />
    );
  }

  return (
    <CreateCategoryForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
}
