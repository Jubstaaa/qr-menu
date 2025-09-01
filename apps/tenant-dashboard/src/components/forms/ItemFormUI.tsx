"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
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
  TextInput,
  NumberInput,
  TextareaInput,
} from "@qr-menu/shared-components";
import { CategoryAPI } from "@qr-menu/shared-types";

interface ItemFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  categories: CategoryAPI.Admin.GetAllCategoriesResponse;
}

export default function ItemFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
  categories,
}: ItemFormUIProps) {
  const {
    formState: { isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                name="name"
                label="Ürün Adı *"
                placeholder="Örn: Karışık Pizza, Çoban Salata"
                isRequired
                description="Ürün adı 1-100 karakter arasında olmalıdır"
              />

              <NumberInput
                name="price"
                label="Fiyat (₺) *"
                step="0.01"
                min="0"
                placeholder="0.00"
                isRequired
                description="Ürün fiyatı 0'dan büyük olmalıdır"
              />
            </div>

            <TextareaInput
              name="description"
              label="Ürün Açıklaması"
              placeholder="Ürün hakkında detaylı bilgi, malzemeler, özellikler..."
              description="Müşterilerin ürünü daha iyi anlaması için yardımcı olur"
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
                  isRequired
                  description="Ürünün hangi kategoride yer alacağını seçin"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.id}>{category.name}</SelectItem>
                  ))}
                </Select>

                <NumberInput
                  name="preparation_time"
                  label="Hazırlama Süresi (dk)"
                  min="0"
                  placeholder="0"
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
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            İptal
          </Button>
          <Button
            type="submit"
            color="primary"
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
