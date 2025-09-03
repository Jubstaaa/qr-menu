import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

export const useRegisterForm = () => {
  const form = useForm<ApiType.Common.Auth.Register.Request.Data>({
    resolver: zodResolver(ApiValidation.Common.Auth.Register.Request.Data),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return form;
};
