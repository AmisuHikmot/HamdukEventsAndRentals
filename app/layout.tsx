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
import { generateOrganizationSchema, createJsonLdScript } from "@/lib/jsonld"

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Hamduk Events & Rentals - Premier Event Planning Services",
    description: "Transform your special occasions with professional event planning and premium equipment rentals.",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://eventz.hamduk.com.ng/",
    siteName: "Hamduk Events & Rentals",
    images: [
      {
        url: "/logo.png",
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
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/logo.png", sizes: "48x48", type: "image/png" }],
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
  const organizationSchema = generateOrganizationSchema()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: createJsonLdScript(organizationSchema) }}
        />
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
