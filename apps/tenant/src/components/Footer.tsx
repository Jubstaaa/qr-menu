import { ApiType } from "@qr-menu/shared-types";
import { Clock, Phone, MapPin } from "lucide-react";

const formatTime = (timeString?: string) => {
  if (!timeString) return "";

  return timeString.substring(0, 5);
};

export default function Footer({
  menu,
}: {
  menu: ApiType.Public.Menu.Get.Response;
}) {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20 mt-16">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Restaurant Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
            {menu.restaurant_name}
          </h3>

          {menu.restaurant_description && (
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto leading-relaxed text-sm">
              {menu.restaurant_description}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {menu.opening_time && menu.closing_time && (
              <div className="flex flex-col items-center text-center">
                <Clock className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Çalışma Saatleri
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">
                  {formatTime(menu.opening_time)} -{" "}
                  {formatTime(menu.closing_time)}
                </p>
              </div>
            )}

            {menu.restaurant_phone && (
              <div className="flex flex-col items-center text-center">
                <Phone className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  İletişim
                </p>
                <a
                  href={`tel:${menu.restaurant_phone}`}
                  className="text-gray-900 dark:text-white font-medium text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {menu.restaurant_phone}
                </a>
              </div>
            )}

            {menu.restaurant_address && (
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Adres
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">
                  {menu.restaurant_address}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200/20 dark:border-gray-700/20 pt-6">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © 2025 {menu.restaurant_name || "Dijital Menü"}. Tüm hakları
              saklıdır.
            </p>
            <a
              href="https://qr-menu.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              QR Menu ile oluşturuldu
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
