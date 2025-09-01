import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface NumberInputProps extends Omit<BaseInputProps, "type"> {
  placeholder?: string;
  min?: string | number;
  max?: string | number;
  step?: string | number;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  name,
  placeholder = "Sayı giriniz",
  min,
  max,
  step,
  ...props
}) => {
  return (
    <BaseInput
      name={name}
      type="number"
      placeholder={placeholder}
      min={min?.toString()}
      max={max?.toString()}
      step={step?.toString()}
      {...props}
    />
  );
};
