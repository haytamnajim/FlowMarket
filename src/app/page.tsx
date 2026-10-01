import Link from "next/link";
import { getFeaturedWorkflows, categories } from "@/data/workflows";
import WorkflowCard from "@/components/WorkflowCard";
import Icon from "@/components/Icon";
import HeroBackground from "@/components/HeroBackground";

export default function Home() {
  const featuredWorkflows = getFeaturedWorkflows();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[100vh] overflow-hidden">
        <HeroBackground />

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
              en quelques clics
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
                { value: "200+", label: "Workflows" },
                { value: "500+", label: "Clients" },
                { value: "4.8", label: "Note moyenne" },
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/workflows?category=${cat.id}`}
                className="bg-[#111118] rounded-2xl p-6 text-center border border-[#2a2a3a] card-hover group"
              >
                <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon name={cat.icon} className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white group-hover:text-indigo-400 transition-colors">
                  {cat.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Workflows */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredWorkflows.slice(0, 6).map((workflow) => (
              <WorkflowCard key={workflow.id} workflow={workflow} />
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

      {/* How it works */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Automatisez votre business en 3 étapes simples
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Choisissez un workflow",
                description: "Parcourez notre catalogue et trouvez le workflow adapté à votre besoin.",
                icon: "search",
              },
              {
                step: "02",
                title: "Importez dans n8n",
                description: "Téléchargez le fichier JSON et importez-le directement dans votre instance n8n.",
                icon: "download",
              },
              {
                step: "03",
                title: "Personnalisez & lancez",
                description: "Adaptez le workflow à vos besoins et activez-le. C'est tout !",
                icon: "rocket",
              },
            ].map((item, index) => (
              <div key={item.step} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative bg-[#111118] rounded-2xl p-8 border border-[#2a2a3a] card-hover">
                  <div className="text-6xl font-bold text-[#2a2a3a] absolute top-4 right-4">
                    {item.step}
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center mb-4">
                    <Icon name={item.icon} className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <Icon name="arrowRight" className="w-8 h-8 text-[#2a2a3a]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-indigo-500/10 via-[#111118] to-amber-500/10 rounded-3xl p-12 md:p-16 text-center overflow-hidden border border-[#2a2a3a]">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Prêt à automatiser votre business ?
              </h2>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                Rejoignez des centaines d&apos;entreprises qui utilisent nos workflows pour gagner du temps.
              </p>
              <Link
                href="/workflows"
                className="btn-shine inline-block bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-10 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-indigo-500/25 transition-all"
              >
                Commencer maintenant
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
