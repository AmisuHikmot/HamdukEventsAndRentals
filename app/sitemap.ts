import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: ChangeFrequency;
  priority: number;
}

// Static pages configuration
const staticPages: SitemapEntry[] = [
  {
    url: '',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: '/about',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: '/services',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: '/services/event-planning',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: '/services/equipment-rentals',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: '/services/staffing',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: '/services/decor',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: '/services/catering',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: '/rentals',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: '/gallery',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.7,
  },
  {
    url: '/blog',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.85,
  },
  {
    url: '/blog/10-essential-tips-for-planning-your-dream-wedding',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  {
    url: '/booking',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: '/contact',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: '/faq',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: '/privacy',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  {
    url: '/terms',
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.5,
  },
];

// Fetch dynamic routes from Supabase
async function getDynamicRoutes(): Promise<SitemapEntry[]> {
  const dynamicRoutes: SitemapEntry[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eventz.hamduk.com.ng';

  try {
    // Fetch blog posts if available
    try {
      const { data: blogPosts, error: blogError } = await supabase
        .from('blog_posts')
        .select('id, slug, updated_at')
        .eq('published', true);

      if (!blogError && blogPosts) {
        blogPosts.forEach((post) => {
          dynamicRoutes.push({
            url: `/blog/${post.slug}`,
            lastModified: new Date(post.updated_at).toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.75,
          });
        });
      }
    } catch (error) {
      console.error(' Error fetching blog posts:', error);
    }

    // Fetch rental items if available
    try {
      const { data: rentals, error: rentalError } = await supabase
        .from('rental_items')
        .select('id, slug, updated_at')
        .eq('active', true);

      if (!rentalError && rentals) {
        rentals.forEach((rental) => {
          dynamicRoutes.push({
            url: `/rentals/${rental.slug}`,
            lastModified: new Date(rental.updated_at).toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        });
      }
    } catch (error) {
      console.error(' Error fetching rental items:', error);
    }

    // Fetch gallery images if available
    try {
      const { data: galleryImages, error: galleryError } = await supabase
        .from('gallery_images')
        .select('id, event_id, created_at')
        .eq('published', true)
        .limit(100);

      if (!galleryError && galleryImages) {
        const uniqueEvents = [...new Set(galleryImages.map((img) => img.event_id))];
        uniqueEvents.forEach((eventId) => {
          dynamicRoutes.push({
            url: `/gallery/${eventId}`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        });
      }
    } catch (error) {
      console.error(' Error fetching gallery images:', error);
    }
  } catch (error) {
    console.error(' Error fetching dynamic routes:', error);
  }

  return dynamicRoutes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eventz.hamduk.com.ng/';
  const dynamicRoutes = await getDynamicRoutes();

  // Combine static and dynamic routes
  const allRoutes = [...staticPages, ...dynamicRoutes];

  // Transform to MetadataRoute format
  return allRoutes.map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
