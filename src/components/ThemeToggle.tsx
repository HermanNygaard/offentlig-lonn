"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/ui/Button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label={"Toggle theme"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {(!theme || theme === "light") && (
        <Sun className="rotate-0 scale-100 transition-all hover:text-slate-900 dark:-rotate-90 dark:scale-0 dark:text-slate-400 dark:hover:text-slate-100" />
      )}
      {theme === "dark" && (
        <Moon className=" rotate-90 scale-0 transition-all hover:text-slate-900 dark:rotate-0 dark:scale-100 dark:text-slate-400 dark:hover:text-slate-100" />
      )}
    </Button>
  );
}
