// Performance monitoring and optimization utilities

export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  startTiming(label: string): void {
    this.metrics.set(label, performance.now())
  }

  endTiming(label: string): number {
    const startTime = this.metrics.get(label)
    if (!startTime) return 0

    const duration = performance.now() - startTime
    this.metrics.delete(label)

    // Log slow operations
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${label} took ${duration.toFixed(2)}ms`)
    }

    return duration
  }

  measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label)
    return fn().finally(() => {
      this.endTiming(label)
    })
  }

  // Web Vitals tracking
  trackWebVitals(): void {
    if (typeof window === "undefined") return

    // Track Largest Contentful Paint (LCP)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const lastEntry = entries[entries.length - 1]
      console.log("LCP:", lastEntry.startTime)
    }).observe({ entryTypes: ["largest-contentful-paint"] })

    // Track First Input Delay (FID)
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry) => {
        console.log("FID:", entry.processingStart - entry.startTime)
      })
    }).observe({ entryTypes: ["first-input"] })

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0
    new PerformanceObserver((list) => {
      const entries = list.getEntries()
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value
        }
      })
      console.log("CLS:", clsValue)
    }).observe({ entryTypes: ["layout-shift"] })
  }
}

// Image optimization utilities
export const imageOptimization = {
  // Generate responsive image URLs
  getResponsiveImageUrl(baseUrl: string, width: number, quality = 80): string {
    if (baseUrl.includes("supabase")) {
      return `${baseUrl}?width=${width}&quality=${quality}`
    }
    return baseUrl
  },

  // Generate srcSet for responsive images
  generateSrcSet(baseUrl: string, sizes: number[] = [320, 640, 768, 1024, 1280]): string {
    return sizes.map((size) => `${this.getResponsiveImageUrl(baseUrl, size)} ${size}w`).join(", ")
  },

  // Lazy loading intersection observer
  createLazyLoadObserver(callback: (entry: IntersectionObserverEntry) => void): IntersectionObserver {
    return new IntersectionObserver(
      (entries) => {
        entries.forEach(callback)
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      },
    )
  },
}

// Cache management
export class CacheManager {
  private static readonly CACHE_PREFIX = "hamduk_"
  private static readonly DEFAULT_TTL = 5 * 60 * 1000 // 5 minutes

  static set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    if (typeof window === "undefined") return

    const item = {
      data,
      timestamp: Date.now(),
      ttl,
    }

    try {
      localStorage.setItem(`${this.CACHE_PREFIX}${key}`, JSON.stringify(item))
    } catch (error) {
      console.warn("Cache storage failed:", error)
    }
  }

  static get<T>(key: string): T | null {
    if (typeof window === "undefined") return null

    try {
      const item = localStorage.getItem(`${this.CACHE_PREFIX}${key}`)
      if (!item) return null

      const parsed = JSON.parse(item)
      const now = Date.now()

      // Check if item has expired
      if (now - parsed.timestamp > parsed.ttl) {
        this.remove(key)
        return null
      }

      return parsed.data
    } catch (error) {
      console.warn("Cache retrieval failed:", error)
      return null
    }
  }

  static remove(key: string): void {
    if (typeof window === "undefined") return
    localStorage.removeItem(`${this.CACHE_PREFIX}${key}`)
  }

  static clear(): void {
    if (typeof window === "undefined") return

    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith(this.CACHE_PREFIX)) {
        localStorage.removeItem(key)
      }
    })
  }

  static async getOrFetch<T>(key: string, fetchFn: () => Promise<T>, ttl: number = this.DEFAULT_TTL): Promise<T> {
    // Try to get from cache first
    const cached = this.get<T>(key)
    if (cached !== null) {
      return cached
    }

    // Fetch fresh data
    const data = await fetchFn()
    this.set(key, data, ttl)
    return data
  }
}

// Database query optimization
export const queryOptimization = {
  // Debounce search queries
  debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  },

  // Throttle API calls
  throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
    let inThrottle: boolean
    return (...args: Parameters<T>) => {
      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  },

  // Batch multiple requests
  createBatcher<T, R>(batchFn: (items: T[]) => Promise<R[]>, maxBatchSize = 10, maxWaitTime = 100) {
    let batch: T[] = []
    let resolvers: ((value: R) => void)[] = []
    let timeout: NodeJS.Timeout

    const processBatch = async () => {
      if (batch.length === 0) return

      const currentBatch = [...batch]
      const currentResolvers = [...resolvers]

      batch = []
      resolvers = []

      try {
        const results = await batchFn(currentBatch)
        results.forEach((result, index) => {
          currentResolvers[index]?.(result)
        })
      } catch (error) {
        console.error("Batch processing failed:", error)
      }
    }

    return (item: T): Promise<R> => {
      return new Promise((resolve) => {
        batch.push(item)
        resolvers.push(resolve)

        if (batch.length >= maxBatchSize) {
          clearTimeout(timeout)
          processBatch()
        } else if (batch.length === 1) {
          timeout = setTimeout(processBatch, maxWaitTime)
        }
      })
    }
  },
}
