import React from "react";
import { useFormContext } from "react-hook-form";
import { Select, SelectProps, SelectItem } from "@heroui/react";
import { BaseInputProps } from "./BaseInput";

interface SelectInputProps extends Omit<BaseInputProps, "type"> {
  name: string;
  valueAsNumber?: boolean;
}

export const SelectInput: React.FC<SelectInputProps & SelectProps> = ({
  name,
  error,
  children,
  valueAsNumber = false,
  ...props
}) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const fieldError = errors[name];
  const errorMessage = error || fieldError?.message;
  const currentValue = watch(name);

  const handleSelectionChange = (keys: any) => {
    const value = Array.from(keys)[0] as string;

    if (valueAsNumber) {
      const numValue =
        value === "" || value === undefined ? null : Number(value);
      setValue(name, numValue);
    } else {
      setValue(name, value);
    }
  };

  return (
    <Select
      selectedKeys={
        currentValue !== null && currentValue !== undefined
          ? [String(currentValue)]
          : []
      }
      onSelectionChange={handleSelectionChange}
      {...props}
      errorMessage={errorMessage as string}
      isInvalid={!!errorMessage}
      isClearable
    >
      {children}
    </Select>
  );
};

export { SelectItem };
