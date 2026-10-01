export interface Workflow {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  category: string;
  tags: string[];
  image: string;
  rating: number;
  reviews: number;
  downloads: number;
  featured: boolean;
  createdAt: string;
  nodes: number;
  complexity: "Débutant" | "Intermédiaire" | "Avancé";
}

export const categories = [
  { id: "marketing", name: "Marketing", icon: "marketing" },
  { id: "productivity", name: "Productivité", icon: "productivity" },
  { id: "ecommerce", name: "E-commerce", icon: "ecommerce" },
  { id: "hr", name: "RH & Recrutement", icon: "hr" },
  { id: "finance", name: "Finance", icon: "finance" },
  { id: "dev", name: "Développement", icon: "dev" },
  { id: "ai", name: "Intelligence Artificielle", icon: "ai" },
  { id: "social", name: "Réseaux Sociaux", icon: "social" },
];

export const workflows: Workflow[] = [
  {
    id: "1",
    title: "Automatisation Lead Scoring",
    slug: "lead-scoring-automation",
    description: "Scoring automatique des leads avec envoi de notifications Slack et CRM sync.",
    longDescription: `Ce workflow automatise entièrement le processus de scoring de leads.

**Fonctionnalités :**
- Récupération des leads depuis un formulaire
- Calcul du score basé sur le comportement
- Envoi de notification Slack pour les leads chauds
- Synchronisation avec le CRM
- Mise à jour automatique du statut

**Outils utilisés :** n8n, Slack, HubSpot, Google Sheets`,
    price: 29,
    category: "marketing",
    tags: ["leads", "scoring", "slack", "crm"],
    image: "/workflows/lead-scoring.png",
    rating: 4.8,
    reviews: 24,
    downloads: 156,
    featured: true,
    createdAt: "2025-01-15",
    nodes: 12,
    complexity: "Intermédiaire",
  },
  {
    id: "2",
    title: "Facturation Automatique",
    slug: "facturation-automatique",
    description: "Génération et envoi automatique de factures avec suivi des paiements.",
    longDescription: `Automatisez toute votre facturation de A à Z.

**Fonctionnalités :**
- Création de factures PDF
- Envoi automatique par email
- Suivi des paiements
- Relances automatiques
- Export comptable

**Outils utilisés :** n8n, Stripe, Gmail, Google Drive`,
    price: 49,
    category: "finance",
    tags: ["facturation", "stripe", "pdf", "automatisation"],
    image: "/workflows/facturation.png",
    rating: 4.9,
    reviews: 31,
    downloads: 203,
    featured: true,
    createdAt: "2025-02-10",
    nodes: 18,
    complexity: "Avancé",
  },
  {
    id: "3",
    title: "Veille Concurrentielle",
    slug: "veille-concurrentielle",
    description: "Surveille vos concurrents et vous alerte des changements importants.",
    longDescription: `Restez informé de tout ce que font vos concurrents.

**Fonctionnalités :**
- Surveillance des sites web
- Alertes prix et nouveaux produits
- Rapport hebdomadaire automatique
- Analyse des réseaux sociaux
- Dashboard de suivi

**Outils utilisés :** n8n, RSS, Twitter/X, Google Sheets`,
    price: 39,
    category: "marketing",
    tags: ["veille", "concurrents", "surveillance", "rapport"],
    image: "/workflows/veille.png",
    rating: 4.6,
    reviews: 18,
    downloads: 89,
    featured: false,
    createdAt: "2025-03-05",
    nodes: 15,
    complexity: "Intermédiaire",
  },
  {
    id: "4",
    title: "Onboarding Client Automatisé",
    slug: "onboarding-client",
    description: "Parcours d'onboarding complet avec emails, tâches et documents.",
    longDescription: `Offrez une expérience d'onboarding impeccable à vos clients.

**Fonctionnalités :**
- Séquence d'emails personnalisés
- Création de tâches dans le CRM
- Envoi de documents et contrats
- Planification de rendez-vous
- Suivi de progression

**Outils utilisés :** n8n, Calendly, DocuSign, Notion`,
    price: 59,
    category: "productivity",
    tags: ["onboarding", "client", "emails", "crm"],
    image: "/workflows/onboarding.png",
    rating: 4.7,
    reviews: 22,
    downloads: 134,
    featured: true,
    createdAt: "2025-01-28",
    nodes: 22,
    complexity: "Avancé",
  },
  {
    id: "5",
    title: "Rapport Marketing Hebdo",
    slug: "rapport-marketing-hebdo",
    description: "Génère automatiquement un rapport marketing complet chaque semaine.",
    longDescription: `Fini les rapports manuels, tout est automatique.

**Fonctionnalités :**
- Collecte de données multi-sources
- Calcul des KPIs automatique
- Génération de graphiques
- Envoi par email aux stakeholders
- Archivage automatique

**Outils utilisés :** n8n, Google Analytics, Meta Ads, Google Sheets`,
    price: 35,
    category: "marketing",
    tags: ["rapport", "marketing", "analytics", "automatisation"],
    image: "/workflows/rapport.png",
    rating: 4.5,
    reviews: 15,
    downloads: 78,
    featured: false,
    createdAt: "2025-04-12",
    nodes: 14,
    complexity: "Intermédiaire",
  },
  {
    id: "6",
    title: "Chatbot Support Client",
    slug: "chatbot-support",
    description: "Chatbot intelligent avec escalade automatique vers un humain.",
    longDescription: `Répondez à vos clients 24/7 avec un chatbot intelligent.

**Fonctionnalités :**
- Réponses automatiques basées sur FAQ
- Escalade vers un agent humain
- Création de tickets support
- Satisfaction client post-chat
- Analytics des conversations

**Outils utilisés :** n8n, OpenAI, Zendesk, Slack`,
    price: 79,
    category: "ai",
    tags: ["chatbot", "support", "ia", "openai"],
    image: "/workflows/chatbot.png",
    rating: 4.9,
    reviews: 42,
    downloads: 267,
    featured: true,
    createdAt: "2025-02-20",
    nodes: 25,
    complexity: "Avancé",
  },
  {
    id: "7",
    title: "Backup Automatique Base de Données",
    slug: "backup-automatique",
    description: "Sauvegarde quotidienne avec vérification et alertes.",
    longDescription: `Protégez vos données avec un système de backup fiable.

**Fonctionnalités :**
- Backup quotidien automatique
- Vérification d'intégrité
- Alertes en cas d'échec
- Rotation des sauvegardes
- Restauration en 1 clic

**Outils utilisés :** n8n, PostgreSQL, AWS S3, Slack`,
    price: 19,
    category: "dev",
    tags: ["backup", "base de données", "sécurité", "aws"],
    image: "/workflows/backup.png",
    rating: 4.4,
    reviews: 12,
    downloads: 95,
    featured: false,
    createdAt: "2025-05-01",
    nodes: 10,
    complexity: "Débutant",
  },
  {
    id: "8",
    title: "Gestion des Réseaux Sociaux",
    slug: "gestion-reseaux-sociaux",
    description: "Planification et publication automatique sur tous vos réseaux.",
    longDescription: `Gérez tous vos réseaux sociaux depuis un seul workflow.

**Fonctionnalités :**
- Planification de contenu
- Publication multi-plateformes
- Réponses automatiques aux commentaires
- Analytics de performance
- Calendrier éditorial

**Outils utilisés :** n8n, Buffer, Twitter, LinkedIn, Instagram`,
    price: 45,
    category: "social",
    tags: ["réseaux sociaux", "publication", "planification", "marketing"],
    image: "/workflows/social.png",
    rating: 4.6,
    reviews: 28,
    downloads: 189,
    featured: false,
    createdAt: "2025-03-18",
    nodes: 16,
    complexity: "Intermédiaire",
  },
];

export function getWorkflowBySlug(slug: string): Workflow | undefined {
  return workflows.find((w) => w.slug === slug);
}

export function getFeaturedWorkflows(): Workflow[] {
  return workflows.filter((w) => w.featured);
}

export function getWorkflowsByCategory(category: string): Workflow[] {
  return workflows.filter((w) => w.category === category);
}

export function searchWorkflows(query: string): Workflow[] {
  const q = query.toLowerCase();
  return workflows.filter(
    (w) =>
      w.title.toLowerCase().includes(q) ||
      w.description.toLowerCase().includes(q) ||
      w.tags.some((t) => t.toLowerCase().includes(q))
  );
}
