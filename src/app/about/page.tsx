"use client";

import Link from "next/link";
import Icon from "@/components/Icon";
import InteractiveParticles from "@/components/InteractiveParticles";
import FadeIn from "@/components/FadeIn";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16 bg-[#0a0a0f] text-white selection:bg-indigo-500/30 selection:text-indigo-200" id="top">

      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-hidden border-b border-white/10 flex flex-col justify-center items-center">
        {/* Interactive background particles */}
        <InteractiveParticles count={45} />

        {/* Video Background with ultra-smooth blend */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-25 scale-105"
          >
            <source src="/videos/about-hero.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Ambient glow & overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/40 to-[#0a0a0f] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-amber-500/10 pointer-events-none" />
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <FadeIn direction="down">
            <div className="inline-flex items-center gap-2.5 bg-[#111118]/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 mb-8 shadow-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-gray-300">Pionnier des Workflows n8n · France & International</span>
            </div>
          </FadeIn>

          <FadeIn direction="up" delay={100}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              L&apos;automatisation, enfin{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                accessible à tous
              </span>
            </h1>
          </FadeIn>

          <FadeIn direction="up" delay={200}>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              FlowMarket a été conçu pour libérer le potentiel des entreprises grâce aux meilleurs workflows n8n testés, documentés et prêts à déployer en un clic.
            </p>
          </FadeIn>

          <FadeIn direction="up" delay={300}>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/workflows"
                className="btn-shine px-7 py-3.5 bg-gradient-to-r from-indigo-500 to-amber-500 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Explorer la marketplace →
              </Link>
              <Link
                href="#mission"
                className="px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-medium text-sm sm:text-base backdrop-blur-xl transition-all"
              >
                Découvrir notre vision
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Key Numbers / Stats Banner */}
      <section className="relative border-b border-white/10 bg-[#0d0d16]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "1 200+", label: "Workflows vérifiés", icon: "bolt", glow: "from-indigo-500/20 to-indigo-500/5" },
              { value: "10k+", label: "Créateurs & Entreprises", icon: "users", glow: "from-amber-500/20 to-amber-500/5" },
              { value: "4.9/5", label: "Satisfaction certifiée", icon: "star", glow: "from-emerald-500/20 to-emerald-500/5" },
              { value: "99.9%", label: "Uptime & Fiabilité", icon: "server", glow: "from-purple-500/20 to-purple-500/5" },
            ].map((stat, i) => (
              <FadeIn key={i} direction="up" delay={i * 80}>
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 text-center group">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.glow} border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={stat.icon} className="w-5 h-5 text-indigo-300 group-hover:text-amber-300 transition-colors" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Notre Mission */}
      <section id="mission" className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn direction="left">
              <div>
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  Notre Mission
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  La puissance de <span className="bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">n8n sans la friction</span>
                </h2>
                <p className="text-gray-400 leading-relaxed text-base sm:text-lg mb-6">
                  Construire des automatisations complexes à partir de zéro demande des semaines d&apos;ingénierie et de tests. Nous avons créé FlowMarket pour inverser cette équation.
                </p>
                <p className="text-gray-400 leading-relaxed text-base mb-8">
                  Chaque template de notre marketplace est minutieusement vérifié, structuré pour n8n Cloud ou Self-hosted, et prêt à générer de la valeur immédiatement.
                </p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">100% Modulaire</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">Adaptez chaque nœud selon vos credentials en 2 minutes.</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-xl mb-1">Support Dédié</h4>
                    <p className="text-gray-500 text-xs sm:text-sm">Assistance technique par des spécialistes n8n qualifiés.</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={150}>
              <div className="relative bg-[#111118]/80 backdrop-blur-2xl rounded-3xl border border-white/10 p-6 sm:p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

                {/* Video Preview Card */}
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 mb-6 shadow-lg group">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  >
                    <source src="/videos/data-flow.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 bg-black/60 px-2.5 py-1 rounded-md backdrop-blur-md border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Workflow en exécution temps réel
                    </span>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {[
                    "Templates certifiés et exempts d'erreurs d'exécution",
                    "Guide pas-à-pas illustré avec chaque package JSON",
                    "Mises à jour garanties lors des sorties majeures de n8n",
                    "Politique garantie satisfait ou remboursé sous 30 jours",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
                        <Icon name="check" className="w-3 h-3 text-emerald-400" />
                      </div>
                      <span className="text-gray-300 text-sm font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Chronologie / Notre Histoire */}
      <section className="py-24 bg-[#0a0a0f] border-t border-white/10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold uppercase tracking-wider">
                Notre Histoire
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                De l&apos;idée à la <span className="bg-gradient-to-r from-amber-400 to-indigo-400 bg-clip-text text-transparent">référence n8n</span>
              </h2>
            </div>
          </FadeIn>

          <div className="relative">
            {/* Barre de timeline continue */}
            <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500 opacity-40 hidden sm:block" />

            <div className="space-y-12">
              {[
                {
                  period: "2024 · T1",
                  title: "Le constat",
                  desc: "Confrontés au manque de bibliothèques éprouvées pour n8n, nous lançons le prototype de FlowMarket.",
                  badge: "Genèse",
                },
                {
                  period: "2024 · T2",
                  title: "Lancement de la Bêta",
                  desc: "Mise en ligne des 50 premiers workflows. Plus de 500 passionnés d'automatisation adoptent la plateforme en 15 jours.",
                  badge: "Adoption",
                },
                {
                  period: "2024 · T3",
                  title: "Ouverture aux créateurs",
                  desc: "Lancement du programme Partenaires et monétisation pour les meilleurs ingénieurs d'automatisation du marché.",
                  badge: "Écosystème",
                },
                {
                  period: "2025 · Aujourd'hui",
                  title: "Marché de référence",
                  desc: "+1 200 workflows actifs et une communauté de plus de 10 000 créateurs connectant des milliers d'outils au quotidien.",
                  badge: "Leadership",
                },
              ].map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <FadeIn key={idx} direction={isEven ? "left" : "right"} delay={idx * 100}>
                    <div className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-12 ${isEven ? "sm:flex-row-reverse" : ""}`}>
                      <div className="flex-1 w-full">
                        <div className="bg-[#111118]/80 backdrop-blur-xl border border-white/10 hover:border-indigo-500/40 p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 group">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-mono text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-md border border-indigo-500/20">
                              {step.period}
                            </span>
                            <span className="text-xs text-gray-500 font-medium">{step.badge}</span>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                        </div>
                      </div>

                      {/* Indicateur central */}
                      <div className="w-8 h-8 rounded-full bg-[#0a0a0f] border-2 border-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10 flex-shrink-0">
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                      </div>

                      <div className="flex-1 hidden sm:block" />
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* L'Équipe */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider">
                Notre Équipe
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                Des experts passionnés par <span className="bg-gradient-to-r from-emerald-400 to-indigo-400 bg-clip-text text-transparent">l&apos;automatisation</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">
                Une équipe d&apos;ingénieurs et de spécialistes produit dédiés à l&apos;écosystème n8n.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                initials: "AH",
                name: "Ahmed H.",
                role: "Fondateur & Lead Architecte",
                bio: "Expert n8n & intégrations complexes. 5+ années d'expérience en Python et APIs temps réel.",
                gradient: "from-indigo-500 to-purple-600",
                tags: ["n8n Core", "Python", "API"],
              },
              {
                initials: "SF",
                name: "Sophie F.",
                role: "Head of Product",
                bio: "Spécialiste de l'automatisation e-commerce et CRM à grande échelle pour les entreprises.",
                gradient: "from-amber-500 to-orange-600",
                tags: ["E-commerce", "Growth", "Workflows"],
              },
              {
                initials: "TM",
                name: "Thomas M.",
                role: "Lead Développeur",
                bio: "Contributeur open-source et concepteur des solutions de monitoring de workflows haute disponibilité.",
                gradient: "from-emerald-500 to-teal-600",
                tags: ["TypeScript", "DevOps", "Sécurité"],
              },
            ].map((member, i) => (
              <FadeIn key={member.name} direction="up" delay={i * 120}>
                <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-7 text-center hover:border-indigo-500/40 hover:-translate-y-1.5 transition-all duration-300 shadow-xl group">
                  <div className={`w-20 h-20 mx-auto mb-5 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-black/40 group-hover:scale-105 transition-transform duration-300`}>
                    {member.initials}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-indigo-400 text-xs sm:text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-5">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {member.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400 text-xs font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Nos Valeurs */}
      <section className="py-24 bg-[#0d0d16]/80 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
                Nos piliers d&apos;excellence
              </h2>
              <p className="text-gray-400 text-sm sm:text-base">Ce qui guide chacune de nos créations pour la communauté n8n.</p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: "target",
                title: "Exigence & Zéro bug",
                desc: "Chaque workflow subit une batterie d'exécutions réelles avant d'être publié. Pas de code approximatif.",
                color: "text-indigo-400",
                bg: "bg-indigo-500/10 border-indigo-500/20",
              },
              {
                icon: "users",
                title: "Communauté engagée",
                desc: "Nous co-développons avec les utilisateurs n8n. Vos besoins réels orientent les templates prioritaires.",
                color: "text-amber-400",
                bg: "bg-amber-500/10 border-amber-500/20",
              },
              {
                icon: "lightbulb",
                title: "Compatibilité perpétuelle",
                desc: "Nous surveillons chaque version de n8n pour garantir le fonctionnement ininterrompu de vos automates.",
                color: "text-emerald-400",
                bg: "bg-emerald-500/10 border-emerald-500/20",
              },
            ].map((val, i) => (
              <FadeIn key={val.title} direction="up" delay={i * 100}>
                <div className="bg-[#111118]/80 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 p-8 text-center transition-all duration-300 group shadow-xl">
                  <div className={`w-14 h-14 mx-auto mb-6 rounded-2xl ${val.bg} border flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={val.icon} className={`w-7 h-7 ${val.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{val.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 relative overflow-hidden border-t border-white/10">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-6">
              Passez à la vitesse supérieure
            </h2>
            <p className="text-gray-400 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Téléchargez votre premier workflow en quelques secondes et commencez à automatiser dès aujourd&apos;hui.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/workflows"
                className="btn-shine inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-8 py-4 rounded-xl font-bold text-base shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Icon name="bolt" className="w-5 h-5" />
                Explorer les workflows
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-medium text-base hover:bg-white/10 transition-all backdrop-blur-md"
              >
                <Icon name="mail" className="w-5 h-5 text-gray-400" />
                Contacter l&apos;équipe
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
