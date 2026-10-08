"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Icon from "@/components/Icon";
import ThemeToggle from "@/components/ThemeToggle";

const navItems = [
  { href: "/workflows", label: "Workflows" },
  { href: "/categories", label: "Catégories" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "À propos" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none pt-3 sm:pt-4 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      {/* Floating Contained Navigation Bar (Not full screen) */}
      <div
        className={`max-w-6xl mx-auto pointer-events-auto rounded-2xl border transition-all duration-300 ${
          isScrolled
            ? "bg-[#090910]/95 border-white/15 shadow-2xl shadow-black/60 backdrop-blur-2xl"
            : "bg-[#0d0d16]/85 border-white/10 shadow-xl shadow-black/30 backdrop-blur-xl"
        }`}
      >
        <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* LEFT: Brand Logo */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-xl rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[#0c0c14] rounded-xl flex items-center justify-center border border-white/10">
                  <span className="text-sm sm:text-base font-black gradient-text">F</span>
                </div>
              </div>
              <span className="text-base sm:text-lg font-bold tracking-tight text-white">
                Flow<span className="gradient-text">Market</span>
              </span>
            </Link>
          </div>

          {/* CENTER: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all duration-200 ${
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

          {/* RIGHT: Actions & CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <ThemeToggle />

            <Link
              href="/admin"
              className="px-2.5 py-1.5 text-xs font-semibold text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/25 rounded-lg transition-all flex items-center gap-1.5"
              title="Panneau d'administration"
            >
              <Icon name="shield" className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin</span>
            </Link>

            <div className="h-4 w-px bg-white/10 mx-1" />

            <Link
              href="/login"
              className="px-3 py-1.5 text-sm font-medium text-gray-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              Connexion
            </Link>

            <Link
              href="/workflows"
              className="btn-shine px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-amber-500 rounded-xl shadow-md hover:shadow-indigo-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Explorer
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-white rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
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
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/20"
              >
                <Icon name="shield" className="w-4 h-4 text-indigo-400" />
                <span>Panneau Administration</span>
              </Link>
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
