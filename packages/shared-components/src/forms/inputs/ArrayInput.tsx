import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input, Button, Chip } from "@heroui/react";
import { Plus, X } from "lucide-react";

interface ArrayInputProps {
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  isRequired?: boolean;
  error?: string;
}

export const ArrayInput: React.FC<ArrayInputProps> = ({
  name,
  label,
  placeholder,
  description,
  isRequired,
  error,
}) => {
  const { setValue, watch, formState } = useFormContext();
  const [newItem, setNewItem] = useState("");
  const fieldError = formState.errors[name]?.message as string;
  const hasError = !!fieldError || !!error;

  const currentArray = watch(name) || [];

  const addItem = () => {
    if (newItem.trim()) {
      const updatedArray = [...currentArray, newItem.trim()];
      setValue(name, updatedArray);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    const updatedArray = currentArray.filter(
      (_: any, i: number) => i !== index
    );
    setValue(name, updatedArray);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addItem();
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-default-700">
        {label}
        {isRequired && <span className="text-danger ml-1">*</span>}
      </label>

      {description && <p className="text-xs text-default-500">{description}</p>}

      <div className="flex gap-2">
        <Input
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          isInvalid={hasError}
          errorMessage={fieldError || error}
          validationBehavior="aria"
          variant="bordered"
        />
        <Button
          type="button"
          color="primary"
          variant="flat"
          onPress={addItem}
          isDisabled={!newItem.trim()}
          isIconOnly
        >
          <Plus size={16} />
        </Button>
      </div>

      {currentArray.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {currentArray.map((item: string, index: number) => (
            <Chip
              key={index}
              color="default"
              variant="flat"
              onClose={() => removeItem(index)}
              endContent={<X size={12} />}
            >
              {item}
            </Chip>
          ))}
        </div>
      )}
    </div>
  );
};
