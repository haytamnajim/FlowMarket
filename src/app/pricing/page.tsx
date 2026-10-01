import Link from "next/link";
import Icon from "@/components/Icon";

export default function PricingPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-amber-500/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Tarifs <span className="gradient-text">simples</span> et transparents
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Payez une seule fois, utilisez à vie. Pas d&apos;abonnement caché.
          </p>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free */}
            <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-8 flex flex-col card-hover">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Gratuit</h3>
                <p className="text-gray-500 text-sm">Pour découvrir la plateforme</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">0€</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "3 workflows gratuits",
                  "Accès à la communauté",
                  "Support par email",
                  "Mises à jour gratuites",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-400">
                    <Icon name="check" className="w-5 h-5 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/workflows"
                className="block text-center border border-[#2a2a3a] text-gray-300 py-3 rounded-xl font-medium hover:bg-[#0a0a0f] hover:border-indigo-500/50 transition-all"
              >
                Commencer gratuitement
              </Link>
            </div>

            {/* Pro */}
            <div className="bg-[#111118] rounded-2xl border-2 border-indigo-500 p-8 flex flex-col relative card-hover">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-amber-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                Populaire
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Pro</h3>
                <p className="text-gray-500 text-sm">Pour les professionnels</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold gradient-text">29€</span>
                <span className="text-gray-500">/mois</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Workflows illimités",
                  "Support prioritaire",
                  "Accès aux nouveautés",
                  "Personnalisation incluse",
                  "Garantie 30 jours",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-400">
                    <Icon name="check" className="w-5 h-5 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/workflows"
                className="btn-shine block text-center bg-gradient-to-r from-indigo-500 to-amber-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transition-all"
              >
                Choisir Pro
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-8 flex flex-col card-hover">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Enterprise</h3>
                <p className="text-gray-500 text-sm">Pour les équipes</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-white">Sur mesure</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {[
                  "Tout de Pro",
                  "Workflows sur mesure",
                  "Support dédié",
                  "Formation d'équipe",
                  "SLA garanti",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-gray-400">
                    <Icon name="check" className="w-5 h-5 text-emerald-400" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="block text-center border border-[#2a2a3a] text-gray-300 py-3 rounded-xl font-medium hover:bg-[#0a0a0f] hover:border-indigo-500/50 transition-all"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "Comment fonctionne l'achat ?",
                a: "Après l'achat, vous recevez immédiatement un fichier JSON à importer dans votre instance n8n. C'est tout !",
              },
              {
                q: "Puis-je utiliser les workflows dans n8n Cloud ?",
                a: "Oui, tous nos workflows sont compatibles avec n8n Cloud et n8n self-hosted.",
              },
              {
                q: "Y a-t-il une garantie ?",
                a: "Oui, nous offrons une garantie satisfait ou remboursé de 30 jours sur tous nos workflows.",
              },
              {
                q: "Proposez-vous un support ?",
                a: "Oui, nous offrons un support par email pour tous les clients. Les clients Pro ont un support prioritaire.",
              },
            ].map((faq) => (
              <div key={faq.q} className="border-b border-[#2a2a3a] pb-6">
                <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
