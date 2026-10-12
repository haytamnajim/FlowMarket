"use client";

import { useState } from "react";
import Link from "next/link";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";
import { useLanguage } from "@/components/LanguageProvider";

interface WorkflowCardProps {
  workflow: Workflow;
  onQuickView?: (workflow: Workflow) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onCopyJson?: (workflow: Workflow) => void;
  isCopied?: boolean;
}

const complexityConfig = {
  Débutant: { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400", dot: "#10b981", label: "Débutant" },
  Intermédiaire: { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400", dot: "#f59e0b", label: "Intermédiaire" },
  Avancé: { bg: "bg-rose-500/10 border-rose-500/20", text: "text-rose-400", dot: "#f43f5e", label: "Avancé" },
};

// Node brand styling map
const nodeColorMap: Record<string, { bg: string; text: string; border: string }> = {
  Webhook: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" },
  Code: { bg: "bg-sky-500/15", text: "text-sky-300", border: "border-sky-500/30" },
  HubSpot: { bg: "bg-orange-500/15", text: "text-orange-300", border: "border-orange-500/30" },
  Slack: { bg: "bg-purple-500/15", text: "text-purple-300", border: "border-purple-500/30" },
  Stripe: { bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/30" },
  Gmail: { bg: "bg-red-500/15", text: "text-red-300", border: "border-red-500/30" },
  "Google Drive": { bg: "bg-yellow-500/15", text: "text-yellow-300", border: "border-yellow-500/30" },
  "Google Sheets": { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" },
  Cron: { bg: "bg-cyan-500/15", text: "text-cyan-300", border: "border-cyan-500/30" },
  Schedule: { bg: "bg-cyan-500/15", text: "text-cyan-300", border: "border-cyan-500/30" },
  "HTTP Request": { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30" },
  OpenAI: { bg: "bg-teal-500/15", text: "text-teal-300", border: "border-teal-500/30" },
  Calendly: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30" },
  DocuSign: { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" },
  Notion: { bg: "bg-zinc-500/15", text: "text-zinc-200", border: "border-zinc-500/30" },
  Telegram: { bg: "bg-sky-500/15", text: "text-sky-300", border: "border-sky-500/30" },
  Pinecone: { bg: "bg-violet-500/15", text: "text-violet-300", border: "border-violet-500/30" },
  Zendesk: { bg: "bg-emerald-500/15", text: "text-emerald-300", border: "border-emerald-500/30" },
  PostgreSQL: { bg: "bg-blue-500/15", text: "text-blue-300", border: "border-blue-500/30" },
  "AWS S3": { bg: "bg-amber-500/15", text: "text-amber-300", border: "border-amber-500/30" },
  LinkedIn: { bg: "bg-blue-600/15", text: "text-blue-300", border: "border-blue-500/30" },
  "Twitter/X": { bg: "bg-gray-500/15", text: "text-gray-200", border: "border-gray-500/30" },
};

export default function WorkflowCard({
  workflow,
  onQuickView,
  isFavorite = false,
  onToggleFavorite,
  onCopyJson,
  isCopied = false,
}: WorkflowCardProps) {
  const cc = complexityConfig[workflow.complexity as keyof typeof complexityConfig] || complexityConfig.Débutant;
  const hasCover = workflow.image && !workflow.image.includes("/workflows/") && !workflow.image.endsWith(".png");
  const { formatPrice } = useLanguage();

  // Spotlight mouse tracking
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Default pipeline fallback if none specified
  const pipeline = workflow.pipeline || (workflow.tags && workflow.tags.length > 0 ? workflow.tags.slice(0, 4) : ["Trigger", "Node", "Action"]);

  return (
    <div
      className="group relative rounded-2xl p-[1px] transition-all duration-300"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ── SPOTLIGHT BORDER HIGHLIGHT ── */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.45), rgba(245, 158, 11, 0.2), transparent 70%)`
            : "transparent",
        }}
      />

      <div className="relative z-10 bg-[#101018] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between h-full transition-all duration-300 group-hover:border-white/20 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] group-hover:shadow-indigo-500/10">
        
        <div>
          {/* Cover Header */}
          <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-indigo-950/40 via-[#0e0e16] to-amber-950/30">
            {hasCover ? (
              <img
                src={workflow.image}
                alt={workflow.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-xl">
                  <Icon name="bolt" className="w-7 h-7 text-indigo-400 group-hover:text-amber-400 transition-colors" />
                </div>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#101018] via-black/30 to-black/50 pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
              <div className="flex items-center gap-1.5 flex-wrap">
                {workflow.featured && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[11px] font-bold shadow-md shadow-amber-500/30">
                    <Icon name="star" className="w-3 h-3" />
                    Top
                  </span>
                )}
                {workflow.price === 0 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 text-[11px] font-bold backdrop-blur-md">
                    <Icon name="gift" className="w-3 h-3" />
                    Gratuit
                  </span>
                )}
              </div>

              {/* Action buttons (Favorite & Quick Action) */}
              <div className="flex items-center gap-1.5">
                {onToggleFavorite && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onToggleFavorite(workflow.id);
                    }}
                    title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center backdrop-blur-md border transition-all cursor-pointer ${
                      isFavorite
                        ? "bg-rose-500/20 border-rose-500/50 text-rose-400"
                        : "bg-black/50 border-white/15 text-gray-400 hover:text-white hover:bg-black/80"
                    }`}
                  >
                    <Icon name={isFavorite ? "heartFilled" : "heart"} className="w-4 h-4" />
                  </button>
                )}
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-black/60 backdrop-blur-md text-gray-300 text-[11px] font-medium border border-white/10">
                  <Icon name="gitBranch" className="w-3 h-3 text-indigo-400" />
                  {workflow.nodes}
                </span>
              </div>
            </div>

            {/* ── MINI-FLUX PIPELINE N8N SUR LA COUVERTURE ── */}
            <div className="absolute bottom-2.5 left-3 right-3 z-10">
              <div className="flex items-center gap-1 bg-[#0b0b12]/90 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-white/10 shadow-lg overflow-x-auto no-scrollbar">
                <span className="text-[10px] text-gray-400 font-mono uppercase tracking-wider mr-1 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Pipeline:
                </span>
                <div className="flex items-center gap-1 flex-nowrap">
                  {pipeline.slice(0, 4).map((node, i) => {
                    const style = nodeColorMap[node] || { bg: "bg-indigo-500/15", text: "text-indigo-300", border: "border-indigo-500/25" };
                    return (
                      <div key={i} className="flex items-center gap-1 flex-shrink-0">
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${style.bg} ${style.text} ${style.border}`}>
                          {node}
                        </span>
                        {i < Math.min(pipeline.length - 1, 3) && (
                          <span className="text-gray-500 text-[10px] font-bold">➔</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Details body */}
          <div className="p-4 sm:p-5 space-y-3">
            {/* Category + Complexity */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider">
                {workflow.category}
              </span>
              <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md border ${cc.bg} ${cc.text}`}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cc.dot }} />
                {cc.label}
              </span>
            </div>

            {/* Title */}
            <Link href={`/workflows/${workflow.slug}`} className="block">
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                {workflow.title}
              </h3>
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
              {workflow.description}
            </p>

            {/* Tags */}
            {workflow.tags && workflow.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 pt-1">
                {workflow.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/5 text-gray-400 hover:text-white transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 pt-0">
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            {/* Rating */}
            <div className="flex items-center gap-1 text-xs">
              <Icon name="star" className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-white">{workflow.rating}</span>
              <span className="text-gray-500 text-[11px]">({workflow.reviews})</span>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center gap-2">
              <div className="text-base font-extrabold text-white">
                {workflow.price === 0 ? (
                  <span className="text-emerald-400">{formatPrice(0)}</span>
                ) : (
                  <span className="gradient-text">{formatPrice(workflow.price)}</span>
                )}
              </div>

              {/* Copy JSON Button */}
              {onCopyJson && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onCopyJson(workflow);
                  }}
                  title="Copier le JSON n8n prêt à coller"
                  className="px-2 py-1 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-500/30 text-gray-300 hover:text-indigo-300 text-xs flex items-center gap-1 transition-all cursor-pointer"
                >
                  <Icon name={isCopied ? "check" : "copy"} className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-[11px] font-mono">{isCopied ? "Copié !" : "JSON"}</span>
                </button>
              )}

              {/* Quick View Button */}
              {onQuickView && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onQuickView(workflow);
                  }}
                  title="Aperçu rapide"
                  className="w-7 h-7 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <Icon name="eye" className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}