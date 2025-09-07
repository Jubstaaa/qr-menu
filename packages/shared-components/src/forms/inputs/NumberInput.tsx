import React from "react";
import { useFormContext } from "react-hook-form";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface NumberInputProps extends Omit<BaseInputProps, "type"> {
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  error,
  placeholder = "Sayı giriniz",
  min,
  max,
  step,
  ...props
}) => {
  const { register } = useFormContext();

  const registerOptions = register(name, {
    setValueAs: (value) => {
      return value === "" ? null : parseFloat(value);
    },
  });

  return (
    <BaseInput
      {...registerOptions}
      type="number"
      min={min?.toString()}
      max={max?.toString()}
      step={step?.toString()}
      {...props}
    />
  );
};
