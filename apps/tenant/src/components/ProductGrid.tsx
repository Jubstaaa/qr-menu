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
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🍽️</div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Bu kategoride henüz ürün yok
        </h3>
        <p className="text-gray-600">
          Lezzetli ürünlerimiz yakında bu kategoride yerini alacak
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg active:scale-98 transition-all duration-200 cursor-pointer group"
            onClick={() => openProductModal(item)}
          >
            <div className="flex">
              {/* Product Image */}
              <div className="flex-shrink-0">
                {item.image_url ? (
                  <div className="w-28 h-full relative group-hover:scale-105 transition-transform duration-200">
                    <Image
                      src={item.image_url}
                      alt={item.name}
                      fill
                      className="object-cover rounded-l-xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-l-xl"></div>
                  </div>
                ) : (
                  <div className="w-28 h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center rounded-l-xl">
                    <span className="text-orange-500 text-3xl">🍽️</span>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="text-right ml-2">
                    <div className="text-xl font-bold text-green-600">
                      ₺{item.price}
                    </div>
                    {!item.is_available && (
                      <div className="text-xs text-red-600 font-medium">
                        Stokta Yok
                      </div>
                    )}
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {item.description}
                  </p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {item.is_popular && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      🔥 Popüler
                    </span>
                  )}
                  {item.is_chef_special && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      👨‍🍳 Şef Özel
                    </span>
                  )}
                  {item.spice_level && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
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
                  )}
                  {item.preparation_time && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ⏱️ {item.preparation_time}dk
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
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
