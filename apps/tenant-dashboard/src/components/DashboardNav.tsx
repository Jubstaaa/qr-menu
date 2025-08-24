"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { LogOut } from "lucide-react";
import { apiClient } from "@qr-menu/shared-utils";

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.publicLogout();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">QR</span>
              </div>
              <span className="ml-3 text-xl font-bold text-gray-900">
                QR Menu
              </span>
            </div>
          </div>
          <Button
            color="default"
            variant="light"
            size="sm"
            onPress={handleLogout}
            startContent={<LogOut className="w-4 h-4" />}
          >
            Çıkış
          </Button>
        </div>
      </div>
    </nav>
  );
}
