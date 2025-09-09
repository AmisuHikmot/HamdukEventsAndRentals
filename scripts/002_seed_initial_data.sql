-- Seed initial data for Hamduk Events and Rentals

-- Insert categories
INSERT INTO categories (name, slug, description) VALUES
('Furniture', 'furniture', 'Tables, chairs, and seating arrangements'),
('Decor', 'decor', 'Decorative items and styling elements'),
('Tableware', 'tableware', 'Plates, glasses, cutlery, and serving items'),
('Lighting', 'lighting', 'Lighting equipment and fixtures'),
('Audio Equipment', 'audio', 'Sound systems and microphones'),
('Equipment', 'equipment', 'General event equipment and utilities'),
('Entertainment', 'entertainment', 'Entertainment and interactive items');

-- Insert services
INSERT INTO services (name, slug, description, short_description, base_price, price_type) VALUES
('Event Planning', 'event-planning', 'Full-service event planning from concept to execution, including venue selection, vendor coordination, and timeline management.', 'Complete event planning and coordination services', 50000.00, 'custom'),
('Equipment Rentals', 'equipment-rentals', 'High-quality rentals including tables, chairs, linens, tableware, lighting, sound systems, and more.', 'Premium rental equipment for any occasion', 0.00, 'per_item'),
('Staffing Solutions', 'staffing', 'Professional event staff including servers, bartenders, security, and event coordinators.', 'Professional event staffing services', 5000.00, 'per_person'),
('Decor & Design', 'decor-design', 'Creative decoration and design services to transform your venue into a stunning event space.', 'Custom decoration and design services', 25000.00, 'custom'),
('Catering Coordination', 'catering', 'Coordination with premium catering partners to provide delicious food and beverage services.', 'Catering coordination and management', 15000.00, 'custom');

-- Insert sample rental items
INSERT INTO rental_items (name, slug, description, category_id, price_per_unit, quantity_available, image_urls) VALUES
('Chiavari Chairs', 'chiavari-chairs', 'Elegant gold Chiavari chairs perfect for weddings and formal events', (SELECT id FROM categories WHERE slug = 'furniture'), 800.00, 200, ARRAY['/chiavari_chairsimg.jpg']),
('Round Tables (60")', 'round-tables-60', 'Standard 60-inch round tables seating 8-10 guests', (SELECT id FROM categories WHERE slug = 'furniture'), 1200.00, 50, ARRAY['/roundtables_60inchimg.jpg']),
('Premium Linens', 'premium-linens', 'High-quality table linens in various colors and styles', (SELECT id FROM categories WHERE slug = 'decor'), 1500.00, 100, ARRAY['/premium_linensimg.jpeg']),
('Charger Plates', 'charger-plates', 'Decorative charger plates for elegant table settings', (SELECT id FROM categories WHERE slug = 'tableware'), 300.00, 150, ARRAY['/placeholder.svg']),
('String Lights', 'string-lights', 'Warm white LED string lights for ambient lighting', (SELECT id FROM categories WHERE slug = 'lighting'), 2500.00, 30, ARRAY['/placeholder.svg']),
('Speaker System', 'speaker-system', 'Professional sound system with wireless microphones', (SELECT id FROM categories WHERE slug = 'audio'), 7500.00, 10, ARRAY['/placeholder.svg']);

-- Insert sample testimonials
INSERT INTO testimonials (name, email, event_type, rating, testimonial, is_approved, is_featured) VALUES
('Sarah Johnson', 'sarah@example.com', 'wedding', 5, 'Hamduk Events made our wedding day absolutely perfect. Their attention to detail and professionalism exceeded our expectations.', TRUE, TRUE),
('Michael Chen', 'michael@example.com', 'corporate', 5, 'We''ve used Hamduk for multiple company events and they consistently deliver high-quality service and equipment.', TRUE, TRUE),
('Jessica Williams', 'jessica@example.com', 'birthday', 5, 'The team at Hamduk transformed my 40th birthday into an unforgettable celebration. Highly recommend!', TRUE, TRUE);

-- Insert sample blog post
INSERT INTO blog_posts (title, slug, excerpt, content, status, published_at, meta_title, meta_description, tags) VALUES
('10 Essential Tips for Planning Your Dream Wedding', '10-essential-tips-for-planning-your-dream-wedding', 'Planning a wedding can be overwhelming, but with the right approach and professional guidance, you can create the perfect celebration.', 'Planning a wedding can be overwhelming, but with the right approach and professional guidance, you can create the perfect celebration that reflects your unique love story...', 'published', NOW(), '10 Essential Wedding Planning Tips | Hamduk Events', 'Discover expert wedding planning tips from Hamduk Events. Learn how to plan your dream wedding with our comprehensive guide.', ARRAY['wedding', 'planning', 'tips']);

-- Insert sample gallery images
INSERT INTO gallery_images (title, image_url, event_type, venue_type, is_featured) VALUES
('Elegant Wedding Setup', '/home_img1.jpeg', 'wedding', 'indoor', TRUE),
('Corporate Event', '/coprate.jpeg', 'corporate', 'indoor', FALSE),
('Birthday Celebration', '/memorable.jpeg', 'birthday', 'outdoor', FALSE);
