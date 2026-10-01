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
            {categories.map((category, index) => {
              const count = getWorkflowsByCategory(category.id).length;
              return (
                <Link
                  key={category.id}
                  href={`/workflows?category=${category.id}`}
                  className={`relative overflow-hidden bg-[#111118] rounded-2xl p-6 card-hover group transition-all duration-500 border ${category.borderColor} ${category.hoverColor}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Icon container */}
                  <div className={`relative w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${category.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-xl`} />
                    <Icon name={category.icon} className={`relative w-7 h-7 transition-colors duration-300 ${category.color.replace('from-', 'text-').replace(' to-', '')}`} />
                  </div>
                  
                  <h3 className="relative font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-400 group-hover:to-amber-400 transition-all duration-300">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="relative mt-3 text-sm text-gray-500 group-hover:text-gray-400 transition-colors duration-300">
                    {category.description}
                  </p>
                  
                  {/* Workflow count */}
                  <div className="relative mt-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0a0a0f]/50 backdrop-blur border border-[#2a2a3a] text-xs font-medium text-gray-400 group-hover:border-indigo-500/50 group-hover:text-indigo-400 transition-all duration-300">
                      <Icon name="bolt" className="w-3 h-3" />
                      {count} workflow{count > 1 ? "s" : ""}
                    </span>
                  </div>
                  
                  {/* Arrow indicator */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-[#0a0a0f]/50 backdrop-blur border border-[#2a2a3a] flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                    <Icon name="arrowRight" className="w-4 h-4 text-gray-500 group-hover:text-indigo-400 transition-colors" />
                  </div>
                </Link>
            )})}
          </div>
        </div>
      </section>
    </main>
  );
}