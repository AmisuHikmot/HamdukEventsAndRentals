"use client"

import type React from "react"

import { useState } from "react"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SubmitTestimonialPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    eventType: "",
    eventDate: "",
    rating: 5,
    testimonial: "",
    permission: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Testimonial submitted:", formData)
    // Here you would typically send the data to your backend
    setSubmitted(true)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Share Your Experience</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                We value your feedback! Please share your experience with Hamduk Events and Rentals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Form Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Submit a Testimonial</CardTitle>
              <CardDescription>
                Your feedback helps us improve our services and helps other clients make informed decisions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email will not be published. It's only for verification purposes.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select
                      onValueChange={(value) => handleSelectChange("eventType", value)}
                      value={formData.eventType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="graduation">Graduation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input
                      id="eventDate"
                      name="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Your Rating</Label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => handleRatingChange(star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-6 w-6 ${
                              star <= formData.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="testimonial">Your Testimonial</Label>
                    <Textarea
                      id="testimonial"
                      name="testimonial"
                      placeholder="Please share your experience with our services..."
                      rows={5}
                      required
                      value={formData.testimonial}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="permission"
                      name="permission"
                      className="mt-1"
                      required
                      checked={formData.permission}
                      onChange={handleChange}
                    />
                    <Label htmlFor="permission" className="font-normal text-sm">
                      I give permission to Hamduk Events and Rentals to use my testimonial on their website, social
                      media, and other marketing materials.
                    </Label>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 space-y-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold">Thank You!</h3>
                  <p className="text-muted-foreground max-w-md">
                    Your testimonial has been submitted successfully. We appreciate you taking the time to share your
                    experience with us.
                  </p>
                </div>
              )}
            </CardContent>
            {!submitted && (
              <CardFooter>
                <Button onClick={handleSubmit} className="w-full bg-rose-600 hover:bg-rose-700">
                  Submit Testimonial
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>
      </section>

      {/* Testimonial Guidelines */}
      <section className="w-full py-12 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 max-w-4xl">
          <h2 className="text-2xl font-bold mb-6 text-center">Testimonial Guidelines</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">Tips for a Great Testimonial</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li>• Be specific about what you liked about our services</li>
                <li>• Mention any specific staff members who went above and beyond</li>
                <li>• Share how our services made a difference for your event</li>
                <li>• Include details about the quality of our rentals or planning services</li>
                <li>• Keep it authentic and in your own words</li>
              </ul>
            </div>
            <div className="bg-white dark:bg-gray-950 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-3">What Happens Next</h3>
              <ul className="space-y-2 text-gray-500 dark:text-gray-400">
                <li>• We'll review your testimonial within 3-5 business days</li>
                <li>• We may contact you for clarification or additional information</li>
                <li>• Once approved, your testimonial may appear on our website and social media</li>
                <li>• We may edit for clarity or length, but will never change the meaning</li>
                <li>• You can request removal of your testimonial at any time</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
