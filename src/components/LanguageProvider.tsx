"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Language = "fr" | "en";
export type Currency = "EUR" | "USD";

export const translations = {
  fr: {
    // Nav
    nav_workflows: "Workflows",
    nav_categories: "Catégories",
    nav_pricing: "Tarifs",
    nav_contact: "Contact",
    nav_about: "À propos",
    nav_login: "Connexion",
    nav_explore: "Explorer",

    // Workflows Page Hero
    hero_badge: "Catalogue Officiel",
    hero_badge_verified: "flux n8n vérifiés",
    hero_title_prefix: "Tous les",
    hero_title_highlight: "Workflows n8n",
    hero_subtitle: "Découvrez des centaines de templates n8n prêts à l'emploi. Filtrez, testez et importez l'automatisation parfaite pour propulser votre entreprise.",
    search_placeholder: "Rechercher un workflow (ex: OpenAI, Lead Gen, Stripe, Telegram, Notion)...",
    search_ctrl_k: "Ctrl K",
    suggestions: "Suggestions :",
    tag_all: "Tous",
    tag_fav: "Mes Favoris",
    tag_ai: "Intelligence Artificielle",
    tag_free: "Gratuits",
    tag_marketing: "Marketing & Leads",
    tag_ecommerce: "E-commerce",
    tag_productivity: "Productivité",

    // Stats
    stat_workflows: "Workflows",
    stat_downloads: "Téléchargements",
    stat_avg_rating: "Note moyenne",
    stat_categories: "Catégories",

    // Toolbar & Grid
    toolbar_found: "workflow(s) trouvé(s)",
    toolbar_active_filters: "Filtres actifs appliqués",
    toolbar_display: "Affichage :",
    btn_preview: "Aperçu",
    btn_buy: "Acheter",
    btn_copied: "Copié !",
    btn_json: "JSON",
    free: "Gratuit",
    pipeline_label: "Pipeline :",
    load_more: "Voir plus de workflows",
    loading: "Chargement...",
    no_results_title: "Aucun workflow trouvé",
    no_results_desc: "Essayez d'ajuster vos critères de recherche ou réinitialisez les filtres pour voir l'ensemble du catalogue.",
    no_favorites_title: "Vous n'avez pas encore de favoris",
    no_favorites_desc: "Cliquez sur l'icône de cœur sur n'importe quel workflow pour l'enregistrer ici.",

    // Quick View Modal
    modal_interactive_canvas_title: "Graphe interactif de l'architecture n8n",
    modal_canvas_hint: "Flux en direct • Cliquez pour inspecter les nœuds",
    modal_copy_json: "Copier le JSON n8n",
    modal_json_copied: "JSON copié dans le presse-papier !",
    modal_buy_now: "Acheter maintenant",
    modal_download_free: "Télécharger gratuitement",
    modal_what_you_get: "Ce que vous obtenez",
    modal_requirements: "Prérequis & Compatibilité",

    // Footer
    footer_newsletter_title: "Restez à la pointe de l'automatisation",
    footer_newsletter_desc: "Recevez chaque semaine nos nouveaux templates, tutoriels et cas d'usage n8n.",
    footer_rights: "Tous droits réservés.",
  },
  en: {
    // Nav
    nav_workflows: "Workflows",
    nav_categories: "Categories",
    nav_pricing: "Pricing",
    nav_contact: "Contact",
    nav_about: "About",
    nav_login: "Login",
    nav_explore: "Explore",

    // Workflows Page Hero
    hero_badge: "Official Catalog",
    hero_badge_verified: "verified n8n flows",
    hero_title_prefix: "All",
    hero_title_highlight: "n8n Workflows",
    hero_subtitle: "Explore hundreds of ready-to-use n8n templates. Filter, test, and import the perfect automation to power up your business.",
    search_placeholder: "Search workflows (e.g. OpenAI, Lead Gen, Stripe, Telegram, Notion)...",
    search_ctrl_k: "Ctrl K",
    suggestions: "Suggestions:",
    tag_all: "All",
    tag_fav: "My Favorites",
    tag_ai: "Artificial Intelligence",
    tag_free: "Free",
    tag_marketing: "Marketing & Leads",
    tag_ecommerce: "E-commerce",
    tag_productivity: "Productivity",

    // Stats
    stat_workflows: "Workflows",
    stat_downloads: "Downloads",
    stat_avg_rating: "Average Rating",
    stat_categories: "Categories",

    // Toolbar & Grid
    toolbar_found: "workflow(s) found",
    toolbar_active_filters: "Active filters applied",
    toolbar_display: "View:",
    btn_preview: "Quick View",
    btn_buy: "Buy",
    btn_copied: "Copied!",
    btn_json: "JSON",
    free: "Free",
    pipeline_label: "Pipeline:",
    load_more: "Load more workflows",
    loading: "Loading...",
    no_results_title: "No workflows found",
    no_results_desc: "Try adjusting your search criteria or resetting filters to see the entire catalog.",
    no_favorites_title: "No favorites saved yet",
    no_favorites_desc: "Click the heart icon on any workflow card to save it here for easy access.",

    // Quick View Modal
    modal_interactive_canvas_title: "Interactive n8n Architecture Graph",
    modal_canvas_hint: "Live Execution Flow • Click nodes to inspect",
    modal_copy_json: "Copy n8n JSON",
    modal_json_copied: "JSON copied to clipboard!",
    modal_buy_now: "Buy Now",
    modal_download_free: "Download Free",
    modal_what_you_get: "What you get",
    modal_requirements: "Prerequisites & Compatibility",

    // Footer
    footer_newsletter_title: "Stay ahead with automation",
    footer_newsletter_desc: "Get our latest n8n templates, tutorials, and business playbooks every week.",
    footer_rights: "All rights reserved.",
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (amountEUR: number) => string;
  t: typeof translations["fr"];
}

const EUR_TO_USD_RATE = 1.09;

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  currency: "EUR",
  setCurrency: () => {},
  formatPrice: (amt) => `${amt}€`,
  t: translations.fr,
});

const STORAGE_LANG_KEY = "flowmarket_lang";
const STORAGE_CURRENCY_KEY = "flowmarket_currency";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>("fr");
  const [currency, setCurrencyState] = useState<Currency>("EUR");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem(STORAGE_LANG_KEY) as Language;
      if (savedLang === "fr" || savedLang === "en") {
        setLangState(savedLang);
      }
      const savedCurr = localStorage.getItem(STORAGE_CURRENCY_KEY) as Currency;
      if (savedCurr === "EUR" || savedCurr === "USD") {
        setCurrencyState(savedCurr);
      } else if (savedLang === "en") {
        setCurrencyState("USD");
      }
    } catch {
      // Ignore
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    // Auto sync currency to USD when switching to EN, EUR when switching to FR
    const nextCurrency: Currency = newLang === "en" ? "USD" : "EUR";
    setCurrencyState(nextCurrency);
    try {
      localStorage.setItem(STORAGE_LANG_KEY, newLang);
      localStorage.setItem(STORAGE_CURRENCY_KEY, nextCurrency);
    } catch {
      // Ignore
    }
  };

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    try {
      localStorage.setItem(STORAGE_CURRENCY_KEY, newCurrency);
    } catch {
      // Ignore
    }
  };

  const formatPrice = (amountEUR: number) => {
    if (amountEUR === 0) return lang === "fr" ? "Gratuit" : "Free";
    if (currency === "USD") {
      const usdAmount = Math.round(amountEUR * EUR_TO_USD_RATE);
      return `$${usdAmount}`;
    }
    return `${amountEUR}€`;
  };

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, currency, setCurrency, formatPrice, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
