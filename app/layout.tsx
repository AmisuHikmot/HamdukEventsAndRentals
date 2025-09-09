import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { ScrollToTop } from "@/components/scroll-to-top"
import { Analytics } from "@/components/analytics"
import { Toaster } from "@/components/ui/sonner"
import { Suspense } from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Hamduk Events & Rentals - Premier Event Planning Services",
  description:
    "Transform your special occasions with Hamduk Events & Rentals. Professional event planning, premium equipment rentals, and exceptional service for weddings, corporate events, and celebrations.",
  keywords: "event planning, equipment rental, wedding planning, corporate events, party rentals, catering services",
  authors: [{ name: "Hamduk Events & Rentals" }],
  creator: "Hamduk Events & Rentals",
  publisher: "Hamduk Events & Rentals",
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
    title: "Hamduk Events & Rentals - Premier Event Planning Services",
    description: "Transform your special occasions with professional event planning and premium equipment rentals.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://hamdukevents.com",
    siteName: "Hamduk Events & Rentals",
    images: [
      {
        url: "/home_img1.jpeg",
        width: 1200,
        height: 630,
        alt: "Hamduk Events & Rentals - Premier Event Planning",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamduk Events & Rentals - Premier Event Planning Services",
    description: "Transform your special occasions with professional event planning and premium equipment rentals.",
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
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Suspense fallback={null}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ScrollToTop />
            <CookieConsent />
            <Toaster />
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
