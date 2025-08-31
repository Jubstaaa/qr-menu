"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Input,
  Card,
  CardBody,
  CardHeader,
  addToast,
} from "@heroui/react";
import { Eye, EyeOff, QrCode } from "lucide-react";
import { apiClient } from "@qr-menu/shared-utils";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { message } = await apiClient.login({ email, password });

      addToast({
        title: message,
        color: "success",
      });

      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Giriş yapılırken bir hata oluştu";
      setError(errorMessage);
      addToast({
        title: "Giriş Hatası",
        description: errorMessage,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-blue-500 rounded-lg">
              <QrCode className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Dashboard'a Giriş Yap
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Menünüzü yönetmek için giriş yapın
          </p>
        </div>

        <Card className="w-full">
          <CardHeader className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <h4 className="text-center text-large font-bold">
                Giriş Bilgileri
              </h4>
              <p className="text-default-500 text-small">
                Email ve şifrenizi girin
              </p>
            </div>
          </CardHeader>
          <CardBody className="gap-3">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                label="Email"
                placeholder="ornek@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                variant="bordered"
                color={error ? "danger" : "default"}
              />

              <Input
                label="Şifre"
                placeholder="Şifrenizi girin"
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeOff className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <Eye className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                variant="bordered"
                color={error ? "danger" : "default"}
              />

              {error && (
                <div className="text-danger text-sm bg-danger-50 dark:bg-danger-900/20 p-3 rounded-lg">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                color="primary"
                className="w-full"
                isLoading={isLoading}
                disabled={!email || !password}
              >
                {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
