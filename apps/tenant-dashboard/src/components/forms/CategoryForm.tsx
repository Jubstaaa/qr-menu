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
  Switch,
} from "@heroui/react";
import { categorySchema, type CategoryFormData } from "../../lib/schemas";
import { Category } from "@qr-menu/shared-types";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormData) => Promise<void>;
  editingCategory?: Category | null;
}

export default function CategoryForm({
  isOpen,
  onClose,
  onSubmit,
  editingCategory,
}: CategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      is_active: true,
    },
  });

  React.useEffect(() => {
    if (editingCategory) {
      reset({
        name: editingCategory.name,
        description: editingCategory.description || "",
        is_active: editingCategory.is_active ?? true,
      });
    } else {
      reset();
    }
  }, [editingCategory, reset]);

  const handleFormSubmit = async (data: CategoryFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>
          {editingCategory ? "Kategori Düzenle" : "Yeni Kategori"}
        </ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <Input
              label="Kategori Adı"
              placeholder="Kategori adını girin"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message}
              variant="bordered"
            />

            <Textarea
              label="Açıklama"
              placeholder="Kategori açıklaması (opsiyonel)"
              {...register("description")}
              variant="bordered"
            />

            <Switch
              isSelected={watch("is_active")}
              onValueChange={(value) => setValue("is_active", value)}
            >
              Aktif
            </Switch>
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
            {editingCategory ? "Güncelle" : "Oluştur"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
