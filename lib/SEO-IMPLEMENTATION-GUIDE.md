# Hamduk Events & Rentals - Comprehensive SEO Implementation Guide

**Site Name:** Hamduk Events & Rentals  
**Base URL:** https://eventz.hamduk.com.ng/  
**Last Updated:** 2026-03-07

---

## 1. Site Structure & Navigation Hierarchy

### Top 5 Most Important Pages (Reachable within 1 click from homepage)

| Rank | Page | URL | Purpose | Priority |
|------|------|-----|---------|----------|
| 1 | Services | https://eventz.hamduk.com.ng/services | Main service offering | 1.0 |
| 2 | Equipment Rentals | https://eventz.hamduk.com.ng/rentals | Product catalog with rich snippets | 0.95 |
| 3 | Book Your Event | https://eventz.hamduk.com.ng/booking | Primary conversion funnel | 0.9 |
| 4 | FAQ | https://eventz.hamduk.com.ng/faq | Expandable snippets in SERP | 0.8 |
| 5 | Contact Us | https://eventz.hamduk.com.ng/contact | Lead generation channel | 0.85 |

### Complete Site Hierarchy

```
Home (https://eventz.hamduk.com.ng/)
├── Level 1 - Primary Navigation (1 click from home)
│   ├── Services → /services [Priority: 0.95]
│   │   ├── Event Planning → /services/event-planning [Priority: 0.9]
│   │   ├── Equipment Rentals → /services/equipment-rentals [Priority: 0.9]
│   │   ├── Staffing Solutions → /services/staffing [Priority: 0.9]
│   │   ├── Decor & Design → /services/decor [Priority: 0.9]
│   │   └── Catering Coordination → /services/catering [Priority: 0.9]
│   ├── Rentals → /rentals [Priority: 0.95]
│   ├── Book Your Event → /booking [Priority: 0.9]
│   ├── Gallery → /gallery [Priority: 0.8]
│   ├── Blog → /blog [Priority: 0.8]
│   ├── About → /about [Priority: 0.75]
│   ├── FAQ → /faq [Priority: 0.8]
│   └── Contact → /contact [Priority: 0.85]
├── Level 2 - Secondary Pages (2 clicks from home)
│   ├── Blog Post: 10 Wedding Tips → /blog/10-essential-tips-for-planning-your-dream-wedding [Priority: 0.75]
│   ├── Submit Testimonial → /testimonials/submit [Priority: 0.6]
│   ├── Privacy Policy → /privacy [Priority: 0.5]
│   └── Terms & Conditions → /terms [Priority: 0.5]
└── Utility Pages (Not indexed)
    ├── Booking Status → /booking/status [NoIndex]
    ├── Payment → /payment [NoIndex]
    └── Payment Callback → /payment/callback [NoIndex]
```

---

## 2. SEO Title Tags with Site Name

All page titles follow the format: `[Page Title] - Hamduk Events & Rentals` to ensure search engines recognize the brand name and users see the site name in SERPs.

### Page Titles by Route

| Route | SEO Title |
|-------|-----------|
| / | Hamduk Events & Rentals - Premier Event Planning Services |
| /services | Event Planning & Rental Services - Hamduk Events & Rentals |
| /services/event-planning | Professional Event Planning Services - Hamduk Events & Rentals |
| /services/equipment-rentals | Equipment Rental Solutions - Hamduk Events & Rentals |
| /services/staffing | Professional Event Staffing - Hamduk Events & Rentals |
| /services/decor | Event Decor & Design Services - Hamduk Events & Rentals |
| /services/catering | Catering Coordination Services - Hamduk Events & Rentals |
| /rentals | Premium Equipment Rentals - Hamduk Events & Rentals |
| /booking | Book Your Event - Hamduk Events & Rentals |
| /faq | Frequently Asked Questions - Hamduk Events & Rentals |
| /contact | Contact Us - Hamduk Events & Rentals |
| /about | About Hamduk Events & Rentals - Premier Event Service Provider |
| /gallery | Event Gallery - Hamduk Events & Rentals |
| /blog | Event Planning Blog - Hamduk Events & Rentals |
| /privacy | Privacy Policy - Hamduk Events & Rentals |
| /terms | Terms & Conditions - Hamduk Events & Rentals |

