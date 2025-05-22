import Image from "next/image"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function EquipmentRentalsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Equipment Rental Services
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  High-quality event equipment rentals to make your event exceptional.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/rentals">Browse Rentals</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Event equipment setup"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Equipment Categories</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We offer a wide range of high-quality equipment for all types of events.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Furniture</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Stylish and comfortable furniture options for your event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Chairs (Chiavari, Folding, Lounge)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Tables (Round, Rectangular, Cocktail)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Lounge Furniture Sets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Bars and Bar Stools</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Dance Floors</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Decor & Linens</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Beautiful decor elements to enhance your event aesthetic.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Table Linens & Napkins</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Chair Covers & Sashes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Backdrop Stands & Draping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Centerpieces & Candelabras</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Decorative Lighting</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Audio/Visual</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Professional sound and visual equipment for presentations and entertainment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Sound Systems & Speakers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Microphones (Wireless, Lapel)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Projectors & Screens</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Lighting Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>DJ Equipment</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Tableware</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Elegant tableware to elevate your dining experience.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>China & Flatware</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Glassware (Wine, Water, Champagne)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Charger Plates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Serving Platters & Utensils</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Buffet & Bar Equipment</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Tents & Structures</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Outdoor event solutions for any weather condition.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Pole Tents & Frame Tents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Tent Sidewalls & Flooring</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Outdoor Heaters</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Fans & Cooling Systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Generators</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Specialty Items</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Unique items to make your event stand out.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Photo Booths</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Staging & Platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Food Service Equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Games & Entertainment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Signage & Displays</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Rental Process */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Rental Process</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We make renting equipment for your event simple and stress-free.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse & Select</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Browse our inventory online or visit our showroom to select the items you need.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Request Quote</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Contact us for a personalized quote based on your event needs and timeline.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Confirm & Schedule</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Confirm your rental order and schedule delivery or pickup dates.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Enjoy Your Event</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We handle delivery, setup, and pickup so you can focus on your event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Rent Equipment?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Browse our rental inventory or contact us for a custom quote for your event.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/rentals">Browse Rentals</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-rose-700 hover:text-white"
              >
                <Link href="/contact">Get a Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
