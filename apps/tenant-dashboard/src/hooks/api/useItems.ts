import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiResponse, ApiType } from "@qr-menu/shared-types";
import { apiUtils } from "@qr-menu/shared-utils";

export const useItemsQuery = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async (): Promise<ApiType.Admin.Item.GetAll.Response> => {
      const response = await apiUtils.admin.item.getAll();
      return response.data;
    },
  });
};

export const useCreateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (
      data: ApiType.Admin.Item.Create.Request.Data & { file?: File | null }
    ): Promise<ApiType.Admin.Item.Create.Response> => {
      const response = await apiUtils.admin.item.create(data);
      return response.data;
    },
    onSuccess: (response: ApiType.Admin.Item.Create.Response) => {
      queryClient.setQueryData(
        ["items"],
        (prev: ApiType.Admin.Item.GetAll.Response | undefined) => [
          ...(prev || []),
          response,
        ]
      );
    },
  });
};

export const useUpdateItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      params,
      data,
    }: {
      params: ApiType.Admin.Item.Update.Request.Params;
      data: ApiType.Admin.Item.Update.Request.Data & { file?: File | null };
    }) => {
      const response = await apiUtils.admin.item.update(params, data);
      return response;
    },
    onSuccess: (
      response: ApiResponse<ApiType.Admin.Item.Update.Response>,
      variables
    ) => {
      queryClient.setQueryData(
        ["items"],
        (prev: ApiType.Admin.Item.GetAll.Response) =>
          (prev || []).map((item) =>
            item.id === variables.params.id
              ? { ...item, ...response.data }
              : item
          )
      );
    },
  });
};

export const useDeleteItemMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (params: ApiType.Admin.Item.Delete.Request.Params) => {
      const response = await apiUtils.admin.item.delete(params);
      return response;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData(
        ["items"],
        (prev: ApiType.Admin.Item.GetAll.Response | undefined) =>
          (prev || []).filter((item) => item.id !== variables.id)
      );
    },
  });
};

export const useReorderItemsMutation = () => {
  return useMutation({
    mutationFn: async (data: ApiType.Admin.Item.Reorder.Request.Data) => {
      const response = await apiUtils.admin.item.reorder(data);
      return response;
    },
  });
};
