import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Suspense } from "react"

import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Analytics } from "@/components/analytics"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Hamduk Events and Rentals - Premium Event Planning Services",
    template: "%s | Hamduk Events and Rentals",
  },
  description:
    "Hamduk Events and Rentals provides premium event planning services and high-quality rental equipment for weddings, corporate events, birthdays, and special occasions in Lagos, Nigeria.",
  keywords: [
    "event planning",
    "equipment rental",
    "wedding planning",
    "corporate events",
    "party rentals",
    "Lagos",
    "Nigeria",
    "Hamduk Events",
    "event management",
    "party planning",
  ],
  authors: [{ name: "Hamduk Events and Rentals" }],
  creator: "Hamduk Events and Rentals",
  publisher: "Hamduk Events and Rentals",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://hamdukevents.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://hamdukevents.com",
    title: "Hamduk Events and Rentals - Premium Event Planning Services",
    description:
      "Premium event planning services and high-quality rental equipment for any occasion in Lagos, Nigeria.",
    siteName: "Hamduk Events and Rentals",
    images: [
      {
        url: "/home_img1.jpeg",
        width: 1200,
        height: 630,
        alt: "Hamduk Events and Rentals - Premium Event Planning",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamduk Events and Rentals - Premium Event Planning Services",
    description:
      "Premium event planning services and high-quality rental equipment for any occasion in Lagos, Nigeria.",
    images: ["/home_img1.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logo.png", sizes: "32x32", type: "image/png" }],
    apple: [{ url: "/logo.png", sizes: "180x180", type: "image/png" }],
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#e11d48" />
        <meta name="msapplication-TileColor" content="#e11d48" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <CookieConsent />
            <ScrollToTop />
            <Toaster />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
