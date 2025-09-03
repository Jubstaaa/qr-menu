"use client";

import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableCategory from "./SortableCategory";
import { ApiType } from "@qr-menu/shared-types";

interface SortableCategoriesProps {
  categories: ApiType.Admin.Category.GetAll.Response;
  onReorder: (categories: ApiType.Admin.Category.GetAll.Response) => void;
  onEdit: (category: ApiType.Admin.Category.GetAll.Response[0]) => void;
  onDelete: (category: ApiType.Admin.Category.GetAll.Response[0]) => void;
  onSelect: (category: ApiType.Admin.Category.GetAll.Response[0]) => void;
  selectedCategoryId?: string;
  getItemCount?: (categoryId: string) => number;
}

export default function SortableCategories({
  categories,
  onReorder,
  onEdit,
  onDelete,
  onSelect,
  selectedCategoryId,
  getItemCount,
}: SortableCategoriesProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = categories.findIndex(
        (category) => category.id === active.id
      );
      const newIndex = categories.findIndex(
        (category) => category.id === over?.id
      );

      const newCategories = arrayMove(categories, oldIndex, newIndex);
      onReorder(newCategories);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext
        items={categories}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3">
          {categories.map((category) => (
            <SortableCategory
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
              onSelect={onSelect}
              isSelected={selectedCategoryId === category.id}
              itemCount={getItemCount ? getItemCount(category.id) : 0}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
