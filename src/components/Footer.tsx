"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: "Produit",
      links: [
        { label: "Workflows", href: "/workflows" },
        { label: "Catégories", href: "/categories" },
        { label: "Tarifs", href: "/pricing" },
        { label: "Nouveautés", href: "/workflows?sort=new" },
        { label: "Populaires", href: "/workflows?sort=popular" },
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Documentation", href: "/docs" },
        { label: "Guide n8n", href: "/guide" },
        { label: "Blog", href: "/blog" },
        { label: "API Reference", href: "/api-docs" },
        { label: "Communauté", href: "/community" },
      ],
    },
    {
      title: "Entreprise",
      links: [
        { label: "À propos", href: "/about" },
        { label: "Devenir vendeur", href: "/seller" },
        { label: "Carrières", href: "/careers" },
        { label: "Presse", href: "/press" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Légal",
      links: [
        { label: "CGU", href: "/terms" },
        { label: "Confidentialité", href: "/privacy" },
        { label: "Remboursements", href: "/refund" },
        { label: "Cookies", href: "/cookies" },
        { label: "Licences", href: "/licenses" },
      ],
    },
  ];

  const socialLinks = [
    { name: "twitter", label: "X (Twitter)", href: "https://twitter.com/flowmarket" },
    { name: "github", label: "GitHub", href: "https://github.com/flowmarket" },
    { name: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/flowmarket" },
    { name: "youtube", label: "YouTube", href: "https://youtube.com/@flowmarket" },
    { name: "discord", label: "Discord", href: "https://discord.gg/flowmarket" },
  ];

  const stats = [
    { value: "1 200+", label: "Workflows", icon: "cpu" },
    { value: "4.9★", label: "Note moyenne", icon: "star" },
    { value: "10k+", label: "Automatiseurs", icon: "users" },
    { value: "99.9%", label: "Uptime", icon: "server" },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#2a2a3a]">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-br from-indigo-500/8 to-amber-500/8 rounded-full blur-[200px] pointer-events-none" />

      {/* Stats band */}
      <div className="relative border-b border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/15 to-amber-500/15 border border-[#2a2a3a] flex items-center justify-center flex-shrink-0 group-hover:border-indigo-500/40 transition-colors duration-300">
                  <Icon name={stat.icon} className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-none">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main grid — brand (2 cols) + 4 nav sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 mb-14">

          {/* Brand column — 2 cols */}
          <div className="lg:col-span-2 relative">
            <Link href="/" className="flex items-center gap-3 mb-5" aria-label="FlowMarket Home">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-xl rotate-6" />
                <div className="absolute inset-0 bg-[#111118] rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold gradient-text">F</span>
                </div>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Flow<span className="gradient-text">Market</span>
              </span>
            </Link>

            <p className="text-gray-400 mb-7 max-w-xs leading-relaxed text-sm">
              La marketplace de référence pour les workflows n8n prêts à l&apos;emploi.
              Automatisez votre business avec des templates testés par des experts.
            </p>

            {/* Social links */}
            <div className="flex flex-wrap gap-2.5 mb-7">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-xl bg-[#111118] border border-[#2a2a3a] flex items-center justify-center text-gray-500 transition-all duration-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:scale-110"
                >
                  <Icon name={social.name} className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "shield", text: "Sécurisé" },
                { icon: "check", text: "Vérifié" },
                { icon: "lock", text: "Privé" },
              ].map((badge) => (
                <span
                  key={badge.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111118]/60 backdrop-blur border border-[#2a2a3a] text-xs text-gray-500"
                >
                  <Icon name={badge.icon} className="w-3 h-3" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Nav columns — 1 col each */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-5">
                <span className="w-1 h-4 rounded-full bg-gradient-to-b from-indigo-500 to-amber-500" />
                <h4 className="text-white font-semibold tracking-wide uppercase text-xs">{section.title}</h4>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-white transition-colors duration-200 text-sm group flex items-center gap-1.5"
                    >
                      <span className="w-0 group-hover:w-2 h-px bg-indigo-400 transition-all duration-200 rounded-full" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-[#111118]/60 backdrop-blur border border-[#2a2a3a] rounded-2xl p-6 lg:p-8 mb-14 hover:border-indigo-500/30 transition-colors duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Left — Copy */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                <Icon name="mail" className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-base mb-1">Newsletter</p>
                <p className="text-gray-500 text-sm mb-2">Recevez les nouveaux workflows et astuces n8n</p>
                <p className="text-indigo-400 text-xs font-medium">+3 200 automatiseurs déjà abonnés</p>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-3">
                <label htmlFor="footer-email" className="sr-only">Email</label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="flex-1 bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all text-sm"
                  disabled={subscribed}
                />
                <button
                  type="submit"
                  disabled={subscribed || !email.includes("@")}
                  className="btn-shine px-6 py-3 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {subscribed ? (
                    <span className="flex items-center gap-2">
                      <Icon name="check" className="w-4 h-4" />
                      Inscrit !
                    </span>
                  ) : (
                    "S'inscrire →"
                  )}
                </button>
              </form>
              <p className="text-gray-600 text-xs">
                Pas de spam, désinscription en 1 clic.{" "}
                <Link href="/privacy" className="text-indigo-400 hover:underline">
                  Politique de confidentialité
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative border-t border-[#2a2a3a] pt-8 flex flex-col sm:flex-row justify-between items-center gap-5">
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-gray-600 text-sm">
            <p>&copy; {new Date().getFullYear()} FlowMarket. Tous droits réservés.</p>
            <span className="hidden sm:block text-gray-700">·</span>
            <div className="flex items-center gap-1.5">
              <span>Fait avec</span>
              <span className="text-red-400 animate-pulse">♥</span>
              <span>pour la communauté n8n</span>
            </div>
          </div>

          {/* Right side: status + lang + back to top */}
          <div className="flex items-center gap-3">
            {/* Operational status */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Tous systèmes opérationnels
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111118] border border-[#2a2a3a] text-gray-400 text-xs cursor-pointer hover:border-indigo-500/40 hover:text-white transition-all">
              <span>🇫🇷</span>
              <span>FR</span>
            </div>

            {/* Back to top */}
            <a
              href="#top"
              className="group w-10 h-10 rounded-xl bg-[#111118] border border-[#2a2a3a] flex items-center justify-center text-gray-500 transition-all duration-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:-translate-y-1"
              aria-label="Retour en haut"
            >
              <Icon name="chevronUp" className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}