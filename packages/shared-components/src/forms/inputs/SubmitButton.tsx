import React from "react";
import { Button, ButtonProps } from "@heroui/react";
import { useFormContext } from "react-hook-form";
import { Loader2 } from "lucide-react";

interface SubmitButtonProps extends Omit<ButtonProps, "type" | "isLoading"> {
  children: React.ReactNode;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  ...props
}) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  return (
    <Button type="submit" isLoading={isSubmitting} {...props}>
      {isSubmitting ? <Loader2 className="animate-spin" size={16} /> : children}
    </Button>
  );
};
