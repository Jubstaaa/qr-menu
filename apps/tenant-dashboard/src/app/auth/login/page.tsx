"use client";

import React from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { QrCode } from "lucide-react";
import { useLoginForm } from "../../../hooks/ui/useLoginForm";
import {
  FormProvider,
  EmailInput,
  PasswordInput,
  SubmitButton,
} from "@qr-menu/shared-components";

export default function LoginPage() {
  const { form, onSubmit } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-500 rounded-lg">
              <QrCode className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard'a Giriş Yap
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Menünüzü yönetmek için giriş yapın
          </p>
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h4 className="text-center text-large font-bold">
                Giriş Bilgileri
              </h4>
              <p className="text-default-500 text-small">
                Email ve şifrenizi girin
              </p>
            </div>
          </CardHeader>
          <CardBody className="gap-3">
            <FormProvider methods={form} onSubmit={onSubmit}>
              <EmailInput name="email" label="Email" isRequired />

              <PasswordInput name="password" label="Şifre" isRequired />

              <SubmitButton color="primary" className="w-full">
                Giriş Yap
              </SubmitButton>
            </FormProvider>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
