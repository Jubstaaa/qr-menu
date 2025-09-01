import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
  FormProvider,
  EmailInput,
  PasswordInput,
  SubmitButton,
} from "@qr-menu/shared-components";
import { useLoginForm, LoginFormData } from "../../hooks/ui/useLoginForm";
import { useLoginMutation } from "../../hooks/api/useAuth";
import { useModalContext } from "../../contexts/ModalContext";

interface LoginFormProps {}

export const LoginForm: React.FC<LoginFormProps> = () => {
  const form = useLoginForm();
  const loginMutation = useLoginMutation();
  const { closeAuthModal } = useModalContext();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      form.reset();
      closeAuthModal();
    } catch (error: any) {
      throw error;
    }
  };

  return (
    <Card>
      <CardBody>
        <FormProvider methods={form} onSubmit={onSubmit}>
          <EmailInput
            name="email"
            label="Email Adresi"
            placeholder="ornek@email.com"
            isRequired
          />

          <PasswordInput
            name="password"
            label="Şifre"
            placeholder="••••••••"
            isRequired
          />

          <SubmitButton color="primary" className="w-full">
            Giriş Yap
          </SubmitButton>
        </FormProvider>
      </CardBody>
    </Card>
  );
};
