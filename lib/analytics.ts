// Google Analytics configuration
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZFM0L9VPS9"

// Initialize Google Analytics
export function initGA() {
  if (typeof window !== "undefined" && GA_TRACKING_ID) {
    // Load gtag script
    const script = document.createElement("script")
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`
    document.head.appendChild(script)

    // Initialize gtag
    window.dataLayer = window.dataLayer || []
    function gtag(...args: any[]) {
      window.dataLayer.push(args)
    }
    window.gtag = gtag

    gtag("js", new Date())
    gtag("config", GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    })
  }
}

// Track page views
export function trackPageView(url: string, title?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
    })
  }
}

// Track events
export function trackEvent(action: string, category: string, label?: string, value?: number) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Business-specific tracking functions
export function trackBookingStarted(eventType: string) {
  trackEvent("booking_started", "engagement", eventType)
}

export function trackBookingCompleted(eventType: string, amount: number) {
  trackEvent("booking_completed", "conversion", eventType, amount)
}

export function trackPaymentInitiated(amount: number, method: string) {
  trackEvent("payment_initiated", "ecommerce", method, amount)
}

export function trackPaymentCompleted(amount: number, method: string) {
  trackEvent("payment_completed", "ecommerce", method, amount)
}

export function trackContactFormSubmitted() {
  trackEvent("contact_form_submitted", "engagement")
}

export function trackServiceViewed(serviceName: string) {
  trackEvent("service_viewed", "engagement", serviceName)
}

export function trackRentalViewed(rentalName: string) {
  trackEvent("rental_viewed", "engagement", rentalName)
}

// Performance tracking
export function trackPerformance() {
  if (typeof window !== "undefined" && "performance" in window) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming

        if (perfData) {
          // Track page load time
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart
          trackEvent("page_load_time", "performance", "load_time", Math.round(loadTime))

          // Track DOM content loaded time
          const domTime = perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart
          trackEvent("dom_content_loaded", "performance", "dom_time", Math.round(domTime))
        }
      }, 0)
    })
  }
}

// Error tracking
export function trackError(error: Error, context?: string) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "exception", {
      description: error.message,
      fatal: false,
      custom_map: {
        context: context || "unknown",
      },
    })
  }
}

// Consent management
export function updateAnalyticsConsent(granted: boolean) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    })
  }
}

// Initialize analytics with consent
export function initAnalyticsWithConsent(hasConsent: boolean) {
  if (typeof window !== "undefined") {
    // Set initial consent state
    window.gtag =
      window.gtag ||
      (() => {
        ;(window.dataLayer = window.dataLayer || []).push(arguments)
      })

    window.gtag("consent", "default", {
      analytics_storage: hasConsent ? "granted" : "denied",
    })

    // Initialize GA
    initGA()
  }
}

// Export analytics utilities
export const analytics = {
  init: initGA,
  trackPageView,
  trackEvent,
  trackBookingStarted,
  trackBookingCompleted,
  trackPaymentInitiated,
  trackPaymentCompleted,
  trackContactFormSubmitted,
  trackServiceViewed,
  trackRentalViewed,
  trackPerformance,
  trackError,
  updateConsent: updateAnalyticsConsent,
  initWithConsent: initAnalyticsWithConsent,
}

export default analytics

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}
