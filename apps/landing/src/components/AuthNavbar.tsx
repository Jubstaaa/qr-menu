"use client";

import React, { useState } from "react";
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
import { FaQrcode, FaSun, FaMoon } from "react-icons/fa";
import { useAuth } from "../contexts/AuthContext";
import { AuthModal } from "./AuthModal";
import { CreateMenuModal } from "./CreateMenuModal";
import { ThemeSwitcher } from "./ThemeSwitcher";
import Link from "next/link";

export const AuthNavbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500 rounded-lg">
              <FaQrcode className="text-white text-xl" />
            </div>
            <div>
              <p className="font-bold text-inherit">QR Menu</p>
              <p className="text-xs text-gray-500">Dijital Menü Sistemi</p>
            </div>
          </div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button variant="light" color="default">
            Özellikler
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" color="default">
            Fiyatlandırma
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="light" color="default">
            İletişim
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>

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
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" color="default">
                  <p className="font-semibold">
                    Merhaba, {user?.restaurant_name || user?.email}
                  </p>
                </DropdownItem>
                {user?.menuSubdomain && (
                  <DropdownItem
                    key="menu"
                    color="default"
                    onClick={() => {
                      window.open(
                        `http://${user.menuSubdomain}.localhost:3000`,
                        "_blank"
                      );
                    }}
                  >
                    Menüme Git
                  </DropdownItem>
                )}
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
            <AuthModal>
              {(onOpen) => (
                <Button color="primary" variant="flat" onPress={onOpen}>
                  Giriş Yap
                </Button>
              )}
            </AuthModal>
          </NavbarItem>
        )}

        {!isAuthenticated && (
          <NavbarItem>
            <AuthModal>
              {(onOpen) => (
                <Button color="primary" onPress={onOpen}>
                  Ücretsiz Başla
                </Button>
              )}
            </AuthModal>
          </NavbarItem>
        )}

        {isAuthenticated && (
          <>
            <NavbarItem>
              {user?.menuSubdomain ? (
                <Button
                  color="primary"
                  variant="flat"
                  as={Link}
                  href={`https://${user.menuSubdomain}.ilkerbalcilar.com.tr`}
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
            <NavbarItem>
              <Button variant="bordered" color="danger" onPress={handleLogout}>
                Çıkış Yap
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Button
            variant="light"
            color="default"
            className="w-full justify-start"
          >
            Özellikler
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            color="default"
            className="w-full justify-start"
          >
            Fiyatlandırma
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Button
            variant="light"
            color="default"
            className="w-full justify-start"
          >
            İletişim
          </Button>
        </NavbarMenuItem>

        <div className="border-t pt-4 mt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-500">Tema</span>
            <ThemeSwitcher />
          </div>

          {isAuthenticated ? (
            <div className="space-y-3">
              <p className="text-sm text-gray-500 text-center">
                Merhaba, {user?.email}
              </p>
              <Button
                variant="bordered"
                onClick={handleLogout}
                className="w-full"
              >
                Çıkış
              </Button>
              {user?.menuSubdomain ? (
                <Button
                  color="primary"
                  variant="flat"
                  onPress={() => {
                    window.open(
                      `http://${user.menuSubdomain}.localhost:3000`,
                      "_blank"
                    );
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
          ) : (
            <AuthModal>
              {(onOpen) => (
                <Button color="primary" onPress={onOpen}>
                  Giriş Yap
                </Button>
              )}
            </AuthModal>
          )}
        </div>
      </NavbarMenu>
    </Navbar>
  );
};
