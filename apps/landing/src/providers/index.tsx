"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { QueryProvider } from "./QueryProvider";
import { ModalProvider } from "../contexts/ModalContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <QueryProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ModalProvider>
            {children}
            <ToastProvider />
          </ModalProvider>
        </ThemeProvider>
      </QueryProvider>
    </HeroUIProvider>
  );
}
