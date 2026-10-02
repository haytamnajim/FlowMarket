import { PrismaClient, Role, WorkflowStatus, OrderStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seed...");

  // Create categories
  const categories = [
    {
      slug: "marketing",
      name: "Marketing",
      description: "Automatisez vos campagnes et générez des leads",
      icon: "marketing",
      color: "from-pink-500 to-rose-500",
    },
    {
      slug: "productivity",
      name: "Productivité",
      description: "Gagnez du temps au quotidien",
      icon: "productivity",
      color: "from-emerald-500 to-teal-500",
    },
    {
      slug: "ecommerce",
      name: "E-commerce",
      description: "Boostez vos ventes en ligne",
      icon: "ecommerce",
      color: "from-orange-500 to-amber-500",
    },
    {
      slug: "hr",
      name: "RH & Recrutement",
      description: "Simplifiez le recrutement et l'onboarding",
      icon: "hr",
      color: "from-violet-500 to-purple-500",
    },
    {
      slug: "finance",
      name: "Finance",
      description: "Automatisez la comptabilité et facturation",
      icon: "finance",
      color: "from-yellow-500 to-lime-500",
    },
    {
      slug: "dev",
      name: "Développement",
      description: "Accélérez le déploiement et le monitoring",
      icon: "dev",
      color: "from-blue-500 to-cyan-500",
    },
    {
      slug: "ai",
      name: "Intelligence Artificielle",
      description: "Intégrez l'IA dans vos processus",
      icon: "ai",
      color: "from-indigo-500 to-violet-500",
    },
    {
      slug: "social",
      name: "Réseaux Sociaux",
      description: "Gérez et automatisez vos réseaux sociaux",
      icon: "social",
      color: "from-red-500 to-pink-500",
    },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
  }
  console.log("✅ Categories created");

  // Create demo users
  const passwordHash = await bcrypt.hash("password123", 12);

  const admin = await prisma.user.upsert({
    where: { email: "admin@flowmarket.com" },
    update: {},
    create: {
      email: "admin@flowmarket.com",
      name: "Admin FlowMarket",
      passwordHash,
      role: Role.ADMIN,
      emailVerified: new Date(),
    },
  });

  const seller = await prisma.user.upsert({
    where: { email: "seller@flowmarket.com" },
    update: {},
    create: {
      email: "seller@flowmarket.com",
      name: "Demo Vendeur",
      passwordHash,
      role: Role.SELLER,
      emailVerified: new Date(),
    },
  });

  const buyer = await prisma.user.upsert({
    where: { email: "buyer@flowmarket.com" },
    update: {},
    create: {
      email: "buyer@flowmarket.com",
      name: "Demo Acheteur",
      passwordHash,
      role: Role.USER,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Demo users created");

  // Create tags
  const tags = [
    "automatisation", "leads", "facturation", "ia", "chatbot",
    "email", "crm", "slack", "webhook", "api", "database",
    "backup", "monitoring", "deployment", "testing", "seo",
    "social-media", "content", "analytics", "reporting", "stripe",
  ];

  for (const tagName of tags) {
    await prisma.tag.upsert({
      where: { slug: tagName.toLowerCase().replace(/\s+/g, "-") },
      update: {},
      create: {
        name: tagName,
        slug: tagName.toLowerCase().replace(/\s+/g, "-"),
      },
    });
  }
  console.log("✅ Tags created");

  // Get category IDs
  const catMarketing = await prisma.category.findUnique({ where: { slug: "marketing" } });
  const catProductivity = await prisma.category.findUnique({ where: { slug: "productivity" } });
  const catFinance = await prisma.category.findUnique({ where: { slug: "finance" } });
  const catAI = await prisma.category.findUnique({ where: { slug: "ai" } });
  const catDev = await prisma.category.findUnique({ where: { slug: "dev" } });
  const catSocial = await prisma.category.findUnique({ where: { slug: "social" } });

  // Get tag IDs
  const tagLeads = await prisma.tag.findUnique({ where: { slug: "leads" } });
  const tagCrm = await prisma.tag.findUnique({ where: { slug: "crm" } });
  const tagSlack = await prisma.tag.findUnique({ where: { slug: "slack" } });
  const tagFacturation = await prisma.tag.findUnique({ where: { slug: "facturation" } });
  const tagStripe = await prisma.tag.findUnique({ where: { slug: "stripe" } });
  const tagIA = await prisma.tag.findUnique({ where: { slug: "ia" } });
  const tagChatbot = await prisma.tag.findUnique({ where: { slug: "chatbot" } });
  const tagBackup = await prisma.tag.findUnique({ where: { slug: "backup" } });
  const tagSocial = await prisma.tag.findUnique({ where: { slug: "social-media" } });

  // Create demo workflows
  const workflows = [
    {
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
      price: 2900,
      nodes: 12,
      complexity: "Intermédiaire",
      status: WorkflowStatus.APPROVED,
      featured: true,
      publishedAt: new Date(),
      authorId: seller.id,
      categoryId: catMarketing!.id,
      tags: { connect: [{ id: tagLeads!.id }, { id: tagCrm!.id }, { id: tagSlack!.id }] },
    },
    {
      title: "Facturation Automatique Stripe",
      slug: "facturation-automatique-stripe",
      description: "Génération et envoi automatique de factures avec suivi des paiements Stripe.",
      longDescription: `Automatisez toute votre facturation de A à Z.

**Fonctionnalités :**
- Création de factures PDF
- Envoi automatique par email
- Suivi des paiements Stripe
- Relances automatiques
- Export comptable

**Outils utilisés :** n8n, Stripe, Gmail, Google Drive`,
      price: 4900,
      nodes: 18,
      complexity: "Avancé",
      status: WorkflowStatus.APPROVED,
      featured: true,
      publishedAt: new Date(),
      authorId: seller.id,
      categoryId: catFinance!.id,
      tags: { connect: [{ id: tagFacturation!.id }, { id: tagStripe!.id }] },
    },
    {
      title: "Chatbot Support Client IA",
      slug: "chatbot-support-ia",
      description: "Chatbot intelligent avec escalade automatique vers un humain.",
      longDescription: `Répondez à vos clients 24/7 avec un chatbot intelligent.

**Fonctionnalités :**
- Réponses automatiques basées sur FAQ
- Escalade vers un agent humain
- Création de tickets support
- Satisfaction client post-chat
- Analytics des conversations

**Outils utilisés :** n8n, OpenAI, Zendesk, Slack`,
      price: 7900,
      nodes: 25,
      complexity: "Avancé",
      status: WorkflowStatus.APPROVED,
      featured: true,
      publishedAt: new Date(),
      authorId: seller.id,
      categoryId: catAI!.id,
      tags: { connect: [{ id: tagIA!.id }, { id: tagChatbot!.id }] },
    },
    {
      title: "Backup Automatique Base de Données",
      slug: "backup-automatique-database",
      description: "Sauvegarde quotidienne avec vérification et alertes.",
      longDescription: `Protégez vos données avec un système de backup fiable.

**Fonctionnalités :**
- Backup quotidien automatique
- Vérification d'intégrité
- Alertes en cas d'échec
- Rotation des sauvegardes
- Restauration en 1 clic

**Outils utilisés :** n8n, PostgreSQL, AWS S3, Slack`,
      price: 1900,
      nodes: 10,
      complexity: "Débutant",
      status: WorkflowStatus.APPROVED,
      featured: false,
      publishedAt: new Date(),
      authorId: seller.id,
      categoryId: catDev!.id,
      tags: { connect: [{ id: tagBackup!.id }] },
    },
    {
      title: "Gestion Réseaux Sociaux Complet",
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
      price: 4500,
      nodes: 16,
      complexity: "Intermédiaire",
      status: WorkflowStatus.APPROVED,
      featured: false,
      publishedAt: new Date(),
      authorId: seller.id,
      categoryId: catSocial!.id,
      tags: { connect: [{ id: tagSocial!.id }] },
    },
    {
      title: "Onboarding Client Automatisé",
      slug: "onboarding-client-automatise",
      description: "Parcours d'onboarding complet avec emails, tâches et documents.",
      longDescription: `Offrez une expérience d'onboarding impeccable à vos clients.

**Fonctionnalités :**
- Séquence d'emails personnalisés
- Création de tâches dans le CRM
- Envoi de documents et contrats
- Planification de rendez-vous
- Suivi de progression

**Outils utilisés :** n8n, Calendly, DocuSign, Notion`,
      price: 5900,
      nodes: 22,
      complexity: "Avancé",
      status: WorkflowStatus.APPROVED,
      featured: true,
      publishedAt: new Date(),
      authorId: seller.id,
      categoryId: catProductivity!.id,
      tags: { connect: [{ id: (await prisma.tag.findUnique({ where: { slug: "email" } }))!.id }, { id: (await prisma.tag.findUnique({ where: { slug: "crm" } }))!.id }] },
    },
  ];

  for (const wf of workflows) {
    await prisma.workflow.upsert({
      where: { slug: wf.slug },
      update: wf,
      create: wf,
    });
  }
  console.log("✅ Demo workflows created");

  console.log("🎉 Database seed completed!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });