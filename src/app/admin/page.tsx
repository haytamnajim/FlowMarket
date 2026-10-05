"use client";

import { useState, useEffect, useMemo, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, Workflow } from "@/data/workflows";
import { getAllStoredWorkflows, saveWorkflow, deleteWorkflow } from "@/data/workflowStore";

/* ─────────────────────── helpers ──────────────────────── */

const complexityConfig = {
  Débutant: { color: "emerald", label: "Débutant", hint: "Configuration en 5 min" },
  Intermédiaire: { color: "amber", label: "Intermédiaire", hint: "Nécessite des API keys" },
  Avancé: { color: "rose", label: "Avancé", hint: "Webhooks & scripts" },
} as const;

type Complexity = keyof typeof complexityConfig;

/* ─────────────────── sub-components ────────────────────── */

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
      {children}
      {required && <span className="text-indigo-400 ml-1">*</span>}
    </label>
  );
}

function FieldInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-[#0a0a12] border border-[#252535] rounded-xl px-4 py-3 text-sm text-white
        placeholder-gray-600 focus:outline-none focus:border-indigo-500/70 focus:bg-[#0d0d1a]
        focus:ring-1 focus:ring-indigo-500/20 transition-all ${props.className ?? ""}`}
    />
  );
}

function FieldTextarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full bg-[#0a0a12] border border-[#252535] rounded-xl px-4 py-3 text-sm text-white
        placeholder-gray-600 focus:outline-none focus:border-indigo-500/70 focus:bg-[#0d0d1a]
        focus:ring-1 focus:ring-indigo-500/20 transition-all resize-none ${props.className ?? ""}`}
    />
  );
}

