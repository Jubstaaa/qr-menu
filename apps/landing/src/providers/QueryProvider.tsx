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
    const queryUnsubscribe = queryClient
      .getQueryCache()
      .subscribe((event: any) => {
        if (event?.type === "error") {
          const query = event.query;
          const error = query.state.error as any;

          if (error?.status === 403) {
            queryClient.setQueryData(["auth"], null);
            return;
          }
        }
      });

    const mutationUnsubscribe = queryClient
      .getMutationCache()
      .subscribe((event: any) => {
        if (event?.type === "updated") {
          const mutation = event.mutation;
          if (mutation.state.status === "error") {
            const error = mutation.state.error as any;

            if (error?.status === 403) {
              queryClient.setQueryData(["auth"], null);
              return;
            }

            addToast({
              title: error?.message || "Bir hata oluştu",
              color: "danger",
            });
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
