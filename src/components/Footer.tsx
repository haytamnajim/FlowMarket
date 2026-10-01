import Link from "next/link";
import Icon from "@/components/Icon";

export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a3a] bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-amber-500 rounded-xl rotate-6" />
                <div className="absolute inset-0 bg-[#111118] rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold gradient-text">F</span>
                </div>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Flow<span className="gradient-text">Market</span>
              </span>
            </Link>
            <p className="text-gray-500 max-w-md leading-relaxed">
              La marketplace de référence pour les workflows n8n prêts à l&apos;emploi.
              Automatisez votre business avec des templates testés et optimisés par des experts.
            </p>
            <div className="flex gap-3 mt-6">
              {[
                { name: "twitter", label: "Twitter" },
                { name: "linkedin", label: "LinkedIn" },
                { name: "github", label: "GitHub" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-[#111118] border border-[#2a2a3a] flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  <Icon name={social.name} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Navigation</h3>
            <ul className="space-y-3">
              {[
                { href: "/workflows", label: "Workflows" },
                { href: "/categories", label: "Catégories" },
                { href: "/pricing", label: "Tarifs" },
                { href: "/about", label: "À propos" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Légal</h3>
            <ul className="space-y-3">
              {[
                { href: "/terms", label: "CGU" },
                { href: "/privacy", label: "Confidentialité" },
                { href: "/refund", label: "Remboursements" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#2a2a3a] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} FlowMarket. Tous droits réservés.
          </p>
          <p className="text-gray-600 text-sm flex items-center gap-2">
            Fait avec <span className="text-red-400">&hearts;</span> pour la communauté n8n
          </p>
        </div>
      </div>
    </footer>
  );
}
