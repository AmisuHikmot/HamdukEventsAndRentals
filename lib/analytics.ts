declare global {
  interface Window {
    gtag: (...args: any[]) => void
    dataLayer: any[]
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-ZFM0L9VPS9"

export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    })
  }
}

export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string
  category: string
  label?: string
  value?: number
}) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for the business
export const trackBookingStarted = (eventType: string) => {
  event({
    action: "booking_started",
    category: "engagement",
    label: eventType,
  })
}

export const trackBookingCompleted = (eventType: string, amount: number) => {
  event({
    action: "booking_completed",
    category: "conversion",
    label: eventType,
    value: amount,
  })
}

export const trackContactFormSubmitted = (subject: string) => {
  event({
    action: "contact_form_submitted",
    category: "engagement",
    label: subject,
  })
}

export const trackTestimonialSubmitted = (rating: number) => {
  event({
    action: "testimonial_submitted",
    category: "engagement",
    value: rating,
  })
}

export const trackRentalViewed = (itemName: string, category: string) => {
  event({
    action: "rental_viewed",
    category: "engagement",
    label: `${category} - ${itemName}`,
  })
}

export const trackServiceViewed = (serviceName: string) => {
  event({
    action: "service_viewed",
    category: "engagement",
    label: serviceName,
  })
}
