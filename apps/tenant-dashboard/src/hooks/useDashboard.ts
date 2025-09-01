import { useDisclosure } from "@heroui/react";
import { MenuAPI } from "@qr-menu/shared-types";
import {
  useMenuQuery,
  useSubscriptionQuery,
  useUpdateMenuMutation,
} from "./api";

export const useDashboard = () => {
  const restaurantModal = useDisclosure();

  const { data: menu, isLoading: menuLoading } = useMenuQuery();
  const { data: subscription, isLoading: subscriptionLoading } =
    useSubscriptionQuery();
  const updateMenuMutation = useUpdateMenuMutation();

  const loadingStates = {
    menu: menuLoading,
    subscription: subscriptionLoading,
    updatingRestaurant: updateMenuMutation.isPending,
  };

  const handlers = {
    restaurant: {
      submit: async (data: MenuAPI.Admin.UpdateMenuRequest) => {
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
