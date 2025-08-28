"use client";

import React from "react";
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
  Chip,
} from "@heroui/react";
import { useFormContext } from "react-hook-form";
import {
  FileInput,
  SwitchField,
  type FileItem,
} from "@qr-menu/shared-components";
import { Category } from "@qr-menu/shared-types";

interface ItemFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  onSubmit: (data: any) => Promise<void>;
  categories: Category[];
}

export default function ItemFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
  onSubmit,
  categories,
}: ItemFormUIProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Ürün Adı *"
                placeholder="Örn: Karışık Pizza, Çoban Salata"
                {...register("name")}
                isInvalid={!!errors.name}
                errorMessage={errors.name?.message?.toString()}
                variant="bordered"
                description="Ürün adı 1-100 karakter arasında olmalıdır"
              />

              <Input
                label="Fiyat (₺) *"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">₺</span>
                  </div>
                }
                {...register("price", { valueAsNumber: true })}
                isInvalid={!!errors.price}
                errorMessage={errors.price?.message?.toString()}
                variant="bordered"
                description="Ürün fiyatı 0'dan büyük olmalıdır"
              />
            </div>

            <Textarea
              label="Ürün Açıklaması"
              placeholder="Ürün hakkında detaylı bilgi, malzemeler, özellikler..."
              {...register("description")}
              variant="bordered"
              description="Müşterilerin ürünü daha iyi anlaması için yardımcı olur"
              rows={3}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <FileInput
                  label="Ürün Görseli"
                  files={files}
                  onFilesChange={setFiles}
                  description="Önerilen boyut: 800x600px, maksimum dosya boyutu: 5MB"
                />
              </div>

              <div className="space-y-3">
                <Select
                  label="Kategori *"
                  placeholder="Kategori seçin"
                  {...register("category_id")}
                  isInvalid={!!errors.category_id}
                  errorMessage={errors.category_id?.message?.toString()}
                  variant="bordered"
                  description="Ürünün hangi kategoride yer alacağını seçin"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                  ))}
                </Select>

                <Input
                  label="Hazırlama Süresi (dk)"
                  type="number"
                  min="0"
                  placeholder="0"
                  {...register("preparation_time", { valueAsNumber: true })}
                  isInvalid={!!errors.preparation_time}
                  errorMessage={errors.preparation_time?.message?.toString()}
                  variant="bordered"
                  description="Müşteri bekleme süresini bilmek için önemli"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-default-700">
                Ürün Özellikleri
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SwitchField
                  label="Stok Durumu"
                  description="Ürün sipariş edilebilir mi?"
                  isSelected={watch("is_available")}
                  onValueChange={(value) => setValue("is_available", value)}
                  color="success"
                  switchLabel={watch("is_available") ? "Mevcut" : "Tükendi"}
                />

                <SwitchField
                  label="Popüler Ürün"
                  description="Ana sayfada öne çıkarılsın mı?"
                  isSelected={watch("is_popular")}
                  onValueChange={(value) => setValue("is_popular", value)}
                  color="warning"
                  switchLabel={watch("is_popular") ? "Evet" : "Hayır"}
                />

                <SwitchField
                  label="Şef Özel"
                  description="Özel menüde gösterilsin mi?"
                  isSelected={watch("is_chef_special")}
                  onValueChange={(value) => setValue("is_chef_special", value)}
                  color="secondary"
                  switchLabel={watch("is_chef_special") ? "Evet" : "Hayır"}
                />
              </div>
            </div>

            <div className="p-4 bg-default-50 dark:bg-default-900/20 rounded-lg">
              <h4 className="text-sm font-medium text-default-700 mb-3">
                Önizleme
              </h4>
              <div className="flex items-center gap-3">
                <Chip color="primary" variant="flat">
                  {watch("name") || "Ürün Adı"}
                </Chip>
                <Chip color="success" variant="flat">
                  ₺{watch("price") || "0.00"}
                </Chip>
                {watch("is_popular") && (
                  <Chip color="warning" variant="flat">
                    🔥 Popüler
                  </Chip>
                )}
                {watch("is_chef_special") && (
                  <Chip color="secondary" variant="flat">
                    👨‍🍳 Şef Özel
                  </Chip>
                )}
                {watch("preparation_time") > 0 && (
                  <Chip color="default" variant="flat">
                    ⏱️ {watch("preparation_time")} dk
                  </Chip>
                )}
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            İptal
          </Button>
          <Button
            color="primary"
            onPress={() => handleSubmit(onSubmit)()}
            isLoading={isSubmitting}
            endContent={submitButtonIcon}
          >
            {submitButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
