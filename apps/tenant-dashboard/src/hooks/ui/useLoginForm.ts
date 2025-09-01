import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api/useAuth";
import { AuthAPI } from "@qr-menu/shared-types";
import { loginRequestSchema } from "@qr-menu/shared-validation";

interface UseLoginFormReturn {
  form: ReturnType<typeof useForm<AuthAPI.LoginRequest>>;
  onSubmit: (data: AuthAPI.LoginRequest) => void;
}

export const useLoginForm = (): UseLoginFormReturn => {
  const router = useRouter();

  const form = useForm<AuthAPI.LoginRequest>({
    resolver: zodResolver(loginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLoginMutation();

  const onSubmit = (data: AuthAPI.LoginRequest) => {
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
