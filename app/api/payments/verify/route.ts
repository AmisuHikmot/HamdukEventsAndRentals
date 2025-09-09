import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { paystack } from "@/lib/paystack"
import { sendBookingConfirmationEmail } from "@/lib/email"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { reference } = body

    // Verify payment with Paystack
    const verification = await paystack.verifyTransaction(reference)

    if (!verification.status) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    const paymentData = verification.data

    // Update payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .update({
        status: paymentData.status === "success" ? "successful" : "failed",
        gateway_transaction_id: paymentData.id,
        gateway_response: paymentData,
      })
      .eq("payment_reference", reference)
      .select("*, bookings(*)")
      .single()

    if (paymentError) {
      console.error("Payment update error:", paymentError)
      return NextResponse.json({ error: "Failed to update payment" }, { status: 500 })
    }

    // Update booking status if payment successful
    if (paymentData.status === "success") {
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          payment_status: "paid",
          total_amount: paymentData.amount / 100, // Convert from kobo
        })
        .eq("id", payment.booking_id)

      if (bookingError) {
        console.error("Booking update error:", bookingError)
      }

      // Send confirmation email
      try {
        await sendBookingConfirmationEmail({
          booking: payment.bookings,
          payment: payment,
          customerEmail: paymentData.customer.email,
        })
      } catch (emailError) {
        console.error("Email sending error:", emailError)
      }
    }

    return NextResponse.json({
      success: true,
      status: paymentData.status,
      amount: paymentData.amount / 100,
      customer: paymentData.customer,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
