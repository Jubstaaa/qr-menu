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
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="text-center py-16">
          <div className="text-gray-400 text-8xl mb-6">🍽️</div>
          <h3 className="text-2xl font-medium text-gray-900 mb-3">
            Bu kategoride henüz ürün yok
          </h3>
          <p className="text-gray-600 text-lg">Ürünler yakında eklenecek</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Items Grid */}
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="bg-white overflow-hidden shadow-lg rounded-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              onClick={() => openProductModal(item)}
            >
              {/* Item Image */}
              {item.image_url && (
                <div className="aspect-w-16 aspect-h-9">
                  <Image
                    src={item.image_url}
                    alt={item.name}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {/* Item Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {item.name}
                  </h3>
                  <span className="text-xl font-bold text-green-600 ml-2">
                    ₺{item.price}
                  </span>
                </div>

                {item.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
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
