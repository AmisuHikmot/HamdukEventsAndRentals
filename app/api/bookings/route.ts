import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Generate booking number
    const bookingNumber = `HE${Date.now()}`

    // Insert booking
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        booking_number: bookingNumber,
        event_type: body.eventType,
        event_date: body.eventDate,
        event_time: body.eventTime,
        guest_count: Number.parseInt(body.guestCount),
        venue_location: body.location,
        notes: body.additionalInfo,
        status: "pending",
      })
      .select()
      .single()

    if (bookingError) {
      console.error("Booking error:", bookingError)
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    // Insert selected services
    if (body.services && body.services.length > 0) {
      const serviceInserts = body.services.map((service: string) => ({
        booking_id: booking.id,
        service_name: service,
        quantity: 1,
      }))

      const { error: servicesError } = await supabase.from("booking_services").insert(serviceInserts)

      if (servicesError) {
        console.error("Services error:", servicesError)
      }
    }

    return NextResponse.json({
      success: true,
      bookingNumber,
      message: "Booking request submitted successfully",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    let query = supabase
      .from("bookings")
      .select(`
        *,
        booking_services(*),
        booking_rentals(*)
      `)
      .order("created_at", { ascending: false })

    if (status) {
      query = query.eq("status", status)
    }

    const { data: bookings, error } = await query

    if (error) {
      console.error("Fetch bookings error:", error)
      return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 })
    }

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
