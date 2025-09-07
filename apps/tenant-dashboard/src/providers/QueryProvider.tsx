"use client";

import { addToast } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
          },
          mutations: {
            retry: 0,
            onError: (error) => {
              throw error;
            },
          },
        },
      })
  );

  useEffect(() => {
    // Query error handling
    const queryUnsubscribe = queryClient.getQueryCache().subscribe((event) => {
      if (event?.type === "updated") {
        const query = event.query;
        const error = query.state.error as Error & { status?: number };

        if (error?.status === 403) {
          router.replace("/auth/login");
          return;
        }
      }
    });

    const mutationUnsubscribe = queryClient
      .getMutationCache()
      .subscribe((event) => {
        if (event?.type === "updated") {
          const mutation = event.mutation;

          if (mutation.state.status === "error") {
            const error = mutation.state.error as Error & { status?: number };

            addToast({
              title: "İşlem başarısız!",
              description: error?.message || "Bilinmeyen bir hata oluştu",
              color: "danger",
            });

            if (error?.status === 403) {
              router.replace("/auth/login");
              return;
            }
          } else if (mutation.state.status === "success") {
            addToast({
              title: "İşlem başarılı!",
              description: mutation.state.data?.message || "İşlem başarılı!",
              color: "success",
            });
          }
        }
      });

    return () => {
      queryUnsubscribe();
      mutationUnsubscribe();
    };
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
