"use client";

import React, { useMemo, useState } from "react";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
  Switch,
} from "@heroui/react";
import { QrCode } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { CreateMenuModal } from "./CreateMenuModal";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

export const AuthNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, menu, logout, openAuthModal, isAuthenticated, isLoading } =
    useAuth();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
  };

  const host = typeof window !== "undefined" ? window.location.host : "";

  const menuUrl = useMemo(() => {
    if (!menu?.subdomain || !host) return "#";
    return `https://${menu.subdomain}.${host}`;
  }, [menu?.subdomain, host]);

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isBordered
      isBlurred
      maxWidth="xl"
      className="bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-gray-700 dark:text-gray-200"
        />
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
                Dijital Menü Sistemi
              </p>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button
            variant="light"
            color="default"
            className="dark:text-gray-200"
            as={Link}
            href="/features"
          >
            Özellikler
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            color="default"
            className="dark:text-gray-200"
            as={Link}
            href="/pricing"
          >
            Fiyatlandırma
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            variant="light"
            color="default"
            className="dark:text-gray-200"
            as={Link}
            href="/contact"
          >
            İletişim
          </Button>
        </NavbarItem>
      </NavbarContent>

      {!isLoading && (
        <NavbarContent justify="end">
          <NavbarItem>
            <ThemeSwitcher />
          </NavbarItem>

          {isAuthenticated && (
            <>
              <NavbarItem>
                {menu?.subdomain ? (
                  <Button
                    color="primary"
                    variant="flat"
                    as={Link}
                    href={menuUrl}
                    target="_blank"
                  >
                    Menüme Git
                  </Button>
                ) : (
                  <CreateMenuModal>
                    {(onOpen) => (
                      <Button color="primary" onPress={onOpen}>
                        Menü Oluştur
                      </Button>
                    )}
                  </CreateMenuModal>
                )}
              </NavbarItem>
            </>
          )}
          {isAuthenticated ? (
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`,
                    }}
                    className="transition-transform cursor-pointer"
                    description={user?.email}
                    name="Kullanıcı"
                  />
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Profile Actions"
                  variant="flat"
                  className="dark:bg-gray-800 dark:text-gray-100"
                >
                  <DropdownItem
                    key="profile"
                    color="default"
                    className="dark:text-gray-100"
                  >
                    <p className="font-semibold">Merhaba, {user?.email}</p>
                  </DropdownItem>
                  {menu?.subdomain ? (
                    <DropdownItem
                      key="menu"
                      color="default"
                      as={Link}
                      href={menuUrl}
                      target="_blank"
                      className="dark:text-gray-100"
                    >
                      Menüme Git
                    </DropdownItem>
                  ) : null}
                  <DropdownItem
                    key="logout"
                    color="danger"
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button color="primary" variant="flat" onPress={openAuthModal}>
                Giriş Yap
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      )}

      <NavbarMenu className="dark:bg-gray-900">
        <NavbarMenuItem>
          <Button
            variant="light"
            color="default"
            className="w-full justify-start dark:text-gray-200"
          >
            Özellikler
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            color="default"
            className="w-full justify-start dark:text-gray-200"
          >
            Fiyatlandırma
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            color="default"
            className="w-full justify-start dark:text-gray-200"
          >
            İletişim
          </Button>
        </NavbarMenuItem>

        <div className="border-t pt-4 mt-4 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Tema
            </span>
            <ThemeSwitcher />
          </div>

          {isAuthenticated && (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Merhaba, {user?.email}
              </p>
              <Button
                variant="bordered"
                onClick={handleLogout}
                className="w-full dark:border-gray-700 dark:text-gray-200"
              >
                Çıkış
              </Button>
              {menu ? (
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => {
                    if (menuUrl !== "#" && typeof window !== "undefined") {
                      window.open(menuUrl, "_blank");
                    }
                  }}
                  className="w-full"
                >
                  Menüme Git
                </Button>
              ) : (
                <CreateMenuModal>
                  {(onOpen) => (
                    <Button color="primary" onPress={onOpen} className="w-full">
                      Menü Oluştur
                    </Button>
                  )}
                </CreateMenuModal>
              )}
            </div>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
