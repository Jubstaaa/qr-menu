"use client";

import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ItemCard from "@/components/cards/ItemCard";
import { ApiType } from "@qr-menu/shared-types";

interface SortableItemProps {
  item: ApiType.Admin.Item.GetAll.Response[0];
  onEdit: (item: ApiType.Admin.Item.GetAll.Response[0]) => void;
  onDelete: (item: ApiType.Admin.Item.GetAll.Response[0]) => void;
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
