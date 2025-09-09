import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendTestimonialNotification } from "@/lib/email"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("testimonials")
      .insert({
        name: body.name,
        email: body.email,
        event_type: body.eventType,
        event_date: body.eventDate,
        rating: body.rating,
        testimonial: body.testimonial,
        is_approved: false, // Requires admin approval
      })
      .select()
      .single()

    if (error) {
      console.error("Testimonial submission error:", error)
      return NextResponse.json({ error: "Failed to submit testimonial" }, { status: 500 })
    }

    // Send email notification
    try {
      await sendTestimonialNotification(data)
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Testimonial submitted successfully. Thank you for your feedback!",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const approved = searchParams.get("approved") !== "false"
    const featured = searchParams.get("featured") === "true"
    const limit = Number.parseInt(searchParams.get("limit") || "10")

    let query = supabase
      .from("testimonials")
      .select("*")
      .eq("is_approved", approved)
      .order("created_at", { ascending: false })
      .limit(limit)

    if (featured) {
      query = query.eq("is_featured", true)
    }

    const { data: testimonials, error } = await query

    if (error) {
      console.error("Fetch testimonials error:", error)
      return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 })
    }

    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
