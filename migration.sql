-- RepurposeBot - Migration SQL
-- Tables with rb_ prefix, RLS enabled, indexes

-- ============================================
-- rb_settings (user settings / subscription)
-- ============================================
CREATE TABLE IF NOT EXISTS rb_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  default_tone TEXT DEFAULT 'professional',
  brand_voice TEXT,
  platforms TEXT[] DEFAULT ARRAY['twitter', 'linkedin', 'facebook'],
  articles_used INTEGER DEFAULT 0,
  articles_limit INTEGER DEFAULT 5,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE rb_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own settings"
  ON rb_settings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON rb_settings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON rb_settings FOR UPDATE
  USING (auth.uid() = user_id);

CREATE INDEX idx_rb_settings_user_id ON rb_settings(user_id);
CREATE INDEX idx_rb_settings_stripe_customer ON rb_settings(stripe_customer_id);

-- ============================================
-- rb_articles (source blog articles)
-- ============================================
CREATE TABLE IF NOT EXISTS rb_articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT,
  content TEXT NOT NULL,
  summary TEXT,
  tags TEXT[],
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rb_articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own articles"
  ON rb_articles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own articles"
  ON rb_articles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own articles"
  ON rb_articles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own articles"
  ON rb_articles FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_rb_articles_user_id ON rb_articles(user_id);
CREATE INDEX idx_rb_articles_status ON rb_articles(status);
CREATE INDEX idx_rb_articles_created ON rb_articles(created_at DESC);

-- ============================================
-- rb_generated_posts (AI-generated social posts)
-- ============================================
CREATE TABLE IF NOT EXISTS rb_generated_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  article_id UUID NOT NULL REFERENCES rb_articles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'facebook', 'instagram', 'threads', 'bluesky', 'mastodon')),
  content TEXT NOT NULL,
  tone TEXT DEFAULT 'professional',
  hashtags TEXT[],
  media_suggestions TEXT,
  scheduled_at TIMESTAMPTZ,
  published_at TIMESTAMPTZ,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'published', 'failed')),
  engagement_score NUMERIC(5,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rb_generated_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own posts"
  ON rb_generated_posts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own posts"
  ON rb_generated_posts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON rb_generated_posts FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON rb_generated_posts FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_rb_posts_user_id ON rb_generated_posts(user_id);
CREATE INDEX idx_rb_posts_article_id ON rb_generated_posts(article_id);
CREATE INDEX idx_rb_posts_platform ON rb_generated_posts(platform);
CREATE INDEX idx_rb_posts_status ON rb_generated_posts(status);
CREATE INDEX idx_rb_posts_scheduled ON rb_generated_posts(scheduled_at);

-- ============================================
-- rb_templates (post templates)
-- ============================================
CREATE TABLE IF NOT EXISTS rb_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'facebook', 'instagram', 'threads', 'bluesky', 'mastodon')),
  template_text TEXT NOT NULL,
  tone TEXT DEFAULT 'professional',
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE rb_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own templates"
  ON rb_templates FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can insert own templates"
  ON rb_templates FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own templates"
  ON rb_templates FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own templates"
  ON rb_templates FOR DELETE
  USING (auth.uid() = user_id);

CREATE INDEX idx_rb_templates_user_id ON rb_templates(user_id);
CREATE INDEX idx_rb_templates_platform ON rb_templates(platform);

-- ============================================
-- Function: auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_rb_settings_updated_at
  BEFORE UPDATE ON rb_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rb_articles_updated_at
  BEFORE UPDATE ON rb_articles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rb_generated_posts_updated_at
  BEFORE UPDATE ON rb_generated_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rb_templates_updated_at
  BEFORE UPDATE ON rb_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- Function: auto-create settings on user signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO rb_settings (user_id, plan, articles_limit)
  VALUES (NEW.id, 'free', 5);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
