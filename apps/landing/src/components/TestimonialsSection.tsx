"use client";

import { Card, CardBody, Avatar } from "@heroui/react";
import { Quote, Star } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "Kebapçı Sahibi",
      company: "Yılmaz Kebap Evi",
      avatar: "AY",
      content:
        "QR menü ile müşteri memnuniyetimiz %40 arttı. Artık menü güncellemeleri çok kolay ve müşteriler menüye çok daha kolay erişiyor!",
      rating: 5,
      bgColor: "from-blue-500 to-blue-600",
      textColor: "text-blue-600 dark:text-blue-400",
    },
    {
      name: "Fatma Demir",
      role: "Pizzeria Sahibi",
      company: "Demir Pizza",
      avatar: "FD",
      content:
        "5 dakikada kurulum yaptım. Müşteriler artık telefonlarından menüye bakıyor, çok pratik! Artık kağıt menü basmıyoruz.",
      rating: 5,
      bgColor: "from-green-500 to-green-600",
      textColor: "text-green-600 dark:text-green-400",
    },
    {
      name: "Mehmet Kaya",
      role: "Cafe Sahibi",
      company: "Kaya Cafe",
      avatar: "MK",
      content:
        "Analitik raporları sayesinde hangi ürünlerin popüler olduğunu görebiliyorum. Harika bir sistem! Müşteri davranışlarını anlamak çok kolay.",
      rating: 5,
      bgColor: "from-purple-500 to-purple-600",
      textColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full">
              <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Müşterilerimiz{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Ne Diyor?
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              QR Menu ile başarı hikayeleri. Binlerce restoran sahibi artık
              dijital menü kullanıyor.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="group hover:transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 dark:bg-gray-800 dark:border-gray-700 border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700"
              >
                <CardBody className="p-8 space-y-6">
                  <div className="flex justify-end">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${testimonial.bgColor} rounded-full flex items-center justify-center opacity-20 group-hover:opacity-100 transition-opacity duration-300`}
                    >
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed italic">
                      "{testimonial.content}"
                    </p>
                  </div>

                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                    <Avatar
                      name={testimonial.name}
                      className="w-12 h-12 text-lg font-semibold"
                      classNames={{
                        base: "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
                        name: "text-gray-700 dark:text-gray-200",
                      }}
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-8">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                1000+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Mutlu Müşteri
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                QR Kod Tarama
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                99.9%
              </div>
              <div className="text-gray-600 dark:text-gray-400">Uptime</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">Destek</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
