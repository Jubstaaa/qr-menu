"use client";

import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Tabs,
  Tab,
} from "@heroui/react";
import { useModalContext } from "../contexts/ModalContext";
import { LoginForm } from "./forms/LoginForm";
import { RegisterForm } from "./forms/RegisterForm";

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, openAuthModal, closeAuthModal } = useModalContext();

  return (
    <Modal isOpen={isAuthModalOpen} onClose={closeAuthModal} size="md">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-xl font-bold">Giriş Yap / Kayıt Ol</h2>
          <p className="text-gray-600">
            Hesabınıza giriş yapın veya yeni hesap oluşturun
          </p>
        </ModalHeader>

        <ModalBody>
          <Tabs className="w-full" variant="underlined" color="primary">
            <Tab key="login" title="Giriş Yap">
              <LoginForm />
            </Tab>

            <Tab key="register" title="Kayıt Ol">
              <RegisterForm />
            </Tab>
          </Tabs>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
