"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { categories, getWorkflowsByCategory, workflows } from "@/data/workflows";
import Icon from "@/components/Icon";

export default function CategoriesPage() {
  const totalWorkflows = workflows.length;
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((err) => {
            // Ignore AbortError caused by pause() interrupting play()
            if (err.name !== "AbortError") {
              console.error("Video play error:", err);
            }
          });
      }
    }
  };

  const categoryColorMap: Record<string, {
    glow: string;
    badge: string;
    ring: string;
    iconBg: string;
    iconText: string;
    shimmer: string;
  }> = {
    marketing:    { glow: "rgba(236,72,153,0.35)", badge: "bg-pink-500/15 text-pink-300 border-pink-500/30", ring: "#ec4899", iconBg: "from-pink-600 to-rose-600", iconText: "text-white", shimmer: "from-pink-500/0 via-pink-500/10 to-pink-500/0" },
    productivity: { glow: "rgba(16,185,129,0.35)", badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30", ring: "#10b981", iconBg: "from-emerald-600 to-teal-600", iconText: "text-white", shimmer: "from-emerald-500/0 via-emerald-500/10 to-emerald-500/0" },
    ecommerce:    { glow: "rgba(249,115,22,0.35)", badge: "bg-orange-500/15 text-orange-300 border-orange-500/30", ring: "#f97316", iconBg: "from-orange-500 to-amber-500", iconText: "text-white", shimmer: "from-orange-500/0 via-orange-500/10 to-orange-500/0" },
    hr:           { glow: "rgba(139,92,246,0.35)", badge: "bg-violet-500/15 text-violet-300 border-violet-500/30", ring: "#8b5cf6", iconBg: "from-violet-600 to-purple-600", iconText: "text-white", shimmer: "from-violet-500/0 via-violet-500/10 to-violet-500/0" },
    finance:      { glow: "rgba(234,179,8,0.35)", badge: "bg-yellow-500/15 text-yellow-300 border-yellow-500/30", ring: "#eab308", iconBg: "from-yellow-500 to-lime-500", iconText: "text-white", shimmer: "from-yellow-500/0 via-yellow-500/10 to-yellow-500/0" },
    dev:          { glow: "rgba(59,130,246,0.35)", badge: "bg-blue-500/15 text-blue-300 border-blue-500/30", ring: "#3b82f6", iconBg: "from-blue-600 to-cyan-600", iconText: "text-white", shimmer: "from-blue-500/0 via-blue-500/10 to-blue-500/0" },
    ai:           { glow: "rgba(99,102,241,0.35)", badge: "bg-indigo-500/15 text-indigo-300 border-indigo-500/30", ring: "#6366f1", iconBg: "from-indigo-600 to-violet-600", iconText: "text-white", shimmer: "from-indigo-500/0 via-indigo-500/10 to-indigo-500/0" },
    social:       { glow: "rgba(239,68,68,0.35)", badge: "bg-red-500/15 text-red-300 border-red-500/30", ring: "#ef4444", iconBg: "from-red-500 to-pink-500", iconText: "text-white", shimmer: "from-red-500/0 via-red-500/10 to-red-500/0" },
  };

  const stats = [
    { value: `${categories.length}`, label: "Catégories", icon: "bolt", color: "text-indigo-400", bg: "bg-indigo-500/10 border-indigo-500/20" },
    { value: `${totalWorkflows}+`, label: "Workflows", icon: "cpu", color: "text-amber-400", bg: "bg-amber-500/10 border-amber-500/20" },
    { value: "4.9★", label: "Note Moyenne", icon: "star", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { value: "10k+", label: "Utilisateurs", icon: "users", color: "text-pink-400", bg: "bg-pink-500/10 border-pink-500/20" },
  ];

  return (
    <main className="min-h-screen bg-[#07070d] text-white overflow-x-hidden" id="top">

      {/* ─── HERO SECTION avec vidéo en arrière-plan ─── */}
      <section className="relative pt-28 pb-24 overflow-hidden min-h-[560px] flex flex-col justify-center">

        {/* ── Vidéo de fond ── */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ zIndex: 0 }}
        >
          <source src="/videos/hero-workflow.mp4" type="video/mp4" />
        </video>

        {/* ── Overlays pour lisibilité ── */}
        {/* Calque sombre de base */}
        <div className="absolute inset-0 bg-[#07070d]/75" style={{ zIndex: 1 }} />
        {/* Dégradé radial centré pour faire ressortir le texte */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_70%_at_50%_50%,rgba(7,7,13,0.55)_0%,transparent_100%)]" style={{ zIndex: 2 }} />
        {/* Dégradé bas pour fondu propre vers le reste de la page */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#07070d] to-transparent" style={{ zIndex: 3 }} />
        {/* Dégradé haut pour fondu avec la navbar */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#07070d] to-transparent" style={{ zIndex: 3 }} />

        {/* ── Grille fine par-dessus la vidéo ── */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            zIndex: 4,
          }}
        />

        {/* ── Contenu texte ── */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ zIndex: 5 }}>

          {/* Badge pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-indigo-500/30 bg-black/40 backdrop-blur-md mb-8 shadow-lg shadow-indigo-500/10">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-indigo-300 tracking-wider uppercase">
              {categories.length} catégories · {totalWorkflows} workflows disponibles
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none drop-shadow-2xl">
            <span className="text-white">Explorez par</span>
            <br />
            <span
              style={{
                background: "linear-gradient(135deg,#818cf8 0%,#a78bfa 40%,#f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              catégorie
            </span>
          </h1>

          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12 drop-shadow-lg">
            Des workflows n8n prêts à l&apos;emploi classés par domaine d&apos;activité.
            Trouvez, installez et automatisez en quelques minutes.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center gap-1.5 px-4 py-4 rounded-2xl border ${s.bg} bg-black/30 backdrop-blur-md shadow-lg`}
              >
                <Icon name={s.icon} className={`w-5 h-5 ${s.color} mb-1`} />
                <span className="text-xl font-extrabold text-white">{s.value}</span>
                <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── VIDEO SECTION ─── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Section header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Découvrez FlowMarket en action
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              L&apos;automatisation n8n,{" "}
              <span style={{
                background: "linear-gradient(135deg,#818cf8,#f59e0b)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                visualisée
              </span>
            </h2>
            <p className="text-gray-500 mt-2 text-sm max-w-md mx-auto">
              Voyez comment nos workflows transforment vos processus métier en quelques clics.
            </p>
          </div>

          {/* Video player card */}
          <div className="relative rounded-3xl overflow-hidden border border-white/8 group/vid shadow-2xl shadow-indigo-500/10">

            {/* Glow ring behind the card */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-500/20 via-transparent to-amber-500/15 blur-sm opacity-0 group-hover/vid:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Video element */}
            <video
              ref={videoRef}
              src="/videos/cta-interface.mp4"
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full aspect-video object-cover block"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Dark overlay when paused */}
            <div
              className="absolute inset-0 bg-[#07070d]/60 backdrop-blur-[2px] transition-opacity duration-500 pointer-events-none"
              style={{ opacity: isPlaying ? 0 : 1 }}
            />

            {/* Play / Pause button */}
            <button
              onClick={toggleVideo}
              aria-label={isPlaying ? "Pause la vidéo" : "Lancer la vidéo"}
              className="absolute inset-0 flex items-center justify-center cursor-pointer focus:outline-none"
            >
              {/* Animated ring */}
              <div
                className="absolute w-24 h-24 rounded-full border-2 border-indigo-400/40 animate-ping"
                style={{ display: isPlaying ? "none" : "block" }}
              />
              {/* Button circle */}
              <div
                className="relative w-18 h-18 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-500/40 transition-all duration-300 hover:scale-110"
                style={{
                  width: 72,
                  height: 72,
                  background: isPlaying
                    ? "rgba(255,255,255,0.08)"
                    : "linear-gradient(135deg,#6366f1,#f59e0b)",
                  opacity: isPlaying ? 0 : 1,
                  transform: isPlaying ? "scale(0.8)" : "scale(1)",
                }}
              >
                <Icon
                  name="arrowRight"
                  className="w-8 h-8 text-white"
                  style={{ marginLeft: 4 }}
                />
              </div>
            </button>

            {/* Pause overlay button (visible when playing on hover) */}
            {isPlaying && (
              <button
                onClick={toggleVideo}
                aria-label="Pause la vidéo"
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/vid:opacity-100 transition-opacity duration-300 cursor-pointer focus:outline-none"
              >
                <div className="w-14 h-14 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-5 rounded-full bg-white" />
                    <div className="w-1.5 h-5 rounded-full bg-white" />
                  </div>
                </div>
              </button>
            )}

            {/* Bottom info bar */}
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-[#07070d]/95 via-[#07070d]/60 to-transparent flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono text-gray-300">FlowMarket — Workflow Canvas</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] text-indigo-300">
                  <Icon name="bolt" className="w-3 h-3" />
                  n8n powered
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] text-amber-300">
                  <Icon name="star" className="w-3 h-3" />
                  4.9 ★
                </span>
              </div>
            </div>
          </div>

          {/* Feature bullets below video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            {[
              { icon: "cpu", color: "text-indigo-400", bg: "bg-indigo-500/8 border-indigo-500/15", title: "Installation en 1 clic", desc: "Importez directement dans votre instance n8n" },
              { icon: "bolt", color: "text-amber-400", bg: "bg-amber-500/8 border-amber-500/15", title: "Workflows vérifiés", desc: "Testés et validés par notre équipe experte" },
              { icon: "users", color: "text-emerald-400", bg: "bg-emerald-500/8 border-emerald-500/15", title: "Communauté active", desc: "Support et mises à jour régulières inclus" },
            ].map((f, i) => (
              <div key={i} className={`flex items-start gap-3 px-4 py-3.5 rounded-xl border ${f.bg} backdrop-blur-sm`}>
                <div className="mt-0.5 flex-shrink-0">
                  <Icon name={f.icon} className={`w-4 h-4 ${f.color}`} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white mb-0.5">{f.title}</p>
                  <p className="text-[11px] text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORIES GRID ─── */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">

          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#2a2a3a]" />
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-widest px-3">Toutes les catégories</span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#2a2a3a]" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {categories.map((category, index) => {
              const catWorkflows = getWorkflowsByCategory(category.id);
              const count = catWorkflows.length;
              const avgRating =
                count > 0
                  ? (catWorkflows.reduce((s, w) => s + w.rating, 0) / count).toFixed(1)
                  : "—";
              const totalDownloads = catWorkflows.reduce((s, w) => s + w.downloads, 0);
              const colors = categoryColorMap[category.id] ?? categoryColorMap["ai"];
              const isHovered = hoveredId === category.id;

              return (
                <Link
                  key={category.id}
                  href={`/workflows?category=${category.id}`}
                  onMouseEnter={() => setHoveredId(category.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group relative block rounded-2xl overflow-hidden transition-all duration-500"
                  style={{
                    animationDelay: `${index * 70}ms`,
                    boxShadow: isHovered
                      ? `0 0 0 1.5px ${colors.ring}, 0 20px 60px -10px ${colors.glow}, 0 0 80px -20px ${colors.glow}`
                      : "0 0 0 1px rgba(255,255,255,0.06)",
                    transform: isHovered ? "translateY(-6px) scale(1.015)" : "translateY(0) scale(1)",
                  }}
                >
                  {/* Card background */}
                  <div className="absolute inset-0 bg-[#0f0f1a] transition-colors duration-500 group-hover:bg-[#121222]" />

                  {/* Shimmer sweep on hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${colors.shimmer} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    style={{ backgroundSize: "200% 100%", animation: isHovered ? "shimmer 1.5s ease-in-out infinite" : "none" }}
                  />

                  {/* Noise texture */}
                  <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />

                  {/* Content */}
                  <div className="relative z-10 p-6 flex flex-col h-full min-h-[240px]">

                    {/* Top row: icon + arrow */}
                    <div className="flex items-start justify-between mb-5">
                      {/* Icon */}
                      <div
                        className={`w-13 h-13 rounded-xl bg-gradient-to-br ${colors.iconBg} p-3 flex items-center justify-center shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                        style={{ width: 52, height: 52, boxShadow: isHovered ? `0 8px 24px -4px ${colors.glow}` : "none" }}
                      >
                        <Icon name={category.icon} className={`w-7 h-7 ${colors.iconText}`} />
                      </div>

                      {/* Arrow badge */}
                      <div
                        className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0"
                        style={{ background: colors.ring + "22", borderColor: colors.ring + "55" }}
                      >
                        <Icon name="arrowRight" className="w-3.5 h-3.5" style={{ color: colors.ring }} />
                      </div>
                    </div>

                    {/* Category name */}
                    <h3 className="font-bold text-white text-lg leading-snug mb-2 group-hover:text-transparent group-hover:bg-clip-text transition-all duration-300"
                      style={{
                        backgroundImage: isHovered ? `linear-gradient(135deg, white, ${colors.ring})` : undefined,
                        WebkitBackgroundClip: isHovered ? "text" : undefined,
                        WebkitTextFillColor: isHovered ? "transparent" : undefined,
                      }}>
                      {category.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300 leading-relaxed mb-auto">
                      {category.description}
                    </p>

                    {/* Divider */}
                    <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2">
                      {/* Workflow count */}
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all duration-300 ${isHovered ? colors.badge : "bg-white/4 text-gray-500 border-white/8"}`}
                      >
                        <Icon name="bolt" className="w-3 h-3" />
                        {count} workflow{count > 1 ? "s" : ""}
                      </span>

                      {/* Rating */}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold transition-all duration-300 ${isHovered ? "bg-amber-500/15 text-amber-300 border-amber-500/30" : "bg-white/4 text-gray-500 border-white/8"}`}>
                        <Icon name="star" className="w-3 h-3" />
                        {avgRating}
                      </span>

                      {/* Downloads */}
                      {totalDownloads > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-semibold bg-white/4 text-gray-500 border-white/8">
                          <Icon name="download" className="w-3 h-3" />
                          {totalDownloads >= 1000 ? `${(totalDownloads / 1000).toFixed(1)}k` : totalDownloads}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED BANNER ─── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl border border-white/8">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-[#0e0e1e] to-amber-600/15" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.2),transparent_60%)]" />

            {/* Floating orbs */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/15 rounded-full blur-[80px]" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                  Catalogue complet
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Vous ne savez pas par où commencer ?
                </h2>
                <p className="text-gray-400 max-w-md">
                  Parcourez tous les workflows, filtrez par catégorie, complexité ou budget directement depuis le catalogue.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <Link
                  href="/workflows"
                  className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-amber-500 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon name="bolt" className="w-4 h-4" />
                  Explorer le catalogue
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-white/6 border border-white/12 text-white px-7 py-3.5 rounded-xl font-bold text-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Icon name="star" className="w-4 h-4 text-amber-400" />
                  Voir les tarifs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}