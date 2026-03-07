import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

type ChangeFrequency = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'

interface SitemapEntry {
  url: string
  lastModified: string
  changeFrequency: ChangeFrequency
  priority: number
}

// Base URL for Hamduk Events & Rentals
const baseUrl = 'https://eventz.hamduk.com.ng'

// Static pages configuration with full URLs
const staticPages: SitemapEntry[] = [
  {
    url: baseUrl,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 1.0,
  },
  {
    url: `${baseUrl}/about`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/services`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.95,
  },
  {
    url: `${baseUrl}/services/event-planning`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/services/equipment-rentals`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/services/staffing`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/services/decor`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/services/catering`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/rentals`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.95,
  },
  {
    url: `${baseUrl}/gallery`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/blog`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${baseUrl}/blog/10-essential-tips-for-planning-your-dream-wedding`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.75,
  },
  {
    url: `${baseUrl}/booking`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily',
    priority: 0.9,
  },
  {
    url: `${baseUrl}/contact`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.85,
  },
  {
    url: `${baseUrl}/faq`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${baseUrl}/privacy`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.5,
  },
  {
    url: `${baseUrl}/terms`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'yearly',
    priority: 0.5,
  },
]

// Fetch dynamic routes from Supabase
async function getDynamicRoutes(): Promise<SitemapEntry[]> {
  const dynamicRoutes: SitemapEntry[] = []

  try {
    // Fetch blog posts if available
    try {
      const { data: blogPosts, error: blogError } = await supabase
        .from('blog_posts')
        .select('id, slug, updated_at')
        .eq('published', true)

      if (!blogError && blogPosts) {
        blogPosts.forEach((post) => {
          dynamicRoutes.push({
            url: `${baseUrl}/blog/${post.slug}`,
            lastModified: new Date(post.updated_at).toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.75,
          })
        })
      }
    } catch (error) {
      console.error('[v0] Error fetching blog posts:', error)
    }

    // Fetch rental items if available
    try {
      const { data: rentals, error: rentalError } = await supabase
        .from('rental_items')
        .select('id, slug, updated_at')
        .eq('active', true)

      if (!rentalError && rentals) {
        rentals.forEach((rental) => {
          dynamicRoutes.push({
            url: `${baseUrl}/rentals/${rental.slug}`,
            lastModified: new Date(rental.updated_at).toISOString().split('T')[0],
            changeFrequency: 'weekly',
            priority: 0.8,
          })
        })
      }
    } catch (error) {
      console.error('[v0] Error fetching rental items:', error)
    }

    // Fetch gallery images if available
    try {
      const { data: galleryImages, error: galleryError } = await supabase
        .from('gallery_images')
        .select('id, event_id, created_at')
        .eq('published', true)
        .limit(100)

      if (!galleryError && galleryImages) {
        const uniqueEvents = [...new Set(galleryImages.map((img) => img.event_id))]
        uniqueEvents.forEach((eventId) => {
          dynamicRoutes.push({
            url: `${baseUrl}/gallery/${eventId}`,
            lastModified: new Date().toISOString().split('T')[0],
            changeFrequency: 'monthly',
            priority: 0.6,
          })
        })
      }
    } catch (error) {
      console.error('[v0] Error fetching gallery images:', error)
    }
  } catch (error) {
    console.error('[v0] Error fetching dynamic routes:', error)
  }

  return dynamicRoutes
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dynamicRoutes = await getDynamicRoutes()

  // Combine static and dynamic routes
  const allRoutes = [...staticPages, ...dynamicRoutes]

  // Transform to MetadataRoute format (remove baseUrl since it's already included)
  return allRoutes.map((route) => ({
    url: route.url,
    lastModified: route.lastModified,
    changeFrequency: route.changeFrequency as any,
    priority: route.priority,
  }))
}
