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
import { Edit, Trash, MoreVertical, Star, Clock, Move } from "lucide-react";
import { CategoryAPI } from "@qr-menu/shared-types";

interface ItemCardProps {
  item: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0];
  onEdit: (
    item: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0]
  ) => void;
  onDelete: (
    item: CategoryAPI.Admin.GetAllCategoriesResponse[0]["menu_items"][0]
  ) => void;
  dragHandleProps?: any;
}

export default function ItemCard({
  item,
  onEdit,
  onDelete,
  dragHandleProps,
}: ItemCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{item.name}</h3>
            {item.is_popular && (
              <Chip
                size="sm"
                color="warning"
                variant="flat"
                className="flex items-center gap-1"
                startContent={<Star className="w-3 h-3 flex-shrink-0" />}
              >
                <span>Popüler</span>
              </Chip>
            )}
            {item.is_chef_special && (
              <Chip
                size="sm"
                color="secondary"
                variant="flat"
                className="flex items-center gap-1"
              >
                <span>Şef Özel</span>
              </Chip>
            )}
          </div>
          {item.description && (
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
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
                onPress={() => onEdit(item)}
              >
                Düzenle
              </DropdownItem>
              <DropdownItem
                key="delete"
                className="text-danger"
                color="danger"
                startContent={<Trash className="w-4 h-4" />}
                onPress={() => onDelete(item)}
              >
                Sil
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Chip
              color={item.is_available ? "success" : "default"}
              variant="flat"
              size="sm"
              className="flex items-center gap-1"
            >
              <span>{item.is_available ? "Mevcut" : "Mevcut Değil"}</span>
            </Chip>
            {(item.preparation_time || 0) > 0 && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Clock className="w-3 h-3" />
                {item.preparation_time || 0} dk
              </div>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              ₺{item.price.toFixed(2)}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
