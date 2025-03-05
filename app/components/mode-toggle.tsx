"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Button>
  );
}
