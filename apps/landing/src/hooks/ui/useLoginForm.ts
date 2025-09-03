import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";




export const useLoginForm = () => {
  const form = useForm<ApiType.Common.Auth.Login.Request.Data>({
    resolver: zodResolver(ApiValidation.Common.Auth.Login.Request.Data),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return form;
};
