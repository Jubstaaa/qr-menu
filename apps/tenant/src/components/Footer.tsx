import { Clock, Phone, MapPin } from "lucide-react";

const formatTime = (timeString?: string) => {
  if (!timeString) return "";

  return timeString.substring(0, 5);
};

interface FooterProps {
  restaurantName?: string;
  restaurantDescription?: string;
  restaurantPhone?: string;
  restaurantAddress?: string;
  openingTime?: string;
  closingTime?: string;
}

export default function Footer({
  restaurantName,
  restaurantDescription,
  restaurantPhone,
  restaurantAddress,
  openingTime,
  closingTime,
}: FooterProps) {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-700/20 mt-16">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Restaurant Info */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
            {restaurantName}
          </h3>

          {restaurantDescription && (
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-2xl mx-auto leading-relaxed text-sm">
              {restaurantDescription}
            </p>
          )}

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {openingTime && closingTime && (
              <div className="flex flex-col items-center text-center">
                <Clock className="w-5 h-5 text-blue-600 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Çalışma Saatleri
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">
                  {formatTime(openingTime)} - {formatTime(closingTime)}
                </p>
              </div>
            )}

            {restaurantPhone && (
              <div className="flex flex-col items-center text-center">
                <Phone className="w-5 h-5 text-green-600 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  İletişim
                </p>
                <a
                  href={`tel:${restaurantPhone}`}
                  className="text-gray-900 dark:text-white font-medium text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {restaurantPhone}
                </a>
              </div>
            )}

            {restaurantAddress && (
              <div className="flex flex-col items-center text-center">
                <MapPin className="w-5 h-5 text-purple-600 mb-2" />
                <p className="text-gray-600 dark:text-gray-400 text-xs mb-1">
                  Adres
                </p>
                <p className="text-gray-900 dark:text-white font-medium text-sm">
                  {restaurantAddress}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200/20 dark:border-gray-700/20 pt-6">
          <div className="flex flex-col items-center space-y-2">
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              © 2025 {restaurantName || "Dijital Menü"}. Tüm hakları saklıdır.
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
