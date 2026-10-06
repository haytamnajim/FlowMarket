"use client";

import { useTheme } from "./ThemeProvider";
import Icon from "./Icon";

export default function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1 bg-[#111118] border border-[#2a2a3a] rounded-xl p-1">
      {(["light", "dark", "system"] as const).map((t) => (
        <button
          key={t}
          onClick={() => setTheme(t)}
          className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            theme === t
              ? "bg-gradient-to-r from-indigo-500 to-amber-500 text-white shadow-lg shadow-indigo-500/25"
              : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
          }`}
          aria-label={`Mode ${t === "system" ? "système" : t}`}
          title={t === "system" ? "Système" : t === "light" ? "Clair" : "Sombre"}
        >
          {t === "light" && <Icon name="sun" className="w-4 h-4" />}
          {t === "dark" && <Icon name="moon" className="w-4 h-4" />}
          {t === "system" && <Icon name="monitor" className="w-4 h-4" />}
          {theme === t && <span className="w-1.5 h-1.5 rounded-full bg-white/30" />}
        </button>
      ))}
    </div>
  );
}