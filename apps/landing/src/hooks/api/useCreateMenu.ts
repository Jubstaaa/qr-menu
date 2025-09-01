import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminMenuApi } from "@qr-menu/shared-utils";
import { MenuAPI, AuthAPI } from "@qr-menu/shared-types";

export const useCreateMenuMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MenuAPI.Admin.CreateMenuResponse,
    any,
    MenuAPI.Admin.CreateMenuRequest
  >({
    mutationFn: async (data: MenuAPI.Admin.CreateMenuRequest) => {
      const response = await adminMenuApi.createMenu(data);
      return response;
    },
    onSuccess: (response) => {
      queryClient.setQueryData<AuthAPI.LoginResponse>(
        ["auth"],
        (oldData: AuthAPI.LoginResponse | null) => {
          if (!oldData) return null;
          return {
            ...oldData,
            menu: {
              id: response.id,
              restaurant_name: response.restaurant_name,
              subdomain: response.subdomain,
            },
          };
        }
      );
    },
  });
};
