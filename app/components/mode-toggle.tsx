"use client";
import { Switch } from "@/components/ui/switch";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-[3px]"
    >
      {theme === "dark" ? "Light Mode" : "Dark Mode"}
    </Switch>
  );
}
