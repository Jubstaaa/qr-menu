"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Chip,
  Divider,
} from "@heroui/react";
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl" scrollBehavior="inside">
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>
            <div className="flex gap-2">
              {product.is_popular && (
                <Chip color="warning" variant="flat" size="sm">
                  🔥 Popüler
                </Chip>
              )}
              {product.is_chef_special && (
                <Chip color="secondary" variant="flat" size="sm">
                  👨‍🍳 Şef Özel
                </Chip>
              )}
            </div>
          </div>
        </ModalHeader>
        <ModalBody className="gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Image and Basic Info */}
            <div className="space-y-4">
              {/* Image */}
              {product.image_url ? (
                <div className="relative">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400 text-6xl">🍽️</div>
                </div>
              )}

              {/* Price */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-bold text-green-600">
                    ₺{product.price}
                  </span>
                </div>

                {product.preparation_time && (
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">⏱️</span>
                    <span>
                      Hazırlama süresi: {product.preparation_time} dakika
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Detailed Info */}
            <div className="space-y-4">
              {/* Description */}
              {product.description && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    📝 Açıklama
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🥘 Malzemeler
                  </h3>
                  <p className="text-gray-600">{product.ingredients}</p>
                </div>
              )}

              {/* Spice Level */}
              {product.spice_level && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🌶️ Acı Seviyesi
                  </h3>
                  <Chip color="danger" variant="flat">
                    {getSpiceLevelText(product.spice_level)}
                  </Chip>
                </div>
              )}

              {/* Allergens */}
              {product.allergens && product.allergens.length > 0 && (
                <div className="bg-white p-4 rounded-lg border">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    ⚠️ Alerjenler
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.allergens.map((allergen, index) => (
                      <Chip
                        key={index}
                        color="warning"
                        variant="flat"
                        size="sm"
                      >
                        {allergen}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {/* Nutrition Info */}
              {product.nutrition_info &&
                Object.keys(product.nutrition_info).length > 0 && (
                  <div className="bg-white p-4 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      📊 Besin Değerleri
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(product.nutrition_info).map(
                        ([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 capitalize">
                              {key}:
                            </span>
                            <span className="font-medium">{String(value)}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
            </div>
          </div>

          <Divider />

          {/* Additional Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              ℹ️ Ek Bilgiler
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Sıra:</span>
                <p className="font-medium">
                  #{product.sort_order || "Belirtilmemiş"}
                </p>
              </div>

              {product.created_at && (
                <div>
                  <span className="text-gray-500">Eklenme:</span>
                  <p className="font-medium">
                    {formatDate(product.created_at)}
                  </p>
                </div>
              )}
              {product.updated_at && (
                <div>
                  <span className="text-gray-500">Güncelleme:</span>
                  <p className="font-medium">
                    {formatDate(product.updated_at)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="default" variant="light" onPress={onClose}>
            Kapat
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
