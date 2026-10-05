import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkflowBySlug, workflows } from "@/data/workflows";
import WorkflowCard from "@/components/WorkflowCard";
import Icon from "@/components/Icon";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);
  if (!workflow) return {};
  return {
    title: `${workflow.title} — FlowMarket`,
    description: workflow.description,
    keywords: workflow.tags,
  };
}

export default async function WorkflowDetailPage({ params }: Props) {
  const { slug } = await params;
  const workflow = getWorkflowBySlug(slug);

  if (!workflow) {
    notFound();
  }

  const relatedWorkflows = workflows
    .filter((w) => w.category === workflow.category && w.id !== workflow.id)
    .slice(0, 3);

  const complexityColor =
    workflow.complexity === "Débutant"
      ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : workflow.complexity === "Intermédiaire"
      ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
      : "text-red-400 bg-red-500/10 border-red-500/20";

  return (
    <main className="min-h-screen pt-16" id="top">
      {/* Breadcrumb */}
      <div className="border-b border-[#2a2a3a] bg-[#0a0a0f]/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-400 transition-colors">Accueil</Link>
            <Icon name="arrowRight" className="w-3 h-3 text-gray-700" />
            <Link href="/workflows" className="hover:text-indigo-400 transition-colors">Workflows</Link>
            <Icon name="arrowRight" className="w-3 h-3 text-gray-700" />
            <span className="text-gray-300 truncate max-w-[200px]">{workflow.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Main content ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Hero card */}
            <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] overflow-hidden">
              {/* Banner */}
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-transparent to-amber-500/25" />
                <div className="absolute inset-0 bg-grid opacity-40" />
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-500/40 to-amber-500/40 backdrop-blur flex items-center justify-center border border-white/10 shadow-2xl">
                    <Icon name="bolt" className="w-12 h-12 text-white" />
                  </div>
                </div>
                {workflow.featured && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Icon name="star" className="w-3 h-3" />
                    Populaire
                  </span>
                )}
                <span className="absolute top-4 right-4 bg-[#111118]/80 backdrop-blur text-gray-300 text-xs font-medium px-3 py-1.5 rounded-full border border-[#2a2a3a]">
                  {workflow.nodes} nœuds
                </span>
              </div>

              <div className="p-8">
                {/* Meta badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20">
                    {workflow.category}
                  </span>
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${complexityColor}`}>
                    {workflow.complexity === "Débutant" ? "🟢" : workflow.complexity === "Intermédiaire" ? "🟠" : "🔴"}{" "}
                    {workflow.complexity}
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  {workflow.title}
                </h1>

                {/* Stats row */}
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-[#2a2a3a]">
                  <div className="flex items-center gap-1.5">
                    <Icon name="star" className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold text-white">{workflow.rating}</span>
                    <span className="text-gray-500 text-sm">({workflow.reviews} avis)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Icon name="download" className="w-4 h-4" />
                    <span>{workflow.downloads.toLocaleString()} téléchargements</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <Icon name="cpu" className="w-4 h-4" />
                    <span>{workflow.nodes} nœuds</span>
                  </div>
                </div>

                {/* Description */}
                <div className="whitespace-pre-line text-gray-300 leading-relaxed text-[15px] mb-8">
                  {workflow.longDescription}
                </div>

                {/* Tags */}
                <div className="pt-6 border-t border-[#2a2a3a]">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/workflows?search=${tag}`}
                        className="text-sm text-gray-400 bg-[#0a0a0f] px-3 py-1.5 rounded-full border border-[#2a2a3a] hover:border-indigo-500/40 hover:text-indigo-400 transition-all"
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* What you get */}
            <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon name="check" className="w-5 h-5 text-emerald-400" />
                Ce que vous obtenez
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: "download", text: "Fichier JSON n8n prêt à importer" },
                  { icon: "lightbulb", text: "Documentation complète pas-à-pas" },
                  { icon: "cpu", text: "Configuration guidée (credentials)" },
                  { icon: "mail", text: "Support email prioritaire 7j/7" },
                  { icon: "bolt", text: "Mises à jour gratuites à vie" },
                  { icon: "shield", text: "Garantie satisfait ou remboursé 30j" },
                ].map((item) => (
                  <div key={item.text} className="flex items-start gap-3 p-4 rounded-2xl bg-[#0a0a0f]/50 border border-[#2a2a3a]">
                    <div className="w-8 h-8 rounded-xl bg-indigo-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={item.icon} className="w-4 h-4 text-indigo-400" />
                    </div>
                    <span className="text-gray-300 text-sm leading-relaxed">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compatibility */}
            <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-8">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Icon name="server" className="w-5 h-5 text-indigo-400" />
                Prérequis &amp; Compatibilité
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { icon: "server", label: "n8n Cloud / Self-hosted", color: "text-indigo-400" },
                  { icon: "database", label: "Compatible v1.0+", color: "text-amber-400" },
                  { icon: "lock", label: "Credentials requis", color: "text-emerald-400" },
                  { icon: "download", label: "Import JSON natif", color: "text-amber-400" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#0a0a0f]/50 border border-[#2a2a3a] text-center">
                    <Icon name={item.icon} className={`w-6 h-6 ${item.color}`} />
                    <span className="text-gray-400 text-xs leading-snug">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-[#111118] rounded-3xl border border-[#2a2a3a] p-6 sticky top-24 hover:border-indigo-500/30 transition-colors duration-500">
              {/* Price */}
              <div className="text-center mb-6 pb-6 border-b border-[#2a2a3a]">
                <div className="text-5xl font-bold gradient-text mb-1">{workflow.price}€</div>
                <div className="text-sm text-gray-500">Paiement unique • Accès à vie</div>
              </div>

              {/* Buy button */}
              <button className="btn-shine w-full bg-gradient-to-r from-indigo-500 to-amber-500 text-white py-4 rounded-2xl font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/25 transition-all mb-3">
                Acheter maintenant
              </button>
              <button className="w-full border border-[#2a2a3a] text-gray-300 py-3 rounded-2xl font-medium hover:bg-[#0a0a0f] hover:border-indigo-500/50 transition-all mb-6 text-sm">
                Voir la démo gratuite
              </button>

              {/* Guarantees */}
              <div className="space-y-3 mb-6">
                {[
                  { icon: "bolt", text: "Accès immédiat après achat" },
                  { icon: "check", text: "Mises à jour gratuites à vie" },
                  { icon: "mail", text: "Support email 7j/7" },
                  { icon: "shield", text: "Garantie 30 jours" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3 text-sm text-gray-400">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Rating summary */}
              <div className="pt-6 border-t border-[#2a2a3a]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-gray-500">Note des utilisateurs</span>
                  <div className="flex items-center gap-1">
                    <Icon name="star" className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-semibold text-sm">{workflow.rating}</span>
                    <span className="text-gray-600 text-xs">/ 5</span>
                  </div>
                </div>
                {/* Stars bar */}
                <div className="h-1.5 bg-[#2a2a3a] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full"
                    style={{ width: `${(workflow.rating / 5) * 100}%` }}
                  />
                </div>
                <p className="text-gray-600 text-xs mt-2 text-center">{workflow.reviews} avis vérifiés</p>
              </div>
            </div>
          </div>
        </div>

        {/* Related workflows */}
        {relatedWorkflows.length > 0 && (
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">
                Workflows <span className="gradient-text">similaires</span>
              </h2>
              <Link href={`/workflows?category=${workflow.category}`} className="text-indigo-400 text-sm hover:text-indigo-300 flex items-center gap-1 transition-colors">
                Voir tous
                <Icon name="arrowRight" className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedWorkflows.map((w) => (
                <WorkflowCard key={w.id} workflow={w} />
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
