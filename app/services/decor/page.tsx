import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Lightbulb } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function DecorPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Decor & Design Services
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your event space with our creative decor and design solutions.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/booking">
                    Book a Consultation
                    <Lightbulb className="ml-2 h-4 w-4" />
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
                alt="Event decor and design"
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
            <h2 className="text-3xl font-bold">Our Decor & Design Services</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We offer a wide range of decor and design services to create the perfect atmosphere for your event.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Floral Design</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Beautiful floral arrangements to enhance your event space.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Centerpieces</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Bouquets and boutonnieres</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Ceremony arrangements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Floral installations</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Lighting Design</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Create the perfect ambiance with our lighting solutions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Uplighting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>String lights and chandeliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Pin spotting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Custom gobo projections</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Draping & Backdrops</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Transform your venue with elegant draping and custom backdrops.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Ceiling draping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Wall draping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Custom backdrops</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Pipe and drape systems</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Table Decor</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Beautiful table settings to impress your guests.</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Linens and overlays</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Charger plates</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Napkin styling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Candles and votives</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Props & Accessories</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Unique props and accessories to enhance your event theme.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Themed props</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Signage and displays</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Photo booth backdrops</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Custom installations</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Full Design Services</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Comprehensive design services for a cohesive event aesthetic.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Theme development</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Color palette selection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>3D renderings</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Full event styling</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Design Process */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Design Process</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We follow a collaborative approach to bring your vision to life.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-rose-200 dark:bg-rose-900"></div>
              <div className="space-y-8">
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Consultation</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We meet to discuss your vision, preferences, and budget for your event decor.
                  </p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Concept Development</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We create a design concept that reflects your style and event theme.
                  </p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Proposal & Refinement</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We present our design proposal and make adjustments based on your feedback.
                  </p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Installation & Styling</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    Our team handles all setup, styling, and breakdown of your event decor.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Event decor design process"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Transform Your Event?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Contact us today to schedule a design consultation and bring your vision to life.
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
