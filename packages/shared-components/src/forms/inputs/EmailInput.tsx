import React from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";

interface EmailInputProps extends Omit<BaseInputProps, "type"> {
  placeholder?: string;
}

export const EmailInput: React.FC<EmailInputProps> = ({
  name,
  placeholder = "ornek@email.com",
  ...props
}) => {
  return (
    <BaseInput name={name} type="email" placeholder={placeholder} {...props} />
  );
};
