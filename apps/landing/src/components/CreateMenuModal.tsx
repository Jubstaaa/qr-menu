"use client";

import React, { useMemo } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import { QrCode, Store } from "lucide-react";
import { useModalContext } from "../contexts/ModalContext";
import { RestaurantForm } from "./forms/RestaurantForm";

export const CreateMenuModal = () => {
  const { isCreateMenuModalOpen, closeCreateMenuModal } = useModalContext();

  return (
    <Modal
      isOpen={isCreateMenuModalOpen}
      onClose={closeCreateMenuModal}
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <QrCode className="text-blue-600 text-xl" />
            <span className="text-xl font-bold">QR Menü Oluştur</span>
          </div>
          <p className="text-gray-600">Adım adım menünüzü oluşturun</p>
        </ModalHeader>

        <ModalBody>
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white">
                <Store size={20} />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-600">
                  Restoran Bilgileri
                </h3>
                <p className="text-xs text-gray-500">
                  Restoran adı ve subdomain girin
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <RestaurantForm />
          </div>
        </ModalBody>

        <ModalFooter>
          <div className="flex gap-3 w-full">
            <Button
              variant="bordered"
              onPress={closeCreateMenuModal}
              className="flex-1"
            >
              İptal
            </Button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
