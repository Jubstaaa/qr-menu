import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthAPI } from "@qr-menu/shared-types";
import { registerRequestSchema } from "@qr-menu/shared-validation";

export const useRegisterForm = () => {
  const form = useForm<AuthAPI.RegisterRequest>({
    resolver: zodResolver(registerRequestSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  return form;
};
