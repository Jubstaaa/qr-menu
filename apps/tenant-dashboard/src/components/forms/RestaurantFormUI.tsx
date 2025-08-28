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
import { FileInput, type FileItem } from "@qr-menu/shared-components";

interface RestaurantFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  onSubmit: (data: any) => Promise<void>;
}

export default function RestaurantFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
  onSubmit,
}: RestaurantFormUIProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useFormContext();

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Restoran Adı"
                placeholder="Restoran adını girin"
                {...register("restaurant_name")}
                isInvalid={!!errors.restaurant_name}
                errorMessage={errors.restaurant_name?.message?.toString()}
                variant="bordered"
              />

              <Input
                label="Telefon"
                placeholder="+90 555 123 4567"
                {...register("restaurant_phone")}
                variant="bordered"
              />
            </div>

            <Textarea
              label="Açıklama"
              placeholder="Restoran açıklaması (opsiyonel)"
              {...register("restaurant_description")}
              variant="bordered"
            />

            <Textarea
              label="Adres"
              placeholder="Restoran adresini girin"
              {...register("restaurant_address")}
              isInvalid={!!errors.restaurant_address}
              errorMessage={errors.restaurant_address?.message?.toString()}
              variant="bordered"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="E-posta"
                placeholder="info@restoran.com"
                type="email"
                {...register("restaurant_email")}
                isInvalid={!!errors.restaurant_email}
                errorMessage={errors.restaurant_email?.message?.toString()}
                variant="bordered"
              />

              <Input
                label="Açılış Saati"
                type="time"
                {...register("opening_time")}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Kapanış Saati"
                type="time"
                {...register("closing_time")}
                variant="bordered"
              />

              <Input
                label="WiFi SSID"
                placeholder="Restoran WiFi adı"
                {...register("wifi_ssid")}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="WiFi Şifresi"
                placeholder="WiFi şifresi"
                type="text"
                {...register("wifi_password")}
                variant="bordered"
              />

              <div className="space-y-2">
                <FileInput
                  label="Restoran Logosu"
                  files={files}
                  onFilesChange={setFiles}
                  description="Önerilen boyut: 400x400px, maksimum dosya boyutu: 5MB"
                />
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
