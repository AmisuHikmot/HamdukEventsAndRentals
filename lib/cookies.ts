// Cookie management utilities
export interface CookieOptions {
  expires?: Date
  maxAge?: number
  path?: string
  domain?: string
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

  static exists(name: string): boolean {
    return this.get(name) !== null
  }
}

// App-specific cookie utilities
export class AppCookies {
  // Cookie consent
  static setCookieConsent(consent: boolean) {
    CookieManager.set("cookie-consent", consent.toString(), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
    })
  }

  static getCookieConsent(): boolean | null {
    const consent = CookieManager.get("cookie-consent")
    return consent ? consent === "true" : null
  }

  // Analytics consent
  static setAnalyticsConsent(consent: boolean) {
    CookieManager.set("analytics-consent", consent.toString(), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
    })
  }

  static getAnalyticsConsent(): boolean {
    const consent = CookieManager.get("analytics-consent")
    return consent === "true"
  }

  // Marketing consent
  static setMarketingConsent(consent: boolean) {
    CookieManager.set("marketing-consent", consent.toString(), {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
    })
  }

  static getMarketingConsent(): boolean {
    const consent = CookieManager.get("marketing-consent")
    return consent === "true"
  }

  // User preferences
  static setUserPreferences(preferences: Record<string, any>) {
    CookieManager.set("user-preferences", JSON.stringify(preferences), {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      path: "/",
    })
  }

  static getUserPreferences(): Record<string, any> {
    const preferences = CookieManager.get("user-preferences")
    return preferences ? JSON.parse(preferences) : {}
  }

  // Booking session
  static setBookingSession(sessionData: Record<string, any>) {
    CookieManager.set("booking-session", JSON.stringify(sessionData), {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      path: "/",
    })
  }

  static getBookingSession(): Record<string, any> | null {
    const session = CookieManager.get("booking-session")
    return session ? JSON.parse(session) : null
  }

  static clearBookingSession() {
    CookieManager.remove("booking-session")
  }

  // Shopping cart
  static setCart(cartData: Record<string, any>) {
    CookieManager.set("shopping-cart", JSON.stringify(cartData), {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      path: "/",
    })
  }

  static getCart(): Record<string, any> {
    const cart = CookieManager.get("shopping-cart")
    return cart ? JSON.parse(cart) : { items: [], total: 0 }
  }

  static clearCart() {
    CookieManager.remove("shopping-cart")
  }

  // Theme preference
  static setTheme(theme: string) {
    CookieManager.set("theme", theme, {
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      path: "/",
    })
  }

  static getTheme(): string | null {
    return CookieManager.get("theme")
  }
}

// Export utilities
export { CookieManager as default }
