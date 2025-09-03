import React from "react";
import { Card, CardBody } from "@heroui/react";
import {
  FormProvider,
  EmailInput,
  PasswordInput,
  SubmitButton,
} from "@qr-menu/shared-components";
import { useRegisterForm } from "../../hooks/ui/useRegisterForm";
import { useRegisterMutation } from "../../hooks/api/useAuth";
import { useModalContext } from "../../contexts/ModalContext";
import { ApiType } from "@qr-menu/shared-types";

interface RegisterFormProps {}

export const RegisterForm: React.FC<RegisterFormProps> = () => {
  const form = useRegisterForm();
  const registerMutation = useRegisterMutation();
  const { closeAuthModal } = useModalContext();

  const onSubmit = async (data: ApiType.Common.Auth.Register.Request.Data) => {
    try {
      await registerMutation.mutateAsync(data);
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

          <PasswordInput
            name="confirmPassword"
            label="Şifre Tekrarı"
            placeholder="••••••••"
            isRequired
          />

          <SubmitButton color="primary" className="w-full">
            Kayıt Ol
          </SubmitButton>
        </FormProvider>
      </CardBody>
    </Card>
  );
};
