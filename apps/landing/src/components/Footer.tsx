"use client";

import { QrCode, Mail } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <QrCode className="text-white text-xl" />
              </div>
              <div>
                <p className="font-bold text-xl">QR Menu</p>
                <p className="text-sm text-gray-400">Dijital Menü Sistemi</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm max-w-xs">
              Restoranların dijital dönüşümüne öncülük eden teknoloji şirketi.
              Modern ve kullanıcı dostu QR menü çözümleri.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <a
                  href="mailto:ilkerbalcilartr@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  ilkerbalcilartr@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Şirket</h3>
            <div className="space-y-2 text-sm text-gray-400">
              <p>2025'den beri hizmet veriyoruz</p>
              <p>1000+ mutlu müşteri</p>
              <p>%99.9 uptime garantisi</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2025 QR Menu. Tüm hakları saklıdır.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>KVKK Uyumlu</span>
              <span>SSL Güvenli</span>
              <span>7/24 Destek</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
