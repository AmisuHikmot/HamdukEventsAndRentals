"use client"

import { useState } from "react"
import Link from "next/link"
import { CalendarDays, Menu, PartyPopper, Phone, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="w-full border-b bg-background">
      <div className="container flex h-16 items-center px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <PartyPopper className="h-6 w-6 text-rose-600" />
          <span>Hamduk Events</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium hover:underline underline-offset-4">
            Services
          </Link>
          <Link href="/rentals" className="text-sm font-medium hover:underline underline-offset-4">
            Rentals
          </Link>
          <Link href="/gallery" className="text-sm font-medium hover:underline underline-offset-4">
            Gallery
          </Link>
          <Link href="/about" className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:underline underline-offset-4">
            Contact
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0 md:gap-4">
          <Button asChild variant="ghost" size="icon" className="hidden md:flex">
            <Link href="/contact">
              <Phone className="h-5 w-5" />
              <span className="sr-only">Contact</span>
            </Link>
          </Button>
          <Button asChild className="hidden md:flex bg-rose-600 hover:bg-rose-700">
            <Link href="/booking">
              <CalendarDays className="mr-2 h-4 w-4" />
              Book Now
            </Link>
          </Button>
          <ModeToggle />
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <PartyPopper className="h-5 w-5 text-rose-600" />
                  <span>Hamduk Events</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PartyPopper className="h-5 w-5" />
                    Services
                  </Link>
                  <Link
                    href="/rentals"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    Rentals
                  </Link>
                  <Link
                    href="/gallery"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/about"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="flex items-center gap-2 text-lg font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Phone className="h-5 w-5" />
                    Contact
                  </Link>
                </nav>
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/booking" onClick={() => setIsMenuOpen(false)}>
                    <CalendarDays className="mr-2 h-4 w-4" />
                    Book Now
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
