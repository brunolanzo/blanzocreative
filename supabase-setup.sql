-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- This creates the projects table and storage bucket

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  category text DEFAULT '',
  thumbnail text DEFAULT '',
  year text DEFAULT '',
  published boolean DEFAULT false,
  blocks jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 3. Allow public read access to published projects
CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (published = true);

-- 4. Allow authenticated/service role full access
CREATE POLICY "Service role has full access"
  ON projects FOR ALL
  USING (true)
  WITH CHECK (true);

-- 5. Create storage bucket for media
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Allow public read access to media files
CREATE POLICY "Public can read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- 7. Allow authenticated uploads to media bucket
CREATE POLICY "Service role can upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media');

CREATE POLICY "Service role can update media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'media');

CREATE POLICY "Service role can delete media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'media');
