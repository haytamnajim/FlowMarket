"use client";

import { useState, useEffect, useMemo, type FormEvent } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { categories, Workflow } from "@/data/workflows";
import { getAllStoredWorkflows, saveWorkflow, deleteWorkflow } from "@/data/workflowStore";
import { getCurrentAdmin, logOutAdmin, AdminUser, uploadWorkflowFile, STORAGE_BUCKETS } from "@/lib/supabase";

/* ─────────────────────── constants ─────────────────────── */

const COMPLEXITY_CONFIG = {
  Débutant: {
    color: "emerald",
    dot: "#10b981",
    bg: "bg-emerald-500/10 border-emerald-500/25",
    text: "text-emerald-400",
    hint: "5 min · Prêt à l'emploi",
  },
  Intermédiaire: {
    color: "amber",
    dot: "#f59e0b",
    bg: "bg-amber-500/10 border-amber-500/25",
    text: "text-amber-400",
    hint: "API keys requises",
  },
  Avancé: {
    color: "rose",
    dot: "#f43f5e",
    bg: "bg-rose-500/10 border-rose-500/25",
    text: "text-rose-400",
    hint: "Webhooks & scripts",
  },
} as const;

type Complexity = keyof typeof COMPLEXITY_CONFIG;

const CATEGORY_COLORS: Record<string, string> = {
  marketing: "#6366f1",
  finance: "#10b981",
  productivity: "#f59e0b",
  ecommerce: "#f43f5e",
  ai: "#a855f7",
  dev: "#06b6d4",
  hr: "#ec4899",
  social: "#3b82f6",
};

/* ─────────────────── sub-components ────────────────────── */

