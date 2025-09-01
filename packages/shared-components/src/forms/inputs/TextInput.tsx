import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface TextInputProps extends Omit<BaseInputProps, "type"> {
  placeholder?: string;
  type?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  name,
  placeholder = "Metin giriniz",
  type = "text",
  ...props
}) => {
  return (
    <BaseInput name={name} type={type} placeholder={placeholder} {...props} />
  );
};
