import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, ChefHat } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function CateringPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Catering Coordination
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  We partner with the finest caterers to provide exceptional food and beverage service for your event.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/booking">
                    Book a Consultation
                    <ChefHat className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Get a Quote</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Catered event with elegant food display"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Catering Coordination Services</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We work with top local caterers to provide exceptional food and beverage options for your event.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Caterer Selection</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                We help you find the perfect caterer to match your event style and budget.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Curated list of trusted caterers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Budget-conscious options</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Coordination of tastings</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Menu Planning</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                We assist in creating the perfect menu for your event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Custom menu development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Dietary restriction accommodation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Seasonal menu suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Food and beverage pairing</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Bar Service</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                We coordinate beverage service options to complement your event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Full bar service coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Signature cocktail creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Wine and beer selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Non-alcoholic beverage options</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Service Coordination</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">We ensure seamless service throughout your event.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Staffing requirements planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Service style selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Timeline coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>On-site management</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Rentals & Equipment</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                We coordinate all necessary rentals for food service.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>China, flatware, and glassware</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Serving equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Kitchen equipment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Bar equipment</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Special Considerations</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">We handle all special requests and dietary needs.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Allergies and dietary restrictions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Cultural and religious considerations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Children's meals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Vendor meals</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Caterers */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Featured Catering Partners</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We work with the finest caterers in the area to provide exceptional culinary experiences.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Gourmet Delights Catering"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Gourmet Delights Catering</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Specializing in upscale cuisine with a focus on local, seasonal ingredients.
                </p>
                <p className="text-sm text-rose-600 font-medium">Cuisine: Contemporary American, Farm-to-Table</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Bella Cucina Italian"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Bella Cucina Italian</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Authentic Italian cuisine with a modern twist, perfect for family-style events.
                </p>
                <p className="text-sm text-rose-600 font-medium">Cuisine: Italian, Mediterranean</p>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg overflow-hidden shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="Global Fusion Catering"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Global Fusion Catering</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Innovative cuisine combining flavors from around the world for a unique dining experience.
                </p>
                <p className="text-sm text-rose-600 font-medium">Cuisine: International, Fusion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Plan Your Menu?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Contact us today to discuss your catering needs and start planning the perfect menu for your event.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/booking">Book a Consultation</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-transparent text-white border-white hover:bg-rose-700 hover:text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
