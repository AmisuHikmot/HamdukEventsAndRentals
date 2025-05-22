import Image from "next/image"
import Link from "next/link"
import { CalendarDays, Clock, MapPin, PartyPopper, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Hamduk Events</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Creating unforgettable experiences for over a decade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 items-center">
            <div className="relative aspect-square">
              <Image
                src="/placeholder.svg?height=600&width=600"
                alt="Hamduk Events team"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">Our Story</h2>
              <p className="text-gray-500 dark:text-gray-400">
                Hamduk Events and Rentals was founded in 2010 with a simple mission: to create exceptional events that
                exceed our clients' expectations. What began as a small family business has grown into a premier event
                planning and rental company serving the entire region.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Our founder, Sarah Hamduk, started the company after planning her own wedding and realizing there was a
                need for a comprehensive event service that could handle both planning and equipment rentals under one
                roof.
              </p>
              <p className="text-gray-500 dark:text-gray-400">
                Today, our team of experienced event professionals continues to uphold Sarah's vision of providing
                personalized service, attention to detail, and high-quality equipment for events of all sizes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              The principles that guide everything we do.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <PartyPopper className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We strive for excellence in every aspect of our service, from the quality of our rentals to the
                execution of our events.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Communication</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We believe in clear, transparent communication with our clients throughout the planning process.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We are committed to being reliable and dependable, ensuring that every detail is handled with care.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Community</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We are proud to be part of our local community and strive to give back through charitable events and
                partnerships.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <CalendarDays className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We continuously seek new ideas and trends to offer our clients the most current and creative event
                solutions.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <div className="bg-rose-100 dark:bg-rose-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <PartyPopper className="h-6 w-6 text-rose-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalization</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We understand that each event is unique, and we tailor our services to reflect the individual style and
                vision of our clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Team</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              Meet the dedicated professionals behind Hamduk Events.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Sarah Hamduk"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Sarah Hamduk</h3>
              <p className="text-rose-600">Founder & CEO</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Michael Johnson"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Michael Johnson</h3>
              <p className="text-rose-600">Event Director</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Jessica Chen"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">Jessica Chen</h3>
              <p className="text-rose-600">Rental Manager</p>
            </div>
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="David Williams"
                  fill
                  className="object-cover rounded-full"
                />
              </div>
              <h3 className="text-xl font-bold">David Williams</h3>
              <p className="text-rose-600">Design Specialist</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Plan Your Event?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Contact us today to discuss your event needs and get a personalized quote.
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
