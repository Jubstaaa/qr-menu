import { useMutation } from "@tanstack/react-query";
import { ApiType } from "@qr-menu/shared-types";
import { apiUtils } from "@qr-menu/shared-utils";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (credentials: ApiType.Common.Auth.Login.Request.Data) => {
      const response = await apiUtils.common.auth.login(credentials);
      return response;
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiUtils.common.auth.logout();
      return response;
    },
  });
};
