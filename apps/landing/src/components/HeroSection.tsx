"use client";

import { Button } from "@heroui/react";
import { QrCode, Smartphone } from "lucide-react";
import { useModalContext } from "../contexts/ModalContext";

export const HeroSection: React.FC = () => {
  const { openAuthModal } = useModalContext();

  const handleDemoClick = () => {
    window.open(`https://demo.${window.location.host}`, "_blank");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white max-w-4xl mx-auto">
            QR Menu ile Menünüzü{" "}
            <span className="text-blue-600 dark:text-blue-400">
              Dijitalleştirin
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Restoranınızın menüsünü QR kod ile dijitalleştirin, müşteri
            deneyimini artırın ve operasyonel verimliliği maksimize edin.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button color="primary" size="lg" onPress={openAuthModal}>
              <QrCode className="mr-2 h-5 w-5" />
              Hemen Başlayın
            </Button>
            <Button
              variant="bordered"
              size="lg"
              className="dark:border-gray-600 dark:text-gray-200"
              onPress={handleDemoClick}
            >
              <Smartphone className="mr-2 h-5 w-5" />
              Demo İnceleyin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
