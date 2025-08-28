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
} from "@heroui/react";
import { useFormContext } from "react-hook-form";
import {
  FileInput,
  SwitchField,
  type FileItem,
} from "@qr-menu/shared-components";

interface CategoryFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  onSubmit: (data: any) => Promise<void>;
}

export default function CategoryFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
  onSubmit,
}: CategoryFormUIProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="2xl">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Kategori Adı *"
              placeholder="Örn: Ana Yemekler, Tatlılar, İçecekler"
              {...register("name")}
              isInvalid={!!errors.name}
              errorMessage={errors.name?.message?.toString()}
              variant="bordered"
              description="Kategori adı 1-50 karakter arasında olmalıdır"
            />

            <Textarea
              label="Açıklama"
              placeholder="Kategori hakkında kısa bir açıklama yazın (opsiyonel)"
              {...register("description")}
              variant="bordered"
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
