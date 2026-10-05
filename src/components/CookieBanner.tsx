"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Icon from "./Icon";

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const existingChoice = localStorage.getItem("cookie_consent_choice");
      const legacyAccepted = localStorage.getItem("cookies-accepted");
      if (!existingChoice && !legacyAccepted) {
        // Small delay so it doesn't flash instantly
        setTimeout(() => setVisible(true), 1200);
      }
    } catch {
      // localStorage blocked (private mode etc.) — just don't show
    }
  }, []);

  if (!mounted || !visible) return null;

  const handleChoice = (decision: "accepted" | "declined") => {
    setLeaving(true);
    setTimeout(() => {
      try {
        localStorage.setItem("cookie_consent_choice", decision);
        localStorage.setItem(
          "cookies-accepted",
          decision === "accepted" ? "true" : "false"
        );
      } catch (e) {
        console.error(e);
      }
      setVisible(false);
      setLeaving(false);
    }, 350);
  };

  return (
    <div
      style={{
        animation: leaving
          ? "cookieBannerLeave 0.35s ease forwards"
          : "cookieBannerEnter 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
      }}
      className="fixed bottom-5 left-4 right-4 md:left-6 md:right-auto md:max-w-[400px] z-[9999] pointer-events-auto"
    >
      <div className="relative bg-[#0f0f1a]/98 backdrop-blur-2xl border border-[#2a2a3a] rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
        {/* Top gradient line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-amber-500" />

        <div className="p-5">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/10 border border-indigo-500/25 flex items-center justify-center flex-shrink-0">
              <Icon name="shield" className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white font-semibold text-sm">
                  🍪 Gestion des cookies
                </p>
                <button
                  onClick={() => handleChoice("declined")}
                  className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors flex-shrink-0"
                  aria-label="Fermer"
                >
                  <Icon name="x" className="w-3.5 h-3.5" />
                </button>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed mt-1.5">
                Cookies essentiels + mesure d&apos;audience anonyme.{" "}
                <Link
                  href="/privacy"
                  className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2 transition-colors"
                >
                  En savoir plus
                </Link>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={() => handleChoice("accepted")}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-indigo-500 to-violet-600 text-white rounded-xl text-xs font-semibold hover:from-indigo-400 hover:to-violet-500 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
              Accepter tout
            </button>
            <button
              onClick={() => handleChoice("declined")}
              className="flex-1 py-2.5 px-4 border border-[#2a2a3a] bg-[#161622]/80 text-gray-300 rounded-xl text-xs font-medium hover:text-white hover:border-indigo-500/40 hover:bg-[#1e1e2e] transition-all active:scale-95"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes cookieBannerEnter {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        @keyframes cookieBannerLeave {
          from {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          to {
            opacity: 0;
            transform: translateY(16px) scale(0.96);
          }
        }
      `}</style>
    </div>
  );
}
