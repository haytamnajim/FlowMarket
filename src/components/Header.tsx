"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">n8n</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              Flow<span className="text-orange-500">Market</span>
            </span>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/workflows" className="text-gray-600 hover:text-orange-500 transition-colors">
              Workflows
            </Link>
            <Link href="/categories" className="text-gray-600 hover:text-orange-500 transition-colors">
              Catégories
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-orange-500 transition-colors">
              Tarifs
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-500 transition-colors">
              À propos
            </Link>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/workflows"
              className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all"
            >
              Explorer
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
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
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-4">
              <Link href="/workflows" className="text-gray-600 hover:text-orange-500">
                Workflows
              </Link>
              <Link href="/categories" className="text-gray-600 hover:text-orange-500">
                Catégories
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-orange-500">
                Tarifs
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-orange-500">
                À propos
              </Link>
              <Link
                href="/workflows"
                className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-6 py-2 rounded-lg font-medium text-center"
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
