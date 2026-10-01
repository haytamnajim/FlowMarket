import Link from "next/link";
import { categories, getWorkflowsByCategory } from "@/data/workflows";
import Icon from "@/components/Icon";

export default function CategoriesPage() {
  return (
    <main className="min-h-screen pt-16">
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-amber-500/10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Toutes les <span className="gradient-text">catégories</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Explorez nos workflows par domaine d&apos;activité
          </p>
        </div>
      </section>

      {/* Categories grid */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => {
              const count = getWorkflowsByCategory(category.id).length;
              return (
                <Link
                  key={category.id}
                  href={`/workflows?category=${category.id}`}
                  className="bg-[#111118] rounded-2xl border border-[#2a2a3a] p-6 card-hover group"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500/20 to-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={category.icon} className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {count} workflow{count > 1 ? "s" : ""}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
