"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { workflows as defaultWorkflows, categories, Workflow } from "@/data/workflows";
import { getAllStoredWorkflows } from "@/data/workflowStore";
import WorkflowCard from "@/components/WorkflowCard";
import WorkflowGrid from "@/components/WorkflowGrid";
import FilterSidebar from "@/components/FilterSidebar";
import QuickViewModal from "@/components/QuickViewModal";
import Icon from "@/components/Icon";
import { motion } from "framer-motion";

const ITEMS_PER_PAGE = 12;

type SortBy = "popular" | "price-asc" | "price-desc" | "rating" | "new";

const sortOptions = [
  { value: "popular", label: "Plus populaires", icon: "download" },
  { value: "rating", label: "Mieux notés", icon: "star" },
  { value: "price-asc", label: "Prix croissant", icon: "arrowRight" },
  { value: "price-desc", label: "Prix décroissant", icon: "arrowRight" },
  { value: "new", label: "Plus récents", icon: "bolt" },
] as const;

const priceRangeOptions = [
  { value: "all", label: "Tous" },
  { value: "free", label: "Gratuit" },
  { value: "paid", label: "Payant" },
] as const;

const complexityOptions = [
  { value: "all", label: "Tous niveaux" },
  { value: "Débutant", label: "Débutant", color: "text-emerald-400" },
  { value: "Intermédiaire", label: "Intermédiaire", color: "text-amber-400" },
  { value: "Avancé", label: "Avancé", color: "text-red-400" },
] as const;