function FieldSelect(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full bg-[#0a0a12] border border-[#252535] rounded-xl px-4 py-3 text-sm text-white
        focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/20 transition-all
        appearance-none ${props.className ?? ""}`}
    />
  );
}

function SectionCard({
  title,
  icon,
  accent = "indigo",
  badge,
  children,
}: {
  title: string;
  icon: string;
  accent?: "indigo" | "emerald" | "amber";
  badge?: string;
  children: React.ReactNode;
}) {
  const accentMap = {
    indigo: "border-indigo-500/25 from-indigo-500/8",
    emerald: "border-emerald-500/25 from-emerald-500/8",
    amber: "border-amber-500/25 from-amber-500/8",
  };
  const textMap = {
    indigo: "text-indigo-400",
    emerald: "text-emerald-400",
    amber: "text-amber-400",
  };
  return (
    <div className={`rounded-2xl border ${accentMap[accent]} bg-gradient-to-br to-transparent from-[#0a0a12] overflow-hidden`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <Icon name={icon} className={`w-4 h-4 ${textMap[accent]}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${textMap[accent]}`}>{title}</span>
        </div>
        {badge && (
          <span className={`text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 ${textMap.amber} font-mono font-semibold`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

/* ──────────────────────── page ─────────────────────────── */

export default function AdminPage() {
  const [workflowsList, setWorkflowsList] = useState<Workflow[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "new" | "security">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  /* Form state */
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("marketing");
  const [complexity, setComplexity] = useState<Complexity>("Débutant");
  const [price, setPrice] = useState(29);
  const [nodes, setNodes] = useState(12);
  const [demoVideo, setDemoVideo] = useState("/videos/hero-workflow.mp4");
  const [n8nJsonProtected, setN8nJsonProtected] = useState("");
  const [tags, setTags] = useState("n8n, automatisation, productivité");
  const [isFeatured, setIsFeatured] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  const loadWorkflows = () => setWorkflowsList(getAllStoredWorkflows());

  useEffect(() => {
    loadWorkflows();
    window.addEventListener("flowmarket_workflows_changed", loadWorkflows);
    return () => window.removeEventListener("flowmarket_workflows_changed", loadWorkflows);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  };

  const handleJsonChange = (val: string) => {
    setN8nJsonProtected(val);
    if (!val.trim()) { setJsonError(null); return; }
    try { JSON.parse(val); setJsonError(null); } catch { setJsonError("Format JSON n8n invalide"); }
  };

  const handleEdit = (w: Workflow) => {
    setEditingId(w.id);
    setTitle(w.title);
    setSlug(w.slug);
    setDescription(w.description);
    setLongDescription(w.longDescription || "");
    setCategory(w.category);
    setComplexity(w.complexity as Complexity);
    setPrice(w.price);
    setNodes(w.nodes);
    setDemoVideo(w.demoVideo || "/videos/hero-workflow.mp4");
    setN8nJsonProtected(w.n8nJsonProtected || "");
    setTags(w.tags.join(", "));
    setIsFeatured(w.featured);
    setActiveTab("new");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null); setTitle(""); setSlug(""); setDescription("");
    setLongDescription(""); setCategory("marketing"); setComplexity("Débutant");
    setPrice(29); setNodes(12); setDemoVideo("/videos/hero-workflow.mp4");
    setN8nJsonProtected(""); setTags("n8n, automatisation, productivité");
    setIsFeatured(false); setJsonError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) { showToast("❌ Titre et slug obligatoires."); return; }
    if (jsonError) { showToast("❌ Corrigez le JSON n8n."); return; }
    const workflowData: Workflow = {
      id: editingId || `custom-${Date.now()}`,
      title: title.trim(), slug: slug.trim(), description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      category, complexity: complexity as Workflow["complexity"],
      price: Number(price), nodes: Number(nodes),
      demoVideo: demoVideo.trim(),
      n8nJsonProtected: n8nJsonProtected.trim() || JSON.stringify({ name: title, nodes: [], connections: {} }),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: `/workflows/${category}.png`,
      rating: 5.0, reviews: 1, downloads: 0, featured: isFeatured,
      createdAt: new Date().toISOString().split("T")[0],
    };
    saveWorkflow(workflowData);
    showToast(editingId ? "✅ Workflow mis à jour !" : "🚀 Workflow publié avec succès !");
    resetForm();
    setActiveTab("list");
  };

  const handleDelete = (id: string, wTitle: string) => {
    if (confirm(`Supprimer "${wTitle}" ?`)) { deleteWorkflow(id); showToast("Workflow supprimé."); }
  };

  const filtered = useMemo(() =>
    workflowsList.filter((w) => {
      const q = searchQuery.toLowerCase();
      const matchQ = w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.tags.some((t) => t.toLowerCase().includes(q));
      return matchQ && (selectedCategory === "all" || w.category === selectedCategory);
    }),
    [workflowsList, searchQuery, selectedCategory]
  );

  const totalWorkflows = workflowsList.length;
  const totalDownloads = workflowsList.reduce((a, w) => a + (w.downloads || 0), 0);
  const avgPrice = Math.round(workflowsList.reduce((a, w) => a + w.price, 0) / (totalWorkflows || 1));
  const protectedCount = workflowsList.filter((w) => w.demoVideo || w.n8nJsonProtected).length;

  const tabs = [
    { id: "list" as const, label: `Workflows (${workflowsList.length})`, icon: "bolt" },
    { id: "new" as const, label: editingId ? "Modifier" : "Ajouter", icon: "plus" },
    { id: "security" as const, label: "Sécurité", icon: "shield" },
  ];

  return (
    <div className="min-h-screen bg-[#07070d] text-white pt-24 pb-24">

      {/* ── Toast ── */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0f0f1e] border border-indigo-500/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl shadow-indigo-500/10 backdrop-blur-xl flex items-center gap-3 text-sm font-medium"
          style={{ animation: "cookieBannerEnter 0.3s ease" }}>
          {toastMessage}
        </div>
      )}

      {/* ── Video Preview Modal ── */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#0f0f1a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a3a]">
              <span className="text-sm font-semibold flex items-center gap-2 text-indigo-400">
                <Icon name="video" className="w-4 h-4" /> Aperçu Démo Vidéo Front-End
              </span>
              <button onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video src={previewVideo} controls autoPlay className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-xs text-gray-500 text-center bg-[#090910] flex items-center justify-center gap-2">
              <Icon name="lock" className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              L&apos;acheteur voit uniquement cette démonstration. Le fichier source n8n reste protégé.
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Page header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-wider mb-4">
              <Icon name="shield" className="w-3.5 h-3.5" />
              Espace Administrateur · FlowMarket
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Gestionnaire de{" "}
              <span className="gradient-text">Workflows</span>
            </h1>
            <p className="text-gray-500 text-sm mt-2 max-w-lg">
              Publiez des templates, protégez vos codes sources et configurez les démonstrations front-end.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href="/workflows"
              className="px-4 py-2.5 rounded-xl border border-[#252535] hover:bg-[#131320] text-sm text-gray-400 hover:text-white font-medium transition-colors flex items-center gap-2">
              <Icon name="eye" className="w-4 h-4" />
              Catalogue public
            </Link>
            <button
              onClick={() => { resetForm(); setActiveTab("new"); }}
              className="btn-shine px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2">
              <Icon name="plus" className="w-4 h-4" />
              Nouveau workflow
            </button>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Workflows", value: totalWorkflows, icon: "bolt", color: "indigo", unit: "" },
            { label: "Téléchargements", value: totalDownloads.toLocaleString(), icon: "download", color: "emerald", unit: "" },
            { label: "Prix moyen", value: avgPrice, icon: "star", color: "amber", unit: " €" },
            { label: "Démos sécurisées", value: `${protectedCount}/${totalWorkflows}`, icon: "shield", color: "violet", unit: "" },
          ].map((stat) => (
            <div key={stat.label}
              className="bg-[#0f0f1a] border border-[#1e1e2e] rounded-2xl p-5 hover:border-indigo-500/20 transition-colors group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-widest">{stat.label}</span>
                <div className="w-8 h-8 rounded-lg bg-white/3 flex items-center justify-center group-hover:bg-indigo-500/10 transition-colors">
                  <Icon name={stat.icon} className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              </div>
              <div className="text-3xl font-extrabold text-white">{stat.value}{stat.unit}</div>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 bg-[#0f0f1a] border border-[#1e1e2e] rounded-2xl p-1.5 mb-8 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/4"
              }`}
            >
              <Icon name={tab.icon} className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════ TAB 1: LIST ══════════ */}
        {activeTab === "list" && (
          <div>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Icon name="search" className="w-4 h-4 text-gray-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <FieldInput
                  type="text"
                  placeholder="Rechercher un workflow..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <FieldSelect value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full sm:w-52">
                <option value="all">Toutes les catégories</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </FieldSelect>
            </div>

            {/* Table */}
            <div className="bg-[#0f0f1a] border border-[#1e1e2e] rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300">
                  <thead className="border-b border-[#1e1e2e]">
                    <tr>
                      {["Workflow", "Catégorie", "Prix", "Difficulté", "Sécurité / Démo", ""].map((h, i) => (
                        <th key={i} className={`py-4 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-600 ${i === 5 ? "text-right" : "text-left"}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1a1a28]">
                    {filtered.map((w) => (
                      <tr key={w.id} className="hover:bg-[#13131f] transition-colors group">
                        <td className="py-4 px-5">
                          <div className="font-semibold text-white group-hover:text-indigo-300 transition-colors">{w.title}</div>
                          <div className="text-[11px] text-gray-600 font-mono mt-0.5">/{w.slug}</div>
                        </td>
                        <td className="py-4 px-5">
                          <span className="px-2.5 py-1 rounded-full bg-indigo-500/8 border border-indigo-500/15 text-indigo-400 text-[11px] font-semibold">{w.category}</span>
                        </td>
                        <td className="py-4 px-5">
                          <span className="font-bold text-white">{w.price === 0 ? <span className="text-emerald-400">Gratuit</span> : `${w.price} €`}</span>
                        </td>
                        <td className="py-4 px-5">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            w.complexity === "Débutant" ? "bg-emerald-500/10 text-emerald-400" :
                            w.complexity === "Intermédiaire" ? "bg-amber-500/10 text-amber-400" :
                            "bg-rose-500/10 text-rose-400"
                          }`}>{w.complexity}</span>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center gap-2 flex-wrap">
                            {w.demoVideo ? (
                              <button onClick={() => setPreviewVideo(w.demoVideo || "/videos/hero-workflow.mp4")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1.5 hover:bg-emerald-500/15 transition-colors">
                                <Icon name="video" className="w-3.5 h-3.5" />Démo Front
                              </button>
                            ) : (
                              <span className="text-[11px] text-gray-700 italic">Pas de démo</span>
                            )}
                            <span className="text-[11px] text-indigo-400 bg-indigo-500/8 px-2 py-0.5 rounded border border-indigo-500/15 flex items-center gap-1">
                              <Icon name="lock" className="w-3 h-3" />JSON Protégé
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-5">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link href={`/workflows/${w.slug}`} target="_blank"
                              className="p-2 rounded-lg bg-white/3 hover:bg-indigo-600/20 hover:text-indigo-300 text-gray-500 transition-colors" title="Voir la page publique">
                              <Icon name="eye" className="w-4 h-4" />
                            </Link>
                            <button onClick={() => handleEdit(w)}
                              className="p-2 rounded-lg bg-white/3 hover:bg-amber-600/20 hover:text-amber-300 text-gray-500 transition-colors" title="Modifier">
                              <Icon name="edit" className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(w.id, w.title)}
                              className="p-2 rounded-lg bg-white/3 hover:bg-red-600/20 hover:text-red-400 text-gray-600 transition-colors" title="Supprimer">
                              <Icon name="trash" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr><td colSpan={6} className="py-16 text-center text-gray-600 text-sm">
                        Aucun workflow trouvé avec ces critères.
                      </td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════ TAB 2: FORM ══════════ */}
        {activeTab === "new" && (
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Form header */}
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  {editingId ? "Modifier le workflow" : "Créer un nouveau workflow"}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Les visiteurs voient la vidéo de démo. Le code JSON reste masqué côté backend.
                </p>
              </div>
              {editingId && (
                <button type="button" onClick={resetForm}
                  className="text-xs text-gray-500 hover:text-white px-4 py-2 rounded-xl border border-[#252535] hover:border-[#3a3a50] transition-all">
                  ✕ Annuler l&apos;édition
                </button>
              )}
            </div>

            {/* ─── Section 1: Public info ─── */}
            <SectionCard title="Informations Publiques" icon="eye" accent="indigo">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <FieldLabel required>Titre du workflow</FieldLabel>
                  <FieldInput type="text" required placeholder="Ex: Prospection LinkedIn avec GPT-4" value={title} onChange={(e) => handleTitleChange(e.target.value)} />
                </div>
                <div>
                  <FieldLabel required>Slug URL</FieldLabel>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm select-none">/</span>
                    <FieldInput type="text" required placeholder="prospection-linkedin-gpt4" value={slug} onChange={(e) => setSlug(e.target.value)} className="pl-7" />
                  </div>
                </div>
                <div>
                  <FieldLabel>Catégorie</FieldLabel>
                  <div className="relative">
                    <FieldSelect value={category} onChange={(e) => setCategory(e.target.value)}>
                      {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </FieldSelect>
                    <Icon name="chevron-down" className="w-4 h-4 text-gray-600 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <FieldLabel>Prix (€) — 0 = Gratuit</FieldLabel>
                  <FieldInput type="number" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
                </div>
                <div>
                  <FieldLabel>Nombre de nœuds n8n</FieldLabel>
                  <FieldInput type="number" min="1" value={nodes} onChange={(e) => setNodes(Number(e.target.value))} />
                </div>
                <div>
                  <FieldLabel>Tags (séparés par virgules)</FieldLabel>
                  <FieldInput type="text" placeholder="linkedin, ia, crm, notion" value={tags} onChange={(e) => setTags(e.target.value)} />
                </div>
              </div>

              <div className="mt-5">
                <FieldLabel>Description courte (carte workflow)</FieldLabel>
                <FieldTextarea rows={2} placeholder="Générez des leads qualifiés chaque jour avec n8n et GPT-4..." value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="mt-4">
                <FieldLabel>Description longue (page détail)</FieldLabel>
                <FieldTextarea rows={4} placeholder="Détaillez le workflow, ce qu'il automatise, les prérequis..." value={longDescription} onChange={(e) => setLongDescription(e.target.value)} />
              </div>
            </SectionCard>

            {/* ─── Difficulty + Featured ─── */}
            <SectionCard title="Options & Difficulté" icon="star" accent="indigo">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel>Niveau de difficulté</FieldLabel>
                  <div className="grid grid-cols-3 gap-2">
                    {(Object.keys(complexityConfig) as Complexity[]).map((c) => {
                      const cfg = complexityConfig[c];
                      const isSelected = complexity === c;
                      const colorMap: Record<string, string> = {
                        emerald: "border-emerald-500/50 bg-emerald-500/10 text-emerald-300",
                        amber: "border-amber-500/50 bg-amber-500/10 text-amber-300",
                        rose: "border-rose-500/50 bg-rose-500/10 text-rose-300",
                      };
                      return (
                        <button key={c} type="button" onClick={() => setComplexity(c)}
                          className={`p-3 rounded-xl border text-center transition-all ${
                            isSelected ? colorMap[cfg.color] : "border-[#252535] bg-[#0a0a12] text-gray-600 hover:text-gray-400 hover:border-[#353545]"
                          }`}>
                          <div className="font-semibold text-xs">{cfg.label}</div>
                          <div className="text-[10px] mt-0.5 opacity-70">{cfg.hint}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-4 cursor-pointer p-4 rounded-2xl border border-[#252535] hover:border-indigo-500/30 bg-[#0a0a12] w-full transition-all group">
                    <div className={`w-12 h-6 rounded-full relative transition-all ${isFeatured ? "bg-indigo-500" : "bg-[#252535]"}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${isFeatured ? "left-6" : "left-0.5"}`} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Mettre en avant</div>
                      <div className="text-xs text-gray-600">Afficher dans le carrousel d&apos;accueil</div>
                    </div>
                    <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="sr-only" />
                  </label>
                </div>
              </div>
            </SectionCard>

            {/* ─── Section 2: Front-end demo ─── */}
            <SectionCard title="Démo Front-End (Ce que voit le visiteur)" icon="video" accent="emerald">
              <p className="text-xs text-gray-600 mb-5 leading-relaxed">
                Montrez uniquement le résultat visuel du workflow. L&apos;architecture interne n8n reste cachée au visiteur.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="md:col-span-2">
                  <FieldLabel>Fichier vidéo démo (chemin local ou URL mp4)</FieldLabel>
                  <div className="flex gap-2">
                    <FieldInput type="text" placeholder="/videos/hero-workflow.mp4" value={demoVideo} onChange={(e) => setDemoVideo(e.target.value)} />
                    <button type="button" onClick={() => setPreviewVideo(demoVideo)}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600/80 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors flex-shrink-0 flex items-center gap-1.5">
                      <Icon name="video" className="w-3.5 h-3.5" />
                      Tester
                    </button>
                  </div>
                  <div className="mt-2.5 flex items-center gap-2 text-[11px] text-gray-600">
                    <span>Vidéos locales :</span>
                    {["/videos/hero-workflow.mp4", "/videos/cta-canvas.mp4"].map((v) => (
                      <button key={v} type="button" onClick={() => setDemoVideo(v)}
                        className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2 transition-colors">
                        {v.split("/").pop()}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-full aspect-video bg-[#0a0a12] border border-[#252535] rounded-xl overflow-hidden relative flex items-center justify-center">
                    <Icon name="video" className="w-8 h-8 text-gray-700" />
                    <span className="text-[10px] text-gray-700 absolute bottom-2">Aperçu ici</span>
                  </div>
                </div>
              </div>
            </SectionCard>

            {/* ─── Section 3: Protected JSON ─── */}
            <SectionCard title="Fichier Source Backend n8n (Strictement Protégé)" icon="lock" accent="amber" badge="CONFIDENTIEL">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Collez votre JSON exporté depuis n8n. Ce fichier est inaccessible aux visiteurs et livré uniquement après achat.
              </p>
              <div className="relative">
                <FieldTextarea
                  rows={7}
                  placeholder={`{\n  "name": "Mon Workflow Sécurisé",\n  "nodes": [...],\n  "connections": {...}\n}`}
                  value={n8nJsonProtected}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className={`font-mono text-xs ${jsonError ? "border-red-500 focus:border-red-500" : ""}`}
                />
                {n8nJsonProtected.trim() && !jsonError && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                    <Icon name="check" className="w-3 h-3 text-emerald-400" />
                    <span className="text-[10px] text-emerald-400 font-semibold">JSON valide</span>
                  </div>
                )}
              </div>
              {jsonError && (
                <p className="text-xs text-red-400 mt-2.5 flex items-center gap-1.5">
                  <Icon name="alert" className="w-3.5 h-3.5 flex-shrink-0" />
                  {jsonError}
                </p>
              )}
            </SectionCard>

            {/* ─── Submit ─── */}
            <div className="flex items-center justify-between pt-2">
              <button type="button" onClick={resetForm}
                className="px-5 py-3 rounded-xl border border-[#252535] text-gray-500 hover:text-white hover:bg-[#13131f] hover:border-[#353550] text-sm font-medium transition-all">
                Réinitialiser le formulaire
              </button>
              <button type="submit"
                className="btn-shine px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center gap-2.5 active:scale-[0.99]">
                <Icon name={editingId ? "edit" : "plus"} className="w-4 h-4" />
                {editingId ? "Enregistrer les modifications" : "Publier le workflow"}
              </button>
            </div>
          </form>
        )}

        {/* ══════════ TAB 3: SECURITY ══════════ */}
        {activeTab === "security" && (
          <div className="space-y-6">
            <div className="bg-[#0f0f1a] border border-[#1e1e2e] rounded-3xl p-8 sm:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-bold uppercase tracking-wider mb-6">
                <Icon name="shield" className="w-3.5 h-3.5" />
                Protection de Propriété Intellectuelle
              </div>

              <h2 className="text-3xl font-extrabold text-white mb-3">
                Pourquoi et comment protéger vos workflows ?
              </h2>
              <p className="text-gray-500 text-sm mb-8 max-w-xl">
                FlowMarket sépare strictement la démonstration visuelle accessible au public du fichier source n8n réservé aux acheteurs.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20">
                  <div className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
                    <Icon name="x" className="w-4 h-4" />
                    Mauvaise pratique — À éviter
                  </div>
                  <ul className="text-xs text-gray-500 space-y-2.5 list-none">
                    {[
                      "Afficher l'arbre de nœuds JSON en clair dans le navigateur",
                      "Exposer les webhooks ou endpoints dans le code source",
                      "Permettre de copier la logique sans achat",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-red-500 mt-0.5 flex-shrink-0">✕</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4" />
                    Bonne pratique — Ce que nous faisons
                  </div>
                  <ul className="text-xs text-gray-400 space-y-2.5 list-none">
                    {[
                      "Front-End : vidéo du résultat visible par tous",
                      "Aperçu Canvas : flouté avec cadenas de protection",
                      "JSON Source : livré uniquement après paiement",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <button onClick={() => setActiveTab("new")}
                  className="btn-shine px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm hover:shadow-lg transition-all inline-flex items-center gap-2">
                  <Icon name="plus" className="w-4 h-4" />
                  Ajouter un workflow sécurisé
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cookieBannerEnter {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        option { background: #0f0f1a; }
      `}</style>
    </div>
  );
}
