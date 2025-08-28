"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Button,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@heroui/react";
import { useAuth } from "../contexts/AuthContext";
import { addToast } from "@heroui/react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email adresi gerekli")
    .email("Geçerli bir email adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email adresi gerekli")
      .email("Geçerli bir email adresi girin"),
    password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string().min(1, "Şifre tekrarı gerekli"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface AuthModalProps {}

export const AuthModal: React.FC<AuthModalProps> = () => {
  const [activeTab, setActiveTab] = useState("login");
  const { isAuthModalOpen, closeAuthModal, isMutationLoading } = useAuth();
  const { login, register } = useAuth();

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    reset: resetLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    reset: resetRegister,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = handleLoginSubmit(async (data) => {
    try {
      await login(data);
      resetLogin();
    } catch (error: any) {
      throw error;
    }
  });

  const onRegisterSubmit = handleRegisterSubmit(async (data) => {
    try {
      await register(data);
      resetRegister();
      closeAuthModal();
    } catch (error: any) {
      throw error;
    }
  });

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    resetLogin();
    resetRegister();
  };

  const handleClose = () => {
    resetLogin();
    resetRegister();
    closeAuthModal();
  };

  return (
    <>
      <Modal isOpen={isAuthModalOpen} onClose={handleClose} size="md">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h2 className="text-xl font-bold">Giriş Yap / Kayıt Ol</h2>
            <p className="text-gray-600">
              Hesabınıza giriş yapın veya yeni hesap oluşturun
            </p>
          </ModalHeader>

          <ModalBody>
            <Tabs
              selectedKey={activeTab}
              onSelectionChange={(key) => handleTabChange(key as string)}
              className="w-full"
            >
              <Tab key="login" title="Giriş Yap">
                <Card>
                  <CardBody>
                    <form onSubmit={onLoginSubmit} className="space-y-4">
                      <Input
                        {...registerLogin("email")}
                        isRequired
                        errorMessage={loginErrors.email?.message}
                        validationBehavior="aria"
                        isInvalid={!!loginErrors.email}
                        label="Email Adresi"
                        type="email"
                        placeholder="ornek@email.com"
                      />

                      <Input
                        {...registerLogin("password")}
                        isRequired
                        errorMessage={loginErrors.password?.message}
                        validationBehavior="aria"
                        isInvalid={!!loginErrors.password}
                        label="Şifre"
                        type="password"
                        placeholder="••••••••"
                      />

                      <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        isLoading={isMutationLoading}
                      >
                        Giriş Yap
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              </Tab>

              <Tab key="register" title="Kayıt Ol">
                <Card>
                  <CardBody>
                    <form onSubmit={onRegisterSubmit} className="space-y-4">
                      <Input
                        {...registerRegister("email")}
                        isRequired
                        errorMessage={registerErrors.email?.message}
                        validationBehavior="aria"
                        isInvalid={!!registerErrors.email}
                        label="Email Adresi"
                        type="email"
                        placeholder="ornek@email.com"
                      />

                      <Input
                        {...registerRegister("password")}
                        isRequired
                        errorMessage={registerErrors.password?.message}
                        validationBehavior="aria"
                        isInvalid={!!registerErrors.password}
                        label="Şifre"
                        type="password"
                        placeholder="••••••••"
                      />

                      <Input
                        {...registerRegister("confirmPassword")}
                        isRequired
                        errorMessage={registerErrors.confirmPassword?.message}
                        validationBehavior="aria"
                        isInvalid={!!registerErrors.confirmPassword}
                        label="Şifre Tekrarı"
                        type="password"
                        placeholder="••••••••"
                      />

                      <Button
                        type="submit"
                        color="primary"
                        className="w-full"
                        isLoading={isMutationLoading}
                      >
                        Kayıt Ol
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              </Tab>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
