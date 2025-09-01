"use client";

import React, { createContext, useContext } from "react";
import { useDisclosure } from "@heroui/react";
import { AuthModal } from "../components/AuthModal";
import { CreateMenuModal } from "../components/CreateMenuModal";

interface ModalContextType {
  // Auth Modal
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;

  // Create Menu Modal
  isCreateMenuModalOpen: boolean;
  openCreateMenuModal: () => void;
  closeCreateMenuModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authModal = useDisclosure();
  const createMenuModal = useDisclosure();

  const value: ModalContextType = {
    // Auth Modal
    isAuthModalOpen: authModal.isOpen,
    openAuthModal: authModal.onOpen,
    closeAuthModal: authModal.onClose,

    // Create Menu Modal
    isCreateMenuModalOpen: createMenuModal.isOpen,
    openCreateMenuModal: createMenuModal.onOpen,
    closeCreateMenuModal: createMenuModal.onClose,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      <AuthModal />
      <CreateMenuModal />
    </ModalContext.Provider>
  );
};
