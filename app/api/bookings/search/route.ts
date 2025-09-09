import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ref = searchParams.get("ref")

    if (!ref) {
      return NextResponse.json({ error: "Booking reference is required" }, { status: 400 })
    }

    const { data: booking, error } = await supabase
      .from("bookings")
      .select(`
        *,
        booking_services(*),
        booking_rentals(*),
        payments(*)
      `)
      .eq("booking_number", ref)
      .single()

    if (error || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json({ booking })
  } catch (error) {
    console.error("Search booking error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
