"use client"

import type React from "react"

import { useState } from "react"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function BookingPage() {
  const [date, setDate] = useState<Date>()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    eventDate: "",
    eventTime: "",
    location: "",
    services: [],
    additionalInfo: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      setFormData((prev) => ({ ...prev, eventDate: format(selectedDate, "PPP") }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    setStep(3) // Move to confirmation step
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Book Your Event</h1>
              <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                Fill out the form below to request a consultation for your upcoming event.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form Section */}
      <section className="w-full py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>Event Booking Request</CardTitle>
              <CardDescription>Please provide details about your event so we can better assist you.</CardDescription>
            </CardHeader>
            <CardContent>
              {step === 1 && (
                <div className="space-y-6">
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
                      required
                      value={formData.phone}
                      onChange={handleChange}
                    />
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
                    <Label htmlFor="guestCount">Estimated Guest Count</Label>
                    <Input
                      id="guestCount"
                      name="guestCount"
                      type="number"
                      placeholder="Number of guests"
                      required
                      value={formData.guestCount}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Select a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={date} onSelect={handleDateChange} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="eventTime">Event Time</Label>
                    <Input
                      id="eventTime"
                      name="eventTime"
                      type="time"
                      required
                      value={formData.eventTime}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Event Location (if known)</Label>
                    <Input
                      id="location"
                      name="location"
                      placeholder="Address or venue name"
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Services Needed</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="planning"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            const services = [...(formData.services as string[])]
                            if (e.target.checked) {
                              services.push("Event Planning")
                            } else {
                              const index = services.indexOf("Event Planning")
                              if (index > -1) services.splice(index, 1)
                            }
                            setFormData((prev) => ({ ...prev, services }))
                          }}
                        />
                        <Label htmlFor="planning" className="font-normal">
                          Event Planning
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="rentals"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            const services = [...(formData.services as string[])]
                            if (e.target.checked) {
                              services.push("Equipment Rentals")
                            } else {
                              const index = services.indexOf("Equipment Rentals")
                              if (index > -1) services.splice(index, 1)
                            }
                            setFormData((prev) => ({ ...prev, services }))
                          }}
                        />
                        <Label htmlFor="rentals" className="font-normal">
                          Equipment Rentals
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="staffing"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            const services = [...(formData.services as string[])]
                            if (e.target.checked) {
                              services.push("Staffing")
                            } else {
                              const index = services.indexOf("Staffing")
                              if (index > -1) services.splice(index, 1)
                            }
                            setFormData((prev) => ({ ...prev, services }))
                          }}
                        />
                        <Label htmlFor="staffing" className="font-normal">
                          Staffing
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="decor"
                          className="rounded border-gray-300"
                          onChange={(e) => {
                            const services = [...(formData.services as string[])]
                            if (e.target.checked) {
                              services.push("Decor & Design")
                            } else {
                              const index = services.indexOf("Decor & Design")
                              if (index > -1) services.splice(index, 1)
                            }
                            setFormData((prev) => ({ ...prev, services }))
                          }}
                        />
                        <Label htmlFor="decor" className="font-normal">
                          Decor & Design
                        </Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder="Tell us more about your event and any specific requirements"
                      rows={4}
                      value={formData.additionalInfo}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col items-center justify-center py-6 space-y-4">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                  <h3 className="text-2xl font-bold text-center">Booking Request Submitted!</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Thank you for your booking request. Our team will review your information and contact you within 24
                    hours to discuss your event details.
                  </p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 && step < 3 && (
                <Button variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step === 1 && (
                <Button onClick={nextStep} className="ml-auto bg-rose-600 hover:bg-rose-700">
                  Next
                </Button>
              )}
              {step === 2 && (
                <Button onClick={handleSubmit} className="ml-auto bg-rose-600 hover:bg-rose-700">
                  Submit Request
                </Button>
              )}
              {step === 3 && (
                <Button asChild className="mx-auto bg-rose-600 hover:bg-rose-700">
                  <a href="/">Return to Home</a>
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  )
}
