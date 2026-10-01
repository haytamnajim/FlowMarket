import Link from "next/link";
import { Workflow } from "@/data/workflows";
import Icon from "@/components/Icon";

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link href={`/workflows/${workflow.slug}`} className="group block">
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
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              {workflow.category}
            </span>
            <span className="text-xs text-gray-500">
              {workflow.complexity}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
            {workflow.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {workflow.description}
          </p>

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
  );
}
