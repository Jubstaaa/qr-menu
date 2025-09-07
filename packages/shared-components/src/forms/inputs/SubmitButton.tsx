import React from "react";
import { Button, ButtonProps } from "@heroui/react";
import { useFormContext } from "react-hook-form";

interface SubmitButtonProps extends Omit<ButtonProps, "type" | "isLoading"> {
  children: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  ...props
}) => {
  const {
    formState: { isSubmitting, isValid },
  } = useFormContext();

  return (
    <Button
      type="submit"
      isLoading={isSubmitting}
      isDisabled={!isValid}
      {...props}
    >
      {children}
    </Button>
  );
};
