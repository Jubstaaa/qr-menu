"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CategoryAPI } from "@qr-menu/shared-types";
import ItemCard from "../cards/ItemCard";

interface SortableItemProps {
  item: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0];
  onEdit: (
    item: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0]
  ) => void;
  onDelete: (
    item: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0]
  ) => void;
}

export default function SortableItem({
  item,
  onEdit,
  onDelete,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ItemCard
        item={item}
        onEdit={onEdit}
        onDelete={onDelete}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}
