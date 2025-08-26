"use client";

export const HowItWorksSection: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-950 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              3 basit adımda QR menünüzü oluşturun
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  1
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Menü Oluşturun
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ürünlerinizi ve kategorilerinizi ekleyin, fotoğraflar yükleyin
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  2
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                QR Kod Alın
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sistem otomatik olarak QR kodunuzu oluştursun
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                  3
                </span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Paylaşın
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                QR kodu masalara yapıştırın, müşteriler menüye erişsin
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
