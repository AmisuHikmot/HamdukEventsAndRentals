-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('event-images', 'event-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('rental-images', 'rental-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('blog-images', 'blog-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('user-uploads', 'user-uploads', false, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  ('gallery-images', 'gallery-images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp']),
  ('testimonial-images', 'testimonial-images', true, 2097152, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO NOTHING;

-- Create RLS policies for storage buckets

-- Event images bucket policies
CREATE POLICY "Public read access for event images" ON storage.objects
  FOR SELECT USING (bucket_id = 'event-images');

CREATE POLICY "Authenticated users can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'event-images' AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own event images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'event-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own event images" ON storage.objects
  FOR DELETE USING (bucket_id = 'event-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Rental images bucket policies
CREATE POLICY "Public read access for rental images" ON storage.objects
  FOR SELECT USING (bucket_id = 'rental-images');

CREATE POLICY "Authenticated users can upload rental images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'rental-images' AND auth.role() = 'authenticated');

-- Blog images bucket policies
CREATE POLICY "Public read access for blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- User uploads bucket policies (private)
CREATE POLICY "Users can read their own uploads" ON storage.objects
  FOR SELECT USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can upload to their own folder" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own uploads" ON storage.objects
  FOR UPDATE USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own uploads" ON storage.objects
  FOR DELETE USING (bucket_id = 'user-uploads' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Gallery images bucket policies
CREATE POLICY "Public read access for gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

-- Testimonial images bucket policies
CREATE POLICY "Public read access for testimonial images" ON storage.objects
  FOR SELECT USING (bucket_id = 'testimonial-images');

CREATE POLICY "Authenticated users can upload testimonial images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'testimonial-images' AND auth.role() = 'authenticated');

-- Add file tracking table
CREATE TABLE IF NOT EXISTS uploaded_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  file_type TEXT NOT NULL,
  bucket_name TEXT NOT NULL,
  uploaded_by UUID REFERENCES auth.users(id),
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}',
  is_public BOOLEAN DEFAULT true
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_uploaded_files_bucket ON uploaded_files(bucket_name);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_uploaded_by ON uploaded_files(uploaded_by);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_uploaded_at ON uploaded_files(uploaded_at);

-- Enable RLS on uploaded_files table
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for uploaded_files table
CREATE POLICY "Users can view public files" ON uploaded_files
  FOR SELECT USING (is_public = true);

CREATE POLICY "Users can view their own files" ON uploaded_files
  FOR SELECT USING (uploaded_by = auth.uid());

CREATE POLICY "Users can insert their own files" ON uploaded_files
  FOR INSERT WITH CHECK (uploaded_by = auth.uid());

CREATE POLICY "Users can update their own files" ON uploaded_files
  FOR UPDATE USING (uploaded_by = auth.uid());

CREATE POLICY "Users can delete their own files" ON uploaded_files
  FOR DELETE USING (uploaded_by = auth.uid());
