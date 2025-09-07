import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUtils } from "@qr-menu/shared-utils";
import { ApiResponse, ApiType } from "@qr-menu/shared-types";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      data,
    }: {
      data: ApiType.Admin.Menu.Update.Request.Data;
    }) => {
      const response = await apiUtils.admin.menu.update(data);
      return response;
    },
    onSuccess: (response: ApiResponse<ApiType.Admin.Menu.Update.Response>) => {
      queryClient.setQueryData<ApiType.Admin.Menu.Update.Response>(
        ["menu"],
        response.data
      );
    },
  });
};
