"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "dark";
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  resolvedTheme: "dark",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Enforce dark mode globally
    const root = window.document.documentElement;
    root.classList.remove("light");
    root.classList.add("dark");
    try {
      localStorage.removeItem("theme");
    } catch {}
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme: "dark", resolvedTheme: "dark", setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}