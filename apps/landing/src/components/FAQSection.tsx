"use client";

import { useState } from "react";
import { Card, CardBody, Button } from "@heroui/react";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "QR menü nasıl çalışır?",
      answer:
        "Müşteriler telefonlarıyla QR kodu okutur ve menünüze anında erişir. Menü güncellemeleri otomatik olarak yansır. Sistem tamamen bulut tabanlıdır, herhangi bir cihazdan yönetebilirsiniz.",
    },
    {
      question: "Teknik bilgi gerektirir mi?",
      answer:
        "Hayır! Web arayüzümüz çok kullanıcı dostu. Sadece ürünlerinizi ekleyin, sistem otomatik QR kod oluştursun. Sürükle-bırak ile kolayca düzenleyebilirsiniz.",
    },
    {
      question: "Kaç tane menü oluşturabilirim?",
      answer:
        "Ücretsiz planda 1 menü, Pro planda sınırsız menü oluşturabilirsiniz. Her menü için ayrı QR kod alırsınız. Çoklu lokasyon desteği de mevcuttur.",
    },
    {
      question: "Müşteri verileri güvende mi?",
      answer:
        "Evet! Tüm veriler şifrelenir ve güvenli sunucularda saklanır. KVKK uyumludur. SSL sertifikası ile güvenli bağlantı sağlanır.",
    },
    {
      question: "Menü güncellemeleri ne kadar sürede yansır?",
      answer:
        "Menü güncellemeleri anında yansır! Değişiklik yaptığınız anda müşteriler yeni menüyü görebilir. Cache sistemi sayesinde hızlı yükleme sağlanır.",
    },
    {
      question: "Hangi cihazlarda çalışır?",
      answer:
        "Tüm modern cihazlarda çalışır: iPhone, Android, tablet, bilgisayar. Responsive tasarım sayesinde her ekran boyutunda mükemmel görünür.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
              <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Sık Sorulan{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Sorular
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              QR Menu hakkında merak edilenler. Sorularınızın cevabını burada
              bulabilirsiniz.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className={`transition-all duration-300 hover:shadow-lg ${
                  openIndex === index
                    ? "ring-2 ring-blue-500 shadow-lg dark:bg-gray-800 dark:border-gray-700"
                    : "dark:bg-gray-800 dark:border-gray-700"
                }`}
              >
                <CardBody className="p-0">
                  <Button
                    variant="light"
                    className="w-full h-auto p-6 justify-between text-left"
                    onPress={() => toggleFAQ(index)}
                    endContent={
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    }
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                      {faq.question}
                    </h3>
                  </Button>

                  {openIndex === index && (
                    <div className="px-6 pb-6 pt-0">
                      <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
