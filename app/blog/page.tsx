import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Event Planning Blog</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Tips, trends, and inspiration for planning your perfect event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Categories */}
      <section className="w-full py-6 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search articles..." className="pl-8" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                All
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary/80">
                Wedding Planning
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary/80">
                Corporate Events
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary/80">
                Decor Ideas
              </Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-secondary/80">
                Event Tips
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=720&width=1280"
                alt="10 Essential Tips for Planning Your Dream Wedding"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>May 15, 2025</span>
                <span className="mx-2">•</span>
                <User className="h-4 w-4" />
                <span>Sarah Hamduk</span>
                <span className="mx-2">•</span>
                <Clock className="h-4 w-4" />
                <span>8 min read</span>
              </div>
              <h3 className="text-2xl font-bold">10 Essential Tips for Planning Your Dream Wedding</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Planning a wedding can be overwhelming, but with the right approach, it can be a joyful experience. In
                this comprehensive guide, we share our top 10 tips for planning your dream wedding without the stress.
              </p>
              <div>
                <Badge>Wedding Planning</Badge>
                <Badge className="ml-2">Event Tips</Badge>
              </div>
              <Button asChild className="bg-rose-600 hover:bg-rose-700">
                <Link href="/blog/10-essential-tips-for-planning-your-dream-wedding">Read More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6">Recent Posts</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Corporate Event Trends for 2025"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>May 10, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Corporate Event Trends for 2025</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Discover the latest trends shaping corporate events in 2025, from hybrid experiences to sustainable
                  practices.
                </p>
                <Badge>Corporate Events</Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/corporate-event-trends-for-2025">Read More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Creative Centerpiece Ideas on a Budget"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>May 5, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Creative Centerpiece Ideas on a Budget</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Beautiful centerpieces don't have to break the bank. Explore our creative ideas for stunning table
                  decor on any budget.
                </p>
                <Badge>Decor Ideas</Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/creative-centerpiece-ideas-on-a-budget">Read More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="How to Choose the Perfect Venue for Your Event"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>April 28, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">How to Choose the Perfect Venue for Your Event</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  The venue sets the tone for your entire event. Learn our expert tips for selecting the ideal location.
                </p>
                <Badge>Event Tips</Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/how-to-choose-the-perfect-venue">Read More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="5 Wedding Color Palettes That Never Go Out of Style"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>April 20, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">5 Wedding Color Palettes That Never Go Out of Style</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Choosing your wedding colors can be challenging. Here are five timeless color combinations that always
                  look elegant.
                </p>
                <Badge>Wedding Planning</Badge>
                <Badge className="ml-2">Decor Ideas</Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/timeless-wedding-color-palettes">Read More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="The Ultimate Guide to Event Lighting"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>April 15, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">The Ultimate Guide to Event Lighting</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Lighting can transform any space. Learn how to use different lighting techniques to create the perfect
                  ambiance.
                </p>
                <Badge>Decor Ideas</Badge>
                <Badge className="ml-2">Event Tips</Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/ultimate-guide-to-event-lighting">Read More</Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="overflow-hidden">
              <div className="relative aspect-video">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="How to Create a Memorable Corporate Event Experience"
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>April 8, 2025</span>
                </div>
                <h3 className="text-xl font-bold mb-2">How to Create a Memorable Corporate Event Experience</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Corporate events don't have to be boring. Discover strategies to engage attendees and leave a lasting
                  impression.
                </p>
                <Badge>Corporate Events</Badge>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/blog/memorable-corporate-event-experience">Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="flex justify-center mt-10">
            <Button variant="outline">Load More Articles</Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Stay Updated</h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">
                Subscribe to our newsletter for the latest event planning tips, trends, and inspiration.
              </p>
            </div>
            <div className="flex w-full max-w-md flex-col gap-2 min-[400px]:flex-row">
              <Input placeholder="Enter your email" type="email" className="bg-white text-gray-900" />
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
