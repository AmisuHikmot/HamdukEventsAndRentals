import Link from "next/link"
import Image from "next/image"
import { CalendarDays, ChevronRight, PartyPopper, Phone, ShoppingBag, Star, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { TestimonialCard } from "@/components/testimonial-card"
import { ServiceCard } from "@/components/service-card"
import { RentalItemCard } from "@/components/rental-item-card"
import { StructuredData } from "@/components/structured-data"
import { generateBreadcrumbSchema, generateServiceSchema } from "@/lib/jsonld"

const featuredServices = [
  {
    title: "Event Planning",
    description: "Full-service event planning from concept to execution, including venue selection, vendor coordination, and timeline management.",
    basePrice: 500,
    priceType: "Starting",
  },
  {
    title: "Equipment Rentals",
    description: "High-quality rentals including tables, chairs, linens, tableware, lighting, sound systems, and more.",
    basePrice: 100,
    priceType: "Starting",
  },
  {
    title: "Staffing Solutions",
    description: "Professional event staff including servers, bartenders, security, and event coordinators.",
    basePrice: 150,
    priceType: "Per Person",
  },
]

export default function Home() {
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Home", url: "/" }])

  const serviceSchemas = featuredServices.map((service) =>
    generateServiceSchema({
      name: service.title,
      description: service.description,
      basePrice: service.basePrice,
      priceType: service.priceType,
    })
  )

  return (
    <>
      <StructuredData schema={breadcrumbSchema} />
      <StructuredData schema={serviceSchemas} />
      <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Make Your Event Unforgettable
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Hamduk Events and Rentals provides premium event planning services and high-quality rental equipment
                  for any occasion.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/booking">
                    Book Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0 relative">
              <Image
                src="/home_img1.jpeg?height=550&width=550"
                alt="Event setup with decorations"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-950 rounded-lg shadow-lg p-4 flex items-center gap-3 border">
                <div className="bg-rose-100 dark:bg-rose-900/20 p-2 rounded-full">
                  <Star className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <p className="font-medium">Trusted by 500+ clients</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">5-star rated service</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Services</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                From intimate gatherings to grand celebrations, we provide comprehensive event services tailored to your
                needs.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
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
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="mt-4 bg-transparent">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Rentals */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Featured Rentals</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Browse our selection of premium rental equipment for your next event.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <RentalItemCard
              image="/chiavari_chairsimg.jpg?height=300&width=400"
              title="Chiavari Chairs"
              price={8}
              category="Furniture"
            />
            <RentalItemCard
              image="/roundtables_60inchimg.jpg?height=300&width=400"
              title="Round Tables (60&quot;)"
              price={12}
              category="Furniture"
            />
            <RentalItemCard
              image="/premium_linensimg.jpeg?height=300&width=400"
              title="Premium Linens"
              price={15}
              category="Decor"
            />
          </div>
          <div className="flex justify-center mt-8">
            <Button asChild variant="outline" className="mt-4 bg-transparent">
              <Link href="/rentals">View All Rentals</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">What Our Clients Say</h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Don't just take our word for it. Here's what our clients have to say about our services.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-12">
            <TestimonialCard
              name="Sarah Johnson"
              role="Bride"
              quote="Hamduk Events made our wedding day absolutely perfect. Their attention to detail and professionalism exceeded our expectations."
              rating={5}
            />
            <TestimonialCard
              name="Michael Chen"
              role="Corporate Event Manager"
              quote="We've used Hamduk for multiple company events and they consistently deliver high-quality service and equipment."
              rating={5}
            />
            <TestimonialCard
              name="Jessica Williams"
              role="Birthday Celebrant"
              quote="The team at Hamduk transformed my 40th birthday into an unforgettable celebration. Highly recommend!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Plan Your Event?
                </h2>
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
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-white border-white hover:bg-rose-700 hover:text-white"
                >
                  <Link href="/contact">
                    Call Us
                    <Phone className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <Image
                  src="/home_img1.jpeg?height=400&width=600"
                  alt="Event setup with decorations"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
