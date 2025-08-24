"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Select,
  SelectItem,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
  Spinner,
} from "@heroui/react";
import { FaQrcode, FaStore, FaCreditCard } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { addToast } from "@heroui/react";
import { apiClient } from "@qr-menu/shared-utils";

// Zod schemas
const restaurantSchema = z.object({
  name: z.string().min(2, "Restoran adı en az 2 karakter olmalıdır"),
  subdomain: z
    .string()
    .min(3, "Subdomain en az 3 karakter olmalıdır")
    .regex(
      /^[a-z0-9-]+$/,
      "Sadece küçük harf, rakam ve tire kullanabilirsiniz"
    ),
});

const steps = [
  {
    title: "Restoran Bilgileri",
    description: "Restoran adı ve subdomain girin",
    icon: FaStore,
  },
];

interface CreateMenuModalProps {
  children: (onOpen: () => void) => React.ReactNode;
}

export const CreateMenuModal: React.FC<CreateMenuModalProps> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // React Hook Form hooks
  const {
    register: registerRestaurant,
    handleSubmit: handleRestaurantSubmit,
    formState: { errors: restaurantErrors },
    watch: watchRestaurant,
    reset: resetRestaurant,
  } = useForm({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      name: "",
      subdomain: "",
    },
  });

  const onRestaurantSubmit = handleRestaurantSubmit(
    async (data) => {
      setLoading(true);

      try {
        // Check if user is authenticated
        if (!user) {
          throw new Error("Giriş yapmanız gerekiyor");
        }

        // Create menu via API
        const menuResponse = await apiClient.adminCreateMenu(
          data.name,
          data.subdomain
        );

        console.log("Menu created:", menuResponse);

        // Success - reset form and close modal
        resetRestaurant();
        onClose();

        // Show success toast
        addToast({
          title: "Başarılı!",
          description: `Menü başarıyla oluşturuldu! URL: ${menuResponse.data.menu.subdomain}.qrmenu.com`,
          color: "success",
        });
      } catch (err: any) {
        console.error("Menu creation failed:", err);
        const errorMessage =
          err.message || "Menü oluşturulamadı. Lütfen tekrar deneyin.";

        // Show error toast
        addToast({
          title: "Hata!",
          description: errorMessage,
          color: "danger",
        });
      } finally {
        setLoading(false);
      }
    },
    (errors) => {
      console.log("Restaurant form errors:", errors);
    }
  );

  const handleClose = () => {
    // Reset form when modal closes
    resetRestaurant();
    onClose();
  };

  const renderStep1 = () => (
    <form onSubmit={onRestaurantSubmit}>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Restoran Bilgileri
          </h2>
          <p className="text-gray-600">
            Menünüzü oluşturmak için temel bilgileri girin
          </p>
        </div>

        <div className="space-y-4">
          <Input
            {...registerRestaurant("name")}
            isRequired
            errorMessage={restaurantErrors.name?.message}
            validationBehavior="aria"
            isInvalid={!!restaurantErrors.name}
            label="Restoran Adı"
            placeholder="Restoran adınızı girin"
          />

          <div>
            <Input
              {...registerRestaurant("subdomain")}
              isRequired
              errorMessage={restaurantErrors.subdomain?.message}
              validationBehavior="aria"
              isInvalid={!!restaurantErrors.subdomain}
              label="Subdomain"
              placeholder="restoran-adi"
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    .qrmenu.com
                  </span>
                </div>
              }
            />
            <p className="text-sm text-gray-500 mt-1">
              Örnek: {watchRestaurant("subdomain") || "restoran-adi"}
              .qrmenu.com
            </p>
          </div>
        </div>
      </div>
    </form>
  );

  return (
    <>
      {children(onOpen)}

      <Modal isOpen={isOpen} onClose={handleClose} size="2xl">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <FaQrcode className="text-blue-600 text-xl" />
              <span className="text-xl font-bold">QR Menü Oluştur</span>
            </div>
            <p className="text-gray-600">Adım adım menünüzü oluşturun</p>
          </ModalHeader>

          <ModalBody>
            {/* Steps */}
            <div className="flex items-center justify-center mb-6">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      index <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    <step.icon size={20} />
                  </div>
                  <div className="ml-3">
                    <h3
                      className={`text-sm font-medium ${
                        index <= currentStep ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-500">{step.description}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        index < currentStep ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="mb-6">{renderStep1()}</div>
          </ModalBody>

          <ModalFooter>
            <div className="flex gap-3 w-full">
              <Button
                variant="bordered"
                onPress={handleClose}
                className="flex-1"
              >
                İptal
              </Button>
              <Button
                color="primary"
                onPress={() => onRestaurantSubmit()}
                isDisabled={
                  !watchRestaurant("name") ||
                  !watchRestaurant("subdomain") ||
                  loading
                }
                className="flex-1"
                isLoading={loading}
              >
                {loading ? "İşleniyor..." : "Menü Oluştur"}
              </Button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
