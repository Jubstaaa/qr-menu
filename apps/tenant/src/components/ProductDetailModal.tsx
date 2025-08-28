"use client";

import Image from "next/image";
import React from "react";

type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  sort_order: number;
  is_available: boolean;
  allergens?: any[];
  ingredients?: string;
  spice_level?: string;
  is_popular?: boolean;
  is_chef_special?: boolean;
  preparation_time?: number;
  nutrition_info?: any;
  created_at?: string;
  updated_at?: string;
};

interface ProductDetailModalProps {
  product: MenuItem;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getSpiceLevelText = (level: string) => {
    const levels = {
      mild: "Hafif",
      medium: "Orta",
      hot: "Acılı",
      extra_hot: "Çok Acılı",
    };
    return levels[level as keyof typeof levels] || level;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl transform transition-all duration-300">
          <div className="relative p-8 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {product.name}
              </h2>
              <div className="flex gap-3 flex-wrap">
                {product.is_popular && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300">
                    🔥 Popüler
                  </span>
                )}
                {product.is_chef_special && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                    👨‍🍳 Şef Özel
                  </span>
                )}
                {!product.is_available && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                    ❌ Stokta Yok
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-8 max-h-[70vh] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                {product.image_url ? (
                  <div className="relative overflow-hidden rounded-2xl">
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      width={600}
                      height={400}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                ) : (
                  <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center">
                    <div className="text-gray-400 dark:text-gray-500 text-8xl">
                      🍽️
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {product.spice_level && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-xl">
                      <div className="text-red-600 dark:text-red-400 text-sm font-medium mb-1">
                        🌶️ Acı Seviyesi
                      </div>
                      <div className="text-red-800 dark:text-red-300 font-semibold">
                        {getSpiceLevelText(product.spice_level)}
                      </div>
                    </div>
                  )}

                  {product.preparation_time && (
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
                      <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-1">
                        ⏱️ Hazırlama
                      </div>
                      <div className="text-blue-800 dark:text-blue-300 font-semibold">
                        {product.preparation_time} dakika
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                {product.description && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      📝 Açıklama
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {product.ingredients && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      🥘 Malzemeler
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {product.allergens && product.allergens.length > 0 && (
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                      ⚠️ Alerjenler
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.allergens.map((allergen, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        >
                          {allergen}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {product.nutrition_info &&
                  Object.keys(product.nutrition_info).length > 0 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                        📊 Besin Değerleri
                      </h3>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        {Object.entries(product.nutrition_info).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="flex justify-between items-center"
                            >
                              <span className="text-gray-600 dark:text-gray-300 capitalize">
                                {key}:
                              </span>
                              <span className="font-semibold text-gray-900 dark:text-white">
                                {String(value)}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 rounded-b-2xl">
            <div className="flex justify-between items-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ₺{product.price}
              </div>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
