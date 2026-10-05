"use client";

import { useEffect, useState } from "react";

export default function PageLoader() {
  const [phase, setPhase] = useState<"drawing" | "text" | "pulse" | "fadeout" | "done">("drawing");

  useEffect(() => {
    // Phase 1 : dessin du logo SVG (1.4s)
    const t1 = setTimeout(() => setPhase("text"), 1400);
    // Phase 2 : apparition du texte (0.7s)
    const t2 = setTimeout(() => setPhase("pulse"), 2100);
    // Phase 3 : pulse final (0.5s)
    const t3 = setTimeout(() => setPhase("fadeout"), 2600);
    // Phase 4 : fade-out (0.6s)
    const t4 = setTimeout(() => setPhase("done"), 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] transition-opacity duration-[600ms] ${
        phase === "fadeout" ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-[#f43f7e]/10 rounded-full blur-[120px]" />

      {/* Logo container */}
      <div className="relative flex flex-col items-center gap-6">

        {/* SVG Logo — FlowMarket network icon */}
        <div
          className={`transition-all duration-500 ${
            phase === "pulse" ? "scale-110 drop-shadow-[0_0_30px_rgba(244,63,126,0.6)]" : "scale-100 drop-shadow-[0_0_15px_rgba(244,63,126,0.3)]"
          }`}
        >
          <svg
            width="120"
            height="80"
            viewBox="0 0 256 170"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* === LINES / PATHS === */}

            {/* Line: node1 → node2 */}
            <line
              x1="48" y1="85"
              x2="95" y2="85"
              stroke="#f43f7e"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              style={{
                animation: "draw-line 0.35s ease-out 0.1s forwards",
              }}
            />

            {/* Line: node2 → node3 */}
            <line
              x1="118" y1="85"
              x2="145" y2="85"
              stroke="#f43f7e"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset="40"
              style={{
                animation: "draw-line 0.25s ease-out 0.5s forwards",
              }}
            />

            {/* Curve: node3 → node4 (top) */}
            <path
              d="M155 85 Q180 85 195 42"
              stroke="#f43f7e"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="100"
              style={{
                animation: "draw-line 0.4s ease-out 0.75s forwards",
              }}
            />

            {/* Curve: node3 → node5 (bottom) */}
            <path
              d="M155 85 Q180 85 195 128"
              stroke="#f43f7e"
              strokeWidth="14"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              strokeDasharray="100"
              strokeDashoffset="100"
              style={{
                animation: "draw-line 0.4s ease-out 0.95s forwards",
              }}
            />

            {/* Line: node4 → end top */}
            <line
              x1="207" y1="42"
              x2="237" y2="42"
              stroke="#f43f7e"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset="40"
              style={{
                animation: "draw-line 0.2s ease-out 1.15s forwards",
              }}
            />

            {/* Line: node5 → end bottom */}
            <line
              x1="207" y1="128"
              x2="237" y2="128"
              stroke="#f43f7e"
              strokeWidth="14"
              strokeLinecap="round"
              strokeDasharray="40"
              strokeDashoffset="40"
              style={{
                animation: "draw-line 0.2s ease-out 1.15s forwards",
              }}
            />

            {/* === CIRCLES (nodes) === */}

            {/* Node 1 — left */}
            <circle cx="35" cy="85" r="20" stroke="#f43f7e" strokeWidth="13" fill="#0a0a0f"
              style={{ opacity: 0, animation: "pop-in 0.3s ease-out 0s forwards" }}
            />

            {/* Node 2 — center-left */}
            <circle cx="107" cy="85" r="15" stroke="#f43f7e" strokeWidth="12" fill="#0a0a0f"
              style={{ opacity: 0, animation: "pop-in 0.3s ease-out 0.4s forwards" }}
            />

            {/* Node 3 — branch point */}
            <circle cx="155" cy="85" r="15" stroke="#f43f7e" strokeWidth="12" fill="#0a0a0f"
              style={{ opacity: 0, animation: "pop-in 0.3s ease-out 0.65s forwards" }}
            />

            {/* Node 4 — top right */}
            <circle cx="207" cy="42" r="20" stroke="#f43f7e" strokeWidth="13" fill="#0a0a0f"
              style={{ opacity: 0, animation: "pop-in 0.3s ease-out 1.1s forwards" }}
            />

            {/* Node 5 — bottom right */}
            <circle cx="207" cy="128" r="20" stroke="#f43f7e" strokeWidth="13" fill="#0a0a0f"
              style={{ opacity: 0, animation: "pop-in 0.3s ease-out 1.1s forwards" }}
            />
          </svg>
        </div>

        {/* Brand name */}
        <div
          className={`transition-all duration-500 ${
            phase === "text" || phase === "pulse" || phase === "fadeout"
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-3"
          }`}
        >
          <span className="text-3xl font-bold tracking-tight text-white">
            Flow<span style={{ background: "linear-gradient(135deg, #818cf8, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Market</span>
          </span>
        </div>

        {/* Loading dots */}
        <div
          className={`flex gap-2 transition-all duration-500 ${
            phase === "text" || phase === "pulse" || phase === "fadeout"
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#f43f7e]/60"
              style={{
                animation: `loading-dot 1s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Keyframe styles */}
      <style>{`
        @keyframes draw-line {
          to { stroke-dashoffset: 0; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.4); }
          70% { transform: scale(1.15); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes loading-dot {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
