"use client"

import type React from "react"

import { useState } from "react"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you for your message! We'll get back to you soon.")
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Have questions or ready to start planning your event? Get in touch with our team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold mb-6">Get In Touch</h2>
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
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select onValueChange={handleSelectChange} value={formData.subject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="event">Event Planning</SelectItem>
                      <SelectItem value="rental">Equipment Rental</SelectItem>
                      <SelectItem value="quote">Request a Quote</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Your message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700">
                  Send Message
                </Button>
              </form>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              <div className="grid gap-6">
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <Phone className="h-6 w-6 text-rose-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">Phone</h3>
                      <p className="text-muted-foreground">(555) 123-4567</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <Mail className="h-6 w-6 text-rose-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">Email</h3>
                      <p className="text-muted-foreground">info@hamdukevents.com</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-rose-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">Address</h3>
                      <p className="text-muted-foreground">123 Event St, City, State 12345</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 flex items-start gap-4">
                    <Clock className="h-6 w-6 text-rose-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-lg">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9am - 5pm</p>
                      <p className="text-muted-foreground">Saturday: 10am - 3pm</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-6 text-center">Find Us</h2>
          <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
            {/* Replace with actual map embed */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-800">
              <p className="text-muted-foreground">Map Embed Would Go Here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
