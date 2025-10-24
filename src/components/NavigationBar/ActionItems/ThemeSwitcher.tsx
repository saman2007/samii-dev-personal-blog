"use client";

import { Button } from "@/components/UI/Button/Button";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useSetStore, useStoreData } from "@/contexts/storeContext";

export interface ThemeSwitcher {
  defaultTheme: string | null;
}

const ThemeSwitcher = ({ defaultTheme }: ThemeSwitcher) => {
  const { theme } = useStoreData();
  const setStore = useSetStore();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";

    setStore({ theme: newTheme });

    Cookies.set("theme", newTheme);

    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (!defaultTheme) {
      const isUserThemeDark = window.matchMedia("(prefers-color-scheme: dark)");

      if (isUserThemeDark) {
        document.documentElement.classList.add("dark");
        setStore({ theme: "dark" });
      }
    }
  }, []);

  // Fir ensuring that the `theme` state changes if there was an unexpected change in `defaultTheme` prop
  useEffect(() => {
    if (defaultTheme)
      setStore({ theme: defaultTheme === "dark" ? "dark" : "light" });
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
