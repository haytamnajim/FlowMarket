"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

export type ToastType = "success" | "error" | "info";

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

let addToastFn: ((msg: string, type?: ToastType) => void) | null = null;

export function toast(message: string, type: ToastType = "success") {
  addToastFn?.(message, type);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    addToastFn = (message: string, type: ToastType = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    };
    return () => { addToastFn = null; };
  }, []);

  const iconName = (type: ToastType) =>
    type === "success" ? "check" : type === "error" ? "x" : "bolt";

  const colors = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    error: "border-red-500/30 bg-red-500/10 text-red-400",
    info: "border-indigo-500/30 bg-indigo-500/10 text-indigo-400",
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9997] flex flex-col gap-3 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl border bg-[#111118]/90 backdrop-blur shadow-xl animate-in slide-in-from-right-4 duration-300 pointer-events-auto ${colors[t.type]}`}
          style={{ animation: "toast-in 0.3s ease-out forwards" }}
        >
          <div className={`w-7 h-7 rounded-full ${colors[t.type]} flex items-center justify-center flex-shrink-0`}>
            <Icon name={iconName(t.type)} className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm text-white font-medium">{t.message}</span>
        </div>
      ))}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
