import { useDisclosure } from "@heroui/react";
import { Menu } from "@qr-menu/shared-types";
import { UpdateRestaurantDto } from "@qr-menu/shared-validation";
import { useMenu, useSubscription, useUpdateMenu } from "./useApi";

export const useDashboard = () => {
  const restaurantModal = useDisclosure();

  const { data: menu, isLoading: menuLoading } = useMenu();
  const { data: subscription, isLoading: subscriptionLoading } =
    useSubscription();
  const updateMenuMutation = useUpdateMenu();

  const loadingStates = {
    menu: menuLoading,
    subscription: subscriptionLoading,
    updatingRestaurant: updateMenuMutation.isPending,
  };

  const handlers = {
    restaurant: {
      submit: async (data: UpdateRestaurantDto) => {
        try {
          await updateMenuMutation.mutateAsync(data);
          restaurantModal.onClose();
        } catch (error) {
          console.error("Error updating restaurant:", error);
        }
      },
    },
  };

  return {
    // Data
    menu,
    subscription,

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
