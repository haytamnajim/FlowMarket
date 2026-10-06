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
  { href: "/about", label: "À propos" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "py-2" : "py-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex justify-between items-center px-4 py-3 transition-all duration-500 ${
            isScrolled
              ? "glass shadow-xl shadow-black/20 rounded-2xl"
              : "bg-transparent"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[#111118] rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold gradient-text">F</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:block">
              Flow<span className="gradient-text">Market</span>
            </span>
          </Link>

          {/* Navigation Desktop - Pill Style */}
          <nav className="hidden md:flex items-center bg-[#111118]/50 backdrop-blur rounded-full p-1.5 border border-[#2a2a3a]/50">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-white bg-gradient-to-r from-indigo-500/20 to-amber-500/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/10 to-amber-500/10 border border-indigo-500/20" />
                  )}
                  <span className="relative">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* CTA — Admin + Theme Toggle + Connexion + S'inscrire + Explorer */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/admin"
              className="px-3 py-1.5 text-xs font-semibold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full hover:bg-indigo-500/20 transition-all duration-200 flex items-center gap-1.5"
              title="Panneau d'administration"
            >
              <Icon name="shield" className="w-3.5 h-3.5 text-indigo-400" />
              <span>Admin</span>
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-200"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 text-sm font-medium text-white bg-[#111118] border border-[#2a2a3a] rounded-full hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all duration-200"
            >
              S&apos;inscrire
            </Link>
            <Link
              href="/workflows"
              className="btn-shine relative px-5 py-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 hover:scale-105 transition-all duration-300"
            >
              Explorer
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2" : ""
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

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-[28rem] opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <nav className="py-4 space-y-1 glass rounded-2xl p-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                    isActive
                      ? "text-white bg-gradient-to-r from-indigo-500/10 to-amber-500/10 border border-indigo-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="pt-2 pb-1 px-2 flex flex-col gap-2 border-t border-[#2a2a3a] mt-2">
              <ThemeToggle />
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-gray-400 hover:text-white text-sm font-medium rounded-xl hover:bg-white/5 transition-all text-center"
              >
                Connexion
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="block px-4 py-2.5 text-white border border-[#2a2a3a] text-sm font-medium rounded-xl hover:border-indigo-500/50 transition-all text-center"
              >
                S&apos;inscrire
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 text-sm font-semibold rounded-xl text-center"
              >
                <Icon name="shield" className="w-4 h-4" />
                <span>Panneau Admin</span>
              </Link>
              <Link
                href="/workflows"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-medium text-center"
              >
                Explorer les workflows
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
