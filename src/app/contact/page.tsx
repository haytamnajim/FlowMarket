"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import Icon from "@/components/Icon";

type TopicType = "project" | "support" | "partnership" | "general";

export default function ContactPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const [topic, setTopic] = useState<TopicType>("project");
  const [budget, setBudget] = useState<string>("1k-3k");
  const [urgency, setUrgency] = useState<string>("month");
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const topics: { id: TopicType; label: string; icon: string; desc: string }[] = [
    {
      id: "project",
      label: "Projet sur-mesure",
      icon: "rocket",
      desc: "Automatisation ou flux complet pour votre entreprise",
    },
    {
      id: "support",
      label: "Support technique",
      icon: "bolt",
      desc: "Aide sur un template acheté ou un nœud n8n",
    },
    {
      id: "partnership",
      label: "Partenariat / Affiliation",
      icon: "users",
      desc: "Créateurs de workflows & intégrations d'outils",
    },
    {
      id: "general",
      label: "Autre demande",
      icon: "messageSquare",
      desc: "Questions générales, presse, suggestions",
    },
  ];

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@flowmarket.fr");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleFakeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1200)); // Simulation envoi
    setStatus("success");
    setFormData({ name: "", email: "", company: "", message: "" });
    setAttachedFile(null);
    setTimeout(() => setStatus("idle"), 5000);
  };

  const faqs = [
    {
      q: "Sous quel délai puis-je espérer une réponse ?",
      a: "Nous répondons à tous les messages sous 24h ouvrées (et en moyenne en moins de 2 heures en semaine). Pour les clients avec support prioritaire, le délai garanti est inférieur à 4h.",
    },
    {
      q: "Comment se déroule la création d'un workflow n8n sur-mesure ?",
      a: "Après analyse de votre besoin, nous convenons d'un bref appel de cadrage de 15 minutes. Vous recevez un devis clair sous 48h. Une fois validé, nous livrons votre scénario testé, documenté et prêt à l'emploi.",
    },
    {
      q: "Aidez-vous à l'hébergement ou à l'installation de n8n ?",
      a: "Absolument. Nous accompagnons le déploiement de n8n aussi bien sur n8n Cloud que sur vos serveurs privés (Docker, VPS Hetzner, AWS, Render, Railway) avec sécurisation des clés d'API.",
    },
    {
      q: "Puis-je signer un accord de confidentialité (NDA) ?",
      a: "Oui, la confidentialité de vos données et processus métiers est primordiale. Nous pouvons signer votre NDA ou vous fournir notre modèle standard avant d'accéder à vos environnements.",
    },
    {
      q: "Que faire si un template acheté nécessite une adaptation ?",
      a: "Chaque template inclut un guide pas-à-pas. Si vous rencontrez un blocage ou souhaitez connecter un outil supplémentaire, notre équipe support vous assiste ou prend en charge l'extension.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#07070b] text-gray-200 selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Background Gradients & Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-indigo-600/15 via-purple-600/10 to-transparent rounded-full blur-[160px]" />
        <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[180px]" />
        <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[180px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] opacity-40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-24">
        {/* Header / Hero compact */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          {/* Status pill badge */}
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#12121b]/90 border border-white/10 shadow-lg backdrop-blur-md mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-medium text-gray-300">
              Experts disponibles • Réponse moyenne <strong className="text-emerald-400 font-semibold">&lt; 1h</strong>
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-5 leading-[1.15]">
            Parlons de vos automatisations <span className="gradient-text">n8n</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Un projet d'automatisation sur-mesure, une question technique ou une demande de partenariat ?
            Échangez directement avec nos ingénieurs.
          </p>
        </div>

        {/* Main Grid: Form + Fast Track Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-24">
          
          {/* LEFT: Interactive Modern Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#0e0e17]/85 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            {/* Subtle card glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10">
              <div className="mb-8">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-2">
                  Étape 1 sur 2
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  Quel est l'objet de votre demande ?
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  Sélectionnez la catégorie qui décrit le mieux votre besoin :
                </p>

                {/* Topic selector pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {topics.map((t) => {
                    const isSelected = topic === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setTopic(t.id)}
                        className={`text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-start gap-3 ${
                          isSelected
                            ? "bg-indigo-600/15 border-indigo-500 shadow-md shadow-indigo-500/20 ring-1 ring-indigo-500/50"
                            : "bg-[#141420]/70 border-white/5 hover:border-white/20 hover:bg-[#181826]"
                        }`}
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            isSelected
                              ? "bg-gradient-to-br from-indigo-500 to-amber-500 text-white shadow"
                              : "bg-[#1f1f2e] text-gray-400"
                          }`}
                        >
                          <Icon name={t.icon} className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-sm font-semibold ${isSelected ? "text-white" : "text-gray-300"}`}>
                            {t.label}
                          </p>
                          <p className="text-[11px] text-gray-400 leading-snug line-clamp-1 mt-0.5">
                            {t.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Conditional context for "project" */}
              {topic === "project" && (
                <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-[#141422]/70 border border-indigo-500/20 animate-in fade-in duration-300">
                  <div className="mb-4">
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Budget estimé pour ce projet
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: "<1k", label: "< 1 000 €" },
                        { id: "1k-3k", label: "1k - 3k €" },
                        { id: "3k-5k", label: "3k - 5k €" },
                        { id: ">5k", label: "5k € +" },
                      ].map((b) => (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => setBudget(b.id)}
                          className={`py-2 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                            budget === b.id
                              ? "bg-gradient-to-r from-indigo-500 to-indigo-600 border-indigo-400 text-white shadow-sm"
                              : "bg-[#181828] border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                      Échéance souhaitée
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "urgent", label: "Urgent (< 1 sem)" },
                        { id: "month", label: "Ce mois-ci" },
                        { id: "flexible", label: "Exploration" },
                      ].map((u) => (
                        <button
                          key={u.id}
                          type="button"
                          onClick={() => setUrgency(u.id)}
                          className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all truncate ${
                            urgency === u.id
                              ? "bg-amber-500/20 border-amber-500/60 text-amber-300 font-semibold"
                              : "bg-[#181828] border-white/5 text-gray-400 hover:text-white hover:border-white/20"
                          }`}
                        >
                          {u.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Status Message */}
              {status === "success" && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 flex items-center gap-3 animate-in zoom-in-95 duration-300 shadow-lg">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="check" className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-emerald-200">Message envoyé avec succès !</p>
                    <p className="text-xs text-emerald-400/90 mt-0.5">
                      Un accusé de réception a été envoyé. Notre équipe vous répondra très rapidement.
                    </p>
                  </div>
                </div>
              )}

              {/* Form inputs */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block">
                  Étape 2 sur 2 • Vos coordonnées
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-gray-300 mb-1.5">
                      Nom complet <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Icon name="user" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alexandre Dupont"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141420] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-300 mb-1.5">
                      Adresse email pro <span className="text-rose-400">*</span>
                    </label>
                    <div className="relative">
                      <Icon name="mail" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@entreprise.com"
                        className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#141420] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-xs font-medium text-gray-300 mb-1.5">
                    Entreprise / Organisation <span className="text-gray-500 text-[11px] font-normal">(Optionnel)</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp"
                    className="w-full px-4 py-3 rounded-xl bg-[#141420] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-medium text-gray-300 mb-1.5">
                    Détails de votre message <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        topic === "project"
                          ? "Décrivez le processus que vous souhaitez automatiser, vos outils (Airtable, Slack, CRM...) et vos objectifs..."
                          : topic === "support"
                          ? "Indiquez le nom du template ou le problème rencontré, message d'erreur éventuel..."
                          : "Expliquez-nous votre proposition ou posez votre question..."
                      }
                      className="w-full p-4 rounded-xl bg-[#141420] border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* File attachment toggle */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#141420]/60 border border-white/5">
                  <div className="flex items-center gap-2.5">
                    <Icon name="paperclip" className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs text-gray-300 truncate max-w-[220px] sm:max-w-xs">
                      {attachedFile ? (
                        <span className="text-emerald-400 font-semibold">{attachedFile}</span>
                      ) : (
                        "Joindre un fichier (workflow JSON, capture d'écran, doc...)"
                      )}
                    </span>
                  </div>
                  <label className="cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 transition-colors">
                    {attachedFile ? "Changer" : "Parcourir"}
                    <input
                      type="file"
                      onChange={handleFakeFileUpload}
                      className="hidden"
                      accept=".json,.png,.jpg,.jpeg,.pdf,.zip"
                    />
                  </label>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-shine py-4 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-indigo-500 via-indigo-600 to-amber-500 hover:shadow-xl hover:shadow-indigo-500/25 transition-all flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmission en cours...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="send" className="w-4 h-4" />
                      <span>Envoyer ma demande</span>
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 text-xs text-gray-500 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Icon name="shield" className="w-3.5 h-3.5 text-emerald-400" />
                    Données 100% sécurisées
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="lock" className="w-3.5 h-3.5 text-indigo-400" />
                    Aucun démarchage commercial
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT: Fast Track & Channels (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Video Showcase Card - Studio n8n */}
            <div className="relative overflow-hidden rounded-3xl bg-[#0e0e17]/90 border border-white/10 shadow-2xl backdrop-blur-xl group hover:border-indigo-500/40 transition-all duration-300">
              <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-black/60">
                <video
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="/videos/contact-hero.mp4" type="video/mp4" />
                </video>

                {/* Subtle gradient overlays to blend seamlessly */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e17] via-transparent to-black/50 pointer-events-none" />
                <div className="absolute inset-0 bg-indigo-500/10 mix-blend-color pointer-events-none" />

                {/* Top badges & controls */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Studio FlowMarket • En direct</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={toggleMute}
                      title={isMuted ? "Activer le son" : "Couper le son"}
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Icon name={isMuted ? "volumeX" : "volume"} className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={togglePlay}
                      title={isPlaying ? "Mettre en pause" : "Lire"}
                      className="w-7 h-7 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <Icon name={isPlaying ? "pause" : "play"} className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Bottom Caption inside Video */}
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/30 border border-indigo-400/30 text-[10px] font-semibold text-indigo-200">
                      Coulisses
                    </span>
                    <span className="text-xs font-semibold text-white drop-shadow">
                      Conception & orchestration de flux n8n
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300/90 drop-shadow line-clamp-1">
                    Nos experts conçoivent, testent et optimisent vos architectures sur-mesure.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Booking Card (Calendly / Call) */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121220] via-[#0e0e1a] to-[#161226] border border-indigo-500/30 p-6 sm:p-7 shadow-xl group hover:border-indigo-500/50 transition-all">
              <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-full blur-[70px] pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-4">
                  <Icon name="calendar" className="w-3.5 h-3.5" />
                  Prise de contact express
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  Réserver un appel de cadrage
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
                  15 minutes en visio avec un architecte d'automatisation FlowMarket pour cadrer votre flux n8n et obtenir des conseils immédiats.
                </p>

                <button
                  type="button"
                  onClick={() => setShowBookingModal(true)}
                  className="w-full py-3.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Icon name="calendar" className="w-4 h-4" />
                  Choisir un créneau (15 min)
                </button>
              </div>
            </div>

            {/* Direct Email Card with 1-click Copy */}
            <div className="rounded-3xl bg-[#0e0e17]/80 border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                    <Icon name="mail" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Email direct</h4>
                    <p className="text-xs text-gray-400">Pour tout document ou devis</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-[#141420] border border-white/5 mt-3">
                <span className="text-xs sm:text-sm font-mono text-gray-300 truncate">
                  contact@flowmarket.fr
                </span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/20 hover:bg-indigo-500/30 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition-all cursor-pointer"
                >
                  {copiedEmail ? (
                    <>
                      <Icon name="check" className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copié !</span>
                    </>
                  ) : (
                    <>
                      <Icon name="copy" className="w-3.5 h-3.5" />
                      <span>Copier</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Community Discord Card */}
            <div className="rounded-3xl bg-[#0e0e17]/80 border border-white/10 p-6 backdrop-blur-xl relative overflow-hidden group hover:border-[#5865F2]/40 transition-all">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#5865F2]/20 border border-[#5865F2]/30 flex items-center justify-center text-[#5865F2]">
                    <Icon name="discord" className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      Communauté Discord
                    </h4>
                    <p className="text-xs text-gray-400">Support communautaire & entraide n8n</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>+180 en ligne</span>
                </div>
                <span className="text-gray-600">•</span>
                <div className="text-xs text-gray-400">+1 200 automatiseurs</div>
              </div>

              <Link
                href="https://discord.gg/flowmarket"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#5865F2]/15 hover:bg-[#5865F2]/25 border border-[#5865F2]/30 text-[#858eff] font-semibold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <span>Rejoindre le serveur</span>
                <Icon name="arrowRight" className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Practical info badges (Horaires, localisation) */}
            <div className="rounded-3xl bg-[#0e0e17]/60 border border-white/10 p-5 backdrop-blur-md space-y-3.5">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
                  <Icon name="clock" className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Disponibilité de l'équipe</p>
                  <p className="text-gray-400 text-[11px]">Du Lundi au Vendredi • 9h00 - 18h30 (Heure de Paris)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-300">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 flex-shrink-0">
                  <Icon name="mapPin" className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Siège & R&amp;D</p>
                  <p className="text-gray-400 text-[11px]">Paris, France • Rayonnement Francophone & International</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="max-w-4xl mx-auto mt-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Icon name="helpCircle" className="w-3.5 h-3.5" />
              Foire aux questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              Questions fréquentes
            </h2>
            <p className="text-sm text-gray-400">
              Des réponses claires à vos interrogations avant de nous contacter.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-[#10101b] border-indigo-500/40 shadow-lg"
                      : "bg-[#0c0c14] border-white/5 hover:border-white/15"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-semibold text-sm sm:text-base text-gray-200">
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 flex-shrink-0 ${
                        isOpen ? "bg-indigo-500 text-white rotate-180" : "bg-white/5 text-gray-400"
                      }`}
                    >
                      <Icon name="chevronDown" className="w-4 h-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom CTA Banner */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-indigo-950/60 via-[#111122] to-amber-950/40 border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Besoin de modèles prêts à l'emploi dès maintenant ?
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Découvrez notre catalogue de plus de 50 workflows n8n testés, documentés et prêts à être importés dans votre instance.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/workflows"
                className="btn-shine px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-indigo-500 to-amber-500 text-white shadow-lg hover:shadow-indigo-500/30 transition-all inline-flex items-center gap-2"
              >
                <Icon name="bolt" className="w-4 h-4" />
                Explorer la boutique de workflows
              </Link>
              <Link
                href="/categories"
                className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all inline-flex items-center gap-2"
              >
                Parcourir les catégories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#11111c] border border-indigo-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <Icon name="x" className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
              <Icon name="calendar" className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              Appel de cadrage n8n (15 min)
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 mb-6 leading-relaxed">
              Discutez de votre projet en direct avec l'un de nos spécialistes techniques. Choisissez une date qui vous convient :
            </p>

            <div className="space-y-2.5 mb-6">
              {[
                { time: "Aujourd'hui à 15h30", state: "Dernière dispo" },
                { time: "Demain à 10h00", state: "Recommandé" },
                { time: "Demain à 14h30", state: "Disponible" },
                { time: "Jeudi à 11h00", state: "Disponible" },
              ].map((slot, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    alert(`Créneau réservé : ${slot.time} ! Un lien Google Meet vous a été envoyé.`);
                    setShowBookingModal(false);
                  }}
                  className="w-full p-3 rounded-xl bg-[#161624] hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 flex items-center justify-between text-left transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon name="clock" className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs sm:text-sm font-semibold text-gray-200 group-hover:text-white">
                      {slot.time}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {slot.state}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-[11px] text-gray-500 text-center">
              Sans engagement • Lien visio Google Meet généré automatiquement
            </p>
          </div>
        </div>
      )}
    </main>
  );
}