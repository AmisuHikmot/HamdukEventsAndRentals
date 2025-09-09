"use client"

import { useState, useEffect } from "react"
import { X, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AppCookies } from "@/lib/cookies"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    marketing: false,
    functional: false,
  })

  useEffect(() => {
    // Check if user has already made cookie choices
    const analyticsConsent = AppCookies.getAnalyticsConsent()
    const marketingConsent = AppCookies.getMarketingConsent()

    if (analyticsConsent === null || marketingConsent === null) {
      setShowConsent(true)
    } else {
      setPreferences((prev) => ({
        ...prev,
        analytics: analyticsConsent,
        marketing: marketingConsent,
      }))
    }
  }, [])

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    }

    savePreferences(allAccepted)
    setShowConsent(false)
  }

  const acceptNecessary = () => {
    const necessaryOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    }

    savePreferences(necessaryOnly)
    setShowConsent(false)
  }

  const saveCustomPreferences = () => {
    savePreferences(preferences)
    setShowConsent(false)
    setShowSettings(false)
  }

  const savePreferences = (prefs: typeof preferences) => {
    // Save individual consents
    AppCookies.setAnalyticsConsent(prefs.analytics)
    AppCookies.setMarketingConsent(prefs.marketing)

    // Save full preferences object
    AppCookies.setUserPreferences(prefs)

    // Initialize analytics if consented
    if (prefs.analytics && typeof window !== "undefined") {
      // Initialize Google Analytics
      if (window.gtag) {
        window.gtag("consent", "update", {
          analytics_storage: "granted",
        })
      }
    }

    setPreferences(prefs)
  }

  if (!showConsent) return null

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-gray-900 border-t shadow-lg">
        <div className="container mx-auto">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <h3 className="font-semibold mb-2">🍪 We use cookies</h3>
              <p className="text-sm text-muted-foreground">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
                By clicking "Accept All", you consent to our use of cookies.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Dialog open={showSettings} onOpenChange={setShowSettings}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Cookie Preferences</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Necessary Cookies</h4>
                        <p className="text-sm text-muted-foreground">Required for the website to function properly</p>
                      </div>
                      <Switch checked={true} disabled />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Analytics Cookies</h4>
                        <p className="text-sm text-muted-foreground">Help us understand how visitors use our website</p>
                      </div>
                      <Switch
                        checked={preferences.analytics}
                        onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, analytics: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Marketing Cookies</h4>
                        <p className="text-sm text-muted-foreground">Used to deliver relevant advertisements</p>
                      </div>
                      <Switch
                        checked={preferences.marketing}
                        onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, marketing: checked }))}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Functional Cookies</h4>
                        <p className="text-sm text-muted-foreground">Remember your preferences and settings</p>
                      </div>
                      <Switch
                        checked={preferences.functional}
                        onCheckedChange={(checked) => setPreferences((prev) => ({ ...prev, functional: checked }))}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={saveCustomPreferences} className="flex-1">
                      Save Preferences
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" size="sm" onClick={acceptNecessary}>
                Necessary Only
              </Button>
              <Button size="sm" className="bg-rose-600 hover:bg-rose-700" onClick={acceptAll}>
                Accept All
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={acceptNecessary}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
