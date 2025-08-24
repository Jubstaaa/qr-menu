"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Category } from "@qr-menu/shared-types";
import CategoryCard from "../cards/CategoryCard";
import { cn } from "@heroui/react";

interface SortableCategoryProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
  onSelect: (category: Category) => void;
  isSelected: boolean;
  itemCount: number;
}

export default function SortableCategory({
  category,
  onEdit,
  onDelete,
  onSelect,
  isSelected,
  itemCount,
}: SortableCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "p-3 rounded-lg border transition-colors cursor-pointer",
        isSelected && "bg-blue-50 border-blue-200",
        !isSelected && "bg-white border-gray-200 hover:bg-gray-50"
      )}
      onClick={() => onSelect(category)}
    >
      <CategoryCard
        category={category}
        itemCount={itemCount}
        onEdit={onEdit}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
