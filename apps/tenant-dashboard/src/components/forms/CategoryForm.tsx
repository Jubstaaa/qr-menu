"use client";

import React from "react";
import CreateCategoryForm from "./CreateCategoryForm";
import UpdateCategoryForm from "./UpdateCategoryForm";
import { ApiType } from "@qr-menu/shared-types";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  editingCategory?: ApiType.Admin.Category.GetAll.Response[0] | null;
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
    <CreateCategoryForm isOpen={isOpen} onClose={onClose} onSubmit={onSubmit} />
  );
}
