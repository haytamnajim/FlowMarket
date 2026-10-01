import Link from "next/link";
import Icon from "@/components/Icon";

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-amber-500/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            À propos de <span className="gradient-text">FlowMarket</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            La marketplace de référence pour les workflows n8n prêts à l&apos;emploi
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-8 md:p-12">
            <h2 className="text-2xl font-bold text-white mb-4">Notre mission</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Chez FlowMarket, nous croyons que l&apos;automatisation devrait être accessible à tous.
              Notre mission est de fournir des workflows n8n de haute qualité, testés et optimisés,
              pour aider les entreprises à gagner du temps et à se concentrer sur ce qui compte vraiment.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Avec une expérience en Python, n8n, Make, Zapier et d&apos;autres outils d&apos;automatisation,
              nous créons des solutions qui répondent aux besoins réels des entreprises modernes.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "target",
                title: "Qualité",
                description: "Chaque workflow est testé et optimisé avant d'être mis en ligne.",
              },
              {
                icon: "users",
                title: "Communauté",
                description: "Nous construisons une communauté d'experts en automatisation.",
              },
              {
                icon: "lightbulb",
                title: "Innovation",
                description: "Nous explorons constamment de nouvelles façons d'automatiser.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center bg-[#111118] rounded-2xl border border-[#2a2a3a] p-8 card-hover">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center">
                  <Icon name={value.icon} className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                <p className="text-gray-500">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Prêt à commencer ?
          </h2>
          <p className="text-gray-400 mb-8">
            Explorez notre catalogue et trouvez le workflow parfait pour votre besoin.
          </p>
          <Link
            href="/workflows"
            className="btn-shine inline-block bg-gradient-to-r from-indigo-500 to-amber-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
          >
            Explorer les workflows
          </Link>
        </div>
      </section>
    </main>
  );
}
