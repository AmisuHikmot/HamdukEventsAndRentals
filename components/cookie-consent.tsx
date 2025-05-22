"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookie-consent")
    if (!cookieConsent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold mb-1">We use cookies</h3>
          <p className="text-sm text-muted-foreground">
            This website uses cookies to ensure you get the best experience on our website. By continuing to use this
            site, you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={declineCookies}>
            Decline
          </Button>
          <Button size="sm" className="bg-rose-600 hover:bg-rose-700" onClick={acceptCookies}>
            Accept
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={declineCookies}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
