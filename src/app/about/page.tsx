import Link from "next/link";
import Icon from "@/components/Icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos — FlowMarket",
  description: "Découvrez FlowMarket, la marketplace de workflows n8n créée par des experts en automatisation pour aider les entreprises à gagner du temps.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16" id="top">

      {/* Hero */}
      <section className="relative py-24 overflow-hidden border-b border-[#2a2a3a]">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-[0.08]"
          >
            <source src="/videos/about-hero.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f]/80 via-[#0a0a0f]/60 to-[#0a0a0f]/80" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-amber-500/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px]" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">Fondé en 2024 · Paris, France</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            À propos de{" "}
            <span className="gradient-text">FlowMarket</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Nous croyons que l&apos;automatisation devrait être accessible à tous —
            pas seulement aux développeurs.
          </p>
        </div>
      </section>

      {/* Key numbers */}
      <section className="border-b border-[#2a2a3a] bg-[#0a0a0f]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "1 200+", label: "Workflows disponibles", icon: "bolt" },
              { value: "10k+", label: "Automatiseurs actifs", icon: "users" },
              { value: "4.9★", label: "Note moyenne", icon: "star" },
              { value: "99.9%", label: "Uptime garanti", icon: "server" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-500/15 to-amber-500/15 border border-[#2a2a3a] flex items-center justify-center group-hover:border-indigo-500/40 transition-colors duration-300">
                  <Icon name={stat.icon} className="w-5 h-5 text-indigo-400" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-amber-500" />
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Notre Mission</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-5 leading-snug">
                Rendre l&apos;automatisation <span className="gradient-text">accessible à tous</span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                Chez FlowMarket, nous croyons que chaque entreprise — quelle que soit sa taille —
                mérite d&apos;accéder aux mêmes outils d&apos;automatisation que les géants du secteur.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Forts de notre expérience en Python, n8n, Make et Zapier, nous créons des workflows
                prêts à l&apos;emploi qui répondent aux vrais besoins des entreprises modernes.
              </p>
            </div>
            <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-8 space-y-4">
              {/* Video illustration */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-[#2a2a3a]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80"
                  poster="/videos/data-flow.mp4"
                >
                  <source src="/videos/data-flow.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white/80 text-sm font-medium">
                    Flux de données n8n en temps réel
                  </p>
                </div>
              </div>

              {[
                { icon: "check", text: "Chaque workflow est testé en conditions réelles" },
                { icon: "check", text: "Documentation complète fournie avec chaque achat" },
                { icon: "check", text: "Support expert réactif 7 jours sur 7" },
                { icon: "check", text: "Mises à jour gratuites à vie" },
                { icon: "check", text: "Garantie satisfait ou remboursé 30 jours" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name={item.icon} className="w-3 h-3 text-emerald-400" />
                  </div>
                  <span className="text-gray-300 text-sm leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-amber-500" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Notre Histoire</span>
            </div>
            <h2 className="text-3xl font-bold text-white">De l&apos;idée au <span className="gradient-text">produit</span></h2>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-amber-500 to-emerald-500" />

            <div className="space-y-10">
              {[
                {
                  year: "2024",
                  quarter: "T1",
                  title: "L'idée naît",
                  desc: "Frustrés par le manque de workflows n8n de qualité, nous décidons de créer la première marketplace dédiée.",
                  color: "bg-indigo-500",
                  glow: "shadow-indigo-500/40",
                },
                {
                  year: "2024",
                  quarter: "T2",
                  title: "Lancement bêta",
                  desc: "Premiers workflows mis en ligne. 200 automatiseurs bêta-testeurs nous rejoignent dans les deux premières semaines.",
                  color: "bg-amber-500",
                  glow: "shadow-amber-500/40",
                },
                {
                  year: "2024",
                  quarter: "T3",
                  title: "1 000 clients",
                  desc: "Cap des 1 000 clients atteint. Lancement du support prioritaire et du programme de vente partenaires.",
                  color: "bg-emerald-500",
                  glow: "shadow-emerald-500/40",
                },
                {
                  year: "2024",
                  quarter: "T4",
                  title: "10k automatiseurs",
                  desc: "FlowMarket dépasse les 10 000 utilisateurs actifs et 1 200 workflows. La communauté grandit chaque jour.",
                  color: "bg-gradient-to-br from-indigo-500 to-amber-500",
                  glow: "shadow-indigo-500/40",
                },
              ].map((item, i) => (
                <div key={i} className="relative flex gap-8 items-start">
                  {/* Dot */}
                  <div className={`relative z-10 w-16 h-16 rounded-2xl ${item.color} flex flex-col items-center justify-center flex-shrink-0 shadow-lg ${item.glow}`}>
                    <span className="text-white text-xs font-bold">{item.year}</span>
                    <span className="text-white/70 text-[10px]">{item.quarter}</span>
                  </div>

                  <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-6 flex-1 hover:border-indigo-500/30 transition-colors duration-300">
                    <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="w-1 h-5 rounded-full bg-gradient-to-b from-indigo-500 to-amber-500" />
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">L&apos;Équipe</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">
              Des <span className="gradient-text">experts</span> passionnés
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Une équipe de développeurs et d&apos;entrepreneurs qui utilisent n8n au quotidien
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                initials: "AH",
                name: "Ahmed H.",
                role: "Fondateur & Lead n8n",
                bio: "Expert n8n & automatisation. 5 ans d'expérience en Python et intégrations API.",
                color: "from-indigo-500 to-purple-500",
                tags: ["n8n", "Python", "API"],
              },
              {
                initials: "SF",
                name: "Sophie F.",
                role: "Head of Product",
                bio: "Ex-Zapier. Spécialiste des workflows marketing et e-commerce à grande échelle.",
                color: "from-amber-500 to-orange-500",
                tags: ["Marketing", "E-commerce", "Zapier"],
              },
              {
                initials: "TM",
                name: "Thomas M.",
                role: "Lead Developer",
                bio: "Full-stack dev & architecte d'automatisations. Contributeur open-source n8n.",
                color: "from-emerald-500 to-teal-500",
                tags: ["TypeScript", "n8n", "DevOps"],
              },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-6 text-center card-hover group hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.color} flex items-center justify-center text-white text-2xl font-bold group-hover:scale-105 transition-transform duration-300 shadow-lg`}>
                  {member.initials}
                </div>
                <h3 className="text-white font-bold text-lg mb-0.5">{member.name}</h3>
                <p className="text-indigo-400 text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap justify-center gap-1.5">
                  {member.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-[#0a0a0f] border border-[#2a2a3a] text-gray-500 text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">Nos <span className="gradient-text">valeurs</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "target", title: "Qualité avant tout", desc: "Chaque workflow est testé et optimisé avant d'être mis en ligne. Zéro compromis.", color: "text-indigo-400 bg-indigo-500/10" },
              { icon: "users", title: "Communauté d'abord", desc: "Nous construisons avec notre communauté, pas pour elle. Vos retours façonnent le produit.", color: "text-amber-400 bg-amber-500/10" },
              { icon: "lightbulb", title: "Innovation continue", desc: "n8n évolue vite, nous aussi. Nos workflows sont toujours compatibles avec les dernières versions.", color: "text-emerald-400 bg-emerald-500/10" },
            ].map((value) => (
              <div key={value.title} className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-8 card-hover text-center group hover:border-indigo-500/30 transition-all duration-300">
                <div className={`w-14 h-14 mx-auto mb-5 rounded-xl ${value.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={value.icon} className={`w-7 h-7 ${value.color.split(" ")[0]}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Prêt à rejoindre la communauté ?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Explorez notre catalogue et trouvez le workflow parfait pour votre business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/workflows"
              className="btn-shine inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
            >
              <Icon name="bolt" className="w-5 h-5" />
              Explorer les workflows
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-[#111118] border border-[#2a2a3a] text-white px-8 py-4 rounded-xl font-semibold text-lg hover:border-indigo-500/50 transition-all"
            >
              <Icon name="mail" className="w-5 h-5" />
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
