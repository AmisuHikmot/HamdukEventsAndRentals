export interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: "strict" | "lax" | "none"
}

export interface UserPreferences {
  theme: "light" | "dark" | "system"
  language: string
  notifications: boolean
  analytics: boolean
  marketing: boolean
}

export interface BookingSession {
  bookingId?: string
  eventType?: string
  selectedServices: string[]
  selectedRentals: string[]
  eventDate?: string
  customerInfo?: {
    name: string
    email: string
    phone: string
  }
  totalAmount?: number
  paymentReference?: string
}

export interface ShoppingCart {
  services: Array<{
    id: string
    name: string
    price: number
    quantity: number
  }>
  rentals: Array<{
    id: string
    name: string
    price: number
    quantity: number
    duration: number
  }>
  totalAmount: number
  lastUpdated: string
}

// Cookie management utilities
export function setCookie(name: string, value: string, options: CookieOptions = {}) {
  if (typeof document === "undefined") return

  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

  if (options.expires) {
    cookieString += `; expires=${options.expires.toUTCString()}`
  }

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`
  }

  if (options.path) {
    cookieString += `; path=${options.path}`
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`
  }

  if (options.secure) {
    cookieString += "; secure"
  }

  if (options.httpOnly) {
    cookieString += "; httponly"
  }

  if (options.sameSite) {
    cookieString += `; samesite=${options.sameSite}`
  }

  document.cookie = cookieString
}

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null

  const nameEQ = encodeURIComponent(name) + "="
  const cookies = document.cookie.split(";")

  for (const cookie of cookies) {
    const c = cookie.trim()
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length))
    }
  }

  return null
}

export function deleteCookie(name: string, path = "/") {
  setCookie(name, "", { expires: new Date(0), path })
}

// User preferences management
export function getUserPreferences(): UserPreferences {
  const preferences = getCookie("user_preferences")
  if (preferences) {
    try {
      return JSON.parse(preferences)
    } catch (error) {
      console.error("Error parsing user preferences:", error)
    }
  }

  return {
    theme: "system",
    language: "en",
    notifications: true,
    analytics: false,
    marketing: false,
  }
}

export function setUserPreferences(preferences: UserPreferences) {
  setCookie("user_preferences", JSON.stringify(preferences), {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    path: "/",
    sameSite: "lax",
  })
}

// Booking session management
export function getBookingSession(): BookingSession {
  const session = getCookie("booking_session")
  if (session) {
    try {
      return JSON.parse(session)
    } catch (error) {
      console.error("Error parsing booking session:", error)
    }
  }

  return {
    selectedServices: [],
    selectedRentals: [],
  }
}

export function setBookingSession(session: BookingSession) {
  setCookie("booking_session", JSON.stringify(session), {
    maxAge: 24 * 60 * 60, // 24 hours
    path: "/",
    sameSite: "lax",
  })
}

export function clearBookingSession() {
  deleteCookie("booking_session")
}

// Shopping cart management
export function getShoppingCart(): ShoppingCart {
  const cart = getCookie("shopping_cart")
  if (cart) {
    try {
      return JSON.parse(cart)
    } catch (error) {
      console.error("Error parsing shopping cart:", error)
    }
  }

  return {
    services: [],
    rentals: [],
    totalAmount: 0,
    lastUpdated: new Date().toISOString(),
  }
}

export function setShoppingCart(cart: ShoppingCart) {
  cart.lastUpdated = new Date().toISOString()
  setCookie("shopping_cart", JSON.stringify(cart), {
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
    sameSite: "lax",
  })
}

export function clearShoppingCart() {
  deleteCookie("shopping_cart")
}

// Consent management
export function hasConsent(type: "analytics" | "marketing" | "functional"): boolean {
  const preferences = getUserPreferences()
  switch (type) {
    case "analytics":
      return preferences.analytics
    case "marketing":
      return preferences.marketing
    case "functional":
      return true // Always allowed for basic functionality
    default:
      return false
  }
}

export function setConsent(type: "analytics" | "marketing", granted: boolean) {
  const preferences = getUserPreferences()
  preferences[type] = granted
  setUserPreferences(preferences)
}

// Cookie consent status
export function getCookieConsentStatus(): boolean {
  return getCookie("cookie_consent") === "accepted"
}

export function setCookieConsentStatus(accepted: boolean) {
  setCookie("cookie_consent", accepted ? "accepted" : "declined", {
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
    path: "/",
    sameSite: "lax",
  })
}

// AppCookies object for backward compatibility
export const AppCookies = {
  // User preferences
  setUserPreferences(preferences: UserPreferences) {
    setUserPreferences(preferences)
  },

  getUserPreferences(): UserPreferences {
    return getUserPreferences()
  },

  // Booking session data
  setBookingSession(data: BookingSession) {
    setBookingSession(data)
  },

  getBookingSession(): BookingSession {
    return getBookingSession()
  },

  clearBookingSession() {
    clearBookingSession()
  },

  // Cart data for rentals
  setCart(items: ShoppingCart) {
    setShoppingCart(items)
  },

  getCart(): ShoppingCart {
    return getShoppingCart()
  },

  clearCart() {
    clearShoppingCart()
  },

  // Recently viewed items
  setRecentlyViewed(items: any[]) {
    setCookie("recently_viewed", JSON.stringify(items.slice(0, 10)), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "lax",
    })
  },

  getRecentlyViewed(): any[] {
    const items = getCookie("recently_viewed")
    return items ? JSON.parse(items) : []
  },

  addToRecentlyViewed(item: any) {
    const current = this.getRecentlyViewed()
    const filtered = current.filter((i) => i.id !== item.id)
    const updated = [item, ...filtered].slice(0, 10)
    this.setRecentlyViewed(updated)
  },

  // Analytics consent
  setAnalyticsConsent(consent: boolean) {
    setConsent("analytics", consent)
  },

  getAnalyticsConsent(): boolean | null {
    const preferences = getUserPreferences()
    return preferences.analytics
  },

  // Marketing consent
  setMarketingConsent(consent: boolean) {
    setConsent("marketing", consent)
  },

  getMarketingConsent(): boolean | null {
    const preferences = getUserPreferences()
    return preferences.marketing
  },
}
