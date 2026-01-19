import Link from "next/link"
import { Facebook, Instagram, Mail, MapPin, PartyPopper, Phone, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl">
              <PartyPopper className="h-6 w-6 text-rose-600" />
              <span>Hamduk Events</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Premium event planning services and high-quality rental equipment for any occasion.
            </p>
            <p className="text-sm text-muted-foreground mt-2">A subsidiary of Hamduk Unique Concept</p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm hover:underline">
                Home
              </Link>
              <Link href="/services" className="text-sm hover:underline">
                Services
              </Link>
              <Link href="/rentals" className="text-sm hover:underline">
                Rentals
              </Link>
              <Link href="/gallery" className="text-sm hover:underline">
                Gallery
              </Link>
              <Link href="/about" className="text-sm hover:underline">
                About
              </Link>
              <Link href="/contact" className="text-sm hover:underline">
                Contact
              </Link>
              <Link href="/faq" className="text-sm hover:underline">
                FAQ
              </Link>
              <Link href="/blog" className="text-sm hover:underline">
                Blog
              </Link>
              <Link href="/testimonials/submit" className="text-sm hover:underline">
                Submit Testimonial
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Services</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/services/event-planning" className="text-sm hover:underline">
                Event Planning
              </Link>
              <Link href="/services/equipment-rentals" className="text-sm hover:underline">
                Equipment Rentals
              </Link>
              <Link href="/services/staffing" className="text-sm hover:underline">
                Staffing Solutions
              </Link>
              <Link href="/services/decor" className="text-sm hover:underline">
                Decor & Design
              </Link>
              <Link href="/services/catering" className="text-sm hover:underline">
                Catering Coordination
              </Link>
            </nav>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Contact</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">+234 818 596 8179</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">hamdukuniqueconcept@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">No. 4 Dipeolu Street, Ikeja, Lagos, Nigeria</span>
                 <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">No. 1 Amusugbo Okoafo, Badagry, Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:col-span-2 md:col-span-1">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-sm text-muted-foreground">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <div className="flex gap-2">
              <Input placeholder="Email address" type="email" />
              <Button className="bg-rose-600 hover:bg-rose-700">Subscribe</Button>
            </div>
            <div className="flex gap-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Hamduk Events and Rentals. All rights reserved.
            </p>
            <nav className="flex gap-4">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:underline">
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}
