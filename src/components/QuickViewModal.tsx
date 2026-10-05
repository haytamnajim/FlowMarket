"use client";

import { useEffect, useRef } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { Workflow } from "@/data/workflows";
import Icon from "./Icon";

interface QuickViewModalProps {
  workflow: Workflow | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ workflow, isOpen, onClose }: QuickViewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Handle focus trap and ESC key
  useEffect(() => {
    if (!isOpen) return;

    // Store the currently focused element
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus the modal
    const modal = modalRef.current;
    modal?.focus();

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    // Trap focus
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusableElements = modal?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleTab);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleTab);
      document.body.style.overflow = "";
      // Restore focus to previously focused element
      previousActiveElement.current?.focus();
    };
  }, [isOpen, onClose]);

  // Close on overlay click
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen || !workflow) return null;

  const complexityColors = {
    "Débutant": "from-emerald-500 to-teal-500",
    "Intermédiaire": "from-amber-500 to-orange-500",
    "Avancé": "from-red-500 to-pink-500",
  };

  const complexityColor = complexityColors[workflow.complexity as keyof typeof complexityColors] || "from-gray-500 to-gray-600";

  return (
    <Fragment>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Modal Content */}
        <div
          ref={modalRef}
          tabIndex={-1}
          className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111118] rounded-3xl border border-[#2a2a3a] shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-300"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-xl bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] flex items-center justify-center text-gray-400 hover:text-white hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-200"
            aria-label="Fermer"
          >
            <Icon name="x" className="w-5 h-5" />
          </button>

          <div className="p-6 md:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold ${workflow.complexity === "Débutant" ? "from-emerald-500 to-teal-500" : workflow.complexity === "Intermédiaire" ? "from-amber-500 to-orange-500" : "from-red-500 to-pink-500"} text-white`}>
                    {workflow.complexity}
                  </span>
                  {workflow.featured && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-xs font-bold">
                      <Icon name="star" className="w-3 h-3" />
                      Populaire
                    </span>
                  )}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">{workflow.title}</h2>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Icon name="star" className="w-4 h-4 text-amber-400" />
                  <span className="font-semibold text-white">{workflow.rating}</span>
                  <span className="text-gray-600">({workflow.reviews})</span>
                </span>
                <span className="flex items-center gap-1.5 text-gray-400">
                  <Icon name="download" className="w-4 h-4" />
                  {workflow.downloads.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="text-3xl font-bold gradient-text mb-2">{workflow.price}€</div>
              <p className="text-gray-500 text-sm">Paiement unique • Accès à vie • Mises à jour incluses</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {workflow.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-[#0a0a0f]/80 backdrop-blur border border-[#2a2a3a] text-xs text-gray-400 hover:text-gray-300 hover:border-indigo-500/50 transition-all">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
              <div className="prose prose-invert max-w-none text-gray-400 leading-relaxed whitespace-pre-line">
                {workflow.longDescription}
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Ce que vous obtenez</h3>
              <ul className="space-y-3">
                {[
                  "Fichier JSON n8n prêt à importer",
                  "Documentation complète pas-à-pas",
                  "Configuration guidée (credentials, nœuds)",
                  "Support email prioritaire 7j/7",
                  "Mises à jour gratuites à vie",
                  "Garantie satisfait ou remboursé 30 jours",
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Icon name="check" className="w-3 h-3 text-emerald-400" />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack / Requirements */}
            <div className="mb-8 p-4 bg-[#0a0a0f]/50 rounded-2xl border border-[#2a2a3a]">
              <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                <Icon name="cpu" className="w-5 h-5 text-indigo-400" />
                Prérequis & Compatibilité
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="flex items-center gap-2 text-gray-400">
                  <Icon name="server" className="w-4 h-4 text-indigo-400" />
                  <span>n8n Cloud / Self-hosted</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Icon name="database" className="w-4 h-4 text-amber-400" />
                  <span>Compatible v1.0+</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Icon name="lock" className="w-4 h-4 text-emerald-400" />
                  <span>Credentials requis</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Icon name="download" className="w-4 h-4 text-amber-400" />
                  <span>Import JSON natif</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#2a2a3a]">
              <Link
                href={`/workflows/${workflow.slug}`}
                className="btn-shine flex-1 justify-center px-6 py-4 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all"
                onClick={onClose}
              >
                Acheter maintenant ({workflow.price}€)
              </Link>
              <Link
                href={`/workflows/${workflow.slug}`}
                className="flex-1 justify-center px-6 py-4 bg-[#111118]/80 backdrop-blur border border-indigo-500/30 text-white rounded-xl font-semibold text-lg hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all"
                onClick={onClose}
              >
                Voir la démo gratuite
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}