"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { LogOut, QrCode } from "lucide-react";
import { apiClient } from "@qr-menu/shared-utils";

export default function DashboardNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.logout();
      router.replace("/auth/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Navbar
      isBordered
      isBlurred
      maxWidth="xl"
      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
    >
      <NavbarContent>
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <QrCode className="text-white text-xl" />
            </div>
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-100">
                QR Menu
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dashboard
              </p>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            color="default"
            variant="light"
            size="sm"
            onPress={handleLogout}
            startContent={<LogOut className="w-4 h-4" />}
          >
            Çıkış
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
