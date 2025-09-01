import React from "react";
import { Textarea, TextAreaProps } from "@heroui/react";
import { useFormContext } from "react-hook-form";

interface TextareaInputProps
  extends Omit<TextAreaProps, "errorMessage" | "isInvalid"> {
  name: string;
  error?: string;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
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
    <Textarea
      {...register(name)}
      errorMessage={errorMessage as string}
      validationBehavior="aria"
      isInvalid={!!errorMessage}
      variant="bordered"
      {...props}
    />
  );
};