---

## 3. JSON-LD Structured Data Implementation

### 3.1 Organization Schema (Global - in Layout)
```javascript
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hamduk Events & Rentals",
  "url": "https://eventz.hamduk.com.ng/",
  "logo": "https://eventz.hamduk.com.ng/logo.png",
  "description": "Premier event planning and equipment rental services in Lagos",
  "foundingDate": "2014",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "NG",
    "addressLocality": "Lagos"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Service",
    "telephone": "+234..."
  },
  "sameAs": [
    "https://www.facebook.com/hamdukevents",
    "https://www.instagram.com/hamdukevents"
  ]
}
```

### 3.2 SiteNavigationElement Schema (Global - in Layout)
```javascript
{
  "@context": "https://schema.org",
  "@type": "SiteNavigationElement",
  "name": "Hamduk Events & Rentals Main Navigation",
  "url": "https://eventz.hamduk.com.ng/",
  "mainEntity": [
    { "@type": "Thing", "name": "Services", "url": "https://eventz.hamduk.com.ng/services" },
    { "@type": "Thing", "name": "Equipment Rentals", "url": "https://eventz.hamduk.com.ng/rentals" },
    { "@type": "Thing", "name": "Book Your Event", "url": "https://eventz.hamduk.com.ng/booking" },
    { "@type": "Thing", "name": "Gallery", "url": "https://eventz.hamduk.com.ng/gallery" },
    { "@type": "Thing", "name": "Contact Us", "url": "https://eventz.hamduk.com.ng/contact" }
  ]
}
```

### 3.3 BreadcrumbList Schema (On category/detail pages)
```javascript
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://eventz.hamduk.com.ng/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://eventz.hamduk.com.ng/services"
    }
  ]
}
```

### 3.4 Product Schema (On /rentals page)
```javascript
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Chiavari Chairs",
  "description": "High-quality Chiavari chairs for rent",
  "image": "https://eventz.hamduk.com.ng/chair.jpg",
  "offers": {
    "@type": "Offer",
    "price": "8",
    "priceCurrency": "NGN",
    "availability": "https://schema.org/InStock"
  }
}
```

### 3.5 FAQPage Schema (On /faq page)
```javascript
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How far in advance should I book your services?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We recommend booking as early as possible..."
      }
    }
  ]
}
```

### 3.6 Service Schema (On /services page)
```javascript
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Event Planning",
  "description": "Full-service event planning from concept to execution",
  "provider": {
    "@type": "Organization",
    "name": "Hamduk Events & Rentals",
    "url": "https://eventz.hamduk.com.ng/"
  },
  "offers": {
    "@type": "Offer",
    "price": "500",
    "priceCurrency": "NGN"
  }
}
```

---

## 4. Metadata Configuration

All pages now include:
- **Title:** Unique, descriptive title with site name
- **Description:** 150-160 characters, compelling call-to-action
- **Keywords:** Relevant 3-5 primary keywords
- **OpenGraph:** Social media preview optimization with siteName
- **Canonical:** Self-referential canonical tags for homepage

---

## 5. Sitemap.xml Optimization

**Location:** `/app/sitemap.ts`  
**URL:** https://eventz.hamduk.com.ng/sitemap.xml

- **Dynamic generation** of all static and database-driven pages
- **Proper lastModified dates** based on content updates
- **Appropriate changeFrequency** values:
  - Daily: Homepage, rentals (frequently updated)
  - Weekly: Services, blog (regularly updated)
  - Monthly: Legal pages (rarely changed)
- **Priority levels** aligned with importance:
  - 1.0: Homepage
  - 0.95: Top 2 pages (Services, Rentals)
  - 0.9: Booking, service pages
  - 0.8: Supporting pages
  - 0.5: Legal pages

---

## 6. Robots.txt Configuration

