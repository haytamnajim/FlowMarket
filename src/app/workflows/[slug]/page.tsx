import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkflowBySlug, workflows } from "@/data/workflows";
import WorkflowCard from "@/components/WorkflowCard";
import Icon from "@/components/Icon";

interface Props {
  params: Promise<{ slug: string }>;
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

  return (
    <main className="min-h-screen pt-16">
      {/* Breadcrumb */}
      <div className="border-b border-[#2a2a3a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-indigo-400 transition-colors">Accueil</Link>
            <span>/</span>
            <Link href="/workflows" className="hover:text-indigo-400 transition-colors">Workflows</Link>
            <span>/</span>
            <span className="text-white">{workflow.title}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] overflow-hidden">
              {/* Hero image */}
              <div className="aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-amber-500/20" />
                <div className="absolute inset-0 bg-grid opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/30 to-amber-500/30 flex items-center justify-center">
                    <Icon name="bolt" className="w-10 h-10 text-white" />
                  </div>
                </div>
              </div>

              <div className="p-8">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="text-sm font-medium text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20">
                    {workflow.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {workflow.complexity}
                  </span>
                  <span className="text-sm text-gray-500">
                    {workflow.nodes} nœuds
                  </span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {workflow.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Icon name="star" className="w-5 h-5 text-amber-400" />
                    <span className="font-semibold text-white">{workflow.rating}</span>
                    <span className="text-gray-500">({workflow.reviews} avis)</span>
                  </div>
                  <span className="text-[#2a2a3a]">|</span>
                  <span className="text-gray-400">
                    {workflow.downloads} téléchargements
                  </span>
                </div>

                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                    {workflow.longDescription}
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-[#2a2a3a]">
                  <h3 className="text-sm font-semibold text-white mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm text-gray-400 bg-[#0a0a0f] px-3 py-1.5 rounded-lg border border-[#2a2a3a]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold gradient-text mb-1">
                  {workflow.price}€
                </div>
                <div className="text-sm text-gray-500">
                  Paiement unique
                </div>
              </div>

              <button className="btn-shine w-full bg-gradient-to-r from-indigo-500 to-amber-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all mb-4">
                Acheter maintenant
              </button>

              <button className="w-full border border-[#2a2a3a] text-gray-300 py-3 rounded-xl font-medium hover:bg-[#0a0a0f] hover:border-indigo-500/50 transition-all mb-6">
                Télécharger la démo
              </button>

              <div className="space-y-4 text-sm">
                {[
                  "Accès immédiat après achat",
                  "Mises à jour gratuites",
                  "Support par email",
                  "Garantie 30 jours satisfait ou remboursé",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-gray-400">
                    <Icon name="check" className="w-5 h-5 text-emerald-400" />
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-[#2a2a3a]">
                <h4 className="font-semibold text-white mb-3">Ce que vous obtenez</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  {[
                    "Fichier JSON n8n",
                    "Documentation complète",
                    "Configuration pas à pas",
                    "Support par email",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-indigo-400">
                        <Icon name="check" className="w-4 h-4" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related workflows */}
        {relatedWorkflows.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">
              Workflows similaires
            </h2>
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
