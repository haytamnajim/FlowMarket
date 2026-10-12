"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import WorkflowCard from "./WorkflowCard";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

interface WorkflowGridProps {
  workflows: Workflow[];
  onQuickView: (w: Workflow) => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  totalCount: number;
  filteredCount: number;
  viewMode?: "grid" | "list";
  onViewModeChange?: (mode: "grid" | "list") => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onCopyJson?: (workflow: Workflow) => void;
  copiedId?: string | null;
  className?: string;
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

export default function WorkflowGrid({
  workflows,
  onQuickView,
  hasMore,
  isLoadingMore,
  onLoadMore,
  totalCount,
  filteredCount,
  viewMode = "grid",
  onViewModeChange,
  favorites = [],
  onToggleFavorite,
  onCopyJson,
  copiedId,
  className = "",
}: WorkflowGridProps) {
  const [internalViewMode, setInternalViewMode] = useState<"grid" | "list">(viewMode);
  const activeView = onViewModeChange ? viewMode : internalViewMode;
  const setView = onViewModeChange || setInternalViewMode;
  const { t, formatPrice } = useLanguage();

  return (
    <div className={className}>
      {/* ── TOOLBAR / TOP CONTROLS ── */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-2xl bg-[#0f0f18]/80 border border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border border-indigo-500/30 flex items-center justify-center">
            <Icon name="bolt" className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <p className="text-sm text-gray-300">
              <span className="text-white font-bold">{filteredCount}</span> {t.toolbar_found}
            </p>
            {filteredCount !== totalCount && (
              <p className="text-[11px] text-indigo-400 font-medium">{t.toolbar_active_filters}</p>
            )}
          </div>
        </div>

        {/* View Toggle (Grid vs List) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <span className="text-xs text-gray-400 mr-1 hidden sm:inline">{t.toolbar_display}</span>
          <div className="flex items-center bg-black/40 border border-white/10 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setView("grid")}
              title="Vue Grille"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeView === "grid"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon name="grid" className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              title="Vue Liste"
              className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                activeView === "list"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon name="list" className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── WORKFLOWS DISPLAY ── */}
      {workflows.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-3xl bg-[#0f0f18]/60 border border-white/10 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
            <Icon name="search" className="w-8 h-8 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{t.no_results_title}</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto mb-6">
            {t.no_results_desc}
          </p>
        </div>
      ) : activeView === "grid" ? (
        <AnimatePresence mode="popLayout">
          <motion.div
            key="grid-view"
            variants={gridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
          >
            {workflows.map((workflow, index) => (
              <motion.div
                key={workflow.id}
                variants={cardVariants}
                custom={index}
                className="h-full"
              >
                <WorkflowCard
                  workflow={workflow}
                  onQuickView={onQuickView}
                  isFavorite={favorites.includes(workflow.id)}
                  onToggleFavorite={onToggleFavorite}
                  onCopyJson={onCopyJson}
                  isCopied={copiedId === workflow.id}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      ) : (
        /* ── LIST VIEW ── */
        <div className="space-y-3">
          {workflows.map((workflow) => {
            const pipeline = workflow.pipeline || (workflow.tags ? workflow.tags.slice(0, 3) : ["n8n"]);
            const isFav = favorites.includes(workflow.id);
            const isCopied = copiedId === workflow.id;

            return (
              <div
                key={workflow.id}
                className="group relative p-4 rounded-2xl bg-[#0e0e17] border border-white/10 hover:border-indigo-500/40 hover:bg-[#12121e] transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start md:items-center gap-4 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                    <Icon name="bolt" className="w-6 h-6 text-indigo-400" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        {workflow.category}
                      </span>
                      <span className="text-[10px] text-gray-500 font-mono">
                        {workflow.nodes} nœuds
                      </span>
                    </div>
                    <Link href={`/workflows/${workflow.slug}`}>
                      <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                        {workflow.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">
                      {workflow.description}
                    </p>
                  </div>
                </div>

                {/* Pipeline nodes */}
                <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0 px-3 py-1.5 rounded-xl bg-black/40 border border-white/5">
                  <span className="text-[10px] text-gray-500 font-mono mr-1">Pipeline:</span>
                  {pipeline.slice(0, 4).map((node, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300 font-medium">
                      {node}
                    </span>
                  ))}
                </div>

                {/* Right: Price & CTA */}
                <div className="flex items-center justify-between md:justify-end gap-3 flex-shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-white/5">
                  <div className="text-right">
                    <div className="text-base font-extrabold text-white">
                      {workflow.price === 0 ? <span className="text-emerald-400">{formatPrice(0)}</span> : <span className="gradient-text">{formatPrice(workflow.price)}</span>}
                    </div>
                    <div className="text-[10px] text-amber-400 flex items-center gap-0.5 justify-end">
                      <Icon name="star" className="w-3 h-3" />
                      <span>{workflow.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {onToggleFavorite && (
                      <button
                        type="button"
                        onClick={() => onToggleFavorite(workflow.id)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors cursor-pointer ${
                          isFav ? "bg-rose-500/20 border-rose-500/50 text-rose-400" : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        <Icon name={isFav ? "heartFilled" : "heart"} className="w-4 h-4" />
                      </button>
                    )}
                    {onCopyJson && (
                      <button
                        type="button"
                        onClick={() => onCopyJson(workflow)}
                        className="px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 text-gray-300 hover:text-indigo-300 text-xs flex items-center gap-1 transition-all cursor-pointer font-mono"
                      >
                        <Icon name={isCopied ? "check" : "copy"} className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{isCopied ? "Copié !" : "JSON"}</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => onQuickView(workflow)}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Icon name="eye" className="w-3.5 h-3.5" />
                      <span>Aperçu</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── LOAD MORE BUTTON ── */}
      {hasMore && (
        <div className="mt-8">
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="w-full btn-shine px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-semibold text-base hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 cursor-pointer"
          >
            {isLoadingMore ? (
              <>
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Chargement...
              </>
            ) : (
              <>
                <Icon name="download" className="w-5 h-5" />
                Voir plus de workflows
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}