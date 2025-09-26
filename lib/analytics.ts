// Google Analytics configuration
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZFM0L9VPS9"

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    // Load gtag script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag("js", new Date())
    window.gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
    })
  }
}

// Event tracking
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Business-specific tracking functions
export const trackBookingStarted = (eventType: string) => {
  trackEvent("booking_started", "engagement", eventType)
}

export const trackBookingCompleted = (eventType: string, amount: number) => {
  trackEvent("booking_completed", "conversion", eventType, amount)
}

export const trackPaymentInitiated = (amount: number, method: string) => {
  trackEvent("payment_initiated", "ecommerce", method, amount)
}

export const trackPaymentCompleted = (amount: number, method: string) => {
  trackEvent("payment_completed", "ecommerce", method, amount)
}

export const trackServiceViewed = (serviceName: string) => {
  trackEvent("service_viewed", "engagement", serviceName)
}

export const trackRentalViewed = (rentalName: string) => {
  trackEvent("rental_viewed", "engagement", rentalName)
}

export const trackContactFormSubmitted = () => {
  trackEvent("contact_form_submitted", "engagement", "contact_page")
}

export const trackTestimonialSubmitted = (rating: number) => {
  trackEvent("testimonial_submitted", "engagement", "testimonial_page", rating)
}

export const trackQuoteRequested = (serviceType: string) => {
  trackEvent("quote_requested", "lead_generation", serviceType)
}

export const trackPhoneCallClicked = () => {
  trackEvent("phone_call_clicked", "engagement", "header_phone")
}

export const trackEmailClicked = () => {
  trackEvent("email_clicked", "engagement", "header_email")
}

export const trackSocialMediaClicked = (platform: string) => {
  trackEvent("social_media_clicked", "engagement", platform)
}

export const trackDownloadClicked = (fileName: string) => {
  trackEvent("download_clicked", "engagement", fileName)
}

export const trackVideoPlayed = (videoTitle: string) => {
  trackEvent("video_played", "engagement", videoTitle)
}

export const trackSearchPerformed = (searchTerm: string) => {
  trackEvent("search_performed", "engagement", searchTerm)
}

export const trackFilterUsed = (filterType: string, filterValue: string) => {
  trackEvent("filter_used", "engagement", `${filterType}:${filterValue}`)
}

export const trackNewsletterSignup = () => {
  trackEvent("newsletter_signup", "engagement", "footer_newsletter")
}

// E-commerce tracking
export const trackPurchase = (transactionId: string, value: number, items: any[]) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: "NGN",
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    })
  }
}

export const trackAddToCart = (item: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "NGN",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          quantity: item.quantity || 1,
          price: item.price,
        },
      ],
    })
  }
}

export const trackRemoveFromCart = (item: any) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "remove_from_cart", {
      currency: "NGN",
      value: item.price,
      items: [
        {
          item_id: item.id,
          item_name: item.name,
          category: item.category,
          quantity: item.quantity || 1,
          price: item.price,
        },
      ],
    })
  }
}

export const trackViewCart = (items: any[], totalValue: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_cart", {
      currency: "NGN",
      value: totalValue,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    })
  }
}

export const trackBeginCheckout = (items: any[], totalValue: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: "NGN",
      value: totalValue,
      items: items.map((item) => ({
        item_id: item.id,
        item_name: item.name,
        category: item.category,
        quantity: item.quantity || 1,
        price: item.price,
      })),
    })
  }
}

// Performance tracking
export const trackTiming = (name: string, value: number, category?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "timing_complete", {
      name: name,
      value: value,
      event_category: category || "performance",
    })
  }
}

// Error tracking
export const trackError = (error: string, fatal = false) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exception", {
      description: error,
      fatal: fatal,
    })
  }
}

// User engagement tracking
export const trackEngagement = (engagementTime: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "user_engagement", {
      engagement_time_msec: engagementTime,
    })
  }
}

// Scroll tracking
export const trackScroll = (scrollDepth: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "scroll", {
      scroll_depth: scrollDepth,
    })
  }
}

// File download tracking
export const trackFileDownload = (fileName: string, fileType: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "file_download", {
      file_name: fileName,
      file_extension: fileType,
    })
  }
}

// Outbound link tracking
export const trackOutboundLink = (url: string, linkText?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "click", {
      event_category: "outbound",
      event_label: url,
      transport_type: "beacon",
    })
  }
}

// Custom dimensions (if configured in GA)
export const setCustomDimension = (index: number, value: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      [`custom_map.dimension${index}`]: value,
    })
  }
}

// User properties
export const setUserProperty = (propertyName: string, value: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", {
      [propertyName]: value,
    })
  }
}

// Consent management
export const updateConsent = (consentSettings: {
  analytics_storage?: "granted" | "denied"
  ad_storage?: "granted" | "denied"
  functionality_storage?: "granted" | "denied"
  personalization_storage?: "granted" | "denied"
  security_storage?: "granted" | "denied"
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", consentSettings)
  }
}

// Default consent (should be called before GA initialization)
export const setDefaultConsent = (consentSettings: {
  analytics_storage?: "granted" | "denied"
  ad_storage?: "granted" | "denied"
  functionality_storage?: "granted" | "denied"
  personalization_storage?: "granted" | "denied"
  security_storage?: "granted" | "denied"
  wait_for_update?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "default", consentSettings)
  }
}

// Export GA tracking ID for use in components
export { GA_TRACKING_ID }

// Default export with commonly used functions
export default {
  initGA,
  trackPageView,
  trackEvent,
  trackBookingStarted,
  trackBookingCompleted,
  trackPaymentInitiated,
  trackPaymentCompleted,
  trackContactFormSubmitted,
  trackTestimonialSubmitted,
  updateConsent,
  setDefaultConsent,
}
