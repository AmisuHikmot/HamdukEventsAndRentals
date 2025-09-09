"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import { useRealtimeBookingStatus } from "@/lib/realtime"
import { Calendar, MapPin, Users, Clock, CreditCard, Phone, Mail } from "lucide-react"

export default function BookingStatusPage() {
  const searchParams = useSearchParams()
  const [bookingRef, setBookingRef] = useState(searchParams.get("ref") || "")
  const [searchedBookingId, setSearchedBookingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const { booking, loading } = useRealtimeBookingStatus(searchedBookingId || "")

  const handleSearch = async () => {
    if (!bookingRef.trim()) {
      setError("Please enter a booking reference")
      return
    }

    setError(null)

    try {
      // First, find the booking by reference number
      const response = await fetch(`/api/bookings/search?ref=${encodeURIComponent(bookingRef)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Booking not found")
      }

      setSearchedBookingId(data.booking.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to find booking")
      setSearchedBookingId(null)
    }
  }

  // Auto-search if ref is provided in URL
  useEffect(() => {
    if (bookingRef && !searchedBookingId) {
      handleSearch()
    }
  }, [bookingRef])

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Track Your Booking</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your booking reference to view the current status and details
        </p>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Find Your Booking</CardTitle>
          <CardDescription>Enter the booking reference number you received in your confirmation email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="booking-ref">Booking Reference</Label>
              <Input
                id="booking-ref"
                placeholder="e.g., HE1234567890"
                value={bookingRef}
                onChange={(e) => setBookingRef(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={handleSearch} disabled={loading}>
                {loading ? "Searching..." : "Search"}
              </Button>
            </div>
          </div>
          {error && (
            <Alert className="mt-4 border-red-200 bg-red-50">
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Loading State */}
      {loading && searchedBookingId && (
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </CardContent>
        </Card>
      )}

      {/* Booking Details */}
      {booking && !loading && (
        <div className="space-y-6">
          {/* Status Overview */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Booking #{booking.booking_number}</CardTitle>
                  <CardDescription>Submitted on {new Date(booking.created_at).toLocaleDateString()}</CardDescription>
                </div>
                <div className="text-right">
                  <Badge className={getStatusColor(booking.status)}>{booking.status?.toUpperCase() || "PENDING"}</Badge>
                  {booking.payment_status && (
                    <Badge className={`ml-2 ${getPaymentStatusColor(booking.payment_status)}`}>
                      Payment: {booking.payment_status.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Event Details */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Event Date</p>
                    <p className="text-sm text-gray-600">
                      {booking.event_date
                        ? new Date(booking.event_date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })
                        : "To be determined"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Event Time</p>
                    <p className="text-sm text-gray-600">{booking.event_time || "To be determined"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Guest Count</p>
                    <p className="text-sm text-gray-600">
                      {booking.guest_count ? `${booking.guest_count} guests` : "Not specified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-gray-600">{booking.venue_location || "To be determined"}</p>
                  </div>
                </div>
              </div>

              {booking.event_type && (
                <div>
                  <p className="font-medium mb-1">Event Type</p>
                  <Badge variant="outline">{booking.event_type}</Badge>
                </div>
              )}

              {booking.notes && (
                <div>
                  <p className="font-medium mb-1">Special Requirements</p>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{booking.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Services & Rentals */}
          {(booking.booking_services?.length > 0 || booking.booking_rentals?.length > 0) && (
            <Card>
              <CardHeader>
                <CardTitle>Selected Services & Rentals</CardTitle>
              </CardHeader>
              <CardContent>
                {booking.booking_services?.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Services</h4>
                    <div className="flex flex-wrap gap-2">
                      {booking.booking_services.map((service: any, index: number) => (
                        <Badge key={index} variant="secondary">
                          {service.service_name}
                          {service.quantity > 1 && ` (${service.quantity})`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {booking.booking_rentals?.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Rental Items</h4>
                    <div className="flex flex-wrap gap-2">
                      {booking.booking_rentals.map((rental: any, index: number) => (
                        <Badge key={index} variant="secondary">
                          {rental.rental_item_name}
                          {rental.quantity > 1 && ` (${rental.quantity})`}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Payment Information */}
          {booking.payments?.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                {booking.payments.map((payment: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <CreditCard className="h-5 w-5 text-rose-600" />
                      <div>
                        <p className="font-medium">₦{payment.amount?.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          {payment.payment_method?.toUpperCase()} • {payment.payment_reference}
                        </p>
                      </div>
                    </div>
                    <Badge className={getPaymentStatusColor(payment.status)}>{payment.status?.toUpperCase()}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
              <CardDescription>Contact our team for any questions about your booking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-gray-600">+234 818 596 8179</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-gray-600">hamdukuniqueconcept@gmail.com</p>
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex gap-4">
                <Button variant="outline" asChild>
                  <a href="/contact">Contact Support</a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="/testimonials/submit">Leave a Review</a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
