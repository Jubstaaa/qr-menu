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
import { useFormContext } from "react-hook-form";
import {
  FileInput,
  SwitchField,
  type FileItem,
  TextInput,
  TextareaInput,
} from "@qr-menu/shared-components";

interface CategoryFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
}

export default function CategoryFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
}: CategoryFormUIProps) {
  const {
    formState: { isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <div className="space-y-6">
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
              label="Kategori Durumu"
              description="Aktif kategoriler menüde görünür"
              isSelected={watch("is_active")}
              onValueChange={(value) => setValue("is_active", value)}
            />
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
