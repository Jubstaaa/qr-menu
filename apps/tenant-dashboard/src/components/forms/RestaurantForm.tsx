"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
} from "@heroui/react";

import { z } from "zod";
import { Menu } from "@qr-menu/shared-types";

const restaurantSchema = z.object({
  restaurant_name: z.string().min(1, "Restoran adı gerekli"),
  restaurant_description: z.string().optional(),
  restaurant_address: z.string().min(1, "Adres gerekli"),
  restaurant_phone: z.string().optional(),
  restaurant_email: z
    .string()
    .email("Geçerli bir e-posta girin")
    .optional()
    .or(z.literal("")),

  opening_time: z.string().optional(),
  closing_time: z.string().optional(),
  wifi_ssid: z.string().optional(),
  wifi_password: z.string().optional(),
});

type RestaurantFormData = z.infer<typeof restaurantSchema>;

interface RestaurantFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RestaurantFormData) => Promise<void>;
  restaurant: Menu | null;
}

export default function RestaurantForm({
  isOpen,
  onClose,
  onSubmit,
  restaurant,
}: RestaurantFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantSchema),
    defaultValues: {
      restaurant_name: "",
      restaurant_description: "",
      restaurant_address: "",
      restaurant_phone: "",
      restaurant_email: "",

      opening_time: "",
      closing_time: "",
      wifi_ssid: "",
      wifi_password: "",
    },
  });

  React.useEffect(() => {
    if (restaurant) {
      // Convert timestamp to time format (HH:mm)

      reset({
        restaurant_name: restaurant.restaurant_name,
        restaurant_description: restaurant.restaurant_description || "",
        restaurant_address: restaurant.restaurant_address || "",
        restaurant_phone: restaurant.restaurant_phone || "",
        restaurant_email: restaurant.restaurant_email || "",

        opening_time: restaurant.opening_time || "",
        closing_time: restaurant.closing_time || "",
        wifi_ssid: restaurant.wifi_ssid || "",
        wifi_password: restaurant.wifi_password || "",
      });
    } else {
      reset();
    }
  }, [restaurant, reset]);

  const handleFormSubmit = async (data: RestaurantFormData) => {
    try {
      // Convert time strings to timestamp
      const convertTimeToTimestamp = (timeString: string) => {
        if (!timeString) return null;
        try {
          const [hours, minutes] = timeString.split(":");
          const date = new Date();
          date.setHours(parseInt(hours), parseInt(minutes), 0, 0);
          return date.toISOString();
        } catch {
          return null;
        }
      };

      const formData = {
        ...data,
        opening_time:
          convertTimeToTimestamp(data.opening_time || "") || undefined,
        closing_time:
          convertTimeToTimestamp(data.closing_time || "") || undefined,
      };

      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="3xl">
      <ModalContent>
        <ModalHeader>Restoran Düzenle</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Restoran Adı"
                placeholder="Restoran adını girin"
                {...register("restaurant_name")}
                isInvalid={!!errors.restaurant_name}
                errorMessage={errors.restaurant_name?.message}
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
              errorMessage={errors.restaurant_address?.message}
              variant="bordered"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Telefon"
                placeholder="+90 555 123 4567"
                {...register("restaurant_phone")}
                variant="bordered"
              />

              <Input
                label="E-posta"
                placeholder="info@restoran.com"
                type="email"
                {...register("restaurant_email")}
                isInvalid={!!errors.restaurant_email}
                errorMessage={errors.restaurant_email?.message}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Açılış Saati"
                type="time"
                {...register("opening_time")}
                isInvalid={!!errors.opening_time}
                errorMessage={errors.opening_time?.message}
                variant="bordered"
              />

              <Input
                label="Kapanış Saati"
                type="time"
                {...register("closing_time")}
                isInvalid={!!errors.closing_time}
                errorMessage={errors.closing_time?.message}
                variant="bordered"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="WiFi SSID"
                placeholder="Restoran WiFi adı"
                {...register("wifi_ssid")}
                variant="bordered"
              />

              <Input
                label="WiFi Şifresi"
                placeholder="WiFi şifresi"
                type="text"
                {...register("wifi_password")}
                variant="bordered"
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            İptal
          </Button>
          <Button
            color="primary"
            onPress={() => handleSubmit(handleFormSubmit)()}
            isLoading={isSubmitting}
          >
            Güncelle
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
