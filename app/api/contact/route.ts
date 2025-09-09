import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { sendContactFormNotification } from "@/lib/email"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
        status: "new",
      })
      .select()
      .single()

    if (error) {
      console.error("Contact submission error:", error)
      return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
    }

    // Send email notification
    try {
      await sendContactFormNotification(data)
    } catch (emailError) {
      console.error("Email notification error:", emailError)
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: "Contact form submitted successfully. We'll get back to you soon!",
    })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
