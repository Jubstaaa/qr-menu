"use client";

import { Switch } from "@heroui/react";
import { useFormContext } from "react-hook-form";

interface SwitchFieldProps {
  label: string;
  description?: string;
  name: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  labels?: {
    true: string;
    false: string;
  };
}

export default function SwitchField({
  label,
  description,
  name,
  color = "success",
  labels = { true: "Aktif", false: "Pasif" },
}: SwitchFieldProps) {
  const { setValue, watch } = useFormContext();
  const currentValue = watch(name);

  return (
    <div className="flex items-center justify-between p-4 bg-default-50 dark:bg-default-900/20 rounded-lg">
      <div className="space-y-1">
        <label className="text-sm font-medium text-default-700">{label}</label>
        {description && (
          <p className="text-xs text-default-500">{description}</p>
        )}
      </div>
      <Switch
        isSelected={currentValue}
        onValueChange={(value) => setValue(name, value)}
        color={color}
      >
        {currentValue ? labels.true : labels.false}
      </Switch>
    </div>
  );
}
