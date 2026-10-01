import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">n8n</span>
              </div>
              <span className="text-xl font-bold text-white">
                Flow<span className="text-orange-500">Market</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              La marketplace de référence pour les workflows n8n prêts à l'emploi.
              Automatisez votre business en quelques clics.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link href="/workflows" className="hover:text-orange-500 transition-colors">Workflows</Link></li>
              <li><Link href="/categories" className="hover:text-orange-500 transition-colors">Catégories</Link></li>
              <li><Link href="/pricing" className="hover:text-orange-500 transition-colors">Tarifs</Link></li>
              <li><Link href="/about" className="hover:text-orange-500 transition-colors">À propos</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><Link href="/terms" className="hover:text-orange-500 transition-colors">CGU</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-500 transition-colors">Confidentialité</Link></li>
              <li><Link href="/refund" className="hover:text-orange-500 transition-colors">Remboursements</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} FlowMarket. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
