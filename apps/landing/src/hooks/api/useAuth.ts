import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "@qr-menu/shared-utils";
import { AuthAPI } from "@qr-menu/shared-types";

// Auth Query Hook
export const useAuthQuery = () => {
  return useQuery<AuthAPI.CheckAuthResponse, any>({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await authApi.getCurrentUser();
      return response;
    },
    retry: false,
  });
};

// Login Mutation Hook
export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthAPI.LoginResponse, any, AuthAPI.LoginRequest>({
    mutationFn: async (data: AuthAPI.LoginRequest) => {
      const response = await authApi.login(data);
      return response;
    },
    onSuccess: (response: AuthAPI.LoginResponse) => {
      queryClient.setQueryData<AuthAPI.LoginResponse>(["auth"], response);
    },
  });
};

// Register Mutation Hook
export const useRegisterMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthAPI.RegisterResponse, any, AuthAPI.RegisterRequest>({
    mutationFn: async (data: AuthAPI.RegisterRequest) => {
      const response = await authApi.register(data);
      return response;
    },
    onSuccess: (response: AuthAPI.RegisterResponse) => {
      queryClient.setQueryData<AuthAPI.RegisterResponse>(["auth"], response);
    },
  });
};

// Logout Mutation Hook
export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthAPI.LogoutResponse, any, void>({
    mutationFn: async () => {
      const response = await authApi.logout();
      return response;
    },
    onSuccess: () => {
      queryClient.setQueryData<AuthAPI.LoginResponse | null>(["auth"], null);
    },
  });
};
