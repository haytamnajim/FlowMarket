"use client";

import { useState } from "react";
import Icon from "./Icon";

interface N8nNode {
  id: string;
  name: string;
  type: string;
  status: "success" | "running" | "idle";
  icon: string;
  color: string;
  description: string;
}

interface N8nInteractiveCanvasProps {
  pipeline?: string[];
  workflowTitle: string;
}

export default function N8nInteractiveCanvas({ pipeline = [], workflowTitle }: N8nInteractiveCanvasProps) {
  const nodesList: N8nNode[] = (pipeline.length > 0 ? pipeline : ["Trigger", "Transform", "Sync", "Alert"]).map((name, idx) => {
    let icon = "bolt";
    let color = "from-indigo-500 to-purple-600";
    let desc = "Exécution automatisée du nœud";

    if (name.toLowerCase().includes("webhook") || name.toLowerCase().includes("trigger") || name.toLowerCase().includes("cron") || name.toLowerCase().includes("schedule")) {
      icon = "bolt";
      color = "from-emerald-500 to-teal-600";
      desc = "Déclencheur d'événement en temps réel";
    } else if (name.toLowerCase().includes("ai") || name.toLowerCase().includes("openai") || name.toLowerCase().includes("pinecone")) {
      icon = "cpu";
      color = "from-teal-400 to-cyan-600";
      desc = "Traitement IA & analyse contextuelle";
    } else if (name.toLowerCase().includes("slack") || name.toLowerCase().includes("telegram") || name.toLowerCase().includes("email") || name.toLowerCase().includes("gmail")) {
      icon = "mail";
      color = "from-rose-500 to-pink-600";
      desc = "Notification & routage d'alertes";
    } else if (name.toLowerCase().includes("stripe") || name.toLowerCase().includes("drive") || name.toLowerCase().includes("sheet") || name.toLowerCase().includes("hubspot") || name.toLowerCase().includes("notion")) {
      icon = "database";
      color = "from-amber-500 to-orange-600";
      desc = "Synchronisation de données cloud";
    }

    return {
      id: `node-${idx}`,
      name,
      type: `n8n.${name.toLowerCase()}`,
      status: idx === 0 ? "success" : "idle",
      icon,
      color,
      description: desc,
    };
  });

  const [activeNode, setActiveNode] = useState<N8nNode>(nodesList[0] || null);

  return (
    <div className="rounded-2xl border border-white/10 bg-[#090910] overflow-hidden shadow-2xl relative">
      {/* Canvas Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0e0e18] border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-white tracking-wide">
            Graphe d&apos;exécution n8n
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 font-mono hidden sm:inline">
            v1.0 Live Test
          </span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{nodesList.length} nœuds connectés</span>
        </div>
      </div>

      {/* Interactive Node Graph Area */}
      <div className="relative p-6 sm:p-8 min-h-[200px] flex items-center justify-center bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] overflow-x-auto">
        
        {/* Glow ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-32 bg-indigo-500/10 rounded-full blur-[60px] pointer-events-none" />

        <div className="flex items-center gap-3 sm:gap-6 relative z-10 py-2">
          {nodesList.map((node, index) => {
            const isSelected = activeNode?.id === node.id;
            return (
              <div key={node.id} className="flex items-center gap-3 sm:gap-6">
                
                {/* Node Box */}
                <button
                  type="button"
                  onClick={() => setActiveNode(node)}
                  className={`group relative text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer min-w-[130px] sm:min-w-[150px] ${
                    isSelected
                      ? "bg-[#141424] border-indigo-500 ring-2 ring-indigo-500/30 shadow-xl shadow-indigo-500/20 scale-105"
                      : "bg-[#0f0f18]/90 border-white/10 hover:border-white/20 hover:bg-[#12121f]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${node.color} flex items-center justify-center shadow-md`}>
                      <Icon name={node.icon} className="w-4 h-4 text-white" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>

                  <div className="text-xs sm:text-sm font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {node.name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono truncate">
                    Nœud #{index + 1}
                  </div>

                  {/* Port Output connector pin */}
                  <span className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-[#090910]" />
                  {/* Port Input connector pin */}
                  {index > 0 && (
                    <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-indigo-400 border-2 border-[#090910]" />
                  )}
                </button>

                {/* Animated Connecting Cable */}
                {index < nodesList.length - 1 && (
                  <div className="relative w-8 sm:w-12 h-1 bg-white/10 rounded-full overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-amber-400 to-indigo-500 animate-[pulse_1.5s_infinite]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Node Details Footer */}
      {activeNode && (
        <div className="px-4 py-3 bg-[#0d0d17] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-bold">
              {activeNode.name}
            </span>
            <span className="text-gray-400">{activeNode.description}</span>
          </div>
          <span className="text-emerald-400 font-mono text-[11px] flex items-center gap-1.5">
            <Icon name="check" className="w-3.5 h-3.5" />
            Configuré & Prêt à exécuter
          </span>
        </div>
      )}
    </div>
  );
}
