import {
  CalendarClock,
  CalendarDays,
  ChefHat,
  Clapperboard,
  Headphones,
  Lightbulb,
  PartyPopper,
  ShoppingBag,
  Truck,
  Users,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Comprehensive event services tailored to your unique vision and requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            <ServiceCard
              icon={<PartyPopper className="h-10 w-10 text-rose-600" />}
              title="Event Planning"
              description="Full-service event planning from concept to execution, including venue selection, vendor coordination, and timeline management."
            />
            <ServiceCard
              icon={<ShoppingBag className="h-10 w-10 text-rose-600" />}
              title="Equipment Rentals"
              description="High-quality rentals including tables, chairs, linens, tableware, lighting, sound systems, and more."
            />
            <ServiceCard
              icon={<Users className="h-10 w-10 text-rose-600" />}
              title="Staffing Solutions"
              description="Professional event staff including servers, bartenders, security, and event coordinators."
            />
            <ServiceCard
              icon={<Lightbulb className="h-10 w-10 text-rose-600" />}
              title="Decor & Design"
              description="Creative decor solutions including floral arrangements, backdrops, centerpieces, and custom installations."
            />
            <ServiceCard
              icon={<ChefHat className="h-10 w-10 text-rose-600" />}
              title="Catering Coordination"
              description="Coordination with top local caterers to provide delicious food and beverage options for your event."
            />
            <ServiceCard
              icon={<Headphones className="h-10 w-10 text-rose-600" />}
              title="Audio/Visual Services"
              description="Professional sound systems, lighting, projectors, screens, and technical support for presentations and entertainment."
            />
            <ServiceCard
              icon={<Clapperboard className="h-10 w-10 text-rose-600" />}
              title="Photography & Videography"
              description="Professional photographers and videographers to capture your special moments."
            />
            <ServiceCard
              icon={<Truck className="h-10 w-10 text-rose-600" />}
              title="Delivery & Setup"
              description="Timely delivery, professional setup, and teardown of all rental equipment and decor."
            />
            <ServiceCard
              icon={<CalendarClock className="h-10 w-10 text-rose-600" />}
              title="Day-of Coordination"
              description="Professional coordinators to ensure your event runs smoothly, allowing you to enjoy your special day."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Plan Your Event?</h2>
                <p className="max-w-[600px] text-rose-100 md:text-xl">
                  Contact us today to discuss your event needs and get a personalized quote.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" variant="secondary">
                  <Link href="/booking">
                    Book a Consultation
                    <CalendarDays className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg">
              <Image
                src="/home_img1.jpeg?height=600&width=800"
                alt="Event planning session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
