import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiType } from "@qr-menu/shared-types";
import { apiUtils } from "@qr-menu/shared-utils";

export const useCreateMenuMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiType.Admin.Menu.Create.Response,
    any,
    ApiType.Admin.Menu.Create.Request.Data
  >({
    mutationFn: async (data: ApiType.Admin.Menu.Create.Request.Data) => {
      const response = await apiUtils.admin.menu.create(data);
      return response.data;
    },
    onSuccess: (response) => {
      queryClient.setQueryData<ApiType.Admin.Menu.Create.Response>(
        ["auth"],
        (oldData: ApiType.Admin.Menu.Create.Response | null) => {
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
