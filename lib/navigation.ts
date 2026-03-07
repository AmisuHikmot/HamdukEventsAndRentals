// Navigation structure with SEO optimization
// Top 5 most important pages for Hamduk Events & Rentals (within 2 clicks from homepage)

export interface NavigationItem {
  name: string
  url: string
  description: string
  priority: number
  clicks_from_home: number
}

export const TOP_5_PAGES: NavigationItem[] = [
  {
    name: "Services",
    url: "/services",
    description: "Browse our comprehensive event planning and rental services",
    priority: 1.0,
    clicks_from_home: 1,
  },
  {
    name: "Equipment Rentals",
    url: "/rentals",
    description: "Explore our premium equipment rental catalog",
    priority: 0.95,
    clicks_from_home: 1,
  },
  {
    name: "Book Your Event",
    url: "/booking",
    description: "Schedule your event with our easy booking system",
    priority: 0.9,
    clicks_from_home: 1,
  },
  {
    name: "FAQ",
    url: "/faq",
    description: "Find answers to common questions about our services",
    priority: 0.8,
    clicks_from_home: 1,
  },
  {
    name: "Contact Us",
    url: "/contact",
    description: "Get in touch with our team for custom inquiries",
    priority: 0.85,
    clicks_from_home: 1,
  },
]

// Complete hierarchical site structure
export const SITE_HIERARCHY = {
  primary: [
    {
      name: "Home",
      url: "/",
      clicks: 0,
    },
  ],
  secondary: [
    {
      name: "Services",
      url: "/services",
      clicks: 1,
      children: [
        { name: "Event Planning", url: "/services/event-planning", clicks: 2 },
        { name: "Equipment Rentals", url: "/services/equipment-rentals", clicks: 2 },
        { name: "Staffing Solutions", url: "/services/staffing", clicks: 2 },
        { name: "Decor & Design", url: "/services/decor", clicks: 2 },
        { name: "Catering Coordination", url: "/services/catering", clicks: 2 },
      ],
    },
    {
      name: "Rentals",
      url: "/rentals",
      clicks: 1,
    },
    {
      name: "Book Event",
      url: "/booking",
      clicks: 1,
    },
    {
      name: "Gallery",
      url: "/gallery",
      clicks: 1,
    },
    {
      name: "Blog",
      url: "/blog",
      clicks: 1,
    },
  ],
  tertiary: [
    {
      name: "About",
      url: "/about",
      clicks: 1,
    },
    {
      name: "FAQ",
      url: "/faq",
      clicks: 1,
    },
    {
      name: "Contact",
      url: "/contact",
      clicks: 1,
    },
    {
      name: "Submit Testimonial",
      url: "/testimonials/submit",
      clicks: 2,
    },
  ],
  footer: [
    { name: "Privacy Policy", url: "/privacy", clicks: 2 },
    { name: "Terms & Conditions", url: "/terms", clicks: 2 },
  ],
}

export interface SiteNavigationElement {
  "@context": string
  "@type": string
  name: string
  url: string
  potentialAction?: {
    "@type": string
    target: string | { "@type": string; urlTemplate: string }
  }
}

// Generate SiteNavigationElement schema for Google Search
export function generateSiteNavigationSchema(baseUrl: string): SiteNavigationElement {
  return {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: "Hamduk Events & Rentals Main Navigation",
    url: baseUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl.replace(/\/$/, "")}/search?q={query}`,
      },
    },
  }
}

// SEO page titles with site name
export const PAGE_TITLES: Record<string, string> = {
  "/": "Hamduk Events & Rentals - Premier Event Planning Services",
  "/services": "Event Planning & Rental Services - Hamduk Events & Rentals",
  "/rentals": "Premium Equipment Rentals - Hamduk Events & Rentals",
  "/booking": "Book Your Event - Hamduk Events & Rentals",
  "/faq": "Frequently Asked Questions - Hamduk Events & Rentals",
  "/contact": "Contact Us - Hamduk Events & Rentals",
  "/about": "About Hamduk Events & Rentals",
  "/gallery": "Event Gallery - Hamduk Events & Rentals",
  "/blog": "Event Planning Blog - Hamduk Events & Rentals",
  "/privacy": "Privacy Policy - Hamduk Events & Rentals",
  "/terms": "Terms & Conditions - Hamduk Events & Rentals",
  "/services/event-planning": "Professional Event Planning Services - Hamduk Events & Rentals",
  "/services/equipment-rentals": "Equipment Rental Solutions - Hamduk Events & Rentals",
  "/services/staffing": "Professional Event Staffing - Hamduk Events & Rentals",
  "/services/decor": "Event Decor & Design Services - Hamduk Events & Rentals",
  "/services/catering": "Catering Coordination Services - Hamduk Events & Rentals",
  "/testimonials/submit": "Share Your Experience - Hamduk Events & Rentals",
}

// Generate breadcrumb navigation for better UX and SEO
export function generateBreadcrumbNavigation(path: string): Array<{ name: string; url: string }> {
  const parts = path.split("/").filter(Boolean)
  const breadcrumbs = [{ name: "Home", url: "/" }]

  let currentPath = ""
  for (const part of parts) {
    currentPath += `/${part}`
    const title = part
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
    breadcrumbs.push({
      name: title,
      url: currentPath,
    })
  }

  return breadcrumbs
}
