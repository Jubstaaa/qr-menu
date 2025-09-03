import { useQuery, useMutation } from "@tanstack/react-query";
import { apiUtils } from "@qr-menu/shared-utils";
import { ApiType } from "@qr-menu/shared-types";

export const useMenuQuery = () => {
  return useQuery({
    queryKey: ["menu"],
    queryFn: async (): Promise<ApiType.Admin.Menu.Get.Response> => {
      const response = await apiUtils.admin.menu.get();
      return response.data;
    },
  });
};

export const useUpdateMenuMutation = () => {
  return useMutation({
    mutationFn: async (data: ApiType.Admin.Menu.Update.Request.Data) => {
      const response = await apiUtils.admin.menu.update(data);
      return response;
    },
  });
};
