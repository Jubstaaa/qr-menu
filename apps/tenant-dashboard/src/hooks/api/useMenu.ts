import { useQuery, useMutation } from "@tanstack/react-query";
import { adminMenuApi, ApiUtils} from "@qr-menu/shared-utils";
import { MenuAPI } from "@qr-menu/shared-types";

export const useMenuQuery = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async (): Promise<MenuAPI.Admin.GetMenusByUserResponse> => {
      const response = await ApiUtils.Admin.Menu.getMenusByUser();
      return response;
    },
  });
};

export const useUpdateMenuMutation = () => {
  return useMutation({
    mutationFn: async (
      data: MenuAPI.Admin.UpdateMenuRequest & { file?: File | null }
    ) => {
      const response = await adminMenuApi.updateMenu(data);
      return response;
    },
  });
};
