"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-xl rotate-6 group-hover:rotate-12 transition-transform" />
              <div className="absolute inset-0 bg-[#111118] rounded-xl flex items-center justify-center">
                <span className="text-lg font-bold gradient-text">F</span>
              </div>
            </div>
            <span className="text-xl font-bold tracking-tight">
              Flow<span className="gradient-text">Market</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { href: "/workflows", label: "Workflows" },
              { href: "/categories", label: "Catégories" },
              { href: "/pricing", label: "Tarifs" },
              { href: "/about", label: "À propos" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/workflows"
              className="btn-shine relative px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-lg font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              Explorer
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2a2a3a]">
            <nav className="flex flex-col gap-1">
              {[
                { href: "/workflows", label: "Workflows" },
                { href: "/categories", label: "Catégories" },
                { href: "/pricing", label: "Tarifs" },
                { href: "/about", label: "À propos" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/workflows"
                className="mt-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-lg font-medium text-center"
              >
                Explorer
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
