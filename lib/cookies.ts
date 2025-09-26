interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
  domain?: string
  secure?: boolean
  httpOnly?: boolean
  sameSite?: "strict" | "lax" | "none"
}

export class AppCookies {
  static set(name: string, value: string, options: CookieOptions = {}) {
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
      cookieString += `; secure`
    }

    if (options.httpOnly) {
      cookieString += `; httponly`
    }

    if (options.sameSite) {
      cookieString += `; samesite=${options.sameSite}`
    }

    document.cookie = cookieString
  }

  static get(name: string): string | null {
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

  static remove(name: string, options: Omit<CookieOptions, "expires" | "maxAge"> = {}) {
    this.set(name, "", { ...options, expires: new Date(0) })
  }

  static getAll(): Record<string, string> {
    if (typeof document === "undefined") return {}

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

  // Analytics consent methods
  static setAnalyticsConsent(consent: boolean) {
    this.set("analytics_consent", consent.toString(), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  static getAnalyticsConsent(): boolean | null {
    const consent = this.get("analytics_consent")
    return consent === null ? null : consent === "true"
  }

  // Marketing consent methods
  static setMarketingConsent(consent: boolean) {
    this.set("marketing_consent", consent.toString(), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  static getMarketingConsent(): boolean | null {
    const consent = this.get("marketing_consent")
    return consent === null ? null : consent === "true"
  }

  // User preferences methods
  static setUserPreferences(preferences: any) {
    this.set("user_preferences", JSON.stringify(preferences), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  static getUserPreferences(): any {
    const prefs = this.get("user_preferences")
    return prefs
      ? JSON.parse(prefs)
      : {
          theme: "system",
          language: "en",
          notifications: true,
          analytics: false,
          marketing: false,
        }
  }

  // Booking session methods
  static setBookingSession(data: any) {
    this.set("booking_session", JSON.stringify(data), {
      maxAge: 24 * 60 * 60, // 24 hours
      path: "/",
      sameSite: "lax",
    })
  }

  static getBookingSession(): any {
    const session = this.get("booking_session")
    return session
      ? JSON.parse(session)
      : {
          selectedServices: [],
          selectedRentals: [],
        }
  }

  static clearBookingSession() {
    this.remove("booking_session")
  }

  // Cart methods
  static setCart(items: any) {
    this.set("rental_cart", JSON.stringify(items), {
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "lax",
    })
  }

  static getCart(): any {
    const cart = this.get("rental_cart")
    return cart
      ? JSON.parse(cart)
      : {
          services: [],
          rentals: [],
          totalAmount: 0,
          lastUpdated: new Date().toISOString(),
        }
  }

  static clearCart() {
    this.remove("rental_cart")
  }

  // Recently viewed methods
  static setRecentlyViewed(items: any[]) {
    this.set("recently_viewed", JSON.stringify(items.slice(0, 10)), {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      sameSite: "lax",
    })
  }

  static getRecentlyViewed(): any[] {
    const items = this.get("recently_viewed")
    return items ? JSON.parse(items) : []
  }

  static addToRecentlyViewed(item: any) {
    const current = this.getRecentlyViewed()
    const filtered = current.filter((i) => i.id !== item.id)
    const updated = [item, ...filtered].slice(0, 10)
    this.setRecentlyViewed(updated)
  }

  // Theme methods
  static setTheme(theme: string) {
    this.set("theme", theme, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  static getTheme(): string | null {
    return this.get("theme")
  }

  // Cookie consent status
  static setCookieConsentStatus(accepted: boolean) {
    this.set("cookie_consent", accepted ? "accepted" : "declined", {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  static getCookieConsentStatus(): boolean {
    return this.get("cookie_consent") === "accepted"
  }

  // General consent methods
  static setConsent(type: "analytics" | "marketing" | "functional", value: boolean) {
    this.set(`consent_${type}`, value.toString(), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }

  static getConsent(type: "analytics" | "marketing" | "functional"): boolean | null {
    const value = this.get(`consent_${type}`)
    return value === null ? null : value === "true"
  }

  static hasConsent(): boolean {
    return this.get("consent_given") === "true"
  }

  static setConsentGiven() {
    this.set("consent_given", "true", {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
      sameSite: "lax",
    })
  }
}

export default AppCookies
