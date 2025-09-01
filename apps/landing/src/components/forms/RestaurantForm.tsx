import React from "react";
import {
  FormProvider,
  TextInput,
  SubmitButton,
} from "@qr-menu/shared-components";
import { useRestaurantForm } from "../../hooks/ui/useRestaurantForm";
import { useCreateMenuMutation } from "../../hooks/api/useCreateMenu";
import { useModalContext } from "../../contexts/ModalContext";
import { MenuAPI } from "@qr-menu/shared-types";

export const RestaurantForm: React.FC = () => {
  const form = useRestaurantForm();
  const createMenuMutation = useCreateMenuMutation();
  const { closeCreateMenuModal } = useModalContext();

  const onSubmit = async (data: MenuAPI.Admin.CreateMenuRequest) => {
    try {
      await createMenuMutation.mutateAsync(data);
      form.reset();
      closeCreateMenuModal();
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Restoran Bilgileri
        </h2>
        <p className="text-gray-600">
          Menünüzü oluşturmak için temel bilgileri girin
        </p>
      </div>

      <FormProvider methods={form} onSubmit={onSubmit}>
        <div className="space-y-4">
          <TextInput
            name="name"
            label="Restoran Adı"
            placeholder="Restoran adınızı girin"
            isRequired
          />

          <div>
            <TextInput
              name="subdomain"
              label="Subdomain"
              placeholder="restoran-adi"
              isRequired
              endContent={
                <div className="pointer-events-none flex items-center">
                  <span className="text-default-400 text-small">
                    .{typeof window !== "undefined" ? window.location.host : ""}
                  </span>
                </div>
              }
            />
            <p className="text-sm text-gray-500 mt-1">
              Örnek: {form.watch("subdomain") || "restoran-adi"}.
              {typeof window !== "undefined" ? window.location.host : ""}
            </p>
          </div>
        </div>
      </FormProvider>
    </div>
  );
};
