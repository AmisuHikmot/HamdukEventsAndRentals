import Image from "next/image"
import Link from "next/link"
import { CheckCircle2, Users } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function StaffingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">Staffing Solutions</h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Professional event staff to ensure your event runs smoothly from start to finish.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/booking">
                    Request Staff
                    <Users className="ml-2 h-4 w-4" />
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
                alt="Professional event staff"
                width={550}
                height={550}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Staff Categories Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Staffing Services</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We provide a wide range of professional staff for all types of events.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Event Coordinators</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Experienced professionals who oversee all aspects of your event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Timeline management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Vendor coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Guest assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Problem-solving</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Servers & Waitstaff</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Professional servers to ensure smooth food and beverage service.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Food service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Table clearing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Beverage service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Guest interaction</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Bartenders</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Skilled bartenders to create and serve beverages for your guests.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Cocktail preparation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Wine and beer service</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Bar setup and management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Responsible alcohol service</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Security Personnel</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Professional security staff to ensure the safety of your event and guests.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Entry management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Crowd control</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Conflict resolution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Emergency response</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Coat Check Attendants</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Friendly staff to manage guest belongings during your event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Item check-in and retrieval</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Ticket management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Secure storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Guest assistance</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Greeters & Ushers</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Welcoming staff to guide and assist your guests throughout the event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Guest welcome</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Seating assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Program distribution</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Direction and information</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Staffing Process */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Staffing Process</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We follow a comprehensive process to ensure you have the right staff for your event.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Needs Assessment</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We discuss your event details and staffing requirements to determine your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Staff Selection</h3>
              <p className="text-gray-500 dark:text-gray-400">
                We select experienced staff members who are best suited for your specific event.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Briefing & Training</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Staff are briefed on your event details and any specific requirements or protocols.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-rose-600">4</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Event Execution</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Our staff arrives early, professionally dressed, and ready to provide exceptional service.
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Staff Your Event?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Contact us today to discuss your staffing needs and get a personalized quote.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/booking">Request Staff</Link>
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
