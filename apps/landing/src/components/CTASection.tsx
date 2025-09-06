"use client";

import { Button } from "@heroui/react";
import { QrCode, ArrowRight, Sparkles } from "lucide-react";
import { useModalContext } from "@/contexts/ModalContext";

export const CTASection: React.FC = () => {
  const { openAuthModal } = useModalContext();

  const handleDemoClick = () => {
    window.open(`https://demo.${window.location.host}`, "_blank");
  };

  return (
    <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 dark:from-blue-700 dark:via-purple-700 dark:to-indigo-800 py-20 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full">
            <QrCode className="w-10 h-10 text-white" />
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-bold text-white max-w-4xl mx-auto leading-tight">
              Hemen{" "}
              <span className="inline-flex items-center gap-2">
                Başlayın
                <Sparkles className="w-12 h-12 text-yellow-300 animate-pulse" />
              </span>
            </h2>
            <p className="text-xl text-blue-100 dark:text-blue-200 max-w-2xl mx-auto leading-relaxed">
              QR menü ile restoranınızı dijitalleştirin ve müşteri deneyimini
              artırın. Sadece 5 dakikada kurulum yapın!
            </p>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              color="primary"
              size="lg"
              className="h-14 px-8 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all duration-300"
              onPress={openAuthModal}
              endContent={<ArrowRight className="w-6 h-6" />}
            >
              Ücretsiz Deneyin
            </Button>
            <Button
              variant="bordered"
              size="lg"
              className="h-14 px-8 text-lg font-semibold border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
              onPress={handleDemoClick}
            >
              Demo İnceleyin
            </Button>
          </div>

          <div className="pt-8 border-t border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-blue-100 text-sm">Mutlu Müşteri</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">5 Dakika</div>
                <div className="text-blue-100 text-sm">Kurulum Süresi</div>
              </div>
              <div className="space-y-2">
                <div className="text-2xl font-bold text-white">%99.9</div>
                <div className="text-blue-100 text-sm">Uptime Garantisi</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
