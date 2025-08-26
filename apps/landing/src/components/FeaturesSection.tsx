"use client";

import { Card, CardBody } from "@heroui/react";
import {
  QrCode,
  Smartphone,
  TrendingUp,
  Rocket,
  Users,
  Shield,
} from "lucide-react";

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: QrCode,
      title: "Kolay QR Kod Oluşturma",
      description:
        "Menünüzü saniyeler içinde QR koda dönüştürün ve müşterilerinizin telefonlarından erişilebilir hale getirin.",
      color: "text-blue-600",
    },
    {
      icon: Smartphone,
      title: "Mobil Uyumlu Tasarım",
      description:
        "Tüm cihazlarda mükemmel görünen, kullanıcı dostu menü tasarımı ile müşteri deneyimini artırın.",
      color: "text-green-600",
    },
    {
      icon: TrendingUp,
      title: "Detaylı Analitik",
      description:
        "Menü görüntülenme sayıları, popüler ürünler ve müşteri davranışları hakkında değerli içgörüler elde edin.",
      color: "text-purple-600",
    },
    {
      icon: Rocket,
      title: "Hızlı Kurulum",
      description:
        "5 dakikada QR menünüzü oluşturun ve müşterilerinizle paylaşın. Teknik bilgi gerektirmez.",
      color: "text-orange-600",
    },
    {
      icon: Users,
      title: "Müşteri Memnuniyeti",
      description:
        "Dijital menü ile müşteri deneyimini iyileştirin ve sipariş sürecini hızlandırın.",
      color: "text-teal-600",
    },
    {
      icon: Shield,
      title: "Güvenli ve Güvenilir",
      description:
        "Verileriniz güvende, menü güncellemeleri anında ve sistem %99.9 uptime garantisi.",
      color: "text-red-600",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Neden QR Menu?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Modern restoranlar için tasarlanmış özellikler
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <CardBody className="text-center space-y-4">
                <div className={`text-5xl ${feature.color} mx-auto`}>
                  <feature.icon className="h-16 w-16" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