**Location:** `/public/robots.txt`

Crawl directives:
- ✅ Allow: All public pages (/, /services, /rentals, /blog, /gallery, /about, /contact, /faq)
- ❌ Disallow: Sensitive pages (/api, /booking/status, /payment, /payment/callback)
- **User-agent specific:** Google gets no delay, Bots like Ahrefs disallowed

---

## 7. Google Search Console Recommendations

### Actions to Complete:

1. **Add Site to Google Search Console**
   - Verify with HTML file or DNS record
   - Submit sitemap at https://eventz.hamduk.com.ng/sitemap.xml

2. **Monitor Core Web Vitals**
   - Check Performance report
   - Optimize for LCP, FID, CLS

3. **Request Sitelinks**
   - Our top 5 pages are optimized for automatic sitelink generation
   - Google may show these below your main listing in SERPs

4. **Mobile Usability**
   - Ensure all pages are mobile-responsive
   - Test with Mobile-Friendly Test tool

5. **Structured Data Testing**
   - Validate all JSON-LD schemas at https://validator.schema.org
   - Check Rich Results Test for eligible features

---

## 8. Internal Linking Strategy

### Primary Link Targets:
- From every page → Services page (top navigation)
- From every page → Rentals page (top navigation)
- From Services → Booking page (CTA)
- From Rentals → Booking page (CTA)
- From Blog → Relevant service pages
- From Testimonials → Services/Rentals pages

### Anchor Text Best Practices:
- Use descriptive anchors: "Professional Event Planning" (not "Click Here")
- Include primary keywords when natural
- Maintain consistent anchor text across pages

---

## 9. SEO Performance Tracking

### Key Metrics to Monitor:
- Organic traffic from Google
- Click-through rate (CTR) from search results
- Average position of target keywords
- Impressions vs. clicks ratio

### Tools:
- Google Search Console (GSC)
- Google Analytics 4 (GA4)
- Structured Data Testing Tool
- Mobile-Friendly Test

---

## 10. File Locations & References

| File | Purpose |
|------|---------|
| `/lib/navigation.ts` | Navigation hierarchy and page definitions |
| `/lib/seo-navigation-map.ts` | Comprehensive SEO mapping and recommendations |
| `/lib/jsonld.ts` | JSON-LD schema generation utilities |
| `/app/sitemap.ts` | Dynamic XML sitemap generation |
| `/public/robots.txt` | Crawler directives and crawl optimization |
| `/app/layout.tsx` | Global Organization & SiteNavigationElement schemas |
| Each page's `/page.tsx` | Unique Metadata with title, description, OpenGraph |

---

## 11. Implementation Checklist

- ✅ Site name added to all metadata (via layout)
- ✅ Unique SEO titles on all 15+ pages with site name
- ✅ JSON-LD Organization schema (global)
- ✅ JSON-LD SiteNavigationElement schema (global)
- ✅ JSON-LD BreadcrumbList schema (category pages)
- ✅ JSON-LD Product schema (rentals page)
- ✅ JSON-LD FAQPage schema (FAQ page)
- ✅ JSON-LD Service schema (services page)
- ✅ Dynamic sitemap.xml generation
- ✅ robots.txt with crawl optimization
- ✅ Proper base URL: https://eventz.hamduk.com.ng/
- ✅ OpenGraph with siteName for social sharing

---

## 12. Next Steps for Maximum SEO Impact

1. **Submit to Google Search Console**
   - Add property: https://eventz.hamduk.com.ng/
   - Submit sitemap

2. **Add Structured Data to Pages**
   - Validate in Google Rich Results Test
   - Monitor for enhancements

3. **Build Quality Backlinks**
   - Guest posts on event planning blogs
   - Local business directory listings

4. **Create Fresh Content**
   - Weekly blog posts (1,500+ words)
   - Update service pages quarterly

5. **Monitor & Optimize**
   - Track rankings for target keywords
   - Improve pages with highest impressions/lowest CTR

---

**For questions or updates, refer to the developers or SEO team.**
