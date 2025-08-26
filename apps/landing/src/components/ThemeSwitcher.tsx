"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Switch } from "@heroui/react";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      defaultSelected={theme === "dark"}
      size="sm"
      color="secondary"
      onValueChange={(isDark) => setTheme(isDark ? "dark" : "light")}
      startContent={<Sun className="h-4 w-4" />}
      endContent={<Moon className="h-4 w-4" />}
      aria-label="Toggle theme"
    />
  );
}
