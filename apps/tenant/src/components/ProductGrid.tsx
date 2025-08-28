"use client";

import { useState } from "react";
import Image from "next/image";
import ProductDetailModal from "./ProductDetailModal";

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
};

interface ProductGridProps {
  products: MenuItem[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProductModal = (product: MenuItem) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeProductModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  if (!products || products.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="text-center py-20">
          <div className="relative">
            <div className="text-gray-300 dark:text-gray-600 text-9xl mb-8 animate-bounce">
              🍽️
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          </div>
          <h3 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">
            Bu kategoride henüz ürün yok
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Lezzetli ürünlerimiz yakında bu kategoride yerini alacak
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item, index) => (
            <div
              key={item.id}
              className="group relative bg-white dark:bg-gray-800 overflow-hidden shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border border-gray-100 dark:border-gray-700"
              onClick={() => openProductModal(item)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {item.image_url ? (
                <div className="relative aspect-w-16 aspect-h-9 overflow-hidden">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.is_popular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500 text-white shadow-lg">
                        🔥 Popüler
                      </span>
                    )}
                    {item.is_chef_special && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white shadow-lg">
                        👨‍🍳 Şef Özel
                      </span>
                    )}
                  </div>

                  {!item.is_available && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      ❌ Stokta Yok
                    </div>
                  )}

                  {item.spice_level && (
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-500/90 text-white backdrop-blur-sm">
                        🌶️{" "}
                        {item.spice_level === "mild"
                          ? "Hafif"
                          : item.spice_level === "medium"
                            ? "Orta"
                            : item.spice_level === "hot"
                              ? "Acılı"
                              : item.spice_level === "extra_hot"
                                ? "Çok Acılı"
                                : item.spice_level}
                      </span>
                    </div>
                  )}

                  {item.preparation_time && (
                    <div className="absolute bottom-3 right-3">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-500/90 text-white backdrop-blur-sm">
                        ⏱️ {item.preparation_time}dk
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                  <div className="text-6xl text-gray-400 dark:text-gray-500">
                    🍽️
                  </div>

                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {item.is_popular && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500 text-white shadow-lg">
                        🔥 Popüler
                      </span>
                    )}
                    {item.is_chef_special && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-500 text-white shadow-lg">
                        👨‍🍳 Şef Özel
                      </span>
                    )}
                  </div>

                  {!item.is_available && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      ❌ Stokta Yok
                    </div>
                  )}
                </div>
              )}

              <div className="relative p-6">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <div className="flex flex-col items-end ml-3">
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₺{item.price}
                    </span>
                    {item.is_available && (
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Stokta
                      </span>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    Detayları gör
                  </span>
                  <div className="flex items-center text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform duration-300">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeProductModal}
        />
      )}
    </>
  );
}
