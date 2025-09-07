import { useDisclosure } from "@heroui/react";
import { useMenuQuery, useUpdateMenuMutation } from "./api";
import { ApiType } from "@qr-menu/shared-types";

export const useDashboard = () => {
  const restaurantModal = useDisclosure();

  const { data: menu, isLoading: menuLoading } = useMenuQuery();
  const updateMenuMutation = useUpdateMenuMutation();

  const loadingStates = {
    menu: menuLoading,
    updatingRestaurant: updateMenuMutation.isPending,
  };

  const handlers = {
    restaurant: {
      submit: async (data: ApiType.Admin.Menu.Update.Request.Data) => {
        await updateMenuMutation.mutateAsync({ data });
        restaurantModal.onClose();
      },
    },
  };

  return {
    // Data
    menu,

    // Loading states
    loadingStates,

    // Modal states
    modals: {
      restaurant: restaurantModal,
    },

    // Handlers
    handlers,
  };
};
