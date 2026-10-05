"use client";

import Link from "next/link";
import { useState } from "react";
import Icon from "@/components/Icon";

const plans = [
  {
    id: "free",
    name: "Gratuit",
    desc: "Pour découvrir la plateforme",
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: "border-[#2a2a3a]",
    badge: null,
    cta: "Commencer gratuitement",
    ctaHref: "/workflows",
    ctaStyle: "border border-[#2a2a3a] text-gray-300 hover:bg-[#0a0a0f] hover:border-indigo-500/50",
    features: [
      { text: "3 workflows gratuits inclus", included: true },
      { text: "Accès à la communauté Discord", included: true },
      { text: "Support par email", included: true },
      { text: "Documentation complète", included: true },
      { text: "Workflows premium", included: false },
      { text: "Support prioritaire", included: false },
      { text: "Mises à jour automatiques", included: false },
    ],
  },
  {
    id: "pro",
    name: "Pro",
    desc: "Pour les professionnels sérieux",
    monthlyPrice: 29,
    yearlyPrice: 19,
    color: "border-indigo-500",
    badge: "Le plus populaire",
    cta: "Choisir Pro",
    ctaHref: "/workflows",
    ctaStyle: "bg-gradient-to-r from-indigo-500 to-amber-500 text-white hover:shadow-xl hover:shadow-indigo-500/25",
    features: [
      { text: "Workflows illimités", included: true },
      { text: "Accès à la communauté Discord", included: true },
      { text: "Support prioritaire 7j/7", included: true },
      { text: "Documentation complète", included: true },
      { text: "Accès aux nouveautés en avant-première", included: true },
      { text: "Personnalisation incluse", included: true },
      { text: "Garantie 30 jours", included: true },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    desc: "Pour les équipes et agences",
    monthlyPrice: null,
    yearlyPrice: null,
    color: "border-[#2a2a3a]",
    badge: null,
    cta: "Nous contacter",
    ctaHref: "/contact",
    ctaStyle: "border border-[#2a2a3a] text-gray-300 hover:bg-[#0a0a0f] hover:border-indigo-500/50",
    features: [
      { text: "Tout de Pro", included: true },
      { text: "Workflows sur mesure", included: true },
      { text: "Support dédié & gestionnaire de compte", included: true },
      { text: "Formation d'équipe (jusqu'à 10 personnes)", included: true },
      { text: "SLA garanti 99.9%", included: true },
      { text: "Facturation entreprise", included: true },
      { text: "Intégration SSO / LDAP", included: true },
    ],
  },
];

const faqs = [
  {
    q: "Comment fonctionne l'achat d'un workflow ?",
    a: "Après l'achat, vous recevez immédiatement un fichier JSON à importer dans votre instance n8n. Accès immédiat, sans attente.",
  },
  {
    q: "Puis-je utiliser les workflows dans n8n Cloud et Self-hosted ?",
    a: "Oui, tous nos workflows sont compatibles avec n8n Cloud et n8n Self-hosted (v1.0+). L'import se fait nativement depuis l'interface n8n.",
  },
  {
    q: "Y a-t-il une garantie ?",
    a: "Oui, nous offrons une garantie satisfait ou remboursé de 30 jours sur tous nos workflows. Aucune question posée.",
  },
  {
    q: "Les mises à jour sont-elles incluses ?",
    a: "Oui, toutes les mises à jour futures sont incluses à vie pour chaque workflow acheté, sans frais supplémentaires.",
  },
  {
    q: "Que comprend le plan Pro ?",
    a: "Le plan Pro vous donne accès à tous les workflows du catalogue, au support prioritaire 7j/7, aux nouveautés en avant-première et à une personnalisation incluse.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen pt-16" id="top">

      {/* Hero */}
      <section className="relative py-20 overflow-hidden border-b border-[#2a2a3a]">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-amber-500/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
            <Icon name="shield" className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs text-gray-400">Paiement unique • Aucun abonnement caché</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
            Tarifs <span className="gradient-text">simples</span> et transparents
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-8">
            Payez une seule fois, utilisez à vie. Garantie 30 jours satisfait ou remboursé.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-3 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full p-1.5">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                !isYearly
                  ? "bg-[#0a0a0f] text-white border border-[#2a2a3a] shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                isYearly
                  ? "bg-[#0a0a0f] text-white border border-[#2a2a3a] shadow-sm"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              Annuel
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
                -35%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative bg-[#111118] rounded-3xl border-2 ${plan.color} p-8 flex flex-col card-hover ${
                  plan.badge ? "shadow-2xl shadow-indigo-500/10 scale-[1.02]" : ""
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-xs font-bold px-5 py-1.5 rounded-full whitespace-nowrap">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-gray-500 text-sm">{plan.desc}</p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  {plan.monthlyPrice === null ? (
                    <div className="text-4xl font-bold text-white">Sur mesure</div>
                  ) : plan.monthlyPrice === 0 ? (
                    <div className="text-4xl font-bold text-white">0€</div>
                  ) : (
                    <div>
                      <div className="flex items-end gap-1">
                        <span className={`text-5xl font-bold ${plan.id === "pro" ? "gradient-text" : "text-white"}`}>
                          {isYearly ? plan.yearlyPrice : plan.monthlyPrice}€
                        </span>
                        <span className="text-gray-500 mb-1">/mois</span>
                      </div>
                      {isYearly && (
                        <p className="text-emerald-400 text-xs mt-1">
                          Facturé {(plan.yearlyPrice! * 12)}€/an — économisez {((plan.monthlyPrice! - plan.yearlyPrice!) * 12)}€
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className={`flex items-start gap-3 text-sm ${feature.included ? "text-gray-300" : "text-gray-600"}`}>
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        feature.included ? "bg-emerald-500/15" : "bg-[#2a2a3a]"
                      }`}>
                        {feature.included
                          ? <Icon name="check" className="w-3 h-3 text-emerald-400" />
                          : <Icon name="x" className="w-3 h-3 text-gray-600" />
                        }
                      </div>
                      {feature.text}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.ctaHref}
                  className={`btn-shine block text-center py-3.5 rounded-2xl font-semibold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-12">
            {[
              { icon: "shield", text: "Paiement sécurisé" },
              { icon: "check", text: "Garantie 30 jours" },
              { icon: "bolt", text: "Accès immédiat" },
              { icon: "lock", text: "Données privées" },
            ].map((badge) => (
              <span key={badge.text} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111118] border border-[#2a2a3a] text-sm text-gray-400">
                <Icon name={badge.icon} className="w-4 h-4 text-emerald-400" />
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-3">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
            <p className="text-gray-500">Tout ce que vous devez savoir sur nos tarifs</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-[#111118] rounded-2xl border border-[#2a2a3a] overflow-hidden hover:border-indigo-500/30 transition-colors duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-white font-medium">{faq.q}</span>
                  <span className={`w-6 h-6 rounded-full bg-[#2a2a3a] flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openFaq === i ? "bg-indigo-500/20 rotate-45" : ""
                  }`}>
                    <Icon name="plus" className={`w-3 h-3 transition-colors ${openFaq === i ? "text-indigo-400" : "text-gray-400"}`} />
                  </span>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-40" : "max-h-0"}`}>
                  <p className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-[#2a2a3a] pt-4">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
