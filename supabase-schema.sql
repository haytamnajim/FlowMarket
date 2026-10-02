-- ============================================
-- FLOWMARKET - SCHEMA SQL SUPABASE
-- Copie-colle dans Supabase SQL Editor
-- ============================================

-- Activer l'extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUMS
-- ============================================

CREATE TYPE user_role AS ENUM ('USER', 'SELLER', 'ADMIN');
CREATE TYPE order_status AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
CREATE TYPE workflow_status AS ENUM ('DRAFT', 'PENDING_REVIEW', 'APPROVED', 'REJECTED');

-- ============================================
-- TABLES
-- ============================================

-- Users
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email           TEXT UNIQUE NOT NULL,
    name            TEXT,
    avatar          TEXT,
    password_hash   TEXT,
    role            user_role NOT NULL DEFAULT 'USER',
    email_verified  TIMESTAMPTZ,
    created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Accounts (OAuth)
CREATE TABLE accounts (
    id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id               UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type                  TEXT NOT NULL,
    provider              TEXT NOT NULL,
    provider_account_id   TEXT NOT NULL,
    refresh_token         TEXT,
    access_token          TEXT,
    expires_at            INTEGER,
    token_type            TEXT,
    scope                 TEXT,
    id_token              TEXT,
    session_state         TEXT,
    UNIQUE(provider, provider_account_id)
);

-- Sessions
CREATE TABLE sessions (
    id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_token TEXT UNIQUE NOT NULL,
    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    expires       TIMESTAMPTZ NOT NULL
);

-- Verification Tokens
CREATE TABLE verification_tokens (
    identifier  TEXT NOT NULL,
    token       TEXT UNIQUE NOT NULL,
    expires     TIMESTAMPTZ NOT NULL,
    UNIQUE(identifier, token)
);

-- Categories
CREATE TABLE categories (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug        TEXT UNIQUE NOT NULL,
    name        TEXT NOT NULL,
    description TEXT,
    icon        TEXT,
    color       TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Tags
CREATE TABLE tags (
    id    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name  TEXT UNIQUE NOT NULL,
    slug  TEXT UNIQUE NOT NULL
);

-- Workflows
CREATE TABLE workflows (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title             TEXT NOT NULL,
    slug              TEXT UNIQUE NOT NULL,
    description       TEXT NOT NULL,
    long_description  TEXT NOT NULL,
    price             INTEGER NOT NULL DEFAULT 0,  -- en centimes
    nodes             INTEGER NOT NULL DEFAULT 0,
    complexity        TEXT NOT NULL DEFAULT 'Intermédiaire',
    status            workflow_status NOT NULL DEFAULT 'DRAFT',
    featured          BOOLEAN NOT NULL DEFAULT FALSE,
    thumbnail         TEXT,
    file_url          TEXT,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    published_at      TIMESTAMPTZ,
    
    author_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    category_id       UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE
);

-- Workflow Tags (Many-to-Many)
CREATE TABLE workflow_tags (
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    tag_id      UUID NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (workflow_id, tag_id)
);

-- Orders
CREATE TABLE orders (
    id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    stripe_session_id TEXT UNIQUE,
    stripe_payment_id TEXT,
    status            order_status NOT NULL DEFAULT 'PENDING',
    amount            INTEGER NOT NULL,  -- en centimes
    currency          TEXT NOT NULL DEFAULT 'eur',
    customer_email    TEXT NOT NULL,
    customer_name     TEXT,
    metadata          JSONB,
    created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    completed_at      TIMESTAMPTZ,
    user_id           UUID REFERENCES users(id) ON DELETE SET NULL
);

-- Order Items
CREATE TABLE order_items (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id    UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    price       INTEGER NOT NULL,  -- prix au moment de l'achat
    UNIQUE(order_id, workflow_id)
);

-- Reviews
CREATE TABLE reviews (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    rating      INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment     TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    UNIQUE(user_id, workflow_id)
);

-- Favorites
CREATE TABLE favorites (
    id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    workflow_id UUID NOT NULL REFERENCES workflows(id) ON DELETE CASCADE,
    UNIQUE(user_id, workflow_id)
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_workflows_author_id ON workflows(author_id);
CREATE INDEX idx_workflows_category_id ON workflows(category_id);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_workflows_featured ON workflows(featured);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_stripe_session ON orders(stripe_session_id);

-- ============================================
-- TRIGGERS pour updated_at
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies: Users peuvent voir leur propre profil
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Categories: lecture publique
CREATE POLICY "Categories are viewable by everyone" ON categories
    FOR SELECT USING (true);

-- Tags: lecture publique
CREATE POLICY "Tags are viewable by everyone" ON tags
    FOR SELECT USING (true);

-- Workflows: lecture publique pour approuvés, auteur pour ses propres
CREATE POLICY "Approved workflows are viewable by everyone" ON workflows
    FOR SELECT USING (status = 'APPROVED' OR auth.uid() = author_id);

CREATE POLICY "Authors can manage own workflows" ON workflows
    FOR ALL USING (auth.uid() = author_id);

-- Orders: utilisateur voit ses commandes
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

-- Reviews: lecture publique, auteur gère ses avis
CREATE POLICY "Reviews are viewable by everyone" ON reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own reviews" ON reviews
    FOR ALL USING (auth.uid() = user_id);

-- Favorites: utilisateur gère ses favoris
CREATE POLICY "Users can manage own favorites" ON favorites
    FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- DONNÉES INITIALES
-- ============================================

-- Insérer les catégories
INSERT INTO categories (slug, name, description, icon, color) VALUES
('marketing', 'Marketing', 'Automatisez vos campagnes et générez des leads', 'marketing', 'from-pink-500 to-rose-500'),
('productivity', 'Productivité', 'Gagnez du temps au quotidien', 'productivity', 'from-emerald-500 to-teal-500'),
('ecommerce', 'E-commerce', 'Boostez vos ventes en ligne', 'ecommerce', 'from-orange-500 to-amber-500'),
('hr', 'RH & Recrutement', 'Simplifiez le recrutement et l''onboarding', 'hr', 'from-violet-500 to-purple-500'),
('finance', 'Finance', 'Automatisez la comptabilité et facturation', 'finance', 'from-yellow-500 to-lime-500'),
('dev', 'Développement', 'Accélérez le déploiement et le monitoring', 'dev', 'from-blue-500 to-cyan-500'),
('ai', 'Intelligence Artificielle', 'Intégrez l''IA dans vos processus', 'ai', 'from-indigo-500 to-violet-500'),
('social', 'Réseaux Sociaux', 'Gérez et automatisez vos réseaux sociaux', 'social', 'from-red-500 to-pink-500')
ON CONFLICT (slug) DO NOTHING;

-- Insérer les tags
INSERT INTO tags (name, slug) VALUES
('automatisation', 'automatisation'), ('leads', 'leads'), ('facturation', 'facturation'),
('ia', 'ia'), ('chatbot', 'chatbot'), ('email', 'email'), ('crm', 'crm'),
('slack', 'slack'), ('webhook', 'webhook'), ('api', 'api'), ('database', 'database'),
('backup', 'backup'), ('monitoring', 'monitoring'), ('deployment', 'deployment'),
('testing', 'testing'), ('seo', 'seo'), ('social-media', 'social-media'),
('content', 'content'), ('analytics', 'analytics'), ('reporting', 'reporting')
ON CONFLICT (slug) DO NOTHING;