import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Button, Chip } from "@heroui/react";
import { Plus, X } from "lucide-react";
import { BaseInputProps } from "./BaseInput";

interface KeyValueInputProps
  extends Omit<BaseInputProps, "type" | "placeholder"> {
  placeholders?: {
    key?: string;
    value?: string;
  };
}

export const KeyValueInput: React.FC<KeyValueInputProps> = ({
  name,
  error,
  placeholders = {
    key: "Anahtar",
    value: "Değer",
  },
  ...props
}) => {
  const { setValue, watch, formState } = useFormContext();
  const [inputData, setInputData] = useState({ key: "", value: "" });
  const fieldError = formState.errors[name]?.message as string;
  const hasError = !!fieldError || !!error;

  const currentObject = watch(name) || {};

  const addKeyValue = () => {
    if (inputData.key.trim() && inputData.value.trim()) {
      const updatedObject = {
        ...currentObject,
        [inputData.key.trim()]: inputData.value.trim(),
      };
      setValue(name, updatedObject);
      setInputData({ key: "", value: "" });
    }
  };

  const removeKeyValue = (keyToRemove: string) => {
    const updatedObject = { ...currentObject };
    delete updatedObject[keyToRemove];
    setValue(name, updatedObject);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyValue();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-default-700">
        {props.label}
        {props.isRequired && <span className="text-danger ml-1">*</span>}
      </label>

      {props.description && (
        <p className="text-xs text-default-500">{props.description}</p>
      )}

      <div className="flex gap-2">
        <Input
          value={inputData.key}
          onChange={(e) =>
            setInputData((prev) => ({ ...prev, key: e.target.value }))
          }
          onKeyPress={handleKeyPress}
          placeholder={placeholders.key}
          isInvalid={hasError}
          errorMessage={fieldError || error}
          validationBehavior="aria"
          variant="bordered"
        />
        <Input
          value={inputData.value}
          onChange={(e) =>
            setInputData((prev) => ({ ...prev, value: e.target.value }))
          }
          onKeyPress={handleKeyPress}
          placeholder={placeholders.value}
          isInvalid={hasError}
          validationBehavior="aria"
          variant="bordered"
        />
        <Button
          type="button"
          color="primary"
          variant="flat"
          onPress={addKeyValue}
          isDisabled={!inputData.key.trim() || !inputData.value.trim()}
          isIconOnly
        >
          <Plus size={16} />
        </Button>
      </div>

      {Object.keys(currentObject).length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {Object.entries(currentObject).map(([key, value]) => (
            <Chip
              key={key}
              color="default"
              onClose={() => removeKeyValue(key)}
              endContent={<X size={16} />}
            >
              {key}: {String(value)}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
};
