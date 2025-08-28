"use client";

import { Switch } from "@heroui/react";

interface SwitchFieldProps {
  label: string;
  description?: string;
  isSelected: boolean;
  onValueChange: (value: boolean) => void;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  switchLabel?: string;
}

export default function SwitchField({
  label,
  description,
  isSelected,
  onValueChange,
  color = "success",
  switchLabel,
}: SwitchFieldProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-default-50 dark:bg-default-900/20 rounded-lg">
      <div className="space-y-1">
        <label className="text-sm font-medium text-default-700">{label}</label>
        {description && (
          <p className="text-xs text-default-500">{description}</p>
        )}
      </div>
      <Switch
        isSelected={isSelected}
        onValueChange={onValueChange}
        color={color}
      >
        {switchLabel || (isSelected ? "Aktif" : "Pasif")}
      </Switch>
    </div>
  );
}
