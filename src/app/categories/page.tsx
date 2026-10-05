import Link from "next/link";
import { categories, getWorkflowsByCategory, workflows } from "@/data/workflows";
import Icon from "@/components/Icon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catégories — FlowMarket",
  description: "Explorez nos workflows n8n par domaine d'activité : marketing, e-commerce, IA, finance et plus.",
};

export default function CategoriesPage() {
  const totalWorkflows = workflows.length;

  return (
    <main className="min-h-screen pt-16" id="top">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden border-b border-[#2a2a3a]">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-amber-500/10" />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[150px]" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#111118]/80 backdrop-blur border border-[#2a2a3a] rounded-full px-4 py-2 mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400">{categories.length} catégories • {totalWorkflows} workflows</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-5">
            Toutes les <span className="gradient-text">catégories</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explorez nos workflows n8n classés par domaine d&apos;activité. Trouvez exactement ce dont vous avez besoin.
          </p>
        </div>
      </section>

      {/* Stats band */}
      <div className="border-b border-[#2a2a3a] bg-[#0a0a0f]/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: `${categories.length}`, label: "Catégories", icon: "bolt" },
              { value: `${totalWorkflows}+`, label: "Workflows", icon: "cpu" },
              { value: "4.9★", label: "Note moyenne", icon: "star" },
              { value: "10k+", label: "Automatiseurs", icon: "users" },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-[#2a2a3a] flex items-center justify-center flex-shrink-0">
                  <Icon name={stat.icon} className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-none">{stat.value}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((category, index) => {
              const catWorkflows = getWorkflowsByCategory(category.id);
              const count = catWorkflows.length;
              const avgRating =
                count > 0
                  ? (catWorkflows.reduce((s, w) => s + w.rating, 0) / count).toFixed(1)
                  : "—";
              const totalDownloads = catWorkflows.reduce((s, w) => s + w.downloads, 0);

              return (
                <Link
                  key={category.id}
                  href={`/workflows?category=${category.id}`}
                  className={`relative overflow-hidden bg-[#111118] rounded-2xl p-6 card-hover group transition-all duration-500 border ${category.borderColor} ${category.hoverColor}`}
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`relative w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`} />
                    <Icon
                      name={category.icon}
                      className={`relative w-7 h-7 transition-colors duration-300 ${category.color.replace("from-", "text-").replace(" to-", "")}`}
                    />
                  </div>

                  <h3 className="relative font-bold text-white text-lg mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-amber-400 transition-all duration-300">
                    {category.name}
                  </h3>

                  <p className="relative text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300 mb-5 leading-relaxed">
                    {category.description}
                  </p>

                  {/* Stats */}
                  <div className="relative flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0f]/60 backdrop-blur border border-[#2a2a3a] text-xs font-medium text-gray-400 group-hover:border-indigo-500/40 group-hover:text-indigo-300 transition-all duration-300">
                      <Icon name="bolt" className="w-3 h-3" />
                      {count} workflow{count > 1 ? "s" : ""}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0f]/60 backdrop-blur border border-[#2a2a3a] text-xs font-medium text-gray-400 group-hover:border-amber-500/40 group-hover:text-amber-300 transition-all duration-300">
                      <Icon name="star" className="w-3 h-3" />
                      {avgRating}
                    </span>
                    {totalDownloads > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0a0a0f]/60 backdrop-blur border border-[#2a2a3a] text-xs font-medium text-gray-400 transition-all duration-300">
                        <Icon name="download" className="w-3 h-3" />
                        {totalDownloads >= 1000 ? `${(totalDownloads / 1000).toFixed(1)}k` : totalDownloads}
                      </span>
                    )}
                  </div>

                  {/* Arrow */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#0a0a0f]/60 backdrop-blur border border-[#2a2a3a] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                    <Icon name="arrowRight" className="w-4 h-4 text-indigo-400" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-[#2a2a3a]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Vous ne savez pas par où commencer ?</h2>
          <p className="text-gray-500 mb-6">Explorez tous nos workflows et filtrez par catégorie, complexité ou prix directement depuis le catalogue.</p>
          <Link
            href="/workflows"
            className="btn-shine inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:shadow-indigo-500/25 transition-all"
          >
            <Icon name="bolt" className="w-4 h-4" />
            Explorer le catalogue complet
          </Link>
        </div>
      </section>
    </main>
  );
}