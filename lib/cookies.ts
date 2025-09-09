interface CookieOptions {
  expires?: Date
  maxAge?: number
  domain?: string
  path?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: "strict" | "lax" | "none"
}

export class CookieManager {
  static set(name: string, value: string, options: CookieOptions = {}) {
    if (typeof window === "undefined") return

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`

    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`
    }

    if (options.maxAge) {
      cookieString += `; max-age=${options.maxAge}`
    }

    if (options.domain) {
      cookieString += `; domain=${options.domain}`
    }

    if (options.path) {
      cookieString += `; path=${options.path}`
    } else {
      cookieString += "; path=/"
    }

    if (options.secure) {
      cookieString += "; secure"
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    document.cookie = cookieString
  }

  static get(name: string): string | null {
    if (typeof window === "undefined") return null

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

  static remove(name: string, options: Partial<CookieOptions> = {}) {
    this.set(name, "", {
      ...options,
      expires: new Date(0),
    })
  }

  static getAll(): Record<string, string> {
    if (typeof window === "undefined") return {}

    const cookies: Record<string, string> = {}
    const cookieArray = document.cookie.split(";")

    for (const cookie of cookieArray) {
      const [name, value] = cookie.trim().split("=")
      if (name && value) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value)
      }
    }

    return cookies
  }
}

// Specific cookie handlers for the application
export const AppCookies = {
  // User preferences
  setUserPreferences(preferences: any) {
    CookieManager.set("user_preferences", JSON.stringify(preferences), {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    })
  },

  getUserPreferences(): any {
    const prefs = CookieManager.get("user_preferences")
    return prefs ? JSON.parse(prefs) : null
  },

  // Booking session data
  setBookingSession(data: any) {
    CookieManager.set("booking_session", JSON.stringify(data), {
      maxAge: 24 * 60 * 60, // 24 hours
      sameSite: "lax",
    })
  },

  getBookingSession(): any {
    const session = CookieManager.get("booking_session")
    return session ? JSON.parse(session) : null
  },

  clearBookingSession() {
    CookieManager.remove("booking_session")
  },

  // Cart data for rentals
  setCart(items: any[]) {
    CookieManager.set("rental_cart", JSON.stringify(items), {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "lax",
    })
  },

  getCart(): any[] {
    const cart = CookieManager.get("rental_cart")
    return cart ? JSON.parse(cart) : []
  },

  clearCart() {
    CookieManager.remove("rental_cart")
  },

  // Recently viewed items
  setRecentlyViewed(items: any[]) {
    CookieManager.set("recently_viewed", JSON.stringify(items.slice(0, 10)), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      sameSite: "lax",
    })
  },

  getRecentlyViewed(): any[] {
    const items = CookieManager.get("recently_viewed")
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
    CookieManager.set("analytics_consent", consent.toString(), {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    })
  },

  getAnalyticsConsent(): boolean | null {
    const consent = CookieManager.get("analytics_consent")
    return consent ? consent === "true" : null
  },

  // Marketing consent
  setMarketingConsent(consent: boolean) {
    CookieManager.set("marketing_consent", consent.toString(), {
      maxAge: 365 * 24 * 60 * 60, // 1 year
      sameSite: "lax",
    })
  },

  getMarketingConsent(): boolean | null {
    const consent = CookieManager.get("marketing_consent")
    return consent ? consent === "true" : null
  },
}
