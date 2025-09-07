"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { useFormContext, UseFormReturn } from "react-hook-form";
import {
  FileInput,
  SwitchField,
  type FileItem,
  TextInput,
  TextareaInput,
  FormProvider,
  SubmitButton,
} from "@qr-menu/shared-components";
import { ApiType } from "@qr-menu/shared-types";

interface CategoryFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  methods: UseFormReturn<ApiType.Admin.Category.Update.Request.Data>;
  handleFormSubmit: (data: ApiType.Admin.Category.Update.Request.Data) => void;
}

export default function CategoryFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
  methods,
  handleFormSubmit,
}: CategoryFormUIProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <FormProvider
          methods={methods}
          onSubmit={handleFormSubmit}
          className="space-y-6"
        >
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <TextInput
              name="name"
              label="Kategori Adı *"
              placeholder="Örn: Ana Yemekler, Tatlılar, İçecekler"
              isRequired
              description="Kategori adı 1-50 karakter arasında olmalıdır"
            />

            <TextareaInput
              name="description"
              label="Açıklama"
              placeholder="Kategori hakkında kısa bir açıklama yazın (opsiyonel)"
              description="Müşterilerin kategoriyi daha iyi anlaması için yardımcı olur"
            />

            <FileInput
              label="Kategori Görseli"
              files={files}
              onFilesChange={setFiles}
            />

            <SwitchField
              name="is_active"
              label="Kategori Durumu"
              description="Aktif kategoriler menüde görünür"
            />
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
