import Image from "next/image"
import Link from "next/link"
import { CalendarDays, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function EventPlanningPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Event Planning Services
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  From concept to execution, our expert team will handle every detail of your event.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/booking">
                    Book a Consultation
                    <CalendarDays className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="mx-auto lg:mr-0">
              <Image
                src="/placeholder.svg?height=550&width=550"
                alt="Event planning session"
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
            <h2 className="text-3xl font-bold">Comprehensive Event Planning</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              Our event planning services are tailored to meet your specific needs and vision.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Full-Service Planning</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                From the initial concept to the final execution, we handle every aspect of your event.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Venue selection and coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Budget development and management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Vendor selection and management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Timeline creation and coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>On-site event management</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Partial Planning</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                For clients who have started planning but need professional assistance to complete the process.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Review of existing plans and contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Recommendations for additional vendors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Timeline creation and coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Month-of coordination services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>On-site event management</span>
                </li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Day-of Coordination</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                For clients who have planned their event but need professional management on the day.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Pre-event consultation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Vendor confirmation and coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Detailed timeline creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>Ceremony and reception coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-rose-600 mt-0.5" />
                  <span>On-site event management</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Our Planning Process</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              We follow a structured approach to ensure your event is perfectly planned and executed.
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
                  <h3 className="text-xl font-bold">Initial Consultation</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We meet to discuss your vision, requirements, and budget for the event.
                  </p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Proposal & Contract</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We provide a detailed proposal outlining our services and costs.
                  </p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Planning & Design</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We develop a comprehensive plan and design concept for your event.
                  </p>
                </div>
                <div className="relative pl-10">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-rose-600"></div>
                  </div>
                  <h3 className="text-xl font-bold">Execution</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    We manage all aspects of your event to ensure a seamless experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Event planning process"
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Start Planning?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Contact us today to schedule a consultation and begin planning your perfect event.
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
