import Link from "next/link";
import { Workflow } from "@/data/workflows";

interface WorkflowCardProps {
  workflow: Workflow;
}

export default function WorkflowCard({ workflow }: WorkflowCardProps) {
  return (
    <Link href={`/workflows/${workflow.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200 transition-all duration-300">
        {/* Image */}
        <div className="aspect-video bg-gradient-to-br from-orange-100 to-red-50 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20 group-hover:scale-110 transition-transform duration-300">
              ⚡
            </div>
          </div>
          {workflow.featured && (
            <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              ⭐ Populaire
            </span>
          )}
          <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
            {workflow.nodes} nœuds
          </span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded">
              {workflow.category}
            </span>
            <span className="text-xs text-gray-500">
              {workflow.complexity}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors mb-2">
            {workflow.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-2 mb-4">
            {workflow.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-yellow-500">★</span>
              <span className="text-sm font-medium text-gray-900">{workflow.rating}</span>
              <span className="text-sm text-gray-500">({workflow.reviews})</span>
            </div>
            <div className="text-lg font-bold text-gray-900">
              {workflow.price}€
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
