"use client";

import { addToast, toast } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
          },
        },
      })
  );

  useEffect(() => {
    const unsubscribe = queryClient.getMutationCache().subscribe((event) => {
      if (event?.type === "updated") {
        const query = event.mutation;
        if (query.state.status === "error") {
          addToast({
            title: query.state.error?.message || "Bir hata oluştu",
            color: "danger",
          });
        } else if (query.state.status === "success") {
          addToast({
            title: query.state.data?.message || "İşlem başarılı!",
            color: "success",
          });
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
