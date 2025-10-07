"use client";

import { Button } from "@/components/UI/Button/button";
import { Themes } from "@/types/types";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export interface ThemeSwitcher {
  defaultTheme: string | undefined;
}

const ThemeSwitcher = ({ defaultTheme }: ThemeSwitcher) => {
  const [theme, setTheme] = useState<Themes[number]>(
    defaultTheme === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setTheme(newTheme);

    Cookies.set("theme", newTheme);

    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (!defaultTheme) {
      const isUserThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

      if (isUserThemeDark) {
        document.documentElement.classList.add("dark");
        setTheme("dark");
      }
    }
  }, []);

  // Fir ensuring that the `theme` state changes if there was an unexpected change in `defaultTheme` prop
  useEffect(() => {
    if (defaultTheme) setTheme(defaultTheme === "dark" ? "dark" : "light");
  }, [defaultTheme]);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
