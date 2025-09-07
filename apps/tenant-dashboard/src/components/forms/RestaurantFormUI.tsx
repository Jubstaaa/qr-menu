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
import { ApiType } from "@qr-menu/shared-types";
import {
  FileInput,
  type FileItem,
  TextInput,
  EmailInput,
  TextareaInput,
  SubmitButton,
  FormProvider,
} from "@qr-menu/shared-components";

interface RestaurantFormUIProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  submitButtonText: string;
  submitButtonIcon: string;
  files: FileItem[];
  setFiles: React.Dispatch<React.SetStateAction<FileItem[]>>;
  handleSubmit: (
    data: ApiType.Admin.Menu.Update.Request.Data
  ) => void | Promise<void>;
  methods: UseFormReturn<ApiType.Admin.Menu.Update.Request.Data>;
}

export default function RestaurantFormUI({
  isOpen,
  onClose,
  title,
  submitButtonText,
  submitButtonIcon,
  files,
  setFiles,
  handleSubmit,
  methods,
}: RestaurantFormUIProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <FormProvider
        methods={methods}
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="restaurant_name"
                  label="Restoran Adı"
                  placeholder="Restoran adını girin"
                  isRequired
                />

                <TextInput
                  name="restaurant_phone"
                  label="Telefon"
                  placeholder="+90 555 123 4567"
                />
              </div>

              <TextareaInput
                name="restaurant_description"
                label="Açıklama"
                placeholder="Restoran açıklaması (opsiyonel)"
              />

              <TextareaInput
                name="restaurant_address"
                label="Adres"
                placeholder="Restoran adresini girin"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EmailInput
                  name="restaurant_email"
                  label="E-posta"
                  placeholder="info@restoran.com"
                />

                <TextInput
                  name="opening_time"
                  label="Açılış Saati"
                  type="time"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="closing_time"
                  label="Kapanış Saati"
                  type="time"
                />

                <TextInput
                  name="wifi_ssid"
                  label="WiFi SSID"
                  placeholder="Restoran WiFi adı"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInput
                  name="wifi_password"
                  label="WiFi Şifresi"
                  placeholder="WiFi şifresi"
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
        </ModalContent>
      </FormProvider>
    </Modal>
  );
}
