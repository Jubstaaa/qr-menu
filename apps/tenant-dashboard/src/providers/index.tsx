"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryProvider } from "./QueryProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <QueryProvider>
        {children}
        <ToastProvider
          toastProps={{ classNames: { description: "whitespace-pre-line" } }}
        />
      </QueryProvider>
    </HeroUIProvider>
  );
}
