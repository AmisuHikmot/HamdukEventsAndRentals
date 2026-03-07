/**
 * Hamduk Events & Rentals - SEO Navigation & Site Hierarchy
 * Base URL: https://eventz.hamduk.com.ng/
 * Site Name: Hamduk Events & Rentals
 *
 * This document provides a comprehensive SEO-optimized site structure
 * with JSON-LD SiteNavigationElement schema for Google Search visibility
 */

export const SITE_NAVIGATION_HIERARCHY = {
  siteName: "Hamduk Events & Rentals",
  baseUrl: "https://eventz.hamduk.com.ng/",
  description: "Premier event planning and equipment rental services in Lagos",

  // Top 5 Most Important Pages (Reachable within 1 click from homepage)
  topPages: [
    {
      rank: 1,
      name: "Services",
      url: "https://eventz.hamduk.com.ng/services",
      clicksFromHome: 1,
      title: "Event Planning & Rental Services - Hamduk Events & Rentals",
      description: "Explore our comprehensive event planning and rental services",
      priority: 1.0,
      importance: "CRITICAL - Main service page, drives conversions",
    },
    {
      rank: 2,
      name: "Equipment Rentals",
      url: "https://eventz.hamduk.com.ng/rentals",
      clicksFromHome: 1,
      title: "Premium Equipment Rentals - Hamduk Events & Rentals",
      description: "Browse our extensive catalog of premium rental equipment",
      priority: 0.95,
      importance: "CRITICAL - Product catalog with rich snippets",
    },
    {
      rank: 3,
      name: "Book Your Event",
      url: "https://eventz.hamduk.com.ng/booking",
      clicksFromHome: 1,
      title: "Book Your Event - Hamduk Events & Rentals",
      description: "Schedule your event consultation easily",
      priority: 0.9,
      importance: "CRITICAL - Conversion point for bookings",
    },
    {
      rank: 4,
      name: "FAQ",
      url: "https://eventz.hamduk.com.ng/faq",
      clicksFromHome: 1,
      title: "Frequently Asked Questions - Hamduk Events & Rentals",
      description: "Find answers to common questions about our services",
      priority: 0.8,
      importance: "HIGH - Reduces support burden, improves UX",
    },
    {
      rank: 5,
      name: "Contact Us",
      url: "https://eventz.hamduk.com.ng/contact",
      clicksFromHome: 1,
      title: "Contact Us - Hamduk Events & Rentals",
      description: "Get in touch with our team for custom inquiries",
      priority: 0.85,
      importance: "HIGH - Direct communication channel",
    },
  ],

  // Complete Hierarchical Structure
  hierarchy: {
    level0: [
      {
        name: "Home",
        url: "https://eventz.hamduk.com.ng/",
        title: "Hamduk Events & Rentals - Premier Event Planning Services",
        clicksFromHome: 0,
        priority: 1.0,
      },
    ],

    level1: [
      {
        name: "Services",
        url: "https://eventz.hamduk.com.ng/services",
        title: "Event Planning & Rental Services - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.95,
        children: [
          {
            name: "Event Planning",
            url: "https://eventz.hamduk.com.ng/services/event-planning",
            title: "Professional Event Planning Services - Hamduk Events & Rentals",
            clicksFromHome: 2,
            priority: 0.9,
          },
          {
            name: "Equipment Rentals",
            url: "https://eventz.hamduk.com.ng/services/equipment-rentals",
            title: "Equipment Rental Solutions - Hamduk Events & Rentals",
            clicksFromHome: 2,
            priority: 0.85,
          },
          {
            name: "Staffing Solutions",
            url: "https://eventz.hamduk.com.ng/services/staffing",
            title: "Professional Event Staffing - Hamduk Events & Rentals",
            clicksFromHome: 2,
            priority: 0.85,
          },
          {
            name: "Decor & Design",
            url: "https://eventz.hamduk.com.ng/services/decor",
            title: "Event Decor & Design Services - Hamduk Events & Rentals",
            clicksFromHome: 2,
            priority: 0.85,
          },
          {
            name: "Catering Coordination",
            url: "https://eventz.hamduk.com.ng/services/catering",
            title: "Catering Coordination Services - Hamduk Events & Rentals",
            clicksFromHome: 2,
            priority: 0.85,
          },
        ],
      },
      {
        name: "Rentals",
        url: "https://eventz.hamduk.com.ng/rentals",
        title: "Premium Equipment Rentals - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.95,
      },
      {
        name: "Book Your Event",
        url: "https://eventz.hamduk.com.ng/booking",
        title: "Book Your Event - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.9,
      },
      {
        name: "Gallery",
        url: "https://eventz.hamduk.com.ng/gallery",
        title: "Event Gallery - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.8,
      },
      {
        name: "Blog",
        url: "https://eventz.hamduk.com.ng/blog",
        title: "Event Planning Blog - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.8,
        children: [
          {
            name: "10 Essential Tips for Planning Your Dream Wedding",
            url: "https://eventz.hamduk.com.ng/blog/10-essential-tips-for-planning-your-dream-wedding",
            title: "10 Wedding Planning Tips - Hamduk Events & Rentals",
            clicksFromHome: 2,
            priority: 0.75,
          },
        ],
      },
    ],

    level1Secondary: [
      {
        name: "About",
        url: "https://eventz.hamduk.com.ng/about",
        title: "About Hamduk Events & Rentals - Premier Event Service Provider",
        clicksFromHome: 1,
        priority: 0.75,
      },
      {
        name: "FAQ",
        url: "https://eventz.hamduk.com.ng/faq",
        title: "Frequently Asked Questions - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.8,
      },
      {
        name: "Contact",
        url: "https://eventz.hamduk.com.ng/contact",
        title: "Contact Us - Hamduk Events & Rentals",
        clicksFromHome: 1,
        priority: 0.85,
      },
      {
        name: "Submit Testimonial",
        url: "https://eventz.hamduk.com.ng/testimonials/submit",
        title: "Share Your Experience - Hamduk Events & Rentals",
        clicksFromHome: 2,
        priority: 0.6,
      },
    ],

    footerPages: [
      {
        name: "Privacy Policy",
        url: "https://eventz.hamduk.com.ng/privacy",
        title: "Privacy Policy - Hamduk Events & Rentals",
        clicksFromHome: 2,
        priority: 0.5,
      },
      {
        name: "Terms & Conditions",
        url: "https://eventz.hamduk.com.ng/terms",
        title: "Terms & Conditions - Hamduk Events & Rentals",
        clicksFromHome: 2,
        priority: 0.5,
      },
    ],

    utilityPages: [
      {
        name: "Booking Status",
        url: "https://eventz.hamduk.com.ng/booking/status",
        title: "Booking Status - Hamduk Events & Rentals",
        clicksFromHome: 3,
        priority: 0.4,
        noIndex: true,
      },
      {
        name: "Payment Page",
        url: "https://eventz.hamduk.com.ng/payment",
        title: "Payment - Hamduk Events & Rentals",
        clicksFromHome: 3,
        priority: 0.4,
        noIndex: true,
      },
      {
        name: "Payment Callback",
        url: "https://eventz.hamduk.com.ng/payment/callback",
        title: "Payment Callback - Hamduk Events & Rentals",
        clicksFromHome: 3,
        priority: 0.3,
        noIndex: true,
      },
    ],
  },
}

