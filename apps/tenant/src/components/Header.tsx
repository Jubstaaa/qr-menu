"use client";

import { MenuWithCategoriesDto } from "@qr-menu/shared-types";
import { Utensils } from "lucide-react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@heroui/react";

export default function Header({ menu }: { menu: MenuWithCategoriesDto }) {
  return (
    <Navbar
      isBordered
      isBlurred
      maxWidth="xl"
      className="bg-white/80 dark:bg-gray-900/80 border-gray-200/20 dark:border-gray-700/20"
    >
      <NavbarContent>
        <NavbarBrand>
          <div className="flex items-center gap-3">
            {menu.logo_url ? (
              <img
                src={menu.logo_url}
                alt={menu.restaurant_name}
                className="w-8 h-8 rounded-lg object-cover"
              />
            ) : (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Utensils className="w-4 h-4 text-white" />
              </div>
            )}
            <div>
              <p className="font-bold text-gray-900 dark:text-gray-100">
                {menu.restaurant_name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Dijital Menü Sistemi
              </p>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>
    </Navbar>
  );
}
