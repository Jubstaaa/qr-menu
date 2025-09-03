import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiType } from "@qr-menu/shared-types";
import { apiUtils } from "@qr-menu/shared-utils";

// Auth Query Hook
export const useAuthQuery = () => {
  return useQuery<ApiType.Common.Auth.CheckAuth.Response>({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await apiUtils.common.auth.checkAuth();
      return response.data;
    },
    retry: false,
  });
};

// Login Mutation Hook
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiType.Common.Auth.Login.Response,
    any,
    ApiType.Common.Auth.Login.Request.Data
  >({
    mutationFn: async (data: ApiType.Common.Auth.Login.Request.Data) => {
      const response = await apiUtils.common.auth.login(data);
      return response.data;
    },
    onSuccess: (data: ApiType.Common.Auth.Login.Response) => {
      queryClient.setQueryData<ApiType.Common.Auth.Login.Response>(
        ["auth"],
        data
      );
    },
  });
};

// Register Mutation Hook
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiType.Common.Auth.Register.Response,
    any,
    ApiType.Common.Auth.Register.Request.Data
  >({
    mutationFn: async (data: ApiType.Common.Auth.Register.Request.Data) => {
      const response = await apiUtils.common.auth.register(data);
      return response.data;
    },
    onSuccess: (data: ApiType.Common.Auth.Register.Response) => {
      queryClient.setQueryData<ApiType.Common.Auth.Register.Response>(
        ["auth"],
        data
      );
    },
  });
};

// Logout Mutation Hook
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await apiUtils.common.auth.logout();
      return response;
    },
    onSuccess: () => {
      queryClient.setQueryData<ApiType.Common.Auth.Login.Response | null>(
        ["auth"],
        null
      );
    },
  });
};
