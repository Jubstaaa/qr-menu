import React, { useState } from "react";
import { BaseInput, BaseInputProps } from "./BaseInput";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps extends Omit<BaseInputProps, "type"> {
  placeholder?: string;
  showToggle?: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  placeholder = "Şifrenizi girin",
  showToggle = true,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const endContent = showToggle ? (
    <button
      className="focus:outline-none"
      type="button"
      onClick={toggleVisibility}
    >
      {isVisible ? (
        <EyeOff
          className="text-2xl text-default-400 pointer-events-none"
          size={20}
        />
      ) : (
        <Eye
          className="text-2xl text-default-400 pointer-events-none"
          size={20}
        />
      )}
    </button>
  ) : undefined;

  return (
    <BaseInput
      name={name}
      type={isVisible ? "text" : "password"}
      placeholder={placeholder}
      endContent={endContent}
      {...props}
    />
  );
};
