"use client";

import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@heroui/react";
import { X, Clock, Flame, ChefHat, AlertTriangle, Info } from "lucide-react";
import { ItemAPI } from "@qr-menu/shared-types";

interface ProductDetailModalProps {
  product: ItemAPI.Public.GetActiveItemsBySubdomainResponse[0];
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const {
    isOpen: modalIsOpen,
    onOpen,
    onClose: modalClose,
  } = useDisclosure({
    isOpen,
    onClose,
  });
  const getSpiceLevelText = (level: number) => {
    const levels = {
      1: "Hafif",
      2: "Orta",
      3: "Acılı",
      4: "Çok Acılı",
    };
    return levels[level as keyof typeof levels] || `Seviye ${level}`;
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onClose={modalClose}
      size="2xl"
      scrollBehavior="inside"
      classNames={{
        base: "max-w-2xl",
        header: "border-b border-gray-200 pb-4",
        body: "py-6",
        footer: "border-t border-gray-200 pt-4",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <h2 className="text-2xl font-bold text-gray-900">{product.name}</h2>

          {/* Badges */}
          <div className="flex gap-2 mt-2">
            {product.is_popular && (
              <Chip
                startContent={<Flame className="w-3 h-3" />}
                color="warning"
                variant="flat"
                size="sm"
              >
                Popüler
              </Chip>
            )}
            {product.is_chef_special && (
              <Chip
                startContent={<ChefHat className="w-3 h-3" />}
                color="secondary"
                variant="flat"
                size="sm"
              >
                Şef Özel
              </Chip>
            )}
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="flex gap-6">
            {/* Image */}
            <div className="flex-shrink-0">
              {product.image_url ? (
                <div className="relative w-32 h-32 rounded-xl overflow-hidden">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                  <span className="text-orange-500 text-4xl">🍽️</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Description */}
              {product.description && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    Açıklama
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Ingredients */}
              {product.ingredients && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">
                    Malzemeler
                  </h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {product.ingredients}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {product.spice_level && (
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <div className="text-xs text-red-600 font-medium mb-1">
                  Acı Seviyesi
                </div>
                <div className="text-sm font-semibold text-red-800">
                  {getSpiceLevelText(product.spice_level)}
                </div>
              </div>
            )}

            {product.preparation_time && (
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="text-xs text-blue-600 font-medium mb-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Hazırlama
                </div>
                <div className="text-sm font-semibold text-blue-800">
                  {product.preparation_time} dakika
                </div>
              </div>
            )}
          </div>

          {/* Allergens */}
          {product.allergens && typeof product.allergens === "string" && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Alerjenler
              </h3>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(product.allergens).map(
                  (allergen: string, index: number) => (
                    <Chip
                      key={index}
                      color="warning"
                      variant="bordered"
                      size="sm"
                    >
                      {allergen}
                    </Chip>
                  )
                )}
              </div>
            </div>
          )}

          {/* Nutrition Info */}
          {product.nutrition_info &&
            Object.keys(product.nutrition_info).length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Besin Değerleri
                </h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {Object.entries(product.nutrition_info).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between p-2 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-600 capitalize font-medium">
                          {key}:
                        </span>
                        <span className="font-bold text-gray-900">
                          {String(value)}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
        </ModalBody>

        <ModalFooter>
          <div className="flex justify-between items-center w-full">
            <div className="text-3xl font-bold text-green-600">
              ₺{product.price}
            </div>
            <button
              onClick={modalClose}
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 active:scale-95 transition-all duration-200"
            >
              Kapat
            </button>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
