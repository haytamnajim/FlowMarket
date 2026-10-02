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

  const footerSections = {
    product: [
      { label: "Workflows", href: "/workflows" },
      { label: "Catégories", href: "/categories" },
      { label: "Tarifs", href: "/pricing" },
      { label: "Nouveautés", href: "/workflows?sort=new" },
      { label: "Populaires", href: "/workflows?sort=popular" },
    ],
    resources: [
      { label: "Documentation", href: "/docs" },
      { label: "Guide n8n", href: "/guide" },
      { label: "Blog", href: "/blog" },
      { label: "API Reference", href: "/api-docs" },
      { label: "Communauté", href: "/community" },
    ],
    company: [
      { label: "À propos", href: "/about" },
      { label: "Devenir vendeur", href: "/seller" },
      { label: "Carrières", href: "/careers" },
      { label: "Presse", href: "/press" },
      { label: "Contact", href: "/contact" },
    ],
    legal: [
      { label: "CGU", href: "/terms" },
      { label: "Confidentialité", href: "/privacy" },
      { label: "Remboursements", href: "/refund" },
      { label: "Cookies", href: "/cookies" },
      { label: "Licences", href: "/licenses" },
    ],
  };

  const socialLinks = [
    { name: "twitter", label: "X (Twitter)", href: "https://twitter.com/flowmarket" },
    { name: "github", label: "GitHub", href: "https://github.com/flowmarket" },
    { name: "linkedin", label: "LinkedIn", href: "https://linkedin.com/company/flowmarket" },
    { name: "youtube", label: "YouTube", href: "https://youtube.com/@flowmarket" },
  ];

  return (
    <footer className="relative bg-[#0a0a0f] border-t border-[#2a2a3a]">
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 via-transparent to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-amber-500/10 rounded-full blur-[200px]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Main grid - 4 equal columns for navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-1 relative">
            <Link href="/" className="flex items-center gap-3 mb-6" aria-label="FlowMarket Home">
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
            
            <p className="text-gray-400 mb-8 max-w-xs leading-relaxed text-sm">
              La marketplace de référence pour les workflows n8n prêts à l'emploi. 
              Automatisez votre business avec des templates testés par des experts.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group w-10 h-10 rounded-xl bg-[#111118] border border-[#2a2a3a] flex items-center justify-center text-gray-500 transition-all duration-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:scale-110"
                >
                  <Icon name={social.name} className="w-5 h-5" />
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
                <span key={badge.text} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#111118]/60 backdrop-blur border border-[#2a2a3a] text-xs text-gray-500">
                  <Icon name={badge.icon} className="w-3 h-3" />
                  {badge.text}
                </span>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide uppercase text-sm">Produit</h4>
            <ul className="space-y-3">
              {[
                { label: "Workflows", href: "/workflows" },
                { label: "Catégories", href: "/categories" },
                { label: "Tarifs", href: "/pricing" },
                { label: "Nouveautés", href: "/workflows?sort=new" },
                { label: "Populaires", href: "/workflows?sort=popular" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center gap-2"
                  >
                    {link.label}
                    <Icon name="arrowRight" className="w-4 h-4 text-transparent group-hover:text-indigo-400 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide uppercase text-sm">Ressources</h4>
            <ul className="space-y-3">
              {[
                { label: "Documentation", href: "/docs" },
                { label: "Guide n8n", href: "/guide" },
                { label: "Blog", href: "/blog" },
                { label: "API Reference", href: "/api-docs" },
                { label: "Communauté", href: "/community" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center gap-2"
                  >
                    {link.label}
                    <Icon name="arrowRight" className="w-4 h-4 text-transparent group-hover:text-indigo-400 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide uppercase text-sm">Entreprise</h4>
            <ul className="space-y-3">
              {[
                { label: "À propos", href: "/about" },
                { label: "Devenir vendeur", href: "/seller" },
                { label: "Carrières", href: "/careers" },
                { label: "Presse", href: "/press" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center gap-2"
                  >
                    {link.label}
                    <Icon name="arrowRight" className="w-4 h-4 text-transparent group-hover:text-indigo-400 transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section - Legal links (left) + Newsletter (right) - BALANCED */}
        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Legal links - Left side */}
            <div className="lg:col-span-1">
              <h4 className="text-white font-semibold mb-5 tracking-wide uppercase text-sm">Légal</h4>
              <ul className="space-y-3">
                {[
                  { label: "CGU", href: "/terms" },
                  { label: "Confidentialité", href: "/privacy" },
                  { label: "Remboursements", href: "/refund" },
                  { label: "Cookies", href: "/cookies" },
                  { label: "Licences", href: "/licenses" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm group flex items-center gap-2"
                    >
                      {link.label}
                      <Icon name="arrowRight" className="w-4 h-4 text-transparent group-hover:text-indigo-400 transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter - Right side - BALANCED */}
            <div className="lg:col-span-1">
              <div className="bg-[#111118]/60 backdrop-blur border border-[#2a2a3a] rounded-2xl p-6 lg:p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="mail" className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base">Newsletter</p>
                    <p className="text-gray-500 text-sm">Recevez les nouveaux workflows et astuces n8n</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 mb-4">
                  <label htmlFor="footer-email" className="sr-only">Email</label>
                  <input
                    id="footer-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    className="flex-1 bg-[#0a0a0f] border border-[#2a2a3a] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
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
                      "S'inscrire"
                    )}
                  </button>
                </form>
                <p className="text-gray-600 text-xs text-center">
                  Pas de spam, désinscription en 1 clic.{" "}
                  <Link href="/privacy" className="text-indigo-400 hover:underline">Politique de confidentialité</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="relative mt-16">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent rounded-full blur-[100px]" />
          
          <div className="relative border-t border-[#2a2a3a] pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 text-gray-500 text-sm">
              <p>&copy; {new Date().getFullYear()} FlowMarket. Tous droits réservés.</p>
              <div className="flex items-center gap-1">
                <span className="text-gray-600">Fait avec</span>
                <span className="text-red-400 animate-pulse">&hearts;</span>
                <span className="text-gray-600">pour la communauté n8n</span>
              </div>
            </div>

            {/* Back to top */}
            <div className="flex items-center justify-center sm:justify-end">
              <a
                href="#top"
                className="group w-12 h-12 rounded-xl bg-[#111118] border border-[#2a2a3a] flex items-center justify-center text-gray-500 transition-all duration-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:-translate-y-1"
                aria-label="Retour en haut"
              >
                <Icon name="chevronUp" className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}