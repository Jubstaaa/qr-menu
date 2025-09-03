"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Edit, Trash, MoreVertical, Move } from "lucide-react";
import { ApiType } from "@qr-menu/shared-types";

interface CategoryCardProps {
  category: ApiType.Admin.Category.GetAll.Response[0];
  itemCount: number;
  onEdit: (category: ApiType.Admin.Category.GetAll.Response[0]) => void;
  onDelete: (category: ApiType.Admin.Category.GetAll.Response[0]) => void;
  dragHandleProps?: any;
}

export default function CategoryCard({
  category,
  itemCount,
  onEdit,
  onDelete,
  dragHandleProps,
}: CategoryCardProps) {
  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{category.name}</h3>
          {category.description && (
            <p className="text-sm text-gray-600 mt-1">{category.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1">
          {dragHandleProps && (
            <div
              {...dragHandleProps}
              data-drag-handle
              className="cursor-grab active:cursor-grabbing p-2 hover:bg-gray-100 rounded flex items-center justify-center min-w-[32px] min-h-[32px]"
            >
              <Move className="w-4 h-4 text-gray-400" />
            </div>
          )}
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly size="sm" variant="light" data-dropdown>
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem
                key="edit"
                startContent={<Edit className="w-4 h-4" />}
                onPress={() => onEdit(category)}
              >
                Düzenle
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash className="w-4 h-4" />}
                onPress={() => onDelete(category)}
              >
                Sil
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <Chip
          color={category.is_active ? "success" : "default"}
          variant="flat"
          size="sm"
        >
          {category.is_active ? "Aktif" : "Pasif"}
        </Chip>
        <span className="text-sm text-gray-500">{itemCount} ürün</span>
      </div>
    </div>
  );
}
