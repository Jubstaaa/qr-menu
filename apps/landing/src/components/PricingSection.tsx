"use client";

import { Button, Card, CardBody, Chip } from "@heroui/react";
import { Check, Crown, Star, Zap } from "lucide-react";
import { useModalContext } from "../contexts/ModalContext";
import Link from "next/link";

export const PricingSection: React.FC = () => {
  const { openAuthModal } = useModalContext();

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
        "Temel analitik",
        "Mobil uyumlu tasarım",
      ],
      popular: false,
      color: "text-gray-600 dark:text-gray-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-gray-200 dark:border-gray-700",
      icon: Zap,
      buttonText: "Ücretsiz Başlayın",
      buttonColor: "default",
    },
    {
      name: "Pro",
      price: "₺99",
      period: "/ay",
      description: "Büyüyen işletmeler için",
      features: [
        "Sınırsız QR menü",
        "Özel şablonlar",
        "Gelişmiş analitik raporlar",
        "Öncelikli destek",
        "Sınırsız görüntüleme",
        "Özelleştirilebilir tasarım",
        "Çoklu lokasyon desteği",
        "API erişimi",
        "Push bildirimler",
        "7/24 destek",
      ],
      popular: true,
      color: "text-blue-600 dark:text-blue-400",
      bgColor:
        "bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      icon: Star,
      buttonText: "Pro'ya Geçin",
      buttonColor: "primary",
    },
    {
      name: "Enterprise",
      price: "Özel",
      description: "Büyük zincirler için",
      features: [
        "Özel entegrasyonlar",
        "Tam API erişimi",
        "7/24 öncelikli destek",
        "Özel çözümler",
        "White-label seçeneği",
        "Çoklu dil desteği",
        "Gelişmiş güvenlik",
        "Özel eğitim",
        "Dedicated sunucu",
        "SLA garantisi",
      ],
      popular: false,
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-white dark:bg-gray-800",
      borderColor: "border-gray-200 dark:border-gray-700",
      icon: Crown,
      buttonText: "İletişime Geçin",
      buttonColor: "secondary",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Şeffaf{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Fiyatlandırma
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              İhtiyaçlarınıza uygun plan seçin, büyüdükçe yükseltin. Tüm planlar
              30 gün ücretsiz deneme ile gelir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  plan.popular ? "ring-2 ring-blue-500 shadow-xl" : ""
                } ${plan.bgColor} ${plan.borderColor} border-2`}
              >
                {plan.popular && (
                  <Chip
                    color="primary"
                    className="px-6 py-2 text-sm font-semibold rounded-full shadow-lg"
                  >
                    En Popüler
                  </Chip>
                )}

                <CardBody className="p-8 space-y-8">
                  <div className="text-center space-y-6">
                    <div
                      className={`mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 flex items-center justify-center`}
                    >
                      <plan.icon className={`w-8 h-8 ${plan.color}`} />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </h3>
                      <div className="space-y-1">
                        <p className={`text-4xl font-bold ${plan.color}`}>
                          {plan.price}
                          {plan.period && (
                            <span className="text-lg font-normal text-gray-600 dark:text-gray-400">
                              {plan.period}
                            </span>
                          )}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-4">
                      {plan.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className="flex items-center gap-3"
                        >
                          <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-200 text-sm">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>

                    {plan.name === "Enterprise" ? (
                      <Button
                        color={plan.buttonColor as any}
                        variant={plan.popular ? "solid" : "bordered"}
                        size="lg"
                        className="w-full h-12 text-base font-semibold"
                        as={Link}
                        href="/contact"
                      >
                        {plan.buttonText}
                      </Button>
                    ) : (
                      <Button
                        color={plan.buttonColor as any}
                        variant={plan.popular ? "solid" : "bordered"}
                        size="lg"
                        className="w-full h-12 text-base font-semibold"
                        onClick={openAuthModal}
                      >
                        {plan.buttonText}
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Tüm planlar 30 gün ücretsiz deneme ile gelir. İstediğiniz zaman
              iptal edebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
