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
    <main className="min-h-screen pt-16" id="top">
      {/* Hero - Professional Redesign */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b border-[#2a2a3a]">
        {/* Background Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#0d0d1a] to-[#0a0a0f]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-500/15 to-transparent rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-bl from-amber-500/15 to-transparent rounded-full blur-[200px]" />
        
        {/* Subtle animated blob */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1.5s' }} />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Envoyez-nous un message</h2>

              {status === "success" && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center gap-3">
                  <Icon name="check" className="w-5 h-5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">Message envoyé !</p>
                    <p className="text-sm text-emerald-500/80">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#080812] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all"
                      placeholder="Votre prénom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#080812] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Sujet *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#080812] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all appearance-none"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="support">Support technique</option>
                    <option value="sales">Ventes / Partenariats</option>
                    <option value="billing">Facturation / Remboursement</option>
                    <option value="bug">Signaler un bug</option>
                    <option value="feature">Demande de fonctionnalité</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full bg-[#080812] border border-[#1e1e2e] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-700 focus:outline-none focus:border-indigo-500/60 focus:bg-[#0c0c18] focus:ring-1 focus:ring-indigo-500/15 transition-all resize-none"
                    placeholder="Décrivez votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full btn-shine px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-amber-500 text-white font-bold text-base hover:shadow-xl hover:shadow-indigo-500/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
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

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Informations de contact</h2>

                <div className="space-y-5">
                  {[
                    {
                      icon: "mail",
                      title: "Email",
                      value: "contact@flowmarket.fr",
                      desc: "Réponse sous 24h ouvrées",
                    },
                    {
                      icon: "clock",
                      title: "Horaires",
                      value: "Lun - Ven : 9h - 18h",
                      desc: "Fuseau horaire : Europe/Paris",
                    },
                    {
                      icon: "mapPin",
                      title: "Adresse",
                      value: "12 Rue de la Paix, 75002 Paris",
                      desc: "Siège social",
                    },
                    {
                      icon: "shield",
                      title: "Support prioritaire",
                      value: "Clients premium",
                      desc: "Réponse garantie sous 4h",
                    },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-4 p-4 rounded-2xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-indigo-500/30 transition-colors">
                      <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                        <Icon name={item.icon} className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                        <p className="text-gray-400 text-sm mb-0.5">{item.value}</p>
                        <p className="text-gray-600 text-xs">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-8">
                <h2 className="text-2xl font-bold text-white mb-6">Besoin d'aide rapide ?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { href: "/faq", label: "FAQ", desc: "Questions fréquentes", icon: "helpCircle" },
                    { href: "/docs", label: "Documentation", desc: "Guides et tutoriels n8n", icon: "bookOpen" },
                    { href: "/community", label: "Communauté", desc: "Discord & Forum", icon: "users" },
                    { href: "/changelog", label: "Changelog", desc: "Nouveautés & mises à jour", icon: "sparkles" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="p-4 rounded-xl bg-[#0a0a0f] border border-[#2a2a3a] hover:border-indigo-500/40 hover:bg-[#0d0d18] transition-all flex items-center gap-3 group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-500/25 transition-colors">
                        <Icon name={item.icon} className="w-4 h-4 text-indigo-400" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white font-semibold text-sm">{item.label}</p>
                        <p className="text-gray-600 text-xs">{item.desc}</p>
                      </div>
                      <Icon name="arrowRight" className="w-4 h-4 text-gray-600 group-hover:text-indigo-400 transition-colors" />
                    </Link>
                  ))}
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