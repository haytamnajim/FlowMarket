"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";

interface WorkflowCard3DProps {
  workflow: Workflow;
}

export default function WorkflowCard3D({ workflow }: WorkflowCard3DProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;

    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateYVal = (mouseX / (rect.width / 2)) * 8;
    const rotateXVal = -(mouseY / (rect.height / 2)) * 8;

    setRotateX(rotateXVal);
    setRotateY(rotateYVal);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setShowOverlay(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setTimeout(() => setShowOverlay(false), 300);
  };

  const complexityColors = {
    "Débutant": "from-emerald-500 to-teal-500",
    "Intermédiaire": "from-amber-500 to-orange-500",
    "Avancé": "from-red-500 to-pink-500",
  };

  const complexityColor = complexityColors[workflow.complexity as keyof typeof complexityColors] || "from-gray-500 to-gray-600";

  return (
    <Link href={`/workflows/${workflow.slug}`} className="group block">
      <div
        ref={cardRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        className="relative perspective-1000"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* 3D Card */}
        <div className="relative h-full bg-[#111118] rounded-2xl border border-[#2a2a3a] overflow-hidden transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-indigo-500/10">
          {/* Card Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-amber-500/5" />

          {/* Featured Badge */}
          {workflow.featured && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-xs font-bold">
                <Icon name="star" className="w-3 h-3" />
                Populaire
              </span>
            </div>
          )}

          {/* Complexity Badge */}
          <div className="absolute top-4 right-4 z-10">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r ${workflow.complexity === "Débutant" ? "from-emerald-500 to-teal-500" : workflow.complexity === "Intermédiaire" ? "from-amber-500 to-orange-500" : "from-red-500 to-pink-500"} text-white`}>
              {workflow.complexity}
            </span>
          </div>

          {/* Card Image Area */}
          <div className="aspect-video relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-500/10" />
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center">
                <svg className="w-10 h-10 text-indigo-400/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 ${showOverlay ? "opacity-100" : ""}`}>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0f]/80 backdrop-blur border border-[#2a2a3a] text-xs font-medium text-gray-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all duration-300">
                  <Icon name="bolt" className="w-3 h-3" />
                  {workflow.nodes} nœuds
                </span>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${workflow.complexity === "Débutant" ? "from-emerald-500 to-teal-500" : workflow.complexity === "Intermédiaire" ? "from-amber-500 to-orange-500" : "from-red-500 to-pink-500"} text-white`}>
                  {workflow.complexity}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-2">{workflow.title}</h3>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{workflow.description}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {workflow.tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="px-2.5 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur border border-[#2a2a3a] text-xs text-gray-500">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Icon name="star" className="w-4 h-4 text-amber-400" />
                  {workflow.rating}
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Icon name="download" className="w-4 h-4" />
                  {workflow.downloads}
                </span>
                <span className="flex items-center gap-1.5 text-gradient font-semibold">
                  {workflow.price}€
                </span>
              </div>

              <button className="mt-4 w-full btn-shine px-6 py-3 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all">
                Voir détails
              </button>
            </div>
          </div>
        </div>

        {/* Card Content - visible when not hovered */}
        <div className="absolute inset-0 p-6 transition-all duration-500 group-hover:opacity-0 group-hover:pointer-events-none">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              {workflow.category}
            </span>
            <span className="text-xs text-gray-500">{workflow.complexity}</span>
          </div>

          <h3 className="text-lg font-semibold text-white group-hover:text-indigo-400 transition-colors mb-3">
            {workflow.title}
          </h3>

          <p className="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">
            {workflow.description}
          </p>

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