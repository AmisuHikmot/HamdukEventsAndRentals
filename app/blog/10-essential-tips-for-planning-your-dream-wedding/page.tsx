import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronLeft, Clock, Share2, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPostPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2 max-w-3xl">
              <Button asChild variant="ghost" size="sm" className="mb-4">
                <Link href="/blog" className="flex items-center">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
                <Calendar className="h-4 w-4" />
                <span>May 15, 2025</span>
                <span className="mx-2">•</span>
                <User className="h-4 w-4" />
                <span>Amisu Omotayo Hikmot</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                10 Essential Tips for Planning Your Dream Wedding
              </h1>
              <div className="flex justify-center gap-2 mt-4">
                <Badge>Wedding Planning</Badge>
                <Badge>Event Tips</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              <div className="relative aspect-video mb-10 overflow-hidden rounded-lg">
                <Image
                  src="/10wedtips.jpeg?height=720&width=1280"
                  alt="Wedding planning"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div className="prose dark:prose-invert max-w-none">
                <p className="lead">
                  Planning a wedding can be both exciting and overwhelming. With so many details to consider, it's easy
                  to feel stressed. But with proper planning and organization, you can create the wedding of your dreams
                  while actually enjoying the process. Here are our top 10 essential tips for planning your dream
                  wedding.
                </p>

                <h2>1. Set a Realistic Budget</h2>
                <p>
                  Before you start planning anything, establish a clear budget. Be honest about what you can afford and
                  prioritize what matters most to you. Remember to include a 10-15% buffer for unexpected expenses.
                  Having a budget in place from the beginning will help guide all your decisions and prevent financial
                  stress later.
                </p>

                <h2>2. Create a Timeline</h2>
                <p>
                  Work backward from your wedding date to create a comprehensive timeline of tasks. Include deadlines
                  for booking vendors, sending invitations, dress fittings, and other important milestones. A
                  well-planned timeline will keep you on track and ensure nothing falls through the cracks.
                </p>

                <h2>3. Choose Your Venue Carefully</h2>
                <p>
                  Your venue sets the tone for your entire wedding and affects many other aspects of your planning. When
                  selecting a venue, consider:
                </p>
                <ul>
                  <li>Guest capacity</li>
                  <li>Location and accessibility</li>
                  <li>Available dates</li>
                  <li>Indoor/outdoor options</li>
                  <li>In-house services and restrictions</li>
                  <li>Weather considerations</li>
                </ul>
                <p>
                  Visit multiple venues before making a decision, and always read the contract carefully before signing.
                </p>

                <h2>4. Prioritize Your Vendor Team</h2>
                <p>
                  Quality vendors can make or break your wedding day. Research and book your most important vendors
                  early, as the best ones are often booked 12-18 months in advance. Key vendors typically include:
                </p>
                <ul>
                  <li>Photographer/Videographer</li>
                  <li>Caterer</li>
                  <li>DJ or Band</li>
                  <li>Florist</li>
                  <li>Wedding Planner</li>
                </ul>
                <p>Always check reviews, meet in person if possible, and ensure their style aligns with your vision.</p>

                <h2>5. Be Thoughtful About Your Guest List</h2>
                <p>
                  Your guest list directly impacts your budget and venue options. Be intentional about who you invite,
                  and don't feel obligated to invite everyone you know. Consider creating an A-list and B-list to help
                  manage numbers, and be consistent with your "plus one" policy.
                </p>

                <h2>6. Choose a Theme or Color Palette</h2>
                <p>
                  A cohesive theme or color palette will tie all elements of your wedding together and make planning
                  decisions easier. Look for inspiration in the season, your venue, or personal interests. Once
                  established, use this as a guide for your decor, attire, flowers, and stationery.
                </p>

                <h2>7. Don't Forget About Lighting</h2>
                <p>
                  Lighting is often overlooked but can dramatically transform your venue and affect how your photos turn
                  out. Consider uplighting, string lights, candles, or chandeliers to create ambiance. Discuss lighting
                  options with your venue and photographer to ensure the best possible environment.
                </p>

                <h2>8. Plan for Guest Comfort</h2>
                <p>Happy guests make for a better celebration. Consider their experience by providing:</p>
                <ul>
                  <li>Clear directions and transportation information</li>
                  <li>Comfortable seating</li>
                  <li>Appropriate temperature control</li>
                  <li>Accessible restrooms</li>
                  <li>Sufficient food and beverages</li>
                  <li>Entertainment during downtimes</li>
                </ul>
                <p>Small thoughtful touches will be appreciated and remembered.</p>

                <h2>9. Create a Detailed Day-of Timeline</h2>
                <p>
                  A minute-by-minute timeline for your wedding day is essential. Include everything from when hair and
                  makeup begin to when vendors arrive and when specific events (first dance, cake cutting, etc.) will
                  occur. Share this timeline with your wedding party and vendors to ensure everyone is on the same page.
                </p>

                <h2>10. Remember What's Important</h2>
                <p>
                  Throughout the planning process, remember why you're getting married. Don't let stress overshadow the
                  joy of your engagement. Take breaks from planning when needed, delegate tasks, and focus on the
                  meaning behind the celebration rather than striving for perfection.
                </p>

                <h2>Conclusion</h2>
                <p>
                  Planning your dream wedding doesn't have to be overwhelming. With these essential tips, you can create
                  a beautiful, meaningful celebration that reflects your relationship and creates memories to last a
                  lifetime. Remember, the most important element of any wedding is the love you share—everything else is
                  just details.
                </p>
                <p>
                  At Hamduk Events and Rentals, we're here to help make your wedding planning journey as smooth and
                  enjoyable as possible. Contact us to learn more about our comprehensive wedding planning services and
                  rental options.
                </p>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4 mt-10 pt-6 border-t">
                <span className="font-medium">Share this article:</span>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>

              {/* Author Bio */}
              <div className="mt-10 pt-6 border-t">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image
                      src="/ceo.jpg?height=100&width=100"
                      alt="Amisu Omotayo Hikmot"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">Amisu Omotayo Hikmot</h3>
                    <p className="text-sm text-muted-foreground">
                      Founder & CEO of Hamduk Events and Rentals with over 15 years of experience in event planning.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/never.jpeg?height=400&width=600"
                  alt="5 Wedding Color Palettes That Never Go Out of Style"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">5 Wedding Color Palettes That Never Go Out of Style</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Choosing your wedding colors can be challenging. Here are five timeless color combinations that always
                  look elegant.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/timeless-wedding-color-palettes">Read More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/venuesel.jpeg?height=400&width=600"
                  alt="How to Choose the Perfect Venue for Your Event"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">How to Choose the Perfect Venue for Your Event</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  The venue sets the tone for your entire event. Learn our expert tips for selecting the ideal location.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/how-to-choose-the-perfect-venue">Read More</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/light.jpeg?height=400&width=600"
                  alt="The Ultimate Guide to Event Lighting"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">The Ultimate Guide to Event Lighting</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Lighting can transform any space. Learn how to use different lighting techniques to create the perfect
                  ambiance.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/ultimate-guide-to-event-lighting">Read More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Plan Your Dream Wedding?</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Let our expert team help you create the wedding you've always imagined.
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
