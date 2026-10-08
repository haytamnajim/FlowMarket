"use client";

import { useTheme } from "./ThemeProvider";
import Icon from "./Icon";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all cursor-pointer"
      title={`Basculer en mode ${resolvedTheme === "dark" ? "clair" : "sombre"}`}
      aria-label="Basculer le thème"
    >
      {resolvedTheme === "dark" ? (
        <Icon name="sun" className="w-4 h-4 text-amber-400" />
      ) : (
        <Icon name="moon" className="w-4 h-4 text-indigo-400" />
      )}
    </button>
  );
}