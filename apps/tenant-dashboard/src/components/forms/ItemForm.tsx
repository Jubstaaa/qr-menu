"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import { itemSchema, type ItemFormData } from "../../lib/schemas";
import { Item, Category } from "@qr-menu/shared-types";

interface ItemFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ItemFormData) => Promise<void>;
  editingItem?: Item | null;
  categories: Category[];
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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ItemFormData>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      image_url: "",
      is_available: true,
      is_popular: false,
      is_chef_special: false,
      preparation_time: 0,
      category_id: selectedCategoryId || "",
    },
  });

  React.useEffect(() => {
    if (editingItem) {
      reset({
        name: editingItem.name,
        description: editingItem.description || "",
        price: editingItem.price,
        image_url: editingItem.image_url || "",
        is_available: editingItem.is_available ?? true,
        is_popular: editingItem.is_popular ?? false,
        is_chef_special: editingItem.is_chef_special ?? false,
        preparation_time: editingItem.preparation_time || 0,
        category_id: editingItem.category_id,
      });
    } else {
      reset({
        name: "",
        description: "",
        price: 0,
        image_url: "",
        is_available: true,
        is_popular: false,
        is_chef_special: false,
        preparation_time: 0,
        category_id: selectedCategoryId || "",
      });
    }
  }, [editingItem, selectedCategoryId, reset]);

  const handleFormSubmit = async (data: ItemFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader>{editingItem ? "Ürün Düzenle" : "Yeni Ürün"}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Ürün Adı"
                placeholder="Ürün adını girin"
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message}
                variant="bordered"
              />

              <Input
                label="Fiyat"
                type="number"
                step="0.01"
                placeholder="0.00"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₺</span>
                  </div>
                }
                {...register("price", { valueAsNumber: true })}
                isInvalid={!!errors.price}
                errorMessage={errors.price?.message}
                variant="bordered"
              />
            </div>

            <Textarea
              label="Açıklama"
              placeholder="Ürün açıklaması (opsiyonel)"
              {...register("description")}
              variant="bordered"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Resim URL"
                placeholder="https://example.com/image.jpg"
                {...register("image_url")}
                isInvalid={!!errors.image_url}
                errorMessage={errors.image_url?.message}
                variant="bordered"
              />

              <Select
                label="Kategori"
                placeholder="Kategori seçin"
                {...register("category_id")}
                isInvalid={!!errors.category_id}
                errorMessage={errors.category_id?.message}
                variant="bordered"
              >
                {categories.map((category) => (
                  <SelectItem key={category.id}>{category.name}</SelectItem>
                ))}
              </Select>
            </div>

            <Input
              label="Hazırlama Süresi (dk)"
              type="number"
              placeholder="0"
              {...register("preparation_time", { valueAsNumber: true })}
              isInvalid={!!errors.preparation_time}
              errorMessage={errors.preparation_time?.message}
              variant="bordered"
            />

            <div className="flex flex-wrap gap-4">
              <Switch
                isSelected={watch("is_available")}
                onValueChange={(value) => setValue("is_available", value)}
              >
                Mevcut
              </Switch>

              <Switch
                isSelected={watch("is_popular")}
                onValueChange={(value) => setValue("is_popular", value)}
              >
                Popüler
              </Switch>

              <Switch
                isSelected={watch("is_chef_special")}
                onValueChange={(value) => setValue("is_chef_special", value)}
              >
                Şef Özel
              </Switch>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            İptal
          </Button>
          <Button
            color="primary"
            onPress={() => handleSubmit(handleFormSubmit)()}
            isLoading={isSubmitting}
          >
            {editingItem ? "Güncelle" : "Oluştur"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
