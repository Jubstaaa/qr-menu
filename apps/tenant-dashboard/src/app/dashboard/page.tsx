"use client";

import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
} from "@heroui/react";
import {
  Menu,
  Settings,
  MapPin,
  Phone,
  Mail,
  Clock,
  Wifi,
  CreditCard,
  Calendar,
} from "lucide-react";
import { useRouter } from "next/navigation";
import RestaurantForm from "../../components/forms/RestaurantForm";
import { useDashboard } from "../../hooks/useDashboard";
import { Loading } from "@qr-menu/shared-components";

export default function DashboardPage() {
  const router = useRouter();

  const { menu, subscription, loadingStates, modals, handlers } =
    useDashboard();

  if (loadingStates.menu || loadingStates.subscription) {
    return <Loading size="lg" text="Dashboard yükleniyor..." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Menü yönetimi ve istatistikleriniz</p>
        </div>
        <div className="flex gap-3">
          <Button
            color="primary"
            startContent={<Settings />}
            onPress={modals.restaurant.onOpen}
          >
            Restoran Düzenle
          </Button>
          <Button
            color="secondary"
            startContent={<Menu />}
            onPress={() => router.push("/dashboard/menu")}
          >
            Menü Yönetimi
          </Button>
        </div>
      </div>

      {subscription && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Abonelik Bilgileri
            </h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Plan</p>
                  <p className="text-sm text-gray-600">
                    {subscription?.subscription?.plan_type ||
                      "Plan bilgisi yok"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Durum</p>
                  <p className="text-sm text-gray-600">
                    {subscription?.subscription?.status || "Durum bilgisi yok"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Bitiş Tarihi</p>
                  <p className="text-sm text-gray-600">
                    {subscription?.subscription?.end_date
                      ? new Date(
                          subscription.subscription.end_date
                        ).toLocaleDateString("tr-TR")
                      : "Bitiş tarihi yok"}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {menu && (
        <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Restoran Bilgileri
            </h3>
          </CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Adres</p>
                    <p className="text-sm text-gray-600">
                      {menu.restaurant_address || "Adres girilmemiş"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-full">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Telefon</p>
                    <p className="text-sm text-gray-600">
                      {menu.restaurant_phone || "Telefon girilmemiş"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-full">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">E-posta</p>
                    <p className="text-sm text-gray-600">
                      {menu.restaurant_email || "E-posta girilmemiş"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-orange-100 rounded-full">
                    <Clock className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      Çalışma Saatleri
                    </p>
                    <p className="text-sm text-gray-600">
                      {menu.opening_time && menu.closing_time
                        ? `${menu.opening_time} - ${menu.closing_time}`
                        : "Çalışma saatleri girilmemiş"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 rounded-full">
                    <Wifi className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">WiFi Bilgileri</p>
                    <p className="text-sm text-gray-600">
                      {menu.wifi_ssid
                        ? `SSID: ${menu.wifi_ssid}${menu.wifi_password ? `, Şifre: ${menu.wifi_password}` : ""}`
                        : "WiFi bilgileri girilmemiş"}
                    </p>
                  </div>
                </div>

                {menu.restaurant_description && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded-full">
                      <Menu className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Açıklama</p>
                      <p className="text-sm text-gray-600">
                        {menu.restaurant_description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {menu && (
        <RestaurantForm
          isOpen={modals.restaurant.isOpen}
          onClose={modals.restaurant.onClose}
          onSubmit={handlers.restaurant.submit}
          editingRestaurant={menu}
        />
      )}
    </div>
  );
}
