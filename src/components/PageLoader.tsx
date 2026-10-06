"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"drawing" | "fadeout" | "done">("drawing");

  useEffect(() => {
    // Phase 1 : dessin du logo n8n (1.2s)
    const t1 = setTimeout(() => setPhase("fadeout"), 1200);
    // Phase 2 : fade-out (0.5s)
    const t2 = setTimeout(() => setPhase("done"), 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0f] transition-opacity duration-[500ms] ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-[#EA4B71]/15 to-[#EA4B71]/5 rounded-full blur-[120px]" />

      {/* n8n Logo */}
      <div
        className={`transition-all duration-500 ${
          phase === "fadeout" ? "scale-110 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Rounded square background */}
          <rect
            width="24"
            height="24"
            rx="6"
            fill="#EA4B71"
            style={{
              strokeDashoffset: 96,
              strokeDasharray: 96,
              animation: "draw-rect 0.6s ease-out forwards",
            }}
            stroke="#EA4B71"
            strokeWidth="0"
          />
          {/* Three white circles + connecting lines */}
          <circle
            cx="7"
            cy="12"
            r="2.2"
            fill="#FFFFFF"
            style={{
              opacity: 0,
              animation: "pop-in 0.25s ease-out 0.3s forwards",
            }}
          />
          <circle
            cx="17"
            cy="7.5"
            r="2.2"
            fill="#FFFFFF"
            style={{
              opacity: 0,
              animation: "pop-in 0.25s ease-out 0.45s forwards",
            }}
          />
          <circle
            cx="17"
            cy="16.5"
            r="2.2"
            fill="#FFFFFF"
            style={{
              opacity: 0,
              animation: "pop-in 0.25s ease-out 0.6s forwards",
            }}
          />
          <path
            d="M7 12h5l5-4.5M12 12l5 4.5"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="22"
            strokeDashoffset="22"
            style={{
              animation: "draw-path 0.4s ease-out 0.7s forwards",
            }}
          />
        </svg>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes draw-rect {
          to { stroke-dashoffset: 0; }
        }
        @keyframes draw-path {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.3); }
          60% { transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}