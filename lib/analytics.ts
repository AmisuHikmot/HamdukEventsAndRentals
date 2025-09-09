// Google Analytics 4 integration
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZFM0L9VPS9"

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window === "undefined") return

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

// Track page views
export const trackPageView = (url: string, title?: string) => {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("config", GA_TRACKING_ID, {
    page_path: url,
    page_title: title,
  })
}

// Track custom events
export const trackEvent = (action: string, parameters?: Record<string, any>) => {
  if (typeof window === "undefined" || !window.gtag) return

  window.gtag("event", action, {
    event_category: "engagement",
    event_label: parameters?.label,
    value: parameters?.value,
    ...parameters,
  })
}

// Business-specific event tracking
export const trackBookingEvent = (eventType: string, data: Record<string, any>) => {
  trackEvent("booking_action", {
    event_category: "booking",
    event_label: eventType,
    booking_type: data.eventType,
    guest_count: data.guestCount,
    estimated_value: data.estimatedCost,
  })
}

export const trackContactEvent = (source: string) => {
  trackEvent("contact_form_submit", {
    event_category: "lead_generation",
    event_label: source,
  })
}

export const trackServiceView = (serviceName: string) => {
  trackEvent("service_view", {
    event_category: "service_engagement",
    event_label: serviceName,
  })
}

export const trackRentalView = (rentalName: string, category: string) => {
  trackEvent("rental_view", {
    event_category: "rental_engagement",
    event_label: rentalName,
    rental_category: category,
  })
}

export const trackPaymentEvent = (status: string, amount: number, reference: string) => {
  trackEvent("payment_action", {
    event_category: "ecommerce",
    event_label: status,
    value: amount,
    transaction_id: reference,
  })
}

// Performance tracking
export const trackPerformance = (metric: string, value: number) => {
  trackEvent("performance_metric", {
    event_category: "performance",
    event_label: metric,
    value: Math.round(value),
  })
}

// Error tracking
export const trackError = (error: string, context?: string) => {
  trackEvent("error", {
    event_category: "error",
    event_label: error,
    error_context: context,
  })
}

// Export analytics utilities
export default {
  initGA,
  trackPageView,
  trackEvent,
  trackBookingEvent,
  trackContactEvent,
  trackServiceView,
  trackRentalView,
  trackPaymentEvent,
  trackPerformance,
  trackError,
}
