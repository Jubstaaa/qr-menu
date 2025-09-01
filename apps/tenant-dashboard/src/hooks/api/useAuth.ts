import { useMutation } from "@tanstack/react-query";
import { AuthAPI } from "@qr-menu/shared-types";
import { authApi } from "@qr-menu/shared-utils";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: AuthAPI.LoginRequest) => {
      const response = await authApi.login(credentials);
      return response;
    },
  });
};
