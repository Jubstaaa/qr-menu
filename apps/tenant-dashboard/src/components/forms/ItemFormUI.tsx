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
  Switch,
  Chip,
} from "@heroui/react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import {
  FileInput,
  SwitchField,
  type FileItem,
  TextInput,
  NumberInput,
  TextareaInput,
  SelectInput,
  SelectItem,
  ArrayInput,
  KeyValueInput,
  FormProvider,
  SubmitButton,
} from "@qr-menu/shared-components";
import { ApiType } from "@qr-menu/shared-types";
import { getSpiceLevelOptions } from "@qr-menu/shared-utils";

interface ItemFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  categories: ApiType.Admin.Category.GetAll.Response;
  methods: UseFormReturn<ApiType.Admin.Item.Update.Request.Data>;
  handleFormSubmit: (data: ApiType.Admin.Item.Update.Request.Data) => void;
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
  methods,
  handleFormSubmit,
}: ItemFormUIProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalContent>
        <FormProvider methods={methods} onSubmit={handleFormSubmit}>
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
                  <SelectInput
                    name="category_id"
                    label="Kategori *"
                    placeholder="Kategori seçin"
                    isRequired
                    description="Ürünün hangi kategoride yer alacağını seçin"
                  >
                    {categories.map(
                      (category: ApiType.Admin.Category.GetAll.Response[0]) => (
                        <SelectItem key={category.id}>
                          {category.name}
                        </SelectItem>
                      )
                    )}
                  </SelectInput>

                  <NumberInput
                    name="preparation_time"
                    label="Hazırlama Süresi (dk)"
                    min="0"
                    max="180"
                    placeholder="0"
                    description="Müşteri bekleme süresini bilmek için önemli"
                  />

                  <SelectInput
                    name="spice_level"
                    label="Acı Seviyesi"
                    placeholder="Acı seviyesi seçin"
                    description="Ürünün acı seviyesini belirtin"
                    valueAsNumber={true}
                  >
                    {getSpiceLevelOptions().map((option) => (
                      <SelectItem key={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectInput>
                </div>
              </div>

              <div className="space-y-4">
                <KeyValueInput
                  name="nutrition_info"
                  label="Beslenme Bilgileri"
                  placeholders={{
                    key: "Kalori, Protein...",
                    value: "123, 15g...",
                  }}
                  description="Müşterilerin beslenme tercihlerini bilmesi için"
                />

                <ArrayInput
                  name="allergens"
                  label="Alerjenler"
                  placeholder="Gluten, süt, fındık..."
                  description="Alerjisi olan müşteriler için önemli bilgi"
                />
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-default-700">
                  Ürün Özellikleri
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <SwitchField
                    name="is_available"
                    label="Stok Durumu"
                    description="Ürün sipariş edilebilir mi?"
                    color="success"
                    labels={{ true: "Mevcut", false: "Tükendi" }}
                  />

                  <SwitchField
                    name="is_popular"
                    label="Popüler Ürün"
                    description="Ana sayfada öne çıkarılsın mı?"
                    color="warning"
                    labels={{ true: "Evet", false: "Hayır" }}
                  />

                  <SwitchField
                    name="is_chef_special"
                    label="Şef Özel"
                    description="Özel menüde gösterilsin mi?"
                    color="secondary"
                    labels={{ true: "Evet", false: "Hayır" }}
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              İptal
            </Button>
            <SubmitButton color="primary" endContent={submitButtonIcon}>
              {submitButtonText}
            </SubmitButton>
          </ModalFooter>
        </FormProvider>
      </ModalContent>
    </Modal>
  );
}
