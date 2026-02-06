/*
  # Create Articles Table for Majestic RP Law Database

  1. New Tables
    - `articles`
      - `id` (uuid, primary key)
      - `category` (text) - Category: УК, ДК, Душка адвокатов, Процессуальные
      - `article_number` (text) - Article number like "6.1", "12.8"
      - `title` (text) - Article title
      - `content` (text) - Full article content
      - `jurisdiction` (text) - R, F/R, F, M, E, null
      - `stars` (text) - Star rating (★, ★★, etc.)
      - `punishment` (text) - Punishment description
      - `chapter` (text) - Chapter name
      - `section` (text) - Section name
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
  
  2. Indexes
    - Index on category for filtering
    - Index on article_number for quick lookup
    - Full-text search index on title and content
  
  3. Security
    - Enable RLS on `articles` table
    - Add policy for public read access (this is a reference site)
*/

CREATE TABLE IF NOT EXISTS articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  article_number text NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  jurisdiction text,
  stars text,
  punishment text,
  chapter text,
  section text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better search performance
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_article_number ON articles(article_number);
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles USING gin(to_tsvector('russian', title || ' ' || content));

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read all articles"
  ON articles
  FOR SELECT
  TO public
  USING (true);