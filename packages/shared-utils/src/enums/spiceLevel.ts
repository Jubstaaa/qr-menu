import { SpiceLevel } from "@qr-menu/shared-validation";

export const getSpiceLevelOptions = () => [
  { value: SpiceLevel.MILD, label: "Hafif" },
  { value: SpiceLevel.MEDIUM, label: "Orta" },
  { value: SpiceLevel.HOT, label: "Acı" },
  { value: SpiceLevel.EXTRA_HOT, label: "Çok Acı" },
  { value: SpiceLevel.EXTREME, label: "Aşırı Acı" },
  { value: SpiceLevel.INSANE, label: "Çılgın Acı" },
];

export const getSpiceLevelText = (spiceLevel: SpiceLevel): string => {
  return (
    getSpiceLevelOptions().find((option) => option.value === spiceLevel)
      ?.label || ""
  );
};
