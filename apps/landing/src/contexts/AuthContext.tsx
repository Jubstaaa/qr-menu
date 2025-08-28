"use client";

import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@qr-menu/shared-utils";
import { AuthModal } from "../components/AuthModal";
import {
  ApiErrorResponse,
  ApiResponse,
  AuthResponseDto,
  LoginDto,
  RegisterDto,
} from "@qr-menu/shared-types";

interface AuthContextType {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthResponseDto["user"] | null;
  menu: AuthResponseDto["menu"] | null;
  login: (data: LoginDto) => Promise<ApiResponse<AuthResponseDto>>;
  register: (data: RegisterDto) => Promise<ApiResponse<AuthResponseDto>>;
  logout: () => Promise<void>;
  isMutationLoading: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const queryClient = useQueryClient();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  const { data: authData, isLoading } = useQuery<
    AuthResponseDto,
    ApiErrorResponse
  >({
    queryKey: ["auth"],
    queryFn: async () => {
      const response = await apiClient.checkAuth();
      return response.data;
    },
    retry: false,
  });

  const loginMutation = useMutation<
    ApiResponse<AuthResponseDto>,
    ApiErrorResponse,
    LoginDto
  >({
    mutationFn: async (data: LoginDto) => {
      const response = await apiClient.login(data);
      return response;
    },
    onSuccess: (response: ApiResponse<AuthResponseDto>) => {
      queryClient.setQueryData<AuthResponseDto>(["auth"], response.data);
      closeAuthModal();
    },
  });

  const registerMutation = useMutation<
    ApiResponse<AuthResponseDto>,
    ApiErrorResponse,
    RegisterDto
  >({
    mutationFn: async (data: RegisterDto) => {
      const response = await apiClient.register(data);
      return response;
    },
    onSuccess: (response: ApiResponse<AuthResponseDto>) => {
      queryClient.setQueryData<AuthResponseDto>(["auth"], response.data);
      closeAuthModal();
    },
  });

  const logoutMutation = useMutation<ApiResponse<void>, ApiErrorResponse, void>(
    {
      mutationFn: async () => {
        const response = await apiClient.logout();
        return response;
      },
      onSuccess: () => {
        queryClient.setQueryData<AuthResponseDto | null>(["auth"], null);
      },
    }
  );

  const value: AuthContextType = {
    isLoading,
    isAuthenticated: !!authData?.user,
    user: authData?.user || null,
    menu: authData?.menu || null,
    login: async (data: LoginDto) => {
      return await loginMutation.mutateAsync(data);
    },
    register: async (data: RegisterDto) => {
      return await registerMutation.mutateAsync(data);
    },
    logout: async () => {
      await logoutMutation.mutateAsync();
    },
    isMutationLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      logoutMutation.isPending,
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <AuthModal />
    </AuthContext.Provider>
  );
};