function StatCard({
  label, value, icon, trend, accent,
}: {
  label: string; value: string | number; icon: string; trend?: string; accent: string;
}) {
  return (
    <div className="relative bg-[#0d0d18] border border-[#1e1e2e] rounded-2xl p-5 overflow-hidden group hover:border-[#2e2e45] transition-all duration-300">
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 80% 20%, ${accent}08, transparent 60%)` }}
      />
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{label}</span>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
            <Icon name={icon} className="w-4 h-4" style={{ color: accent } as React.CSSProperties} />
          </div>
        </div>
        <div className="text-3xl font-extrabold text-white mb-1">{value}</div>
        {trend && <div className="text-[11px] text-gray-600">{trend}</div>}
      </div>
    </div>
  );
}

function CategoryDot({ category }: { category: string }) {
  const color = CATEGORY_COLORS[category] || "#6366f1";
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border"
      style={{ background: `${color}12`, borderColor: `${color}30`, color }}
    >
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color }} />
      {category}
    </span>
  );
}

function EmptyState({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="py-20 flex flex-col items-center justify-center gap-5 text-center">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/8 border border-indigo-500/15 flex items-center justify-center">
        <Icon name="bolt" className="w-9 h-9 text-indigo-400/50" />
      </div>
      <div>
        <p className="text-white font-semibold text-base mb-1">Aucun workflow trouvé</p>
        <p className="text-gray-600 text-sm">Modifiez votre recherche ou créez un premier workflow.</p>
      </div>
      <button onClick={onAdd}
        className="px-5 py-2.5 rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-sm font-semibold hover:bg-indigo-500/25 transition-colors flex items-center gap-2">
        <Icon name="plus" className="w-4 h-4" />
        Créer un workflow
      </button>
    </div>
  );
}

function StepBadge({ n, label, active }: { n: number; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 transition-opacity ${active ? "opacity-100" : "opacity-40"}`}>
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${active ? "bg-indigo-500 text-white" : "bg-[#1e1e2e] text-gray-500"}`}>{n}</div>
      <span className={`text-xs font-semibold ${active ? "text-white" : "text-gray-600"}`}>{label}</span>
    </div>
  );
}

function SectionCard({ title, icon, step, accent = "indigo", badge, children }: {
  title: string; icon: string; step: number; accent?: "indigo" | "emerald" | "amber"; badge?: string; children: React.ReactNode;
}) {
  const map = {
    indigo: { border: "border-indigo-500/20", text: "text-indigo-400", bg: "from-indigo-500/5" },
    emerald: { border: "border-emerald-500/20", text: "text-emerald-400", bg: "from-emerald-500/5" },
    amber: { border: "border-amber-500/20", text: "text-amber-400", bg: "from-amber-500/5" },
  }[accent];

  return (
    <div className={`rounded-2xl border ${map.border} bg-gradient-to-br ${map.bg} to-transparent overflow-hidden`}>
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className={`w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center`}>
            <span className="text-xs font-bold text-gray-500">{step}</span>
          </div>
          <Icon name={icon} className={`w-4 h-4 ${map.text}`} />
          <span className={`text-xs font-bold uppercase tracking-widest ${map.text}`}>{title}</span>
        </div>
        {badge && (
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono font-bold tracking-widest">
            {badge}
          </span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function FieldLabel({ children, required, hint }: { children: React.ReactNode; required?: boolean; hint?: string }) {
  return (
    <label className="block mb-2">
      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
        {children}
        {required && <span className="text-indigo-400 ml-1">*</span>}
      </span>
      {hint && <span className="ml-2 text-[10px] text-gray-700 normal-case font-normal">{hint}</span>}
    </label>
  );
}

const inputBase = "w-full bg-[#080812] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all";

/* ──────────────────────── page ─────────────────────────── */

export default function AdminPage() {
  const [workflowsList, setWorkflowsList] = useState<Workflow[]>([]);
  const [activeTab, setActiveTab] = useState<"list" | "new" | "security">("list");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [previewVideo, setPreviewVideo] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; title: string } | null>(null);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [showWelcomeAlert, setShowWelcomeAlert] = useState<boolean>(false);

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
  const [isSaving, setIsSaving] = useState(false);

  /* File upload state */
  const [jsonFile, setJsonFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [jsonFileName, setJsonFileName] = useState<string | null>(null);

  const loadWorkflows = () => setWorkflowsList(getAllStoredWorkflows());

  useEffect(() => {
    loadWorkflows();
    window.addEventListener("flowmarket_workflows_changed", loadWorkflows);

    // Supabase Admin Session check
    getCurrentAdmin().then((admin) => {
      const activeAdmin = admin || {
        id: "default-admin",
        email: "admin@flowmarket.fr",
        name: "Haitam",
        role: "ADMIN",
      };
      setAdminUser(activeAdmin);

      // Check if arriving from login or initial visit to show greeting
      if (typeof window !== "undefined") {
        const justLoggedIn = sessionStorage.getItem("flowmarket_just_logged_in");
        if (justLoggedIn) {
          setShowWelcomeAlert(true);
          sessionStorage.removeItem("flowmarket_just_logged_in");
          setTimeout(() => setShowWelcomeAlert(false), 6000);
        }
      }
    });

    const handleAuthChange = () => {
      getCurrentAdmin().then((admin) => {
        if (admin) setAdminUser(admin);
      });
    };
    window.addEventListener("flowmarket_auth_changed", handleAuthChange);

    return () => {
      window.removeEventListener("flowmarket_workflows_changed", loadWorkflows);
      window.removeEventListener("flowmarket_auth_changed", handleAuthChange);
    };
  }, []);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToastMessage(msg); setToastType(type);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(val.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, ""));
    }
  };

  const handleJsonChange = (val: string) => {
    setN8nJsonProtected(val);
    if (!val.trim()) { setJsonError(null); return; }
    try { JSON.parse(val); setJsonError(null); } catch { setJsonError("JSON invalide — vérifiez la syntaxe"); }
  };

  const handleEdit = (w: Workflow) => {
    setEditingId(w.id); setTitle(w.title); setSlug(w.slug); setDescription(w.description);
    setLongDescription(w.longDescription || ""); setCategory(w.category);
    setComplexity(w.complexity as Complexity); setPrice(w.price); setNodes(w.nodes);
    setDemoVideo(w.demoVideo || "/videos/hero-workflow.mp4");
    setN8nJsonProtected(w.n8nJsonProtected || ""); setTags(w.tags.join(", ")); setIsFeatured(w.featured);
    setActiveTab("new"); window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null); setTitle(""); setSlug(""); setDescription(""); setLongDescription("");
    setCategory("marketing"); setComplexity("Débutant"); setPrice(29); setNodes(12);
    setDemoVideo("/videos/hero-workflow.mp4"); setN8nJsonProtected("");
    setTags("n8n, automatisation, productivité"); setIsFeatured(false); setJsonError(null);
    setJsonFile(null); setVideoFile(null); setCoverFile(null);
    setCoverPreview(null); setVideoPreview(null); setJsonFileName(null);
    setUploadProgress({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !slug.trim()) { showToast("Titre et slug obligatoires.", "error"); return; }
    if (jsonError) { showToast("Corrigez le JSON n8n.", "error"); return; }

    const workflowId = editingId || `custom-${Date.now()}`;
    setIsSaving(true);
    setUploadProgress({});

    // Upload files in parallel
    const uploads: Promise<{ key: string; result: Awaited<ReturnType<typeof uploadWorkflowFile>> }>[] = [];

    if (jsonFile) {
      uploads.push(
        uploadWorkflowFile(jsonFile, STORAGE_BUCKETS.WORKFLOW_JSON, workflowId).then((result) => ({
          key: "json",
          result,
        }))
      );
    }

    if (videoFile) {
      uploads.push(
        uploadWorkflowFile(videoFile, STORAGE_BUCKETS.WORKFLOW_VIDEO, workflowId).then((result) => ({
          key: "video",
          result,
        }))
      );
    }

    if (coverFile) {
      uploads.push(
        uploadWorkflowFile(coverFile, STORAGE_BUCKETS.WORKFLOW_COVER, workflowId).then((result) => ({
          key: "cover",
          result,
        }))
      );
    }

    const uploadResults = await Promise.all(uploads);

    // Check for errors
    for (const { key, result } of uploadResults) {
      if (result.error) {
        setIsSaving(false);
        showToast(`Erreur upload ${key} : ${result.error}`, "error");
        return;
      }
      setUploadProgress((prev) => ({ ...prev, [key]: 100 }));
    }

    // Determine final URLs (uploaded or existing)
    const finalDemoVideo = uploadResults.find((u) => u.key === "video")?.result.url || demoVideo.trim();
    const finalJsonProtected = uploadResults.find((u) => u.key === "json")?.result.url || n8nJsonProtected.trim() || JSON.stringify({ name: title, nodes: [], connections: {} });
    const finalCoverImage = uploadResults.find((u) => u.key === "cover")?.result.url || `/workflows/${category}.png`;

    const workflowData: Workflow = {
      id: workflowId,
      title: title.trim(),
      slug: slug.trim(),
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      category,
      complexity: complexity as Workflow["complexity"],
      price: Number(price),
      nodes: Number(nodes),
      demoVideo: finalDemoVideo,
      n8nJsonProtected: finalJsonProtected,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      image: finalCoverImage,
      rating: 5.0,
      reviews: 1,
      downloads: 0,
      featured: isFeatured,
      createdAt: editingId
        ? (workflowsList.find((w) => w.id === editingId)?.createdAt || new Date().toISOString().split("T")[0])
        : new Date().toISOString().split("T")[0],
    };

    saveWorkflow(workflowData);
    setIsSaving(false);
    showToast(editingId ? "✅ Workflow mis à jour avec succès !" : "🚀 Nouveau workflow publié !");
    resetForm();
    setActiveTab("list");
  };

  const handleDelete = (id: string, wTitle: string) => setDeleteConfirm({ id, title: wTitle });
  const confirmDelete = () => {
    if (!deleteConfirm) return;
    deleteWorkflow(deleteConfirm.id);
    showToast("Workflow supprimé.");
    setDeleteConfirm(null);
  };

  const filtered = useMemo(() =>
    workflowsList.filter((w) => {
      const q = searchQuery.toLowerCase();
      return (w.title.toLowerCase().includes(q) || w.description.toLowerCase().includes(q) || w.tags.some((t) => t.toLowerCase().includes(q)))
        && (selectedCategory === "all" || w.category === selectedCategory);
    }),
    [workflowsList, searchQuery, selectedCategory]
  );

  const stats = [
    { label: "Workflows actifs", value: workflowsList.length, icon: "bolt", accent: "#6366f1", trend: "dans le catalogue" },
    { label: "Téléchargements", value: workflowsList.reduce((a, w) => a + (w.downloads || 0), 0).toLocaleString(), icon: "download", accent: "#10b981", trend: "cumul total" },
    { label: "Prix moyen", value: `${Math.round(workflowsList.reduce((a, w) => a + w.price, 0) / (workflowsList.length || 1))} €`, icon: "star", accent: "#f59e0b", trend: "par workflow" },
    { label: "Démos configurées", value: `${workflowsList.filter((w) => w.demoVideo || w.n8nJsonProtected).length}/${workflowsList.length}`, icon: "shield", accent: "#a855f7", trend: "protection active" },
  ];

  const tabs = [
    { id: "list" as const, label: `Workflows`, count: workflowsList.length, icon: "bolt" },
    { id: "new" as const, label: editingId ? "Modifier" : "Ajouter", icon: "plus" },
    { id: "security" as const, label: "Sécurité", icon: "shield" },
  ];

  return (
    <div className="min-h-screen text-white" style={{ background: "radial-gradient(ellipse at 20% 0%, #0d0a1f 0%, #07070d 50%)" }}>

      {/* ── Delete Confirm Modal ── */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0f0f1a] border border-red-500/20 rounded-2xl p-8 max-w-md w-full shadow-2xl" style={{ animation: "cookieBannerEnter 0.25s ease" }}>
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
              <Icon name="trash" className="w-6 h-6 text-red-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Supprimer ce workflow ?</h3>
            <p className="text-sm text-gray-500 mb-6">
              <span className="text-white font-semibold">&ldquo;{deleteConfirm.title}&rdquo;</span> sera définitivement supprimé. Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setDeleteConfirm(null)}
                className="flex-1 py-2.5 rounded-xl border border-[#2a2a3a] text-gray-400 hover:text-white text-sm font-medium transition-colors">
                Annuler
              </button>
              <button onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-bold transition-colors">
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Toast ── */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 text-sm font-medium border ${
            toastType === "success"
              ? "bg-[#0f0f1e] border-indigo-500/30 text-white shadow-indigo-500/10"
              : "bg-[#160a0a] border-red-500/30 text-red-300 shadow-red-500/10"
          }`}
          style={{ animation: "cookieBannerEnter 0.3s ease" }}>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── Video Preview Modal ── */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-3xl bg-[#0f0f1a] border border-[#2a2a3a] rounded-3xl overflow-hidden shadow-2xl" style={{ animation: "cookieBannerEnter 0.25s ease" }}>
            <div className="flex items-center justify-between p-4 border-b border-[#1e1e2e]">
              <span className="text-sm font-semibold flex items-center gap-2 text-emerald-400">
                <Icon name="video" className="w-4 h-4" /> Aperçu Démo Vidéo Front-End
              </span>
              <button onClick={() => setPreviewVideo(null)}
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-500 hover:text-white transition-colors">
                <Icon name="x" className="w-4 h-4" />
              </button>
            </div>
            <div className="aspect-video bg-black">
              <video src={previewVideo} controls autoPlay className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-[11px] text-gray-600 text-center bg-[#090910] flex items-center justify-center gap-2">
              <Icon name="lock" className="w-3 h-3 text-amber-400 flex-shrink-0" />
              L&apos;acheteur voit uniquement cette démonstration. Votre fichier source n8n reste totalement protégé.
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">

        {/* ── Greeting Alert Floating Card (Shown when admin enters) ── */}
        {showWelcomeAlert && (
          <div className="fixed top-24 right-6 z-50 max-w-sm w-full bg-[#0d0d1a]/95 border border-indigo-500/40 rounded-2xl p-4 shadow-2xl shadow-indigo-500/20 backdrop-blur-xl animate-fadeIn flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
              <Icon name="sparkles" className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">
                  Bonjour {adminUser?.name || "Haitam"} !
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                Ravi de vous revoir. Votre session administrateur Supabase est active et sécurisée.
              </p>
            </div>
            <button
              onClick={() => setShowWelcomeAlert(false)}
              className="text-gray-500 hover:text-white text-xs p-1 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Icon name="x" className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ── Admin Greeting Banner (Supabase Session Bar) ── */}
        <div className="mb-8 p-4 sm:p-5 bg-[#0a0a14] border border-[#1e1e2e] hover:border-indigo-500/30 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 p-0.5 shadow-lg shadow-indigo-500/20 flex-shrink-0">
              <div className="w-full h-full bg-[#0d0d18] rounded-[14px] flex items-center justify-center font-bold text-base text-indigo-400">
                {adminUser?.name ? adminUser.name.charAt(0).toUpperCase() : "A"}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Bonjour <span className="gradient-text">{adminUser?.name || "Haitam"}</span>
                </h2>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Supabase Connecté
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-2">
                <span>{adminUser?.email || "admin@flowmarket.fr"}</span>
                <span>·</span>
                <span>Rôle : Administrateur</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowWelcomeAlert(true)}
              className="px-3 py-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-xs font-semibold text-indigo-400 transition-colors flex items-center gap-1.5"
              title="Afficher le message d'accueil"
            >
              <Icon name="sparkles" className="w-3.5 h-3.5" />
              <span>Message d&apos;accueil</span>
            </button>
            <Link
              href="/login"
              className="px-3 py-2 rounded-xl bg-[#131320] hover:bg-[#1a1a2e] border border-[#202030] text-xs font-semibold text-gray-300 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <Icon name="user" className="w-3.5 h-3.5 text-gray-400" />
              <span>Connexion / Profil</span>
            </Link>
            <button
              onClick={async () => {
                await logOutAdmin();
                window.location.href = "/login";
              }}
              className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-300 hover:text-rose-200 transition-colors flex items-center gap-1.5"
              title="Se déconnecter"
            >
              <Icon name="logOut" className="w-3.5 h-3.5" />
              <span>Déconnexion</span>
            </button>
          </div>
        </div>

        {/* ── Page Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Administrateur · FlowMarket
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-none">
              Gestionnaire de{" "}
              <span className="gradient-text">Workflows</span>
            </h1>
            <p className="text-gray-600 text-sm mt-3 max-w-md leading-relaxed">
              Publiez des templates, protégez vos codes sources et configurez les démonstrations front-end.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/workflows"
              className="px-4 py-2.5 rounded-xl border border-[#1e1e2e] hover:bg-[#131320] hover:border-[#2e2e45] text-sm text-gray-500 hover:text-white font-medium transition-all flex items-center gap-2">
              <Icon name="eye" className="w-4 h-4" />
              Catalogue public
            </Link>
            <button onClick={() => { resetForm(); setActiveTab("new"); }}
              className="btn-shine px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-bold hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex items-center gap-2 active:scale-[0.98]">
              <Icon name="plus" className="w-4 h-4" />
              Nouveau workflow
            </button>
          </div>
        </div>

        {/* ── Stats Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map((s) => <StatCard key={s.label} {...s} />)}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 bg-[#0a0a14] border border-[#1a1a28] rounded-2xl p-1.5 mb-8 w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                  : "text-gray-600 hover:text-gray-300 hover:bg-white/3"
              }`}>
              <Icon name={tab.icon} className="w-4 h-4" />
              {tab.label}
              {"count" in tab && tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                  activeTab === tab.id ? "bg-white/20 text-white" : "bg-[#1e1e2e] text-gray-600"
                }`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* ════════════════ TAB 1: LIST ════════════════ */}
        {activeTab === "list" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
              <div className="relative flex-1 max-w-xs">
                <Icon name="search" className="w-4 h-4 text-gray-700 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Rechercher…" value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`${inputBase} pl-10`} />
              </div>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                className={`${inputBase} w-full sm:w-52`}>
                <option value="all">Toutes les catégories</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>

              {/* Stats summary bar */}
              {filtered.length > 0 && (
                <div className="hidden lg:flex items-center gap-3 ml-auto text-[11px] text-gray-700">
                  <span>{filtered.length} workflow{filtered.length > 1 ? "s" : ""}</span>
                  <span>·</span>
                  <span>{filtered.reduce((a, w) => a + w.price, 0)} € total catalogue</span>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="bg-[#0a0a14] border border-[#1a1a28] rounded-2xl overflow-hidden">
              {filtered.length === 0 ? (
                <EmptyState onAdd={() => { resetForm(); setActiveTab("new"); }} />
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1a1a28]">
                        {["Workflow", "Catégorie", "Prix", "Difficulté", "Sécurité", ""].map((h, i) => (
                          <th key={i} className={`py-3.5 px-5 text-[10px] font-bold uppercase tracking-widest text-gray-700 ${i === 5 ? "text-right" : "text-left"}`}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#13131f]">
                      {filtered.map((w) => {
                        const cc = COMPLEXITY_CONFIG[w.complexity as Complexity] || COMPLEXITY_CONFIG.Débutant;
                        return (
                          <tr key={w.id} className="hover:bg-[#0d0d1a] transition-colors group">
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-[11px] font-black"
                                  style={{ background: `${CATEGORY_COLORS[w.category] || "#6366f1"}15`, color: CATEGORY_COLORS[w.category] || "#6366f1" }}>
                                  {w.title.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <div className="font-semibold text-white text-sm group-hover:text-indigo-300 transition-colors line-clamp-1">{w.title}</div>
                                  <div className="text-[11px] text-gray-700 font-mono">/{w.slug}</div>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-5"><CategoryDot category={w.category} /></td>
                            <td className="py-4 px-5">
                              <span className="font-bold text-sm">
                                {w.price === 0 ? <span className="text-emerald-400">Gratuit</span> : <span className="text-white">{w.price} <span className="text-gray-600 font-normal">€</span></span>}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${cc.bg} ${cc.text}`}>
                                <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cc.dot }} />
                                {w.complexity}
                              </span>
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex items-center gap-2 flex-wrap">
                                {w.demoVideo ? (
                                  <button onClick={() => setPreviewVideo(w.demoVideo!)}
                                    className="px-2 py-1 rounded-lg bg-emerald-500/8 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold flex items-center gap-1 hover:bg-emerald-500/15 transition-colors">
                                    <Icon name="video" className="w-3 h-3" />Démo ▶
                                  </button>
                                ) : (
                                  <span className="text-[11px] text-gray-800 italic">—</span>
                                )}
                                <span className="text-[11px] text-indigo-500 bg-indigo-500/8 px-2 py-0.5 rounded border border-indigo-500/15 flex items-center gap-1">
                                  <Icon name="lock" className="w-3 h-3" />JSON
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-5">
                              <div className="flex items-center justify-end gap-1">
                                <Link href={`/workflows/${w.slug}`} target="_blank"
                                  className="p-2 rounded-lg bg-white/2 hover:bg-white/8 text-gray-700 hover:text-white transition-colors" title="Voir">
                                  <Icon name="eye" className="w-4 h-4" />
                                </Link>
                                <button onClick={() => handleEdit(w)}
                                  className="p-2 rounded-lg bg-white/2 hover:bg-amber-500/15 text-gray-700 hover:text-amber-300 transition-colors" title="Modifier">
                                  <Icon name="edit" className="w-4 h-4" />
                                </button>
                                <button onClick={() => handleDelete(w.id, w.title)}
                                  className="p-2 rounded-lg bg-white/2 hover:bg-red-500/15 text-gray-700 hover:text-red-400 transition-colors" title="Supprimer">
                                  <Icon name="trash" className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                  {/* Table footer */}
                  <div className="border-t border-[#13131f] px-5 py-3 flex items-center justify-between">
                    <span className="text-[11px] text-gray-700">{filtered.length} résultat{filtered.length > 1 ? "s" : ""}</span>
                    <span className="text-[11px] text-gray-700">FlowMarket Admin · v2.0</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ════════════════ TAB 2: FORM ════════════════ */}
        {activeTab === "new" && (
          <div>
            {/* Form header with steps */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-extrabold text-white">
                  {editingId ? "✏️ Modifier le workflow" : "🆕 Créer un workflow"}
                </h2>
                <p className="text-gray-700 text-sm mt-1">Les visiteurs voient la démo vidéo — le JSON reste masqué.</p>
              </div>
              {/* Step progress */}
              <div className="flex items-center gap-4 bg-[#0a0a14] border border-[#1a1a28] rounded-2xl px-5 py-3">
                <StepBadge n={1} label="Infos" active={true} />
                <div className="w-6 h-px bg-[#1e1e2e]" />
                <StepBadge n={2} label="Démo" active={true} />
                <div className="w-6 h-px bg-[#1e1e2e]" />
                <StepBadge n={3} label="JSON" active={true} />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* ─── 1. Public Info ─── */}
              <SectionCard title="Informations Publiques" icon="eye" step={1} accent="indigo">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <FieldLabel required>Titre du workflow</FieldLabel>
                      <input type="text" required placeholder="Ex: Prospection LinkedIn avec GPT-4" value={title}
                        onChange={(e) => handleTitleChange(e.target.value)} className={inputBase} />
                    </div>
                    <div>
                      <FieldLabel required hint="auto-généré depuis le titre">Slug URL</FieldLabel>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 text-sm select-none pointer-events-none">/</span>
                        <input type="text" required placeholder="prospection-linkedin-gpt4" value={slug}
                          onChange={(e) => setSlug(e.target.value)} className={`${inputBase} pl-7`} />
                      </div>
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Catégorie</FieldLabel>
                    <div className="relative">
                      <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputBase}>
                        {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      <Icon name="chevron-down" className="w-4 h-4 text-gray-700 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    {/* Category color preview */}
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full" style={{ background: CATEGORY_COLORS[category] || "#6366f1" }} />
                      <span className="text-[10px] text-gray-700">{category}</span>
                    </div>
                  </div>

                  <div>
                    <FieldLabel>Prix — 0 = Gratuit</FieldLabel>
                    <div className="relative">
                      <input type="number" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={`${inputBase} pr-8`} />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-600 text-sm pointer-events-none">€</span>
                    </div>
                    {price === 0 && <span className="text-[11px] text-emerald-500 mt-1 block">✓ Workflow gratuit</span>}
                  </div>

                  <div>
                    <FieldLabel>Nombre de nœuds n8n</FieldLabel>
                    <input type="number" min="1" value={nodes} onChange={(e) => setNodes(Number(e.target.value))} className={inputBase} />
                  </div>

                  <div>
                    <FieldLabel>Tags</FieldLabel>
                    <input type="text" placeholder="linkedin, ia, crm, notion" value={tags}
                      onChange={(e) => setTags(e.target.value)} className={inputBase} />
                    {/* Tag preview */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 5).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/8 border border-indigo-500/15 text-indigo-500">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Cover Image Upload */}
                  <div className="md:col-span-2">
                    <FieldLabel>Image de couverture (PNG, JPG, WebP, GIF — max 10 MB)</FieldLabel>
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp,image/gif"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setCoverFile(file);
                            setCoverPreview(URL.createObjectURL(file));
                          }
                        }}
                        className={`${inputBase} cursor-pointer`}
                        disabled={isSaving}
                      />
                      {coverPreview && (
                        <div className="mt-3 flex items-center gap-4">
                          <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-[#2a2a3a] flex-shrink-0">
                            <img src={coverPreview} alt="Aperçu couverture" className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{coverFile?.name}</p>
                            <p className="text-[11px] text-gray-500">{coverFile ? (coverFile.size / 1024).toFixed(1) + " KB" : ""}</p>
                          </div>
                          <button
                            type="button"
                            onClick={() => { setCoverFile(null); setCoverPreview(null); }}
                            className="p-2 rounded-lg hover:bg-white/10 text-gray-500 hover:text-white transition-colors"
                            aria-label="Supprimer l'image"
                          >
                            <Icon name="trash" className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                      {uploadProgress.cover && (
                        <div className="mt-2 h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-indigo-500 transition-all duration-300"
                            style={{ width: `${uploadProgress.cover}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <p className="text-[11px] text-gray-700 mt-1">
                      Recommandé : 1200×675 px (ratio 16:9). Image par défaut : icône de catégorie.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <FieldLabel>Description courte</FieldLabel>
                    <textarea rows={3} placeholder="Générez des leads qualifiés chaque jour…" value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className={`${inputBase} resize-none`} />
                    <span className="text-[10px] text-gray-700 mt-1 block">{description.length}/150 caractères</span>
                  </div>
                  <div>
                    <FieldLabel>Description longue (page détail)</FieldLabel>
                    <textarea rows={3} placeholder="Détaillez les étapes, prérequis, résultats attendus…" value={longDescription}
                      onChange={(e) => setLongDescription(e.target.value)}
                      className={`${inputBase} resize-none`} />
                  </div>
                </div>
              </SectionCard>

              {/* ─── 2. Options ─── */}
              <SectionCard title="Options & Difficulté" icon="star" step={2} accent="indigo">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <FieldLabel>Niveau de difficulté</FieldLabel>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      {(Object.entries(COMPLEXITY_CONFIG) as [Complexity, typeof COMPLEXITY_CONFIG[Complexity]][]).map(([c, cfg]) => (
                        <button key={c} type="button" onClick={() => setComplexity(c)}
                          className={`p-3.5 rounded-xl border text-center transition-all ${
                            complexity === c ? `${cfg.bg} ${cfg.text}` : "border-[#1e1e2e] text-gray-700 hover:text-gray-400 hover:border-[#2e2e45]"
                          }`}>
                          <div className="font-bold text-xs">{c}</div>
                          <div className="text-[10px] mt-0.5 opacity-70">{cfg.hint}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <FieldLabel>Mise en avant</FieldLabel>
                    <label className="flex items-center gap-4 p-4 rounded-2xl border border-[#1e1e2e] hover:border-[#2e2e45] bg-[#080812] cursor-pointer transition-all group">
                      <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${isFeatured ? "bg-indigo-500" : "bg-[#1e1e2e]"}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${isFeatured ? "left-5.5" : "left-0.5"}`} />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">Afficher en accueil</div>
                        <div className="text-[11px] text-gray-700">Carrousel des workflows populaires</div>
                      </div>
                      <input type="checkbox" checked={isFeatured} onChange={(e) => setIsFeatured(e.target.checked)} className="sr-only" />
                    </label>
                  </div>
                </div>
              </SectionCard>

              {/* ─── 3. Front-end Demo ─── */}
              <SectionCard title="Démo Front-End (visible par tous)" icon="video" step={3} accent="emerald">
                <p className="text-xs text-gray-700 mb-5 flex items-center gap-2">
                  <Icon name="shield" className="w-3.5 h-3.5 text-emerald-500" />
                  Seul le résultat visuel est présenté — jamais la logique interne n8n.
                </p>
                
                {/* File Upload for Video */}
                <div className="space-y-4 mb-4">
                  <FieldLabel>Fichier vidéo (MP4, WebM, MOV — max 100 MB)</FieldLabel>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/mp4,video/webm,video/quicktime"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setVideoFile(file);
                          setVideoPreview(URL.createObjectURL(file));
                          setDemoVideo(""); // Clear URL when file selected
                        }
                      }}
                      className={`${inputBase} cursor-pointer`}
                      disabled={isSaving}
                    />
                    {videoFile && (
                      <div className="mt-2 p-3 bg-emerald-500/8 border border-emerald-500/20 rounded-xl flex items-center gap-3">
                        <Icon name="video" className="w-5 h-5 text-emerald-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-emerald-300 truncate">{videoFile.name}</p>
                          <p className="text-[11px] text-emerald-500/80">{(videoFile.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setVideoFile(null); setVideoPreview(null); setDemoVideo("/videos/hero-workflow.mp4"); }}
                          className="p-1 rounded-lg hover:bg-white/10 text-emerald-400 hover:text-emerald-200 transition-colors"
                          aria-label="Supprimer la vidéo"
                        >
                          <Icon name="x" className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {uploadProgress.video && (
                      <div className="mt-2 h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-300"
                          style={{ width: `${uploadProgress.video}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* URL fallback */}
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Ou URL mp4 externe"
                    value={demoVideo}
                    onChange={(e) => { setDemoVideo(e.target.value); setVideoFile(null); setVideoPreview(null); }}
                    className={`${inputBase} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => setPreviewVideo(demoVideo || videoPreview)}
                    disabled={!demoVideo && !videoPreview}
                    className="px-5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25 text-xs font-bold transition-colors flex-shrink-0 flex items-center gap-1.5 opacity-50 hover:opacity-100"
                  >
                    <Icon name="video" className="w-3.5 h-3.5" />Tester
                  </button>
                </div>
                <div className="mt-2.5 flex items-center gap-2 text-[11px] text-gray-700">
                  Vidéos locales :
                  {["/videos/hero-workflow.mp4", "/videos/cta-canvas.mp4"].map((v) => (
                    <button key={v} type="button" onClick={() => { setDemoVideo(v); setVideoFile(null); setVideoPreview(null); }}
                      className="text-indigo-500 hover:text-indigo-400 underline underline-offset-2 transition-colors">
                      {v.split("/").pop()}
                    </button>
                  ))}
                </div>
              </SectionCard>

              {/* ─── 4. Protected JSON ─── */}
              <SectionCard title="Fichier Source n8n — Backend Protégé" icon="lock" step={4} accent="amber" badge="CONFIDENTIEL">
                <p className="text-xs text-gray-700 mb-4 leading-relaxed">
                  Collez votre JSON n8n exporté ou chargez un fichier .json. Ce code est inaccessible aux visiteurs et livré uniquement après paiement validé.
                </p>

                {/* File Upload for JSON */}
                <div className="space-y-4 mb-4">
                  <FieldLabel>Fichier JSON n8n (max 5 MB)</FieldLabel>
                  <div className="relative">
                    <input
                      type="file"
                      accept="application/json,text/json,.json"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setJsonFile(file);
                          setJsonFileName(file.name);
                          setN8nJsonProtected(""); // Clear textarea when file selected
                          setJsonError(null);
                        }
                      }}
                      className={`${inputBase} cursor-pointer`}
                      disabled={isSaving}
                    />
                    {jsonFile && (
                      <div className="mt-2 p-3 bg-amber-500/8 border border-amber-500/20 rounded-xl flex items-center gap-3">
                        <Icon name="key" className="w-5 h-5 text-amber-400" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-amber-300 truncate">{jsonFile.name}</p>
                          <p className="text-[11px] text-amber-500/80">{(jsonFile.size / 1024).toFixed(1)} KB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => { setJsonFile(null); setJsonFileName(null); }}
                          className="p-1 rounded-lg hover:bg-white/10 text-amber-400 hover:text-amber-200 transition-colors"
                          aria-label="Supprimer le fichier JSON"
                        >
                          <Icon name="x" className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                    {uploadProgress.json && (
                      <div className="mt-2 h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 transition-all duration-300"
                          style={{ width: `${uploadProgress.json}%` }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Textarea fallback */}
                <div className="relative">
                  <textarea rows={8}
                    placeholder={`{\n  "name": "Mon Workflow",\n  "nodes": [...],\n  "connections": {...}\n}`}
                    value={n8nJsonProtected}
                    onChange={(e) => { handleJsonChange(e.target.value); setJsonFile(null); setJsonFileName(null); }}
                    className={`${inputBase} font-mono text-xs leading-relaxed ${jsonError ? "border-red-500/50 focus:border-red-500" : ""}`}
                    disabled={!!jsonFile}
                  />
                  {n8nJsonProtected.trim() && !jsonError && !jsonFile && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-lg">
                      <Icon name="check" className="w-3 h-3 text-emerald-400" />
                      <span className="text-[10px] text-emerald-400 font-bold">JSON valide</span>
                    </div>
                  )}
                </div>
                {jsonError && (
                  <p className="text-[11px] text-red-400 mt-2 flex items-center gap-1.5">
                    <Icon name="alert" className="w-3.5 h-3.5 flex-shrink-0" />{jsonError}
                  </p>
                )}
                {n8nJsonProtected.trim() && !jsonError && !jsonFile && (
                  <p className="text-[11px] text-gray-700 mt-2">
                    {n8nJsonProtected.length.toLocaleString()} caractères · {(new Blob([n8nJsonProtected]).size / 1024).toFixed(1)} Ko
                  </p>
                )}
                {jsonFile && !jsonError && (
                  <p className="text-[11px] text-gray-700 mt-2 text-amber-400">
                    Fichier prêt pour l'upload · {jsonFileName}
                  </p>
                )}
              </SectionCard>

              {/* ─── Submit Bar ─── */}
              <div className="flex items-center justify-between py-2 border-t border-[#1a1a28]">
                <button type="button" onClick={resetForm}
                  className="px-5 py-3 rounded-xl border border-[#1e1e2e] text-gray-600 hover:text-white hover:bg-[#13131f] hover:border-[#2e2e45] text-sm font-medium transition-all">
                  Réinitialiser
                </button>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => setActiveTab("list")}
                    className="px-5 py-3 rounded-xl text-gray-600 hover:text-gray-300 text-sm font-medium transition-colors">
                    ← Retour à la liste
                  </button>
                  <button type="submit" disabled={isSaving}
                    className="btn-shine px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm hover:shadow-xl hover:shadow-indigo-500/30 transition-all flex items-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.98]">
                    {isSaving ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enregistrement…
                      </>
                    ) : (
                      <>
                        <Icon name={editingId ? "edit" : "plus"} className="w-4 h-4" />
                        {editingId ? "Enregistrer les modifications" : "Publier le workflow"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* ════════════════ TAB 3: SECURITY ════════════════ */}
        {activeTab === "security" && (
          <div className="space-y-5">
            {/* Hero card */}
            <div className="relative bg-[#0a0a14] border border-[#1a1a28] rounded-3xl p-8 sm:p-12 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5" style={{ background: "radial-gradient(circle, #10b981, transparent)", transform: "translate(30%, -30%)" }} />
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6">
                  <Icon name="shield" className="w-3.5 h-3.5" />
                  Protection · Propriété Intellectuelle
                </div>
                <h2 className="text-3xl font-extrabold text-white mb-3">
                  Pourquoi et comment protéger vos workflows ?
                </h2>
                <p className="text-gray-600 text-sm max-w-xl leading-relaxed mb-10">
                  FlowMarket impose une séparation stricte entre la démo visuelle publique et le code source n8n livré uniquement aux acheteurs.
                </p>

                {/* Visual flow diagram */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-0 mb-10 max-w-2xl">
                  {[
                    { label: "Visiteur", sub: "voit la démo vidéo", color: "#6366f1", icon: "eye" },
                    null,
                    { label: "Acheteur", sub: "reçoit le JSON n8n", color: "#10b981", icon: "download" },
                    null,
                    { label: "Backend", sub: "protégé et confidentiel", color: "#f59e0b", icon: "lock" },
                  ].map((item, i) =>
                    item === null ? (
                      <div key={i} className="hidden sm:flex items-center flex-1">
                        <div className="h-px flex-1 bg-gradient-to-r from-[#1a1a28] to-[#2a2a3a]" />
                        <span className="text-gray-700 text-xs mx-2">→</span>
                        <div className="h-px flex-1 bg-gradient-to-r from-[#2a2a3a] to-[#1a1a28]" />
                      </div>
                    ) : (
                      <div key={i} className="flex flex-col items-center gap-2 px-5 py-4 rounded-2xl border border-[#1e1e2e] bg-[#080812] w-full sm:w-auto">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                          <Icon name={item.icon} className="w-5 h-5" style={{ color: item.color } as React.CSSProperties} />
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-white text-sm">{item.label}</div>
                          <div className="text-[11px] text-gray-600">{item.sub}</div>
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="p-5 rounded-2xl bg-red-500/4 border border-red-500/15">
                    <div className="text-red-400 font-bold text-sm mb-3 flex items-center gap-2">
                      <Icon name="x" className="w-4 h-4" />À ne jamais faire
                    </div>
                    <ul className="space-y-2.5">
                      {[
                        "Afficher le JSON n8n en clair dans le navigateur",
                        "Exposer vos webhooks ou endpoints dans le code source",
                        "Laisser copier la logique interne sans achat",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                          <span className="text-red-600 flex-shrink-0 mt-0.5">✕</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-5 rounded-2xl bg-emerald-500/4 border border-emerald-500/15">
                    <div className="text-emerald-400 font-bold text-sm mb-3 flex items-center gap-2">
                      <Icon name="check" className="w-4 h-4" />Ce que FlowMarket fait
                    </div>
                    <ul className="space-y-2.5">
                      {[
                        "Front-End : vidéo du résultat visible par tous",
                        "Aperçu Canvas : flouté avec cadenas de protection",
                        "JSON Source : livré uniquement après paiement",
                      ].map((item) => (
                        <li key={item} className="flex items-start gap-2 text-xs text-gray-500">
                          <span className="text-emerald-500 flex-shrink-0 mt-0.5">✓</span>{item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-8 pt-8 border-t border-[#1a1a28]">
                  <button onClick={() => setActiveTab("new")}
                    className="btn-shine px-7 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-bold text-sm hover:shadow-lg transition-all flex items-center gap-2">
                    <Icon name="plus" className="w-4 h-4" />
                    Ajouter un workflow sécurisé
                  </button>
                  <Link href="/workflows" target="_blank"
                    className="px-5 py-3 rounded-xl border border-[#1e1e2e] hover:bg-[#13131f] text-gray-600 hover:text-white text-sm font-medium transition-all flex items-center gap-2">
                    <Icon name="eye" className="w-4 h-4" />
                    Voir la vitrine publique
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes cookieBannerEnter {
          from { opacity: 0; transform: translateY(8px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        option { background: #0f0f1a; }
        .left-5\\.5 { left: 1.375rem; }
      `}</style>
    </div>
  );
}
