"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Initial gallery images
const initialImages = Array.from({ length: 12 }).map((_, i) => ({
  id: i + 1,
  src: `/placeholder.svg?height=400&width=400&text=Event+${i + 1}`,
  alt: `Event ${i + 1}`,
  eventType:
    i % 5 === 0 ? "wedding" : i % 5 === 1 ? "corporate" : i % 5 === 2 ? "birthday" : i % 5 === 3 ? "social" : "other",
  venueType: i % 4 === 0 ? "indoor" : i % 4 === 1 ? "outdoor" : i % 4 === 2 ? "beach" : "garden",
}))

// Additional images to load more
const additionalImages = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 13,
  src: `/placeholder.svg?height=400&width=400&text=Event+${i + 13}`,
  alt: `Event ${i + 13}`,
  eventType:
    i % 5 === 0 ? "wedding" : i % 5 === 1 ? "corporate" : i % 5 === 2 ? "birthday" : i % 5 === 3 ? "social" : "other",
  venueType: i % 4 === 0 ? "indoor" : i % 4 === 1 ? "outdoor" : i % 4 === 2 ? "beach" : "garden",
}))

export default function GalleryPage() {
  const [eventType, setEventType] = useState("all")
  const [venueType, setVenueType] = useState("all")
  const [images, setImages] = useState(initialImages)
  const [showLoadMore, setShowLoadMore] = useState(true)

  // Handle event type selection
  const handleEventTypeChange = (value: string) => {
    setEventType(value)
  }

  // Handle venue type selection
  const handleVenueTypeChange = (value: string) => {
    setVenueType(value)
  }

  // Handle load more button click
  const handleLoadMore = () => {
    setImages([...images, ...additionalImages])
    setShowLoadMore(false) // Hide the button after loading all images
  }

  // Filter images based on selected filters
  const filteredImages = images.filter((image) => {
    const matchesEventType = eventType === "all" || image.eventType === eventType
    const matchesVenueType = venueType === "all" || image.venueType === venueType
    return matchesEventType && matchesVenueType
  })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Event Gallery</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Browse our portfolio of past events and get inspired for your own celebration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="w-full py-6 border-b">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:items-center md:gap-4">
              <Select value={eventType} onValueChange={handleEventTypeChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="wedding">Weddings</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="social">Social Gatherings</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <Select value={venueType} onValueChange={handleVenueTypeChange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Venue Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Venues</SelectItem>
                  <SelectItem value="indoor">Indoor</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="beach">Beach</SelectItem>
                  <SelectItem value="garden">Garden</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="relative aspect-square group overflow-hidden rounded-lg">
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="secondary" size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No images match your filter criteria.</p>
            </div>
          )}

          {showLoadMore && filteredImages.length > 0 && (
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mt-4" onClick={handleLoadMore}>
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Client Testimonials</h2>
            <p className="max-w-[700px] mx-auto mt-2 text-gray-500 dark:text-gray-400">
              What our clients say about their experience with Hamduk Events.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <blockquote className="text-center">
              <p className="text-xl italic mb-4">
                "Hamduk Events transformed our Gradution into an absolute dream. Every detail was perfect, from the
                stunning decor to the seamless coordination. Our guests are still talking about it months later!"
              </p>
              <footer className="font-medium">— AbdulSemiu & AbdulSelim, Graduating Clients</footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-rose-600 text-white">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Ready to Create Your Own Memorable Event?
              </h2>
              <p className="max-w-[600px] text-rose-100 md:text-xl">Let us help you bring your vision to life.</p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/booking">Book a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
