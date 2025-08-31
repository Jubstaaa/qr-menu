"use client";

import { Wifi } from "lucide-react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Snippet,
} from "@heroui/react";

interface WifiPopoverProps {
  wifiSsid?: string;
  wifiPassword?: string;
}

export default function WifiPopover({
  wifiSsid,
  wifiPassword,
}: WifiPopoverProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!wifiSsid) return null;

  return (
    <>
      {/* Fixed WiFi Button */}
      <Button
        isIconOnly
        color="warning"
        variant="solid"
        size="lg"
        className="fixed bottom-4 right-4 z-50 shadow-lg"
        onPress={onOpen}
        aria-label="WiFi bilgilerini göster"
      >
        <Wifi className="w-5 h-5" />
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <Wifi className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold">WiFi Bilgileri</h3>
            </div>
          </ModalHeader>

          <ModalBody>
            <div className="space-y-4">
              {/* SSID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Ağ Adı (SSID)
                </label>
                <Snippet className="w-full h-10" hideCopyButton>
                  {wifiSsid}
                </Snippet>
              </div>

              {/* Password */}
              {wifiPassword && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Şifre
                  </label>
                  <Snippet className="w-full">{wifiPassword}</Snippet>
                </div>
              )}
            </div>
          </ModalBody>

          <ModalFooter>
            <Button color="warning" onPress={onClose} className="w-full">
              Tamam
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
