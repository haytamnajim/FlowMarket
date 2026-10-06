"use client";

import { useState, useEffect } from "react";
import { categories } from "@/data/workflows";
import Icon from "./Icon";

interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedComplexity: string;
  setSelectedComplexity: (comp: string) => void;
  priceRange: "all" | "free" | "paid";
  setPriceRange: (range: "all" | "free" | "paid") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: "popular" | "price-asc" | "price-desc" | "rating" | "new";
  setSortBy: (sort: "popular" | "price-asc" | "price-desc" | "rating" | "new") => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  filteredCount: number;
  totalCount: number;
  isMobile: boolean;
  onCloseMobile: () => void;
}

const complexityOptions = [
  { value: "all", label: "Tous niveaux" },
  { value: "Débutant", label: "Débutant", color: "text-emerald-400" },
  { value: "Intermédiaire", label: "Intermédiaire", color: "text-amber-400" },
  { value: "Avancé", label: "Avancé", color: "text-red-400" },
];

const sortOptions = [
  { value: "popular", label: "Plus populaires", icon: "download" },
  { value: "rating", label: "Mieux notés", icon: "star" },
  { value: "price-asc", label: "Prix croissant", icon: "arrowRight" },
  { value: "price-desc", label: "Prix décroissant", icon: "arrowRight" },
  { value: "new", label: "Plus récents", icon: "bolt" },
];

export default function FilterSidebar({
  selectedCategory,
  setSelectedCategory,
  selectedComplexity,
  setSelectedComplexity,
  priceRange,
  setPriceRange,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  hasActiveFilters,
  clearFilters,
  filteredCount,
  totalCount,
  isMobile,
  onCloseMobile,
}: FilterSidebarProps) {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  if (isMobile) {
    return (
      <>
        <button
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          aria-label="Fermer les filtres"
        />
        <aside className="fixed bottom-0 left-0 right-0 z-50 bg-[#0a0a0f] border-t border-[#2a2a3a] rounded-t-3xl p-4 pb-safe max-h-[85vh] overflow-y-auto lg:hidden animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Filtres</h2>
            <button onClick={onCloseMobile} className="p-2 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-colors">
              <Icon name="x" className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-6">{renderFilters()}</div>
        </aside>
      </>
    );
  }

  return (
    <aside className="lg:w-72 lg:flex-none lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto hidden">
      <div className="space-y-6">{renderFilters()}</div>
    </aside>
  );

  function renderFilters() {
    return (
      <>
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Recherche
          </label>
          <div className="relative">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
            />
            <input
              id="search"
              type="text"
              placeholder="Workflow, tech, cas d'usage..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className="w-full pl-10 pr-10 py-3 bg-[#111118] border border-[#2a2a3a] rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
              >
                <Icon name="x" className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        {/* Category */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Catégorie</label>
            {selectedCategory !== "all" && (
              <button
                onClick={() => setSelectedCategory("all")}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Icon name="x" className="w-3 h-3" /> Tout
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border-indigo-500/40 text-white"
                  : "bg-[#111118] border-[#2a2a3a] text-gray-500 hover:text-gray-300 hover:border-[#3a3a4a]"
              }`}
            >
              <Icon name="bolt" className="w-3.5 h-3.5" />
              Toutes ({totalCount})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === cat.id
                    ? "bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border-indigo-500/40 text-white"
                    : "bg-[#111118] border-[#2a2a3a] text-gray-500 hover:text-gray-300 hover:border-[#3a3a4a]"
                }`}
              >
                <Icon name={cat.icon} className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Complexity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Niveau</label>
            {selectedComplexity !== "all" && (
              <button
                onClick={() => setSelectedComplexity("all")}
                className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                <Icon name="x" className="w-3 h-3" /> Tous
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {complexityOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSelectedComplexity(opt.value)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedComplexity === opt.value
                    ? "bg-[#0a0a0f] text-white border border-[#2a2a3a] shadow-sm"
                    : `${opt.color || "text-gray-500"} hover:text-white bg-[#111118] border border-[#2a2a3a]`
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Prix</label>
          <div className="flex flex-wrap gap-2">
            {[
              { value: "all", label: "Tous" },
              { value: "free", label: "Gratuit" },
              { value: "paid", label: "Payant" },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => setPriceRange(opt.value as typeof priceRange)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  priceRange === opt.value
                    ? "bg-[#0a0a0f] text-white border border-[#2a2a3a] shadow-sm"
                    : "bg-[#111118] border border-[#2a2a3a] text-gray-500 hover:text-gray-300 hover:border-[#3a3a4a]"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Trier par</label>
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-xl p-1">
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setSortBy(opt.value as typeof sortBy)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  sortBy === opt.value
                    ? "bg-gradient-to-r from-indigo-500/20 to-amber-500/20 text-white border border-indigo-500/30"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/3"
                }`}
              >
                <Icon name={opt.icon} className="w-3.5 h-3.5" />
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="pt-4 border-t border-[#2a2a3a]">
          <p className="text-sm text-gray-500">
            <span className="text-white font-semibold">{filteredCount}</span>{" "}
            sur <span className="text-white font-semibold">{totalCount}</span> workflows
          </p>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
          >
            <Icon name="x" className="w-4 h-4" />
            Réinitialiser tous les filtres
          </button>
        )}
      </>
    );
  }
}