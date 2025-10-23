CREATE TABLE categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE articles (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  author TEXT NOT NULL,
  category_id BIGINT NOT NULL REFERENCES categories(id),
  image_url TEXT,
  is_breaking BOOLEAN NOT NULL DEFAULT FALSE,
  is_featured BOOLEAN NOT NULL DEFAULT FALSE,
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_published ON articles(published_at DESC);
CREATE INDEX idx_articles_breaking ON articles(is_breaking) WHERE is_breaking = TRUE;
CREATE INDEX idx_articles_featured ON articles(is_featured) WHERE is_featured = TRUE;

INSERT INTO categories (name, slug) VALUES 
  ('Breaking News', 'breaking-news'),
  ('Politics', 'politics'),
  ('Sports', 'sports'),
  ('Entertainment', 'entertainment'),
  ('Business', 'business'),
  ('Technology', 'technology'),
  ('Opinion', 'opinion'),
  ('Lifestyle', 'lifestyle');
