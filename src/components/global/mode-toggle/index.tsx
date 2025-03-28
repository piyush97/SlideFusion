"use client";

import { Switch } from "@/components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center space-x-2">
      <Moon
        className={`h-5 w-5 transform transition-all duration-300 ease-in-out ${
          theme === "dark"
            ? "text-primary scale-110 rotate-0"
            : "text-muted-foreground scale-95 rotate-[-25deg] opacity-70"
        }`}
      />
      <Switch
        checked={theme === "light"}
        className="h-6 transition-all duration-300"
        onCheckedChange={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle Dark Mode"
      />
      <Sun
        className={`h-5 w-5 transform transition-all duration-300 ease-in-out ${
          theme === "light"
            ? "text-primary scale-110 rotate-0"
            : "text-muted-foreground scale-95 rotate-[25deg] opacity-70"
        }`}
      />
    </div>
  );
};

export default ThemeSwitcher;
