"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1000)); // Simulate API call
    setStatus("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus("idle"), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <main className="min-h-screen" id="top">
      {/* Hero - Professional Redesign */}
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-[0.30]"
          >
            <source src="/videos/contact-hero.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Background Layers - semi-transparent to let video show through */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#0a0a0f]/40 via-[#0d0d1a]/20 to-[#0a0a0f]/40" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-500/15 to-transparent rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-500/15 to-transparent rounded-full blur-[200px]" />
        
        {/* Subtle animated blob */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24">
          {/* Header Badge */}
          <div className="inline-flex items-center gap-2.5 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-5 py-2.5 mb-8">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs font-medium text-gray-300 tracking-wide">Disponible 24/7 • Réponse sous 24h</span>
          </div>

          {/* Title with gradient */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1] max-w-3xl mx-auto">
            Contactez <span className="gradient-text">FlowMarket</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Une question technique, un projet d'automatisation ou une suggestion ? 
            Notre équipe d'experts n8n vous répond personnellement sous 24h ouvrées.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mb-10">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-300">Équipe disponible</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Icon name="shield" className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium text-gray-300">Réponse garantie 24h</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Icon name="star" className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-gray-300">4.9/5 satisfaction</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#formulaire"
              className="btn-shine inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-semibold text-base hover:shadow-xl hover:shadow-indigo-500/30 transition-all"
            >
              <Icon name="mail" className="w-5 h-5" />
              Écrire un message
            </Link>
            <Link
              href="https://discord.gg/flowmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111118] border border-[#2a2a3a] text-white rounded-xl font-semibold text-base hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all"
            >
              <Icon name="discord" className="w-5 h-5" />
              Rejoindre Discord
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section id="formulaire" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-[#111118] to-[#0f0f18] rounded-3xl border border-[#2a2a3a] p-8 lg:p-10 relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-indigo-500/10 to-transparent rounded-full blur-[150px]" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2.5 mb-8">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-amber-500 flex items-center justify-center">
                    <Icon name="mail" className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Envoyez-nous un message</h2>
                    <p className="text-gray-500 text-sm mt-1">Réponse garantie sous 24h ouvrées</p>
                  </div>
                </div>

                {status === "success" && (
                  <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300">
                    <Icon name="check" className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold">Message envoyé !</p>
                      <p className="text-sm text-emerald-500/80">Nous vous répondrons dans les plus brefs délais.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="relative group">
                      <label htmlFor="name" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Prénom
                      </label>
                      <div className="relative">
                        <Icon name="user" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3.5 bg-[#080812] border border-[#2a2a3a] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    <div className="relative group">
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Icon name="mail" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3.5 bg-[#080812] border border-[#2a2a3a] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="subject" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Sujet
                    </label>
                    <div className="relative">
                      <Icon name="tag" className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3.5 bg-[#080812] border border-[#2a2a3a] rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Sélectionnez un sujet</option>
                        <option value="support">🛠 Support technique</option>
                        <option value="sales">🤝 Ventes / Partenariats</option>
                        <option value="billing">💳 Facturation / Remboursement</option>
                        <option value="bug">🐛 Signaler un bug</option>
                        <option value="feature">✨ Demande de fonctionnalité</option>
                        <option value="other">📝 Autre</option>
                      </select>
                      <Icon name="chevron-down" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  <div className="relative group">
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Message
                    </label>
                    <div className="relative">
                      <Icon name="messageSquare" className="absolute left-4 top-4 w-5 h-5 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full pl-12 pr-4 py-3.5 bg-[#080812] border border-[#2a2a3a] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all resize-none"
                        placeholder="Décrivez votre demande, vos besoins, vos contraintes..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full btn-shine px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-bold text-base hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === "submitting" ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Icon name="send" className="w-5 h-5" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info & Quick Links - Modern Card Layout */}
            <div className="space-y-6">
              {/* Contact Info Cards */}
              <div className="bg-gradient-to-br from-[#111118] to-[#0f0f18] rounded-3xl border border-[#2a2a3a] p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-[150px]" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Icon name="info" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Nous contacter</h2>
                      <p className="text-gray-500 text-sm">Plusieurs canaux à votre disposition</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        icon: "mail",
                        title: "Email",
                        value: "contact@flowmarket.fr",
                        desc: "Réponse sous 24h ouvrées",
                        color: "indigo",
                        bg: "bg-indigo-500/15 border-indigo-500/20",
                        iconColor: "text-indigo-400",
                      },
                      {
                        icon: "clock",
                        title: "Horaires",
                        value: "Lun - Ven : 9h - 18h",
                        desc: "Fuseau horaire : Europe/Paris",
                        color: "emerald",
                        bg: "bg-emerald-500/15 border-emerald-500/20",
                        iconColor: "text-emerald-400",
                      },
                      {
                        icon: "mapPin",
                        title: "Adresse",
                        value: "12 Rue de la Paix, 75002 Paris",
                        desc: "Siège social",
                        color: "amber",
                        bg: "bg-amber-500/15 border-amber-500/20",
                        iconColor: "text-amber-400",
                      },
                      {
                        icon: "shield",
                        title: "Support Premium",
                        value: "Clients premium",
                        desc: "Réponse garantie sous 4h",
                        color: "rose",
                        bg: "bg-rose-500/15 border-rose-500/20",
                        iconColor: "text-rose-400",
                      },
                    ].map((item) => (
                      <div
                        key={item.title}
                        className="group p-5 rounded-2xl bg-[#0a0a0f]/50 border border-[#2a2a3a] hover:border-indigo-500/30 hover:bg-[#0d0d18]/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10"
                      >
                        <div className="flex items-start gap-4">
                          <div className={`w-11 h-11 rounded-xl ${item.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon name={item.icon} className={`w-5 h-5 ${item.iconColor}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold mb-0.5 group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                            <p className="text-gray-300 text-sm font-medium mb-1">{item.value}</p>
                            <p className="text-gray-500 text-xs">{item.desc}</p>
                          </div>
                          <Icon name="arrowRight" className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions - Modern Card Grid */}
              <div className="bg-gradient-to-br from-[#111118] to-[#0f0f18] rounded-3xl border border-[#2a2a3a] p-6 lg:p-8 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-[150px]" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2.5 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Icon name="zap" className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Besoin d'aide rapide ?</h2>
                      <p className="text-gray-500 text-sm">Ressources en accès libre</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { href: "/faq", label: "FAQ", desc: "Questions fréquentes", icon: "helpCircle", color: "indigo" },
                      { href: "/docs", label: "Documentation", desc: "Guides et tutoriels n8n", icon: "bookOpen", color: "emerald" },
                      { href: "/community", label: "Communauté", desc: "Discord & Forum", icon: "users", color: "amber" },
                      { href: "/changelog", label: "Changelog", desc: "Nouveautés & mises à jour", icon: "sparkles", color: "rose" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group p-4 rounded-2xl bg-[#0a0a0f]/50 border border-[#2a2a3a] hover:border-indigo-500/40 hover:bg-[#0d0d18]/50 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/10 flex items-center gap-4"
                      >
                        <div className={`w-10 h-10 rounded-xl bg-${item.color}-500/15 border border-${item.color}-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon name={item.icon} className={`w-4 h-4 text-${item.color}-400`} />
                        </div>
                        <div className="flex-1 text-left min-w-0">
                          <p className="text-white font-semibold text-sm group-hover:text-indigo-300 transition-colors">{item.label}</p>
                          <p className="text-gray-500 text-xs truncate">{item.desc}</p>
                        </div>
                        <Icon name="arrowRight" className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0a0a0f] border-t border-[#2a2a3a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Vous préférez discuter en direct ?
          </h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Rejoignez notre communauté Discord pour échanger avec l'équipe et d'autres automatiseurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://discord.gg/flowmarket"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              <Icon name="discord" className="w-5 h-5" />
              Rejoindre le Discord
            </Link>
            <Link
              href="/workflows"
              className="inline-flex items-center justify-center gap-2 bg-[#111118] border border-[#2a2a3a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-500/50 transition-all"
            >
              <Icon name="bolt" className="w-5 h-5" />
              Explorer les workflows
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}