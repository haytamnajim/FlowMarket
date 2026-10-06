"use client";

import { motion, AnimatePresence, type Variants } from "framer-motion";
import WorkflowCard from "./WorkflowCard";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";

interface WorkflowGridProps {
  workflows: Workflow[];
  onQuickView: (w: Workflow) => void;
  hasMore: boolean;
  isLoadingMore: boolean;
  onLoadMore: () => void;
  totalCount: number;
  filteredCount: number;
  className?: string;
}

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const loadMoreVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

export default function WorkflowGrid({
  workflows,
  onQuickView,
  hasMore,
  isLoadingMore,
  onLoadMore,
  totalCount,
  filteredCount,
  className = "",
}: WorkflowGridProps) {
  return (
    <div className={className}>
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
            className="w-8 h-8 rounded-xl bg-gradient-to-r from-indigo-500/20 to-amber-500/20 border border-indigo-500/30 flex items-center justify-center"
          >
            <Icon name="bolt" className="w-4 h-4 text-indigo-400" />
          </motion.div>
          <div>
            <p className="text-sm text-gray-500">
              <span className="text-white font-semibold">{filteredCount}</span>{" "}
              sur <span className="text-white font-semibold">{totalCount}</span> workflows
            </p>
            {filteredCount !== totalCount && (
              <p className="text-xs text-gray-600 mt-0.5">Filtrés</p>
            )}
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={workflows.length}
          variants={gridVariants}
          initial="hidden"
          animate="visible"
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 ${className}`}
        >
          {workflows.map((workflow, index) => (
            <motion.div
              key={workflow.id}
              variants={cardVariants}
              custom={index}
              className="group"
            >
              <WorkflowCard
                workflow={workflow}
                onQuickView={onQuickView}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Load More / End Message */}
      <AnimatePresence mode="wait">
        {hasMore ? (
          <motion.div
            key="load-more"
            variants={loadMoreVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-8"
          >
            <button
              onClick={onLoadMore}
              disabled={isLoadingMore}
              className="w-full btn-shine px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-semibold text-base hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
          </motion.div>
        ) : filteredCount > 0 ? (
          <motion.div
            key="end"
            variants={loadMoreVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118] border border-[#2a2a3a] text-gray-500 text-sm">
              <Icon name="check" className="w-3.5 h-3.5 text-emerald-400" />
              Tous les workflows sont affichés
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Empty State */}
      {filteredCount === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-center py-20"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#111118] border border-[#2a2a3a] flex items-center justify-center">
            <Icon name="search" className="w-10 h-10 text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Aucun workflow trouvé</h3>
          <p className="text-gray-500 mb-6 max-w-sm mx-auto">
            Essayez de modifier vos filtres ou votre recherche pour trouver des résultats.
          </p>
        </motion.div>
      )}
    </div>
  );
}