"use client";

import { useState, useMemo } from "react";
import { workflows, categories } from "@/data/workflows";
import WorkflowCard from "@/components/WorkflowCard";
import Icon from "@/components/Icon";
import QuickViewModal from "@/components/QuickViewModal";
import { Workflow } from "@/data/workflows";

const complexityOptions = [
  { value: "all", label: "Tous niveaux", color: "text-gray-400" },
  { value: "Débutant", label: "🟢 Débutant", color: "text-emerald-400" },
  { value: "Intermédiaire", label: "🟠 Intermédiaire", color: "text-amber-400" },
  { value: "Avancé", label: "🔴 Avancé", color: "text-red-400" },
];

const sortOptions = [
  { value: "popular", label: "Plus populaires", icon: "download" },
  { value: "rating", label: "Mieux notés", icon: "star" },
  { value: "price-asc", label: "Prix croissant", icon: "arrowRight" },
  { value: "price-desc", label: "Prix décroissant", icon: "arrowRight" },
  { value: "new", label: "Plus récents", icon: "bolt" },
];

export default function WorkflowsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc" | "rating" | "new">("popular");
  const [selectedComplexity, setSelectedComplexity] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<"all" | "free" | "paid">("all");
  const [quickViewWorkflow, setQuickViewWorkflow] = useState<Workflow | null>(null);

  const filteredWorkflows = useMemo(() => {
    let result = [...workflows];

    if (selectedCategory !== "all") {
      result = result.filter((w) => w.category === selectedCategory);
    }

    if (selectedComplexity !== "all") {
      result = result.filter((w) => w.complexity === selectedComplexity);
    }

    if (priceRange === "free") {
      result = result.filter((w) => w.price === 0);
    } else if (priceRange === "paid") {
      result = result.filter((w) => w.price > 0);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "new":
        result.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      default:
        result.sort((a, b) => b.downloads - a.downloads);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy, selectedComplexity, priceRange]);

  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedComplexity !== "all" ||
    priceRange !== "all" ||
    searchQuery !== "";

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedComplexity("all");
    setPriceRange("all");
    setSearchQuery("");
    setSortBy("popular");
  };

  return (
    <>
      <main className="min-h-screen pt-16" id="top">
        {/* Header */}
        <div className="relative border-b border-[#2a2a3a] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-amber-500/10" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-3 py-1.5 mb-4">
                  <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-400">Catalogue complet</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                  Tous les <span className="gradient-text">workflows</span>
                </h1>
                <p className="text-gray-400">
                  <span className="text-white font-semibold">{filteredWorkflows.length}</span>{" "}
                  workflow{filteredWorkflows.length > 1 ? "s" : ""}{" "}
                  {hasActiveFilters ? "correspondent à votre recherche" : "disponibles"}
                </p>
              </div>

              {/* Sort selector — top right */}
              <div className="flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-xl p-1">
                {sortOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSortBy(opt.value as typeof sortBy)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      sortBy === opt.value
                        ? "bg-gradient-to-r from-indigo-500/20 to-amber-500/20 text-white border border-indigo-500/30"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* ── Filters ── */}
          <div className="space-y-4 mb-8">

            {/* Search bar */}
            <div className="relative">
              <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Rechercher un workflow, une technologie, un cas d'usage..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 bg-[#111118] border border-[#2a2a3a] rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/20 transition-all"
                >
                  <Icon name="x" className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border-indigo-500/40 text-white"
                    : "bg-[#111118] border-[#2a2a3a] text-gray-500 hover:text-gray-300 hover:border-[#3a3a4a]"
                }`}
              >
                <Icon name="bolt" className="w-3.5 h-3.5" />
                Toutes ({workflows.length})
              </button>
              {categories.map((cat) => {
                const count = workflows.filter((w) => w.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
                      selectedCategory === cat.id
                        ? "bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border-indigo-500/40 text-white"
                        : "bg-[#111118] border-[#2a2a3a] text-gray-500 hover:text-gray-300 hover:border-[#3a3a4a]"
                    }`}
                  >
                    <Icon name={cat.icon} className="w-3.5 h-3.5" />
                    {cat.name}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                      selectedCategory === cat.id
                        ? "bg-indigo-500/20 text-indigo-300"
                        : "bg-[#2a2a3a] text-gray-600"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Complexity + Price filters + Active filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Complexity */}
              <div className="flex items-center gap-1 bg-[#111118] border border-[#2a2a3a] rounded-xl p-1">
                {complexityOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedComplexity(opt.value)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      selectedComplexity === opt.value
                        ? "bg-[#0a0a0f] text-white border border-[#2a2a3a] shadow-sm"
                        : `${opt.color} hover:text-white`
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Price range */}
              <div className="flex items-center gap-1 bg-[#111118] border border-[#2a2a3a] rounded-xl p-1">
                {[
                  { value: "all", label: "Tous les prix" },
                  { value: "free", label: "Gratuit" },
                  { value: "paid", label: "Payant" },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setPriceRange(opt.value as typeof priceRange)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                      priceRange === opt.value
                        ? "bg-[#0a0a0f] text-white border border-[#2a2a3a] shadow-sm"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>

              {/* Clear filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all"
                >
                  <Icon name="x" className="w-3 h-3" />
                  Réinitialiser les filtres
                </button>
              )}

              {/* Active filter badges */}
              <div className="flex flex-wrap gap-2 ml-auto">
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs">
                    {categories.find((c) => c.id === selectedCategory)?.name}
                    <button onClick={() => setSelectedCategory("all")}>
                      <Icon name="x" className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
                {selectedComplexity !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs">
                    {selectedComplexity}
                    <button onClick={() => setSelectedComplexity("all")}>
                      <Icon name="x" className="w-3 h-3 hover:text-white" />
                    </button>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredWorkflows.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkflows.map((workflow) => (
                <WorkflowCard
                  key={workflow.id}
                  workflow={workflow}
                  onQuickView={setQuickViewWorkflow}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-28">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#111118] border border-[#2a2a3a] flex items-center justify-center">
                <Icon name="search" className="w-9 h-9 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Aucun workflow trouvé</h3>
              <p className="text-gray-500 mb-6">Aucun résultat ne correspond à vos critères</p>
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                <Icon name="x" className="w-4 h-4" />
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </div>
      </main>

      <QuickViewModal
        workflow={quickViewWorkflow}
        isOpen={!!quickViewWorkflow}
        onClose={() => setQuickViewWorkflow(null)}
      />
    </>
  );
}
