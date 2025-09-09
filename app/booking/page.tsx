"use client"

import { trackBookingStarted } from "@/lib/analytics"
import { AppCookies } from "@/lib/cookies"
import { useRouter } from "next/router"
import { useState } from "react"

const BookingPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    eventType: "",
    name: "",
    email: "",
    phone: "",
    guestCount: "",
    services: [],
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const calculateEstimatedCost = () => {
    // Basic cost calculation - you can make this more sophisticated
    let cost = 0

    // Base cost per guest
    if (formData.guestCount) {
      cost += Number.parseInt(formData.guestCount) * 2000 // ₦2,000 per guest
    }

    // Service costs
    if (formData.services.includes("Event Planning")) cost += 50000
    if (formData.services.includes("Catering")) cost += Number.parseInt(formData.guestCount || "0") * 3000
    if (formData.services.includes("Decoration")) cost += 75000
    if (formData.services.includes("Equipment Rentals")) cost += 25000
    if (formData.services.includes("Staffing")) cost += 30000

    return cost
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Code to create booking
    const response = await fetch("/api/booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()

    if (response.ok) {
      // Track booking started
      trackBookingStarted(formData.eventType)

      // Save booking session for payment
      AppCookies.setBookingSession({
        bookingId: data.bookingId,
        bookingNumber: data.bookingNumber,
        amount: calculateEstimatedCost(),
        customerInfo: {
          firstName: formData.name.split(" ")[0],
          lastName: formData.name.split(" ").slice(1).join(" "),
          email: formData.email,
          phone: formData.phone,
        },
      })

      // Redirect to payment if amount > 0
      if (calculateEstimatedCost() > 0) {
        router.push(`/payment?booking=${data.bookingNumber}`)
      } else {
        setIsSubmitted(true)
      }
    } else {
      console.error("Booking failed:", data.error)
    }
  }

  // ** rest of code here **/

  return (
    <div>
      {/* Booking form JSX */}
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <button type="submit">Submit Booking</button>
      </form>
      {isSubmitted && <p>Booking submitted successfully!</p>}
    </div>
  )
}

export default BookingPage
