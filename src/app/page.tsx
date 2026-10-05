"use client";

import Link from "next/link";
import { useState } from "react";
import { getFeaturedWorkflows, categories, getWorkflowsByCategory } from "@/data/workflows";
import WorkflowCard from "@/components/WorkflowCard";
import Icon from "@/components/Icon";
import HeroBackground from "@/components/HeroBackground";
import InteractiveParticles from "@/components/InteractiveParticles";
import QuickViewModal from "@/components/QuickViewModal";
import FadeIn from "@/components/FadeIn";
import HeroAppMorpher from "@/components/HeroAppMorpher";

export default function Home() {
  const featuredWorkflows = getFeaturedWorkflows();
  const [quickViewWorkflow, setQuickViewWorkflow] = useState<typeof featuredWorkflows[0] | null>(null);

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative min-h-[100vh] overflow-hidden">
          <HeroBackground />
          <InteractiveParticles count={60} />
          {/* Hero video background */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.06] pointer-events-none"
          >
            <source src="/videos/hero-workflow.mp4" type="video/mp4" />
          </video>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-24 z-10">
            <div className="text-center max-w-5xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-400">+200 workflows disponibles</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-[1.1] tracking-tight">
                Automatisez votre{" "}
                <span className="relative">
                  <span className="gradient-text">business</span>
                  <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                    <path d="M2 10C50 2 150 2 198 10" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="200" y2="0">
                        <stop stopColor="#6366f1" />
                        <stop offset="1" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <br />
                en quelques clics<HeroAppMorpher />
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Des centaines de workflows n8n testés et optimisés. Importez, personnalisez,
                automatisez. Gagnez des heures chaque semaine.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link
                  href="/workflows"
                  className="btn-shine relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all"
                >
                  Explorer les workflows
                </Link>
                <Link
                  href="/about"
                  className="px-8 py-4 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] text-white rounded-xl font-semibold text-lg hover:bg-[#1a1a24] hover:border-indigo-500/50 transition-all"
                >
                  En savoir plus
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-8 max-w-lg mx-auto">
                {[
                  { value: "1 200+", label: "Workflows" },
                  { value: "10k+", label: "Automatiseurs" },
                  { value: "4.9★", label: "Note moyenne" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Trust Badges */}
              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1.5 bg-[#111118]/50 backdrop-blur border border-[#2a2a3a] px-4 py-2 rounded-xl">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  Garantie 30j
                </span>
                <span className="flex items-center gap-1.5 bg-[#111118]/50 backdrop-blur border border-[#2a2a3a] px-4 py-2 rounded-xl">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  Paiement sécurisé
                </span>
                <span className="flex items-center gap-1.5 bg-[#111118]/50 backdrop-blur border border-[#2a2a3a] px-4 py-2 rounded-xl">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  Accès immédiat
                </span>
                <span className="flex items-center gap-1.5 bg-[#111118]/50 backdrop-blur border border-[#2a2a3a] px-4 py-2 rounded-xl">
                  <Icon name="check" className="w-4 h-4 text-emerald-400" />
                  Support inclus
                </span>
              </div>
          </div>
        </div>
      </section>

      {/* Categories */}
        <FadeIn direction="up">
        <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Explorez par catégorie
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Trouvez le workflow parfait pour votre besoin
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/workflows?category=${cat.id}`}
                className={`relative overflow-hidden bg-[#111118] rounded-2xl p-6 text-center border ${cat.borderColor} card-hover group transition-all duration-500 ${cat.hoverColor}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Icon container */}
                <div className={`relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${cat.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`} />
                  <Icon name={cat.icon} className={`relative w-7 h-7 transition-colors duration-300 ${cat.color.replace('from-', 'text-').replace(' to-', '')}`} />
                </div>
                
                <h3 className="relative font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-amber-400 transition-all duration-300">
                  {cat.name}
                </h3>
                
                {/* Description */}
                <p className="relative mt-3 text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                  {cat.description}
                </p>
                
                {/* Workflow count */}
                <div className="relative mt-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0f]/50 backdrop-blur border border-[#2a2a3a] text-xs font-medium text-gray-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all duration-300">
                    <Icon name="bolt" className="w-3 h-3" />
                    {getWorkflowsByCategory(cat.id).length} workflows
                  </span>
                </div>
                
                {/* Arrow indicator */}
                <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#0a0a0f]/50 backdrop-blur border border-[#2a2a3a] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                  <Icon name="arrowRight" className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Featured Workflows */}
      <FadeIn direction="up">
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Workflows populaires
              </h2>
              <p className="text-gray-500">
                Les meilleurs templates sélectionnés pour vous
              </p>
            </div>
            <Link
              href="/workflows"
              className="hidden sm:inline-flex items-center gap-2 text-indigo-400 font-medium hover:text-indigo-300 transition-colors"
            >
              Voir tout
              <Icon name="arrowRight" className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredWorkflows.slice(0, 6).map((workflow) => (
              <WorkflowCard 
                key={workflow.id} 
                workflow={workflow} 
                onQuickView={setQuickViewWorkflow}
              />
            ))}
          </div>

          <div className="text-center mt-10 sm:hidden">
            <Link
              href="/workflows"
              className="inline-flex items-center gap-2 text-indigo-400 font-medium"
            >
              Voir tous les workflows
              <Icon name="arrowRight" className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      </FadeIn>

      {/* Testimonials */}
      <FadeIn direction="up">
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/3 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
              <Icon name="star" className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-400">+10 000 automatiseurs satisfaits</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ce qu&apos;ils en <span className="gradient-text">disent</span>
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Des entrepreneurs et développeurs qui ont transformé leur business avec nos workflows</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Marie L.",
                role: "Fondatrice, AgenceDigitale",
                avatar: "M",
                rating: 5,
                text: "J'ai économisé 15h par semaine grâce au workflow de prospection LinkedIn. ROI en 2 jours, c'est bluffant.",
                workflow: "LinkedIn Lead Gen",
                color: "from-indigo-500 to-purple-500",
              },
              {
                name: "Thomas R.",
                role: "CEO, SaaS Startup",
                avatar: "T",
                rating: 5,
                text: "La qualité des workflows est exceptionnelle. Documentation claire, support réactif. Je recommande à 100%.",
                workflow: "E-commerce Automation",
                color: "from-amber-500 to-orange-500",
              },
              {
                name: "Sarah K.",
                role: "Freelance Marketing",
                avatar: "S",
                rating: 5,
                text: "En tant que débutante sur n8n, les workflows avec leur doc détaillée m'ont permis d'automatiser en 30 min.",
                workflow: "Content Scheduler",
                color: "from-emerald-500 to-teal-500",
              },
            ].map((testimonial, i) => (
              <div
                key={i}
                className="relative bg-[#111118] rounded-2xl p-6 border border-[#2a2a3a] hover:border-indigo-500/30 transition-all duration-300 card-hover group"
              >
                {/* Quote icon */}
                <div className="absolute top-5 right-5 text-4xl text-gray-700 font-serif leading-none">&#8220;</div>

                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, s) => (
                    <Icon key={s} name="star" className="w-4 h-4 text-amber-400" />
                  ))}
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6 relative z-10">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Workflow tag */}
                <div className="mb-5">
                  <span className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <Icon name="bolt" className="w-3 h-3" />
                    {testimonial.workflow}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-[#2a2a3a]">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-gray-500 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* How it works - Modern Design */}
      <FadeIn direction="up">
      <section className="py-28 relative overflow-hidden">
        {/* Background atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/3 via-amber-500/3 to-transparent" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-20 relative z-10">
            <div className="inline-flex items-center gap-3 bg-[#111118]/60 backdrop-blur border border-[#2a2a3a] rounded-full px-5 py-2 mb-6">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400 font-medium">Processus en 3 étapes</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Comment ça <span className="gradient-text">marche</span> ?
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              De la découverte à l'activation, automatisez votre business en quelques minutes seulement.
            </p>
          </div>

          {/* Steps Timeline - Flexbox layout for equal height */}
          <div className="relative z-10">
            {/* Center connecting line - positioned at center of step numbers */}
            <div className="hidden md:block absolute left-1/2 top-[80px] bottom-[80px] w-0.5 -translate-x-1/2">
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500" />
              {/* Step number markers on the line */}
              <div className="absolute top-0 left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-indigo-500 border-4 border-[#0a0a0f] shadow-[0_0_0_4px_rgba(99,102,241,0.3)] animate-pulse" />
              <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 border-4 border-[#0a0a0f] shadow-[0_0_0_4px_rgba(245,158,11,0.3)]" />
              <div className="absolute bottom-0 left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-emerald-500 border-4 border-[#0a0a0f] shadow-[0_0_0_4px_rgba(16,185,129,0.3)]" />
            </div>

            {/* Flex container for equal height cards */}
            <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 relative z-10">
              {[
                {
                  step: "01",
                  number: 1,
                  title: "Choisissez votre workflow",
                  description: "Explorez notre catalogue de 200+ workflows testés. Filtrez par catégorie, prix ou popularité pour trouver la perle rare.",
                  icon: "search",
                  color: "from-indigo-500 to-indigo-400",
                  colorLight: "from-indigo-500/20 to-indigo-400/20",
                  colorBorder: "border-indigo-500/30",
                  hoverColor: "hover:border-indigo-500/50",
                  features: ["Catalogue 200+ workflows", "Filtres intelligents", "Aperçu détaillé", "Avis clients"],
                  illustration: "search",
                },
                {
                  step: "02",
                  number: 2,
                  title: "Importez en 1 clic",
                  description: "Téléchargez le fichier JSON et importez-le directement dans votre instance n8n (Cloud ou Self-hosted).",
                  icon: "download",
                  color: "from-amber-500 to-orange-400",
                  colorLight: "from-amber-500/20 to-orange-400/20",
                  colorBorder: "border-amber-500/30",
                  hoverColor: "hover:border-amber-500/50",
                  features: ["Compatible n8n Cloud & Self-hosted", "Import natif JSON", "Configuration auto-détectée", "Documentation incluse"],
                  illustration: "download",
                },
                {
                  step: "03",
                  number: 3,
                  title: "Activez & profitez",
                  description: "Configurez vos credentials, activez le workflow et laissez l'automatisation travailler pour vous 24/7.",
                  icon: "rocket",
                  color: "from-emerald-500 to-teal-400",
                  colorLight: "from-emerald-500/20 to-teal-400/20",
                  colorBorder: "border-emerald-500/30",
                  hoverColor: "hover:border-emerald-500/50",
                  features: ["Configuration guidée", "Test en mode sécurisé", "Monitoring temps réel", "Support 7j/7"],
                  illustration: "rocket",
                },
              ].map((item, index) => (
                <div
                  key={item.step}
                  className="relative group flex-1 flex flex-col"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  {/* Step Card - equal height with flex flex-col */}
                  <div className={`relative flex flex-col h-full bg-[#111118] rounded-3xl p-8 md:p-10 border ${item.colorBorder} transition-all duration-500 ${item.hoverColor} card-hover group relative overflow-hidden`}>
                    {/* Background glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.colorLight} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />
                    
                    {/* Step number badge - centered on the vertical line */}
                    <div className="relative flex justify-center mb-6">
                      <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-bold text-white ${item.color} shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all duration-300 group-hover:scale-110 z-10`}>
                        {item.number}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-20 animate-pulse" />
                      </div>
                      {/* Connector line from badge to card top - desktop only */}
                      <div className="hidden md:block absolute top-full left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500" />
                    </div>

                    {/* Icon */}
                    <div className={`relative w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center ${item.colorLight} transition-all duration-500 group-hover:scale-110`}>
                      <div className={`absolute inset-0 ${item.color} opacity-10 animate-pulse rounded-2xl`} />
                      <Icon name={item.illustration} className={`relative w-8 h-8 transition-colors duration-300 ${item.color.replace('from-', 'text-').replace(' to-', '')}`} />
                    </div>

                    {/* Content - flex grow to fill space */}
                    <div className="text-center flex-1 flex flex-col">
                      <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed mb-6 relative z-10 flex-1">{item.description}</p>
                      
                      {/* Features list */}
                      <ul className="space-y-3 relative z-10">
                        {item.features.map((feature, fi) => (
                          <li key={fi} className="flex items-center gap-3 text-sm text-gray-500 group-hover:text-gray-300 transition-colors duration-300" style={{ animationDelay: `${(index * 4 + fi) * 100}ms` }}>
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.color}`}>
                              <Icon name="check" className="w-3 h-3 text-white" />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile connectors */}
            <div className="md:hidden flex flex-col items-center gap-6 mt-8">
              {[0, 1].map((i) => (
                <div key={i} className="w-0.5 h-16 bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500" />
              ))}
            </div>
          </div>

          {/* Bottom CTA within section */}
          <div className="mt-20 text-center relative z-10">
            <div className="inline-flex items-center gap-3 bg-[#111118]/60 backdrop-blur border border-[#2a2a3a] rounded-full px-6 py-3">
              <Icon name="bolt" className="w-5 h-5 text-amber-400" />
              <span className="text-white font-medium">Prêt à commencer ?</span>
              <Link
                href="/workflows"
                className="btn-shine px-6 py-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-full font-medium text-sm hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Explorer les workflows
              </Link>
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-20 right-10 w-24 h-24 bg-indigo-500/10 rounded-full blur-[80px] animate-float" />
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-[80px] animate-float" />
        <div className="absolute top-1/2 left-5 w-16 h-16 bg-emerald-500/10 rounded-full blur-[60px] animate-pulse" />
      </section>
      </FadeIn>

      {/* FAQ */}
      <FadeIn direction="up">
      <section className="py-24 relative">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
            <p className="text-gray-500">Tout ce que vous devez savoir avant de commencer</p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Est-ce compatible avec n8n Cloud et Self-hosted ?",
                a: "Oui, tous nos workflows sont compatibles avec n8n Cloud et les instances Self-hosted (v1.0+). Le fichier JSON s'importe nativement depuis l'interface n8n.",
              },
              {
                q: "Que se passe-t-il si un workflow ne fonctionne pas ?",
                a: "Nous offrons une garantie satisfait ou remboursé de 30 jours. Notre support email 7j/7 vous accompagne également pour la configuration et le débogage.",
              },
              {
                q: "Ai-je besoin de connaissances techniques ?",
                a: "Non ! Chaque workflow est livré avec une documentation pas-à-pas illustrée. Les workflows 🟢 Débutant sont accessibles sans aucune expérience en développement.",
              },
              {
                q: "Les mises à jour sont-elles incluses ?",
                a: "Oui, toutes les mises à jour futures du workflow acheté sont incluses à vie, sans frais supplémentaires. Vous recevez une notification par email à chaque mise à jour.",
              },
              {
                q: "Puis-je revendre ou partager les workflows ?",
                a: "Non, la licence est personnelle et non transférable. Vous pouvez utiliser le workflow pour votre usage ou vos clients, mais pas le revendre tel quel.",
              },
            ].map((item, i) => (
              <details
                key={i}
                className="group bg-[#111118] rounded-2xl border border-[#2a2a3a] hover:border-indigo-500/30 transition-colors duration-300 overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                  <span className="text-white font-medium">{item.q}</span>
                  <span className="w-6 h-6 rounded-full bg-[#2a2a3a] flex items-center justify-center flex-shrink-0 group-open:bg-indigo-500/20 group-open:rotate-45 transition-all duration-300">
                    <Icon name="plus" className="w-3 h-3 text-gray-400 group-open:text-indigo-400" />
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="text-gray-400 text-sm leading-relaxed border-t border-[#2a2a3a] pt-4">{item.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
      </FadeIn>

      {/* CTA */}
      <FadeIn direction="up">
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-[#0a0a0f] rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-[#2a2a3a]">
            {/* Video Background */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover opacity-50"
              >
                <source src="/videos/cta-canvas.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/70 via-transparent to-[#0a0a0f]/70 rounded-3xl" />

            {/* Subtle glow accents */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur border border-white/10 rounded-full px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm text-gray-300">+10 000 automatiseurs nous font confiance</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Prêt à automatiser votre business ?
              </h2>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Rejoignez des milliers d&apos;entreprises qui utilisent nos workflows pour gagner des heures chaque semaine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/workflows"
                  className="btn-shine inline-block bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all"
                >
                  Explorer les workflows
                </Link>
                <Link
                  href="/about"
                  className="inline-block bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] text-white px-10 py-5 rounded-xl font-semibold text-lg hover:border-indigo-500/50 transition-all"
                >
                  En savoir plus
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      </FadeIn>
    </main>
    <QuickViewModal 
      workflow={quickViewWorkflow} 
      isOpen={!!quickViewWorkflow} 
      onClose={() => setQuickViewWorkflow(null)} 
    />
  </>
  );
}