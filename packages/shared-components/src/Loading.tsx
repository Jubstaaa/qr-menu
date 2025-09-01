import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = "md",
  text = "Yükleniyor...",
  className = "",
}) => {
  const sizeMap = {
    sm: 16,
    md: 32,
    lg: 48,
  };

  return (
    <div
      className={`flex items-center justify-center min-h-[400px] ${className}`}
    >
      <div className="text-center">
        <Loader2
          className="animate-spin mx-auto text-blue-600"
          size={sizeMap[size]}
        />
        {text && (
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Loading;
