import Link from "next/link";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";

interface WorkflowCardProps {
  workflow: Workflow;
  onQuickView?: (workflow: Workflow) => void;
}

export default function WorkflowCard({ workflow, onQuickView }: WorkflowCardProps) {
  return (
    <div className="group relative">
      <Link href={`/workflows/${workflow.slug}`} className="block">
        <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] overflow-hidden card-hover">
          {/* Image */}
          <div className="aspect-video relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-amber-500/20" />
            <div className="absolute inset-0 bg-grid opacity-50" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Icon name="bolt" className="w-8 h-8 text-white opacity-50 group-hover:opacity-80 transition-opacity" />
              </div>
            </div>
            {workflow.featured && (
              <span className="absolute top-3 left-3 bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1">
                <Icon name="star" className="w-3 h-3" />
                Populaire
              </span>
            )}
            <span className="absolute top-3 right-3 bg-[#111118]/80 backdrop-blur text-gray-300 text-xs font-medium px-3 py-1.5 rounded-lg border border-[#2a2a3a]">
              {workflow.nodes} nœuds
            </span>
          </div>

          {/* Content */}
          <div className="p-5">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                {workflow.category}
              </span>
              {/* Complexity badge — colored */}
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg border ${
                workflow.complexity === "Débutant"
                  ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
                  : workflow.complexity === "Intermédiaire"
                  ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                  : "text-red-400 bg-red-500/10 border-red-500/20"
              }`}>
                {workflow.complexity === "Débutant" ? "🟢" : workflow.complexity === "Intermédiaire" ? "🟠" : "🔴"}{" "}
                {workflow.complexity}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
              {workflow.title}
            </h3>

            <p className="text-gray-500 text-sm line-clamp-2 mb-3 leading-relaxed">
              {workflow.description}
            </p>

            {/* Tags preview */}
            {workflow.tags && workflow.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {workflow.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a0a0f]/80 border border-[#2a2a3a] text-gray-500">
                    #{tag}
                  </span>
                ))}
                {workflow.tags.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#0a0a0f]/80 border border-[#2a2a3a] text-gray-600">
                    +{workflow.tags.length - 3}
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
              <div className="text-lg font-bold gradient-text">
                {workflow.price}€
              </div>
            </div>
          </div>
        </div>
      </Link>

      {/* Quick View Button — parent has relative, button positioned at bottom of card */}
      {onQuickView && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onQuickView(workflow);
          }}
          className="absolute bottom-[68px] left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-medium text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 hover:shadow-lg hover:shadow-indigo-500/25 z-10"
        >
          Aperçu rapide
        </button>
      )}
    </div>
  );
}
