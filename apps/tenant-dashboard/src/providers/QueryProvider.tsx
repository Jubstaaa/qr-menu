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
            retry: 1,
            staleTime: 5 * 60 * 1000,
            gcTime: 10 * 60 * 1000,
          },
          mutations: {
            retry: 1,
          },
        },
      })
  );

  useEffect(() => {
    // Query error handling
    const queryUnsubscribe = queryClient
      .getQueryCache()
      .subscribe((event: any) => {
        if (event?.type === "error") {
          const query = event.query;
          const error = query.state.error as any;

          // 401/403 hatalarında logout yap
          if (error?.status === 403) {
            console.log("Token geçersiz, logout yapılıyor...");

            router.replace("/auth/login");
            return;
          }
        }
      });

    // Mutation error handling
    const mutationUnsubscribe = queryClient
      .getMutationCache()
      .subscribe((event: any) => {
        if (event?.type === "updated") {
          const mutation = event.mutation;

          if (mutation.state.status === "error") {
            const error = mutation.state.error as any;

            // 401/403 hatalarında logout yap
            if (error?.status === 403) {
              console.log("Token geçersiz, logout yapılıyor...");

              router.replace("/auth/login");
              return;
            }
          } else if (mutation.state.status === "success") {
            addToast({
              title: mutation.state.data?.message || "İşlem başarılı!",
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