/**
 * JSON-LD SiteNavigationElement Schema
 * Provides Google with primary navigation information for sitelinks generation
 */
export const SITE_NAVIGATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  name: "Hamduk Events & Rentals Navigation",
  url: "https://eventz.hamduk.com.ng/",
  mainEntity: [
    {
      "@type": "Thing",
      name: "Services",
      url: "https://eventz.hamduk.com.ng/services",
    },
    {
      "@type": "Thing",
      name: "Equipment Rentals",
      url: "https://eventz.hamduk.com.ng/rentals",
    },
    {
      "@type": "Thing",
      name: "Book Your Event",
      url: "https://eventz.hamduk.com.ng/booking",
    },
    {
      "@type": "Thing",
      name: "Gallery",
      url: "https://eventz.hamduk.com.ng/gallery",
    },
    {
      "@type": "Thing",
      name: "Contact Us",
      url: "https://eventz.hamduk.com.ng/contact",
    },
  ],
}

/**
 * Key SEO Recommendations
 */
export const SEO_RECOMMENDATIONS = {
  sitelinks: {
    description:
      "Sitelinks are automatically generated by Google for well-structured sites. Our top 5 pages are optimized for sitelink generation.",
    topPages:
      "Services, Rentals, Booking, FAQ, Contact - Each is reachable within 1 click from homepage",
  },
  internalLinking: {
    recommendation:
      "Ensure prominent navigation links to top 5 pages in header/footer",
    strategy:
      "Use descriptive anchor text including keyword phrases for SEO benefits",
  },
  breadcrumbs: {
    recommendation: "Implement breadcrumb navigation for multi-level pages",
    example: "Home > Services > Event Planning",
  },
  mobileFriendly: {
    recommendation: "Ensure responsive design with touch-friendly navigation",
    clickPath: "Maximum 2 clicks to any important page on mobile",
  },
  structuredData: {
    recommendation: "Use SiteNavigationElement schema for sitelinks",
    benefit: "Helps Google understand site structure for better ranking and display",
  },
}
