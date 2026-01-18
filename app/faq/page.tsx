import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { generateFAQSchema, createJsonLdScript } from "@/lib/jsonld"

const faqs = [
  {
    question: "How far in advance should I book your services?",
    answer:
      "We recommend booking our services as early as possible, especially for peak seasons (May-September) and weekends. For full event planning services, 6-12 months in advance is ideal. For equipment rentals only, we suggest booking at least 2-3 months ahead to ensure availability of your preferred items.",
  },
  {
    question: "What is your payment and deposit policy?",
    answer:
      "We require a 50% non-refundable deposit to secure your booking date and requested items. The remaining balance is due 14 days prior to your event date. For bookings made less than 14 days before the event, full payment is required at the time of booking. We accept bank transfers, credit cards, and cash payments.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "For event planning services: Cancellations more than 90 days before the event receive a 50% refund of the deposit, 60-90 days before receive 25% of the deposit, and less than 60 days before receive no refund. For equipment rentals: Cancellations more than 30 days before receive a 50% refund of the deposit, 14-30 days before receive 25% of the deposit, and less than 14 days before receive no refund.",
  },
  {
    question: "Do you provide delivery and setup services?",
    answer:
      "Yes, we offer delivery, setup, and pickup services for all rental items. Delivery fees are calculated based on the distance from our warehouse to your venue and the volume of items being delivered. Additional fees may apply for difficult access locations, after-hours delivery, or expedited setup and breakdown.",
  },
  {
    question: "What happens if rental items are damaged or lost?",
    answer:
      "Clients are responsible for all rental items from the time of delivery or pickup until they are returned to us. A security deposit may be required for certain high-value items. If items are damaged, lost, or stolen, the client will be charged the replacement cost of the item. Normal wear and tear is expected and not charged.",
  },
  {
    question: "Can I see the rental items before booking?",
    answer:
      "Yes, we encourage clients to visit our showroom to see our rental items in person. Please schedule an appointment with our team to ensure we can provide you with dedicated attention and show you the specific items you're interested in. Virtual showroom tours are also available upon request.",
  },
  {
    question: "Do you offer event planning services for all types of events?",
    answer:
      "Yes, we provide event planning services for a wide range of events including weddings, corporate events, social gatherings, birthday parties, anniversaries, graduation celebrations, product launches, conferences, and more. Our experienced team can handle events of all sizes, from intimate gatherings to large-scale celebrations.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We primarily serve Lagos and surrounding areas. For events outside of Lagos, additional travel and accommodation fees may apply. Please contact us with your specific location, and we'll be happy to provide you with a customized quote.",
  },
  {
    question: "Can you work with my budget?",
    answer:
      "We strive to work with clients across various budget ranges. During our initial consultation, we'll discuss your vision and budget constraints to create a customized proposal that aligns with your financial parameters while still delivering a memorable event. We're transparent about costs and will help you prioritize elements that will have the most impact within your budget.",
  },
  {
    question: "Do you have insurance?",
    answer:
      "Yes, Hamduk Events and Rentals is fully insured with liability insurance that covers our services and rental equipment. If your venue requires proof of insurance, we can provide the necessary documentation. For certain high-risk events or venues, additional insurance may be required.",
  },
]

export default function FAQPage() {
  const faqSchema = generateFAQSchema(faqs)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: createJsonLdScript(faqSchema) }}
      />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Find answers to common questions about our event planning and rental services.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6 max-w-4xl">
            <Accordion type="single" collapsible className="w-full space-y-6">
              <AccordionItem value="item-1" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">How far in advance should I book your services?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    We recommend booking our services as early as possible, especially for peak seasons (May-September)
                    and weekends. For full event planning services, 6-12 months in advance is ideal. For equipment rentals
                    only, we suggest booking at least 2-3 months ahead to ensure availability of your preferred items.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">What is your payment and deposit policy?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    We require a 50% non-refundable deposit to secure your booking date and requested items. The remaining
                    balance is due 14 days prior to your event date. For bookings made less than 14 days before the event,
                    full payment is required at the time of booking. We accept bank transfers, credit cards, and cash
                    payments.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">What is your cancellation policy?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    For event planning services: Cancellations more than 90 days before the event receive a 50% refund of
                    the deposit, 60-90 days before receive 25% of the deposit, and less than 60 days before receive no
                    refund.
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 mt-2">
                    For equipment rentals: Cancellations more than 30 days before receive a 50% refund of the deposit,
                    14-30 days before receive 25% of the deposit, and less than 14 days before receive no refund.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">Do you provide delivery and setup services?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Yes, we offer delivery, setup, and pickup services for all rental items. Delivery fees are calculated
                    based on the distance from our warehouse to your venue and the volume of items being delivered.
                    Additional fees may apply for difficult access locations, after-hours delivery, or expedited setup and
                    breakdown.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">What happens if rental items are damaged or lost?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Clients are responsible for all rental items from the time of delivery or pickup until they are
                    returned to us. A security deposit may be required for certain high-value items. If items are damaged,
                    lost, or stolen, the client will be charged the replacement cost of the item. Normal wear and tear is
                    expected and not charged.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">Can I see the rental items before booking?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Yes, we encourage clients to visit our showroom to see our rental items in person. Please schedule an
                    appointment with our team to ensure we can provide you with dedicated attention and show you the
                    specific items you're interested in. Virtual showroom tours are also available upon request.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">
                    Do you offer event planning services for all types of events?
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Yes, we provide event planning services for a wide range of events including weddings, corporate
                    events, social gatherings, birthday parties, anniversaries, graduation celebrations, product launches,
                    conferences, and more. Our experienced team can handle events of all sizes, from intimate gatherings
                    to large-scale celebrations.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">What areas do you serve?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    We primarily serve Lagos and surrounding areas. For events outside of Lagos, additional travel and
                    accommodation fees may apply. Please contact us with your specific location, and we'll be happy to
                    provide you with a customized quote.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">Can you work with my budget?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    We strive to work with clients across various budget ranges. During our initial consultation, we'll
                    discuss your vision and budget constraints to create a customized proposal that aligns with your
                    financial parameters while still delivering a memorable event. We're transparent about costs and will
                    help you prioritize elements that will have the most impact within your budget.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border rounded-lg p-1">
                <AccordionTrigger className="px-4 py-2 hover:no-underline">
                  <span className="text-left font-medium">Do you have insurance?</span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4 pt-2">
                  <p className="text-gray-500 dark:text-gray-400">
                    Yes, Hamduk Events and Rentals is fully insured with liability insurance that covers our services and
                    rental equipment. If your venue requires proof of insurance, we can provide the necessary
                    documentation. For certain high-risk events or venues, additional insurance may be required.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="mt-12 text-center">
              <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Contact our team for personalized assistance with your event needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-rose-600 hover:bg-rose-700">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/booking">Book a Consultation</Link>
                </Button>
              </div>
            </div>
        </div>
      </section>
      </div>
    </>
  )
}
