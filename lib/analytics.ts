declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, any>) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZFM0L9VPS9"

// Initialize Google Analytics
export function initGA() {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export function trackPageView(url: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

// Track custom events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Business-specific tracking events
export function trackBookingStarted(eventType: string) {
  trackEvent("booking_started", "engagement", eventType)
}

export function trackBookingCompleted(eventType: string, amount: number) {
  trackEvent("booking_completed", "conversion", eventType, amount)
}

export function trackPaymentInitiated(amount: number) {
  trackEvent("payment_initiated", "ecommerce", "paystack", amount)
}

export function trackPaymentCompleted(amount: number) {
  trackEvent("payment_completed", "ecommerce", "paystack", amount)
}

export function trackContactFormSubmitted() {
  trackEvent("contact_form_submitted", "engagement", "contact_page")
}

export function trackTestimonialSubmitted(rating: number) {
  trackEvent("testimonial_submitted", "engagement", "testimonial_page", rating)
}

export function trackServiceViewed(serviceName: string) {
  trackEvent("service_viewed", "engagement", serviceName)
}

export function trackRentalViewed(rentalName: string) {
  trackEvent("rental_viewed", "engagement", rentalName)
}

export function trackGalleryViewed() {
  trackEvent("gallery_viewed", "engagement", "gallery_page")
}

export function trackBlogPostViewed(postTitle: string) {
  trackEvent("blog_post_viewed", "engagement", postTitle)
}

// Performance tracking
export function trackPerformance(metricName: string, value: number) {
  trackEvent("performance_metric", "performance", metricName, value)
}

// Error tracking
export function trackError(errorMessage: string, errorLocation: string) {
  trackEvent("error_occurred", "error", `${errorLocation}: ${errorMessage}`)
}
