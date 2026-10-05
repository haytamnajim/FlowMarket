"use client";

import { useState, useEffect, useMemo, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, Workflow } from "@/data/workflows";
import { getAllStoredWorkflows, saveWorkflow, deleteWorkflow } from "@/data/workflowStore";

export default function AdminPage() {
  const [workflowsList, setWorkflowsList] = useState<Workflow[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "new" | "security">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("marketing");
  const [complexity, setComplexity] = useState<"Débutant" | "Intermédiaire" | "Avancé">("Débutant");
  const [price, setPrice] = useState(29);
  const [nodes, setNodes] = useState(12);
  const [demoVideo, setDemoVideo] = useState("/videos/hero-workflow.mp4");
  const [n8nJsonProtected, setN8nJsonProtected] = useState("");
  const [tags, setTags] = useState("n8n, automatisation, productivité");
  const [isFeatured, setIsFeatured] = useState(false);
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Load workflows on mount and listen to changes
  const loadWorkflows = () => {
    setWorkflowsList(getAllStoredWorkflows());
  };

  useEffect(() => {
    loadWorkflows();
    window.addEventListener("flowmarket_workflows_changed", loadWorkflows);
    return () => window.removeEventListener("flowmarket_workflows_changed", loadWorkflows);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Auto slug from title
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      const generatedSlug = val
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setSlug(generatedSlug);
    }
  };

  // Validate JSON
  const handleJsonChange = (val: string) => {
    setN8nJsonProtected(val);
    if (!val.trim()) {
      setJsonError(null);
      return;
    }
    try {
      JSON.parse(val);
      setJsonError(null);
    } catch {
      setJsonError("Format JSON n8n invalide");
    }
  };

  const handleEdit = (w: Workflow) => {
    setEditingId(w.id);
    setTitle(w.title);
    setSlug(w.slug);
    setDescription(w.description);
    setLongDescription(w.longDescription || "");
    setCategory(w.category);
    setComplexity(w.complexity);
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
    setEditingId(null);
    setTitle("");
    setSlug("");
    setDescription("");
    setLongDescription("");
    setCategory("marketing");
    setComplexity("Débutant");
    setPrice(29);
    setNodes(12);
    setDemoVideo("/videos/hero-workflow.mp4");
    setN8nJsonProtected("");
    setTags("n8n, automatisation, productivité");
    setIsFeatured(false);
    setJsonError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) {
      showToast("❌ Veuillez renseigner le titre et le slug.");
      return;
    }

    if (jsonError) {
      showToast("❌ Corrigez l'erreur dans le JSON n8n.");
      return;
    }

    const workflowData: Workflow = {
      id: editingId || `custom-${Date.now()}`,
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      category,
      complexity,
      price: Number(price),
      nodes: Number(nodes),
      demoVideo: demoVideo.trim(),
      n8nJsonProtected: n8nJsonProtected.trim() || JSON.stringify({ name: title, nodes: [], connections: {} }),
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: `/workflows/${category}.png`,
      rating: 5.0,
      reviews: 1,
      downloads: 0,
      featured: isFeatured,
      createdAt: new Date().toISOString().split("T")[0],
    };

    saveWorkflow(workflowData);
    showToast(editingId ? "Workflow mis à jour avec succès !" : "Nouveau workflow ajouté et sécurisé !");
    resetForm();
    setActiveTab("list");
  };

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${title}" ?`)) {
      deleteWorkflow(id);
      showToast("Workflow supprimé.");
    }
  };

  // Filtered workflows
  const filtered = useMemo(() => {
    return workflowsList.filter((w) => {
      const matchQuery =
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchCat = selectedCategory === "all" || w.category === selectedCategory;
      return matchQuery && matchCat;
    });
  }, [workflowsList, searchQuery, selectedCategory]);

  // Key stats
  const totalWorkflows = workflowsList.length;
  const totalDownloads = workflowsList.reduce((acc, w) => acc + (w.downloads || 0), 0);
  const avgPrice = Math.round(workflowsList.reduce((acc, w) => acc + w.price, 0) / (totalWorkflows || 1));
  const protectedCount = workflowsList.filter((w) => w.demoVideo || w.n8nJsonProtected).length;

  return (
    <div className="min-h-screen bg-[#07070c] text-white pt-24 pb-20">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161624] border border-indigo-500/50 text-white px-5 py-3 rounded-xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-slide-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#111118] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-[#2a2a3a]">
              <span className="text-sm font-semibold flex items-center gap-2 text-indigo-400">
                <Icon name="bolt" className="w-4 h-4" />
                Aperçu Démo Vidéo Front-End
              </span>
              <button
                onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 rounded-full bg-[#1e1e2d] hover:bg-[#2a2a3e] flex items-center justify-center text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video src={previewVideo} controls autoPlay className="w-full h-full object-cover" />
            </div>
            <div className="p-4 text-xs text-gray-400 text-center bg-[#0a0a0f] flex items-center justify-center gap-2">
              <Icon name="lock" className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span>L&apos;acheteur voit uniquement cette démonstration du résultat. Votre fichier source n8n reste 100% protégé.</span>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-[#2a2a3a]/80">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Icon name="shield" className="w-3.5 h-3.5" />
              Espace Administrateur • FlowMarket
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Gestionnaire de <span className="gradient-text">Workflows</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Ajoutez des templates, protégez vos codes sources et configurez les vidéos de démo front-end.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/workflows"
              className="px-4 py-2.5 rounded-xl border border-[#2a2a3a] hover:bg-[#161622] text-sm text-gray-300 font-medium transition-colors"
            >
              Voir le catalogue public →
            </Link>
            <button
              onClick={() => {
                resetForm();
                setActiveTab("new");
              }}
              className="btn-shine px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-sm font-semibold hover:shadow-lg hover:shadow-indigo-500/20 transition-all flex items-center gap-2"
            >
              <Icon name="plus" className="w-4 h-4" />
              Nouveau workflow
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between text-gray-400 text-xs font-medium uppercase mb-2">
              <span>Workflows Totaux</span>
              <Icon name="bolt" className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-3xl font-extrabold text-white">{totalWorkflows}</div>
            <span className="text-xs text-gray-500 mt-1 block">Catalogue actif</span>
          </div>

          <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between text-gray-400 text-xs font-medium uppercase mb-2">
              <span>Téléchargements</span>
              <Icon name="download" className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-400">
              {totalDownloads.toLocaleString()}
            </div>
            <span className="text-xs text-gray-500 mt-1 block">Cumul des imports</span>
          </div>

          <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl p-5">
            <div className="flex items-center justify-between text-gray-400 text-xs font-medium uppercase mb-2">
              <span>Prix Moyen</span>
              <Icon name="star" className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-extrabold text-amber-400">{avgPrice} €</div>
            <span className="text-xs text-gray-500 mt-1 block">Par workflow</span>
          </div>

          <div className="bg-[#111118] border border-emerald-500/30 rounded-2xl p-5 relative overflow-hidden">
            <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase mb-2">
              <span>Backend Sécurisé</span>
              <Icon name="shield" className="w-4 h-4" />
            </div>
            <div className="text-3xl font-extrabold text-white">100%</div>
            <span className="text-xs text-emerald-400/80 mt-1 block">
              {protectedCount} démos configurées
            </span>
          </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center gap-2 border-b border-[#2a2a3a] mb-8">
          <button
            onClick={() => setActiveTab("list")}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "list"
                ? "border-indigo-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <Icon name="bolt" className="w-4 h-4" />
            Liste des workflows ({workflowsList.length})
          </button>
          <button
            onClick={() => setActiveTab("new")}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "new"
                ? "border-indigo-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <Icon name="plus" className="w-4 h-4" />
            {editingId ? "Modifier le workflow" : "Ajouter un workflow"}
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-5 py-3 font-medium text-sm border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === "security"
                ? "border-emerald-500 text-emerald-400"
                : "border-transparent text-gray-400 hover:text-gray-200"
            }`}
          >
            <Icon name="shield" className="w-4 h-4" />
            Principe de sécurité (Démo Front vs Backend)
          </button>
        </div>

        {/* ── TAB 1: Workflows List ── */}
        {activeTab === "list" && (
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-6">
              <div className="relative w-full sm:w-80">
                <input
                  type="text"
                  placeholder="Rechercher un workflow..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3a] rounded-xl px-4 py-2.5 pl-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                />
                <Icon name="search" className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#111118] border border-[#2a2a3a] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#111118] border border-[#2a2a3a] rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-[#0a0a10] border-b border-[#2a2a3a] text-xs uppercase text-gray-400">
                    <tr>
                      <th className="py-4 px-6">Workflow</th>
                      <th className="py-4 px-6">Catégorie</th>
                      <th className="py-4 px-6">Prix</th>
                      <th className="py-4 px-6">Difficulté</th>
                      <th className="py-4 px-6">Sécurité / Démo</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2a3a]/60">
                    {filtered.map((w) => (
                      <tr key={w.id} className="hover:bg-[#161622]/60 transition-colors">
                        <td className="py-4 px-6">
                          <div className="font-semibold text-white">{w.title}</div>
                          <div className="text-xs text-gray-500 font-mono mt-0.5">/{w.slug}</div>
                        </td>
                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                            {w.category}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-bold text-white">
                            {w.price === 0 ? "Gratuit" : `${w.price} €`}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <span className="text-xs text-gray-400">{w.complexity}</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            {w.demoVideo ? (
                              <button
                                onClick={() => setPreviewVideo(w.demoVideo || "/videos/hero-workflow.mp4")}
                                className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium flex items-center gap-1.5 hover:bg-emerald-500/20 transition-colors"
                              >
                                <Icon name="video" className="w-3.5 h-3.5" />
                                <span>Démo Front</span>
                              </button>
                            ) : (
                              <span className="text-xs text-gray-600">Pas de démo</span>
                            )}
                            <span className="text-xs text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20 flex items-center gap-1">
                              <Icon name="lock" className="w-3 h-3 text-indigo-400" />
                              <span>JSON Protégé</span>
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/workflows/${w.slug}`}
                              target="_blank"
                              className="p-2 rounded-lg bg-[#1e1e2d] hover:bg-indigo-600/30 text-gray-300 hover:text-white transition-colors"
                              title="Voir la page publique"
                            >
                              <Icon name="eye" className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => handleEdit(w)}
                              className="p-2 rounded-lg bg-[#1e1e2d] hover:bg-amber-600/30 text-gray-300 hover:text-white transition-colors"
                              title="Modifier"
                            >
                              <Icon name="edit" className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(w.id, w.title)}
                              className="p-2 rounded-lg bg-[#1e1e2d] hover:bg-red-600/30 text-red-400 hover:text-red-300 transition-colors"
                              title="Supprimer"
                            >
                              <Icon name="trash" className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-gray-500">
                          Aucun workflow trouvé avec ces critères.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: Add / Edit Workflow Form ── */}
        {activeTab === "new" && (
          <div className="bg-[#111118] border border-[#2a2a3a] rounded-3xl p-6 sm:p-10 shadow-2xl">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#2a2a3a]">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {editingId ? "Modifier le workflow" : "Créer un nouveau workflow"}
                </h2>
                <p className="text-sm text-gray-400 mt-1">
                  Les visiteurs verront la vidéo de démo front-end. Le code JSON backend reste masqué.
                </p>
              </div>
              {editingId && (
                <button
                  onClick={resetForm}
                  className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-[#2a2a3a]"
                >
                  Annuler l&apos;édition
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Section 1: Infos Publiques */}
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-indigo-400 mb-4 flex items-center gap-2">
                  <span>1. Informations Publiques (Ce que voient les visiteurs)</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Titre du workflow *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Prospection LinkedIn Automatisée avec IA"
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Slug URL *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="prospection-linkedin-ia"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Catégorie
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Difficulté
                    </label>
                    <select
                      value={complexity}
                      onChange={(e) => setComplexity(e.target.value as any)}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Débutant">Débutant (Configuration en 5 min)</option>
                      <option value="Intermédiaire">Intermédiaire (Nécessite API keys)</option>
                      <option value="Avancé">Avancé (Webhooks complexes & scripts)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Prix (€) — 0 pour Gratuit
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Nombre de nœuds n8n
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={nodes}
                      onChange={(e) => setNodes(Number(e.target.value))}
                      className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Description courte (accroche pour la carte)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Générez des leads qualifiés chaque jour avec n8n et GPT-4..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="mt-6">
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                    Tags (séparés par des virgules)
                  </label>
                  <input
                    type="text"
                    placeholder="linkedin, prospection, ia, crm, notion"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Section 2: Démo Front-End */}
              <div className="p-6 rounded-2xl bg-[#0a0a10] border border-indigo-500/20">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-2">
                  <Icon name="video" className="w-4 h-4 text-emerald-400" />
                  <span>2. Démo Front-End (Ce que démarre le visiteur)</span>
                </h3>
                <p className="text-xs text-gray-400 mb-6">
                  Présentez uniquement la vidéo du résultat (l&apos;effet visuel produit pour l&apos;utilisateur). L&apos;architecture interne n8n reste cachée.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                      Fichier vidéo démo (chemin local ou URL externe)
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="/videos/hero-workflow.mp4 ou lien mp4 / Loom"
                        value={demoVideo}
                        onChange={(e) => setDemoVideo(e.target.value)}
                        className="flex-1 bg-[#111118] border border-[#2a2a3a] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => setPreviewVideo(demoVideo)}
                        className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs font-semibold text-white transition-colors"
                      >
                        Tester démo
                      </button>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                      <span>Vidéos locales suggérées :</span>
                      <button
                        type="button"
                        onClick={() => setDemoVideo("/videos/hero-workflow.mp4")}
                        className="text-indigo-400 hover:underline"
                      >
                        hero-workflow.mp4
                      </button>
                      <span>•</span>
                      <button
                        type="button"
                        onClick={() => setDemoVideo("/videos/cta-canvas.mp4")}
                        className="text-indigo-400 hover:underline"
                      >
                        cta-canvas.mp4
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isFeatured}
                        onChange={(e) => setIsFeatured(e.target.checked)}
                        className="w-5 h-5 rounded border-[#2a2a3a] text-indigo-600 focus:ring-indigo-500 bg-[#0a0a0f]"
                      />
                      <div>
                        <span className="text-sm font-semibold text-white block">Mettre en avant</span>
                        <span className="text-xs text-gray-500">Afficher dans le carrousel d&apos;accueil</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Section 3: Backend n8n Protégé */}
              <div className="p-6 rounded-2xl bg-[#0a0a10] border border-amber-500/20">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-2">
                    <Icon name="lock" className="w-4 h-4 text-amber-400" />
                    <span>3. Fichier Source Backend n8n (Strictement Protégé)</span>
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                    Confidentiel
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-4">
                  Collez le code JSON de votre workflow exporté depuis n8n. Ce code est inaccessible aux simples visiteurs et ne sera délivré qu&apos;aux utilisateurs ayant acquis la licence.
                </p>

                <textarea
                  rows={6}
                  placeholder={`{\n  "name": "Mon Workflow Sécurisé",\n  "nodes": [...],\n  "connections": {...}\n}`}
                  value={n8nJsonProtected}
                  onChange={(e) => handleJsonChange(e.target.value)}
                  className={`w-full font-mono text-xs bg-[#111118] border ${
                    jsonError ? "border-red-500" : "border-[#2a2a3a]"
                  } rounded-xl p-4 text-gray-300 focus:outline-none focus:border-amber-500`}
                />
                {jsonError && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1.5">
                    <Icon name="alert" className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
                    <span>{jsonError}</span>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 pt-4 border-t border-[#2a2a3a]">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 rounded-xl border border-[#2a2a3a] text-gray-400 hover:text-white hover:bg-[#1a1a24] text-sm font-medium transition-colors"
                >
                  Réinitialiser
                </button>
                <button
                  type="submit"
                  className="btn-shine px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-semibold text-sm hover:shadow-xl hover:shadow-indigo-500/25 transition-all"
                >
                  {editingId ? "Enregistrer les modifications" : "Publier le workflow"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── TAB 3: Security Explanation ── */}
        {activeTab === "security" && (
          <div className="bg-[#111118] border border-emerald-500/20 rounded-3xl p-8 sm:p-12 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-6">
              <Icon name="shield" className="w-4 h-4" />
              Bonne Pratique Marketplace • Protection de Propriété Intellectuelle
            </div>

            <h2 className="text-3xl font-extrabold text-white mb-6">
              Pourquoi et comment nous protégeons vos workflows n8n ?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="p-6 rounded-2xl bg-[#0a0a10] border border-red-500/20">
                <div className="text-red-400 font-bold text-base mb-2 flex items-center gap-2">
                  <Icon name="x" className="w-4 h-4 text-red-400" />
                  <span>Ce qu&apos;il ne faut JAMAIS faire (Mauvaise pratique)</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Afficher l&apos;arbre de nœuds JSON en clair ou permettre d&apos;inspecter les webhooks/endpoints dans le navigateur.
                </p>
                <ul className="text-xs text-gray-500 space-y-2 list-disc pl-4">
                  <li>Les visiteurs peuvent copier la logique sans rien payer.</li>
                  <li>Vos tokens d&apos;API ou formules complexes sont exposés.</li>
                  <li>Perte de toute la valeur de votre travail d&apos;ingénierie n8n.</li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-[#0a0a10] border border-emerald-500/20">
                <div className="text-emerald-400 font-bold text-base mb-2 flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  <span>Ce que nous avons mis en place (Bonne pratique)</span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Une séparation stricte entre la <strong>Démo Visuelle Front-End</strong> et le <strong>JSON Source Backend</strong>.
                </p>
                <ul className="text-xs text-gray-400 space-y-2 list-disc pl-4">
                  <li><strong>Front-End :</strong> Une vidéo nette démontrant le résultat utilisateur.</li>
                  <li><strong>Aperçu Canvas :</strong> Flouté avec un cadenas de protection sécurisé.</li>
                  <li><strong>Livraison JSON :</strong> Uniquement après paiement ou confirmation de licence.</li>
                </ul>
              </div>
            </div>

            <div className="text-center pt-6 border-t border-[#2a2a3a]">
              <button
                onClick={() => setActiveTab("new")}
                className="btn-shine px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-semibold text-sm hover:shadow-lg transition-all"
              >
                Ajouter un workflow sécurisé maintenant →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