export default function WorkflowsClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL params
  const getInitialState = () => ({
    selectedCategory: searchParams.get("cat") || "all",
    searchQuery: searchParams.get("q") || "",
    sortBy: (searchParams.get("sort") as SortBy) || "popular",
    selectedComplexity: searchParams.get("complexity") || "all",
    priceRange: (searchParams.get("price") as "all" | "free" | "paid") || "all",
    page: parseInt(searchParams.get("page") || "1", 10),
  });

  const [state, setState] = useState(getInitialState);
  const [quickViewWorkflow, setQuickViewWorkflow] = useState<Workflow | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Initialize displayed workflows with first page based on initial state
  const initialFiltered = useMemo(() => {
    let result = [...defaultWorkflows];
    const custom = getAllStoredWorkflows();
    const map = new Map<string, Workflow>();
    defaultWorkflows.forEach((w) => map.set(w.id, w));
    custom.forEach((w) => map.set(w.id, w));
    result = Array.from(map.values());
    
    const initialState = getInitialState();
    if (initialState.selectedCategory !== "all") {
      result = result.filter((w) => w.category === initialState.selectedCategory);
    }
    if (initialState.selectedComplexity !== "all") {
      result = result.filter((w) => w.complexity === initialState.selectedComplexity);
    }
    if (initialState.priceRange === "free") {
      result = result.filter((w) => w.price === 0);
    } else if (initialState.priceRange === "paid") {
      result = result.filter((w) => w.price > 0);
    }
    if (initialState.searchQuery) {
      const q = initialState.searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    switch (initialState.sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "new": result.sort((a, b) => b.createdAt.localeCompare(a.createdAt)); break;
      default: result.sort((a, b) => b.downloads - a.downloads);
    }
    return result.slice(0, ITEMS_PER_PAGE);
  }, []);
  
  const [displayedWorkflows, setDisplayedWorkflows] = useState<Workflow[]>(initialFiltered);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // All workflows (default + custom from localStorage)
  const allWorkflows = useMemo(() => {
    const custom = getAllStoredWorkflows();
    const map = new Map<string, Workflow>();
    defaultWorkflows.forEach((w) => map.set(w.id, w));
    custom.forEach((w) => map.set(w.id, w));
    return Array.from(map.values());
  }, []);

  // Update URL when state changes (debounced)
  const updateURL = useCallback(() => {
    const params = new URLSearchParams();
    if (state.selectedCategory !== "all") params.set("cat", state.selectedCategory);
    if (state.searchQuery) params.set("q", state.searchQuery);
    if (state.sortBy !== "popular") params.set("sort", state.sortBy);
    if (state.selectedComplexity !== "all") params.set("complexity", state.selectedComplexity);
    if (state.priceRange !== "all") params.set("price", state.priceRange);
    if (state.page > 1) params.set("page", state.page.toString());
    
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, state]);

  // Sync state with URL on mount/back-forward
  useEffect(() => {
    setState(getInitialState());
  }, [searchParams]);

  // Filter & sort workflows
  const filteredWorkflows = useMemo(() => {
    let result = [...allWorkflows];

    if (state.selectedCategory !== "all") {
      result = result.filter((w) => w.category === state.selectedCategory);
    }

    if (state.selectedComplexity !== "all") {
      result = result.filter((w) => w.complexity === state.selectedComplexity);
    }

    if (state.priceRange === "free") {
      result = result.filter((w) => w.price === 0);
    } else if (state.priceRange === "paid") {
      result = result.filter((w) => w.price > 0);
    }

    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      result = result.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    switch (state.sortBy) {
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
  }, [allWorkflows, state.selectedCategory, state.searchQuery, state.sortBy, state.selectedComplexity, state.priceRange]);

  // Pagination
  const totalFiltered = filteredWorkflows.length;
  const totalPages = Math.ceil(totalFiltered / ITEMS_PER_PAGE);
  const currentPageWorkflows = useMemo(() => {
    const start = (state.page - 1) * ITEMS_PER_PAGE;
    return filteredWorkflows.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredWorkflows, state.page]);

  const hasMore = state.page < totalPages;

  // Load more
  const loadMore = useCallback(async () => {
    if (hasMore && !isLoadingMore && state.page < totalPages) {
      setIsLoadingMore(true);
      await new Promise((r) => setTimeout(r, 300)); // UX delay
      setState((prev) => ({ ...prev, page: prev.page + 1 }));
      setIsLoadingMore(false);
    }
  }, [hasMore, isLoadingMore, state.page, totalPages]);

  // Reset displayed workflows when filters change
  useEffect(() => {
    setDisplayedWorkflows(currentPageWorkflows);
    setState((prev) => ({ ...prev, page: 1 }));
  }, [state.selectedCategory, state.searchQuery, state.sortBy, state.selectedComplexity, state.priceRange]);

  // Update displayed workflows when page changes
  useEffect(() => {
    setDisplayedWorkflows(currentPageWorkflows);
  }, [currentPageWorkflows]);

  // Update URL when state changes
  useEffect(() => {
    updateURL();
  }, [updateURL]);

  const hasActiveFilters =
    state.selectedCategory !== "all" ||
    state.selectedComplexity !== "all" ||
    state.priceRange !== "all" ||
    state.searchQuery !== "";

  const clearFilters = () => {
    setState((prev) => ({
      ...prev,
      selectedCategory: "all",
      searchQuery: "",
      sortBy: "popular",
      selectedComplexity: "all",
      priceRange: "all",
      page: 1,
    }));
  };

  const handleSortChange = (sort: typeof state.sortBy) => {
    setState((prev) => ({ ...prev, sortBy: sort, page: 1 }));
  };

  const handleCategoryChange = (cat: string) => {
    setState((prev) => ({ ...prev, selectedCategory: cat, page: 1 }));
  };

  const handleComplexityChange = (comp: string) => {
    setState((prev) => ({ ...prev, selectedComplexity: comp, page: 1 }));
  };

  const handlePriceChange = (range: "all" | "free" | "paid") => {
    setState((prev) => ({ ...prev, priceRange: range, page: 1 }));
  };

  const handleSearchChange = (q: string) => {
    setState((prev) => ({ ...prev, searchQuery: q, page: 1 }));
  };

  // Stats for hero
  const stats = useMemo(() => [
    { label: "Workflows", value: allWorkflows.length, icon: "bolt", color: "from-indigo-500 to-violet-500" },
    { label: "Téléchargements", value: allWorkflows.reduce((a, w) => a + (w.downloads || 0), 0).toLocaleString(), icon: "download", color: "from-emerald-500 to-teal-500" },
    { label: "Note moyenne", value: (allWorkflows.reduce((a, w) => a + w.rating, 0) / allWorkflows.length).toFixed(1), icon: "star", color: "from-amber-500 to-orange-500" },
    { label: "Catégories", value: categories.filter(c => c.isActive !== false).length, icon: "folder", color: "from-rose-500 to-pink-500" },
  ], [allWorkflows]);

  return (
    <>
      <main className="min-h-screen pt-16" id="top">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0a1f] to-[#0a0a0f]" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-amber-500/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-500/10 to-transparent rounded-full blur-[200px]" />
          
          {/* Video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.04] pointer-events-none"
          >
            <source src="/videos/hero-workflow.mp4" type="video/mp4" />
          </video>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">Catalogue complet • {allWorkflows.length} workflows disponibles</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Tous les <span className="gradient-text">workflows</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Découvrez des centaines de templates n8n prêts à l'emploi. Filtrez, triez et trouvez l'automatisation parfaite pour votre business.
              </p>
            </motion.div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="p-4 sm:p-6 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-2xl text-center group hover:border-indigo-500/30 transition-colors"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${stat.color})` }}>
                    <Icon name={stat.icon} className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white mb-1">{stat.value}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <FilterSidebar
              selectedCategory={state.selectedCategory}
              setSelectedCategory={handleCategoryChange}
              selectedComplexity={state.selectedComplexity}
              setSelectedComplexity={handleComplexityChange}
              priceRange={state.priceRange}
              setPriceRange={handlePriceChange}
              searchQuery={state.searchQuery}
              setSearchQuery={handleSearchChange}
              sortBy={state.sortBy}
              setSortBy={handleSortChange}
              hasActiveFilters={hasActiveFilters}
              clearFilters={clearFilters}
              filteredCount={totalFiltered}
              totalCount={allWorkflows.length}
              isMobile={false}
              onCloseMobile={() => {}}
            />

            {/* Mobile Filters Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(true)}
              className="lg:hidden w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#111118] border border-[#2a2a3a] rounded-xl text-gray-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
            >
              <Icon name="sliders" className="w-5 h-5" />
              <span className="font-medium">Filtres</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs font-bold flex items-center justify-center">
                  <Icon name="sliders" className="w-3 h-3" />
                </span>
              )}
            </button>

            {/* Results */}
            <div className="lg:flex-1 min-w-0">
              <WorkflowGrid
                workflows={displayedWorkflows}
                onQuickView={setQuickViewWorkflow}
                hasMore={hasMore}
                isLoadingMore={isLoadingMore}
                onLoadMore={loadMore}
                totalCount={allWorkflows.length}
                filteredCount={totalFiltered}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filters Bottom Sheet */}
      <FilterSidebar
        selectedCategory={state.selectedCategory}
        setSelectedCategory={handleCategoryChange}
        selectedComplexity={state.selectedComplexity}
        setSelectedComplexity={handleComplexityChange}
        priceRange={state.priceRange}
        setPriceRange={handlePriceChange}
        searchQuery={state.searchQuery}
        setSearchQuery={handleSearchChange}
        sortBy={state.sortBy}
        setSortBy={handleSortChange}
        hasActiveFilters={hasActiveFilters}
        clearFilters={clearFilters}
        filteredCount={totalFiltered}
        totalCount={allWorkflows.length}
        isMobile={true}
        onCloseMobile={() => setIsMobileFiltersOpen(false)}
      />

      <QuickViewModal
        workflow={quickViewWorkflow}
        isOpen={!!quickViewWorkflow}
        onClose={() => setQuickViewWorkflow(null)}
      />
    </>
  );
}