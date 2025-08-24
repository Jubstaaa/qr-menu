"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Button,
  Chip,
  Progress,
  useDisclosure,
  addToast,
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
import { apiClient } from "@qr-menu/shared-utils";
import { Menu as MenuType } from "@qr-menu/shared-types";
import { useRouter } from "next/navigation";
import RestaurantForm from "../../components/forms/RestaurantForm";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);

  const [menu, setMenu] = useState<MenuType | null>(null);
  const [subscription, setSubscription] = useState<any>(null);
  const router = useRouter();

  // Modal states
  const {
    isOpen: isRestaurantModalOpen,
    onOpen: onRestaurantModalOpen,
    onClose: onRestaurantModalClose,
  } = useDisclosure();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Menü bilgilerini yükle
      const menuResponse = await apiClient.getMenuByUser();
      if (menuResponse.data) {
        setMenu(menuResponse.data);
      }

      // Abonelik bilgilerini yükle
      try {
        const subscriptionResponse = await apiClient.getUserSubscription();
        console.log(subscriptionResponse);
        if (subscriptionResponse.data) {
          setSubscription(subscriptionResponse.data);
        }
      } catch (error) {
        console.error("Abonelik bilgileri yüklenirken hata:", error);
      }
    } catch (error) {
      console.error("Dashboard verisi yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Menü yönetimi ve istatistikleriniz</p>
        </div>
        <div className="flex gap-3">
          <Button
            color="primary"
            startContent={<Settings />}
            onPress={onRestaurantModalOpen}
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

      {/* Abonelik Bilgileri */}
      {subscription && (
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold">Abonelik Bilgileri</h3>
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
                    {subscription.plan_type || "Plan bilgisi yok"}
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
                    {subscription.status || "Durum bilgisi yok"}
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
                    {subscription.end_date
                      ? new Date(subscription.end_date).toLocaleDateString(
                          "tr-TR"
                        )
                      : "Bitiş tarihi yok"}
                  </p>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Restoran Bilgileri */}
      {menu && (
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold">Restoran Bilgileri</h3>
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

      {/* RestaurantForm Modal */}
      <RestaurantForm
        isOpen={isRestaurantModalOpen}
        onClose={onRestaurantModalClose}
        onSubmit={async (data) => {
          try {
            // API çağrısı yap
            const response = await apiClient.updateMenu(data);
            if (response.data) {
              setMenu(response.data);
              // Başarı mesajı göster
              addToast({
                title: "Başarılı",
                description: "Restoran bilgileri başarıyla güncellendi",
                color: "success",
              });
            }
            onRestaurantModalClose();
          } catch (error) {
            console.error("Error updating restaurant:", error);
            // Hata mesajı göster
            addToast({
              title: "Hata",
              description: "Restoran güncellenirken hata oluştu",
              color: "danger",
            });
          }
        }}
        restaurant={menu}
      />
    </div>
  );
}
