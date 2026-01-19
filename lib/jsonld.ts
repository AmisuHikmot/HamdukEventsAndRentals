/**
 * JSON-LD Structured Data Generators
 * Comprehensive schema markup for SEO optimization
 */

export interface JSONLDSchema {
  "@context": string
  "@type": string
  [key: string]: unknown
}

/**
 * Organization Schema - Global brand identity
 */
export const generateOrganizationSchema = (): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Hamduk Events & Rentals",
  description:
    "Premier event planning and equipment rental services for weddings, corporate events, and celebrations",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/",
  logo: {
    "@type": "ImageObject",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/"}/logo.png`,
    width: 256,
    height: 256,
  },
  image: `${process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/"}/home_img1.jpeg`,
  contact: {
    "@type": "ContactPoint",
    contactType: "Customer Service",
    telephone: "+234-701-111-2222",
    email: "info@hamdukevents.com",
    areaServed: "NG",
  },
  sameAs: [
    "https://www.facebook.com/hamdukevents",
    "https://www.instagram.com/hamdukevents",
    "https://www.twitter.com/hamdukevents",
    "https://www.youtube.com/hamdukevents",
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Lagos, Nigeria",
    addressRegion: "Lagos",
    postalCode: "100001",
    addressCountry: "NG",
  },
  foundingDate: "2015",
  founder: {
    "@type": "Person",
    name: "Hamduk Leadership",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    value: "50+",
  },
})

/**
 * Product/Service Schema - For rental items and services
 */
export interface ProductSchemaProps {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  availability?: "InStock" | "OutOfStock"
  rating?: number
  reviewCount?: number
}

export const generateProductSchema = (props: ProductSchemaProps): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng"}/rentals/${props.id}`,
  name: props.name,
  description: props.description,
  category: props.category,
  image: props.imageUrl || "/placeholder.jpg",
  brand: {
    "@type": "Brand",
    name: "Hamduk Events & Rentals",
  },
  offers: {
    "@type": "Offer",
    url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng"}/rentals/${props.id}`,
    priceCurrency: "NGN",
    price: props.price.toString(),
    availability:
      props.availability === "InStock"
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    seller: {
      "@type": "Organization",
      name: "Hamduk Events & Rentals",
    },
  },
  ...(props.rating &&
    props.reviewCount && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: props.rating.toString(),
        reviewCount: props.reviewCount.toString(),
      },
    }),
})

/**
 * Event Schema - For booking/events
 */
export interface EventSchemaProps {
  name: string
  description: string
  startDate: string
  location?: string
  image?: string
  organizer?: string
}

export const generateEventSchema = (props: EventSchemaProps): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "Event",
  name: props.name,
  description: props.description,
  startDate: props.startDate,
  image: props.image || "/placeholder.jpg",
  ...(props.location && {
    location: {
      "@type": "Place",
      name: props.location,
    },
  }),
  organizer: {
    "@type": "Organization",
    name: props.organizer || "Hamduk Events & Rentals",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/",
  },
})

/**
 * Breadcrumb Schema - For site hierarchy
 */
export interface BreadcrumbItem {
  name: string
  url: string
}

export const generateBreadcrumbSchema = (items: BreadcrumbItem[]): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng"}${item.url}`,
  })),
})

/**
 * FAQ Page Schema - For expandable results
 */
export interface FAQItem {
  question: string
  answer: string
}

export const generateFAQSchema = (faqs: FAQItem[]): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
})

/**
 * Service Schema - For services
 */
export interface ServiceSchemaProps {
  name: string
  description: string
  basePrice: number
  priceType: string
  image?: string
  areaServed?: string
}

export const generateServiceSchema = (props: ServiceSchemaProps): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: props.name,
  description: props.description,
  image: props.image || "/placeholder.jpg",
  provider: {
    "@type": "Organization",
    name: "Hamduk Events & Rentals",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/",
  },
  ...(props.basePrice && {
    offers: {
      "@type": "PriceSpecification",
      priceCurrency: "NGN",
      price: props.basePrice.toString(),
      priceType: props.priceType || "Estimated",
    },
  }),
  ...(props.areaServed && {
    areaServed: props.areaServed,
  }),
})

/**
 * Testimonial Schema - For reviews
 */
export interface TestimonialSchemaProps {
  author: string
  reviewBody: string
  ratingValue: number
  datePublished: string
  itemReviewed?: string
}

export const generateTestimonialSchema = (
  props: TestimonialSchemaProps
): JSONLDSchema => ({
  "@context": "https://schema.org",
  "@type": "Review",
  author: {
    "@type": "Person",
    name: props.author,
  },
  reviewBody: props.reviewBody,
  reviewRating: {
    "@type": "Rating",
    ratingValue: props.ratingValue.toString(),
    bestRating: "5",
    worstRating: "1",
  },
  datePublished: props.datePublished,
  ...(props.itemReviewed && {
    itemReviewed: {
      "@type": "Thing",
      name: props.itemReviewed,
    },
  }),
})

/**
 * JSON-LD Script Component
 */
export const createJsonLdScript = (schema: JSONLDSchema | JSONLDSchema[]): string => {
  return JSON.stringify(Array.isArray(schema) ? schema : [schema])
}
