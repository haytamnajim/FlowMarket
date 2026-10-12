"use client";

import React from "react";

interface FlowMarketBrandProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function FlowMarketBrand({
  size = "md",
  className = "",
}: FlowMarketBrandProps) {
  const iconSize = {
    sm: "w-7 h-7",
    md: "w-8 h-8 sm:w-9 sm:h-9",
    lg: "w-10 h-10 sm:w-11 sm:h-11",
  }[size];

  const textSize = {
    sm: "text-lg",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 group select-none cursor-pointer ${className}`}>
      {/* Icône n8n épurée & animée */}
      <div className={`relative ${iconSize} flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}>
        {/* Glow doux */}
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/30 via-indigo-500/30 to-[#FF6D5A]/40 rounded-xl blur-md opacity-40 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="relative w-full h-full bg-[#0d0d16] rounded-xl border border-white/10 group-hover:border-indigo-500/40 p-1 flex items-center justify-center overflow-hidden shadow-lg shadow-black/50 transition-colors">
          <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
            {/* Lignes de flux */}
            <path
              d="M 7 16 H 15 L 24 9"
              stroke="url(#wireGrad1)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M 15 16 L 24 23"
              stroke="url(#wireGrad2)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />

            {/* Impulsion animée */}
            <circle cx="7" cy="16" r="1.5" fill="#10B981" className="animate-ping opacity-75" />

            {/* Nœuds */}
            <circle cx="7" cy="16" r="3.2" fill="#10B981" />
            <circle cx="7" cy="16" r="1.2" fill="#FFFFFF" />

            <circle cx="15" cy="16" r="2.4" fill="#6366F1" />

            <circle cx="24" cy="9" r="3" fill="#FF6D5A" />
            <circle cx="24" cy="9" r="1.2" fill="#FFFFFF" />

            <circle cx="24" cy="23" r="3" fill="#F59E0B" />
            <circle cx="24" cy="23" r="1.2" fill="#FFFFFF" />

            <defs>
              <linearGradient id="wireGrad1" x1="7" y1="16" x2="24" y2="9" gradientUnits="userSpaceOnUse">
                <stop stopColor="#10B981" />
                <stop offset="0.5" stopColor="#6366F1" />
                <stop offset="1" stopColor="#FF6D5A" />
              </linearGradient>
              <linearGradient id="wireGrad2" x1="15" y1="16" x2="24" y2="23" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6366F1" />
                <stop offset="1" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Titre Simple & Moderne FlowMarket avec animation fluide au hover */}
      <div className={`font-bold tracking-tight flex items-center ${textSize}`}>
        <span className="text-white transition-colors duration-300 group-hover:text-white">
          Flow
        </span>
        <span className="bg-gradient-to-r from-indigo-400 via-amber-300 to-amber-500 bg-clip-text text-transparent transition-all duration-300 group-hover:brightness-125">
          Market
        </span>
      </div>
    </div>
  );
}
