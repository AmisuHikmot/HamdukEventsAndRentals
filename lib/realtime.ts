"use client"

import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

export function useRealtimeBookings() {
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch initial data
    const fetchBookings = async () => {
      const { data, error } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

      if (!error && data) {
        setBookings(data)
      }
      setLoading(false)
    }

    fetchBookings()

    // Subscribe to real-time changes
    const channel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        (payload) => {
          console.log("Booking change received:", payload)

          if (payload.eventType === "INSERT") {
            setBookings((prev) => [payload.new as any, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setBookings((prev) =>
              prev.map((booking) => (booking.id === payload.new.id ? (payload.new as any) : booking)),
            )
          } else if (payload.eventType === "DELETE") {
            setBookings((prev) => prev.filter((booking) => booking.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  return { bookings, loading }
}

export function useRealtimeBookingStatus(bookingId: string) {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bookingId) return

    // Fetch initial booking data
    const fetchBooking = async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          booking_services(*),
          booking_rentals(*),
          payments(*)
        `)
        .eq("id", bookingId)
        .single()

      if (!error && data) {
        setBooking(data)
      }
      setLoading(false)
    }

    fetchBooking()

    // Subscribe to real-time changes for this specific booking
    const channel = supabase
      .channel(`booking-${bookingId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "bookings",
          filter: `id=eq.${bookingId}`,
        },
        (payload) => {
          console.log("Booking status updated:", payload)
          setBooking((prev: any) => ({ ...prev, ...payload.new }))
        },
      )
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "payments",
          filter: `booking_id=eq.${bookingId}`,
        },
        (payload) => {
          console.log("Payment status updated:", payload)
          setBooking((prev: any) => ({
            ...prev,
            payments: prev.payments?.map((p: any) => (p.id === payload.new?.id ? payload.new : p)) || [payload.new],
          }))
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [bookingId])

  return { booking, loading }
}
