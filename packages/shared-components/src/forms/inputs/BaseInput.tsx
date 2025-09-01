import React from "react";
import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "@heroui/react";

export interface BaseInputProps
  extends Omit<InputProps, "errorMessage" | "isInvalid"> {
  name: string;
  error?: string;
}

export const BaseInput: React.FC<BaseInputProps> = ({
  name,
  error,
  ...props
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const fieldError = errors[name];
  const errorMessage = error || fieldError?.message;

  return (
    <Input
      {...register(name)}
      errorMessage={errorMessage as string}
      validationBehavior="aria"
      isInvalid={!!errorMessage}
      variant="bordered"
      {...props}
    />
  );
};
