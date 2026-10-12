"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import FlowMarketBrand from "@/components/FlowMarketBrand";

const navItems = [
  { href: "/workflows", label: "Workflows" },
  { href: "/categories", label: "Catégories" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "À propos" },
];

import { useLanguage } from "@/components/LanguageProvider";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { lang, setLang, currency, setCurrency, t } = useLanguage();

  const navItems = [
    { href: "/workflows", label: t.nav_workflows },
    { href: "/categories", label: t.nav_categories },
    { href: "/pricing", label: t.nav_pricing },
    { href: "/contact", label: t.nav_contact },
    { href: "/about", label: t.nav_about },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 pointer-events-none px-4 sm:px-6 lg:px-8 transition-all duration-300 ease-in-out ${
        isScrolled ? "pt-2 sm:pt-2.5" : "pt-4 sm:pt-6"
      }`}
    >
      {/* Dynamic Floating Dock with Smooth Shrink on Scroll */}
      <div
        className={`mx-auto pointer-events-auto border transition-all duration-300 ease-in-out ${
          isScrolled
            ? "max-w-5xl h-12 sm:h-13 px-3.5 sm:px-5 rounded-xl sm:rounded-2xl bg-[#080810]/95 border-white/15 shadow-2xl shadow-black/70 backdrop-blur-2xl"
            : "max-w-6xl h-16 sm:h-18 px-5 sm:px-7 rounded-2xl sm:rounded-3xl bg-[#0d0d16]/85 border-white/10 shadow-xl shadow-black/30 backdrop-blur-xl"
        }`}
      >
        <div className="h-full flex items-center justify-between gap-3 sm:gap-4">
          
          {/* LEFT: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center">
              <FlowMarketBrand size={isScrolled ? "sm" : "md"} />
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg sm:rounded-xl font-medium transition-all duration-200 ${
                    isScrolled
                      ? "px-2.5 sm:px-3 py-1 text-xs sm:text-sm"
                      : "px-3 sm:px-3.5 py-1.5 text-sm"
                  } ${
                    isActive
                      ? "text-white bg-white/10 font-semibold shadow-inner border border-white/5"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT: Language & Currency Switchers & Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Language Switcher Button */}
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              title={lang === "fr" ? "Passer en Anglais (Switch to English)" : "Passer en Français"}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <Icon name="globe" className="w-3.5 h-3.5 text-indigo-400" />
              <span className="uppercase tracking-wider font-mono text-[11px]">{lang}</span>
            </button>

            {/* Currency Switcher Button */}
            <button
              type="button"
              onClick={() => setCurrency(currency === "EUR" ? "USD" : "EUR")}
              title="Changer de devise"
              className="inline-flex items-center gap-1 px-2 py-1 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold font-mono text-amber-300 hover:text-amber-200 transition-all cursor-pointer"
            >
              <span>{currency === "EUR" ? "€ EUR" : "$ USD"}</span>
            </button>

            {/* Visual separator line */}
            <div className={`w-px bg-white/10 transition-all ${isScrolled ? "h-4 mr-0.5" : "h-5 mr-0.5"}`} />

            <Link
              href="/login"
              className={`font-medium text-gray-300 hover:text-white rounded-xl hover:bg-white/5 border border-white/5 transition-all ${
                isScrolled ? "px-3 py-1.5 text-xs" : "px-3.5 py-1.5 text-sm"
              }`}
            >
              {t.nav_login}
            </Link>

            <Link
              href="/workflows"
              className={`btn-shine font-semibold text-white bg-gradient-to-r from-indigo-500 to-amber-500 rounded-xl shadow-md hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all ${
                isScrolled ? "px-3.5 py-1.5 text-xs" : "px-4 sm:px-5 py-2 text-xs sm:text-sm"
              }`}
            >
              {t.nav_explore}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setLang(lang === "fr" ? "en" : "fr")}
              className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 flex items-center gap-1"
            >
              <Icon name="globe" className="w-3 h-3 text-indigo-400" />
              <span>{lang.toUpperCase()}</span>
            </button>
            <button
              type="button"
              className="p-1.5 sm:p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Ouvrir le menu"
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer (Contained) */}
      {isMenuOpen && (
        <div className="md:hidden max-w-6xl mx-auto pointer-events-auto mt-2 rounded-2xl border border-white/10 bg-[#0a0a12]/95 backdrop-blur-2xl shadow-2xl p-4 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "text-white bg-white/10 font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2 mt-1">
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-medium text-gray-300 bg-white/5 border border-white/10 rounded-xl"
                >
                  Connexion
                </Link>
                <Link
                  href="/workflows"
                  onClick={() => setIsMenuOpen(false)}
                  className="py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-amber-500 rounded-xl shadow"
                >
                  Explorer
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
