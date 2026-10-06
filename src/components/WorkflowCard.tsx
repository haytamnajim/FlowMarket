import Link from "next/link";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";

interface WorkflowCardProps {
  workflow: Workflow;
  onQuickView?: (workflow: Workflow) => void;
}

const complexityConfig = {
  Débutant: { bg: "bg-emerald-500/10 border-emerald-500/20", text: "text-emerald-400", dot: "#10b981", label: "🟢 Débutant" },
  Intermédiaire: { bg: "bg-amber-500/10 border-amber-500/20", text: "text-amber-400", dot: "#f59e0b", label: "🟠 Intermédiaire" },
  Avancé: { bg: "bg-rose-500/10 border-rose-500/20", text: "text-rose-400", dot: "#f43f5e", label: "🔴 Avancé" },
};

export default function WorkflowCard({ workflow, onQuickView }: WorkflowCardProps) {
  const cc = complexityConfig[workflow.complexity as keyof typeof complexityConfig] || complexityConfig.Débutant;
  const hasCover = workflow.image && !workflow.image.includes("/workflows/") && !workflow.image.endsWith(".png");

  return (
    <div className="group relative">
      <Link href={`/workflows/${workflow.slug}`} className="block">
        <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] overflow-hidden transition-all duration-300 hover:border-indigo-500/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] hover:shadow-indigo-500/5 card-hover">
          
          {/* Cover Image / Thumbnail */}
          <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-500/10">
            {hasCover ? (
              <img
                src={workflow.image}
                alt={workflow.title}
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <Icon name="bolt" className="w-10 h-10 text-white/50 group-hover:text-white/80 transition-colors" />
                </div>
              </div>
            )}
            
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/80 via-transparent to-transparent" />
            
            {/* Badges top */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap justify-between gap-2">
              <div className="flex flex-wrap gap-2">
                {workflow.featured && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/30">
                    <Icon name="star" className="w-3 h-3" />
                    Populaire
                  </span>
                )}
                {workflow.price === 0 && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
                    <Icon name="gift" className="w-3 h-3" />
                    Gratuit
                  </span>
                )}
                {workflow.demoVideo && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-xs font-bold">
                    <Icon name="video" className="w-3 h-3" />
                    Démo
                  </span>
                )}
              </div>
              
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#111118]/80 backdrop-blur text-gray-300 text-xs font-medium border border-[#2a2a3a]">
                <Icon name="gitBranch" className="w-3 h-3" />
                {workflow.nodes} nœuds
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-4">
            {/* Category + Complexity */}
            <div className="flex items-center flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                {workflow.category}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${cc.bg} ${cc.text}`}>
                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cc.dot }} />
                {cc.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
              {workflow.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
              {workflow.description}
            </p>

            {/* Tags */}
            {workflow.tags && workflow.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {workflow.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a0a0f]/80 border border-[#2a2a3a] text-gray-500 hover:text-gray-300 hover:border-indigo-500/50 transition-all">
                    #{tag}
                  </span>
                ))}
                {workflow.tags.length > 4 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a0a0f]/80 border border-[#2a2a3a] text-gray-600">
                    +{workflow.tags.length - 4}
                  </span>
                )}
              </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-[#2a2a3a]">
              <div className="flex items-center gap-1.5">
                <Icon name="star" className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white">{workflow.rating}</span>
                <span className="text-sm text-gray-600">({workflow.reviews})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-lg font-bold gradient-text">
                  {workflow.price === 0 ? "Gratuit" : `${workflow.price}€`}
                </div>
                <Icon name="arrowRight" className="w-4 h-4 text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick View Button — positioned at bottom of card */}
      {onQuickView && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(workflow);
          }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:shadow-lg hover:shadow-indigo-500/25 z-10 flex items-center justify-center gap-2"
        >
          <Icon name="eye" className="w-4 h-4" />
          Aperçu rapide
        </button>
      )}
    </div>
  );
}