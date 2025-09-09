-- Create storage buckets for file uploads
-- This should be run in Supabase dashboard or via Supabase CLI

-- Create bucket for event gallery images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'event-gallery',
  'event-gallery',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for rental item images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'rental-images',
  'rental-images',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for blog images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  52428800, -- 50MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
) ON CONFLICT (id) DO NOTHING;

-- Create bucket for user uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'user-uploads',
  'user-uploads',
  false, -- Private bucket
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Set up RLS policies for storage buckets

-- Event gallery - public read, authenticated users can upload
CREATE POLICY "Public can view event gallery images" ON storage.objects
FOR SELECT USING (bucket_id = 'event-gallery');

CREATE POLICY "Authenticated users can upload event gallery images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'event-gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own event gallery uploads" ON storage.objects
FOR UPDATE USING (bucket_id = 'event-gallery' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Rental images - public read, authenticated users can upload
CREATE POLICY "Public can view rental images" ON storage.objects
FOR SELECT USING (bucket_id = 'rental-images');

CREATE POLICY "Authenticated users can upload rental images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'rental-images' AND auth.role() = 'authenticated');

-- Blog images - public read, authenticated users can upload
CREATE POLICY "Public can view blog images" ON storage.objects
FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- User uploads - private, users can only access their own files
CREATE POLICY "Users can view their own uploads" ON storage.objects
FOR SELECT USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload their own files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add file_uploads table to track uploaded files
CREATE TABLE IF NOT EXISTS file_uploads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    bucket_name VARCHAR(100) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    public_url VARCHAR(1000),
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_file_uploads_user ON file_uploads(user_id);
CREATE INDEX IF NOT EXISTS idx_file_uploads_bucket ON file_uploads(bucket_name);
