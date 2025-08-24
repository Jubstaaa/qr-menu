"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button, Switch } from "@heroui/react";
import { FaSun, FaMoon } from "react-icons/fa";

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
      startContent={<FaSun />}
      endContent={<FaMoon />}
      aria-label="Toggle theme"
    />
  );
} 