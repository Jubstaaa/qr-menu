import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api/useAuth";
import { ApiType } from "@qr-menu/shared-types";
import { ApiValidation } from "@qr-menu/shared-validation";

interface UseLoginFormReturn {
  form: ReturnType<typeof useForm<ApiType.Common.Auth.Login.Request.Data>>;
  onSubmit: (data: ApiType.Common.Auth.Login.Request.Data) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();

  const form = useForm<ApiType.Common.Auth.Login.Request.Data>({
    resolver: zodResolver(ApiValidation.Common.Auth.Login.Request.Data),
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: ApiType.Common.Auth.Login.Request.Data) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return {
    form,
    onSubmit,
  };
};
