"use client";

import { useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("cookies-accepted") === "true";
    }
    return false;
  });

  if (accepted) return null;

  const accept = () => {
    localStorage.setItem("cookies-accepted", "true");
    setAccepted(true);
  };

  const decline = () => {
    localStorage.setItem("cookies-accepted", "false");
    setAccepted(true);
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[9996] animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-[#111118]/95 backdrop-blur-xl border border-[#2a2a3a] rounded-2xl p-5 shadow-2xl shadow-black/50">
        <div className="flex items-start gap-3 mb-4">
          <span className="text-2xl flex-shrink-0">🍪</span>
          <div>
            <p className="text-white font-semibold text-sm mb-1">Nous utilisons des cookies</p>
            <p className="text-gray-400 text-xs leading-relaxed">
              Pour améliorer votre expérience et analyser notre trafic. Vos données restent privées.{" "}
              <Link href="/privacy" className="text-indigo-400 hover:underline">
                En savoir plus
              </Link>
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 py-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl text-xs font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Tout accepter
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2 border border-[#2a2a3a] text-gray-400 rounded-xl text-xs font-medium hover:text-white hover:border-[#3a3a4a] transition-all"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
