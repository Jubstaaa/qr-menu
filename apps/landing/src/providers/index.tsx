"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "../contexts/AuthContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider>
        <HeroUIProvider>
          {children}
          <ToastProvider />
        </HeroUIProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
