"use client";

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Badge,
  addToast,
  ToastProvider,
} from "@heroui/react";
import {
  FaQrcode,
  FaMobile,
  FaChartLine,
  FaRocket,
  FaUsers,
  FaLock,
} from "react-icons/fa";

export default function HomePage() {
  const features = [
    {
      icon: FaQrcode,
      title: "Kolay QR Kod Oluşturma",
      description:
        "Menünüzü saniyeler içinde QR koda dönüştürün ve müşterilerinizin telefonlarından erişilebilir hale getirin.",
      color: "text-blue-600",
    },
    {
      icon: FaMobile,
      title: "Mobil Uyumlu Tasarım",
      description:
        "Tüm cihazlarda mükemmel görünen, kullanıcı dostu menü tasarımı ile müşteri deneyimini artırın.",
      color: "text-green-600",
    },
    {
      icon: FaChartLine,
      title: "Detaylı Analitik",
      description:
        "Menü görüntülenme sayıları, popüler ürünler ve müşteri davranışları hakkında değerli içgörüler elde edin.",
      color: "text-purple-600",
    },
    {
      icon: FaRocket,
      title: "Hızlı Kurulum",
      description:
        "5 dakikada QR menünüzü oluşturun ve müşterilerinizle paylaşın. Teknik bilgi gerektirmez.",
      color: "text-orange-600",
    },
    {
      icon: FaUsers,
      title: "Müşteri Memnuniyeti",
      description:
        "Dijital menü ile müşteri deneyimini iyileştirin ve sipariş sürecini hızlandırın.",
      color: "text-teal-600",
    },
    {
      icon: FaLock,
      title: "Güvenli ve Güvenilir",
      description:
        "Verileriniz güvende, menü güncellemeleri anında ve sistem %99.9 uptime garantisi.",
      color: "text-red-600",
    },
  ];

  const pricingPlans = [
    {
      name: "Başlangıç",
      price: "Ücretsiz",
      description: "Küçük restoranlar için ideal",
      features: [
        "1 QR menü",
        "Temel şablonlar",
        "Email desteği",
        "100 görüntüleme/ay",
      ],
      popular: false,
      color: "text-gray-600",
    },
    {
      name: "Pro",
      price: "₺99/ay",
      description: "Büyüyen işletmeler için",
      features: [
        "Sınırsız QR menü",
        "Özel şablonlar",
        "Analitik raporlar",
        "Öncelikli destek",
        "Sınırsız görüntüleme",
      ],
      popular: true,
      color: "text-blue-600",
    },
    {
      name: "Enterprise",
      price: "Özel",
      description: "Büyük zincirler için",
      features: [
        "Özel entegrasyonlar",
        "API erişimi",
        "7/24 destek",
        "Özel çözümler",
        "White-label",
      ],
      popular: false,
      color: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 max-w-4xl mx-auto">
              QR Menu ile Menünüzü{" "}
              <span className="text-blue-600">Dijitalleştirin</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Restoranınızın menüsünü QR kod ile dijitalleştirin, müşteri
              deneyimini artırın ve operasyonel verimliliği maksimize edin.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button color="primary" size="lg">
                <FaQrcode className="mr-2" />
                Hemen Başlayın
              </Button>
              <Button variant="bordered" size="lg">
                <FaMobile className="mr-2" />
                Demo İnceleyin
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Neden QR Menu?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Modern restoranlar için tasarlanmış özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-8 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
              >
                <CardBody className="text-center space-y-4">
                  <div className={`text-5xl ${feature.color} mx-auto`}>
                    <feature.icon />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Fiyatlandırma
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                İhtiyaçlarınıza uygun plan seçin
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <Card
                  key={index}
                  className={`p-8 hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${
                    plan.popular ? "ring-2 ring-blue-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge
                      color="primary"
                      className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full"
                    >
                      Popüler
                    </Badge>
                  )}

                  <CardBody className="space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {plan.name}
                      </h3>
                      <p className={`text-3xl font-bold ${plan.color}`}>
                        {plan.price}
                      </p>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full" />
                          <span className="text-gray-600">{feature}</span>
                        </div>
                      ))}

                      <Button
                        color={plan.popular ? "primary" : "default"}
                        variant={plan.popular ? "solid" : "bordered"}
                        size="lg"
                        className="w-full mt-4"
                      >
                        {plan.name === "Enterprise"
                          ? "İletişime Geçin"
                          : "Başlayın"}
                      </Button>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Hemen Başlayın
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              QR menü ile restoranınızı dijitalleştirin ve müşteri deneyimini
              artırın
            </p>
            <Button color="primary" size="lg">
              <FaQrcode className="mr-2" />
              Ücretsiz Deneyin
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
