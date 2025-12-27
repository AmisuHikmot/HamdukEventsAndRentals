import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { paystack } from "@/lib/paystack"
import { sendBookingConfirmationEmail } from "@/lib/email"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { reference } = await request.json()

    if (!reference) {
      return NextResponse.json({ error: "Missing payment reference" }, { status: 400 })
    }

    // 🔍 Verify with Paystack
    const verification = await paystack.verifyTransaction(reference)

    if (!verification?.status) {
      return NextResponse.json({ error: "Payment verification failed" }, { status: 400 })
    }

    const paystackData = verification.data

    // 🔄 Update payment record
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .update({
        status: paystackData.status === "success" ? "successful" : "failed",
        gateway_transaction_id: paystackData.id,
        gateway_response: paystackData,
      })
      .eq("payment_reference", reference)
      .select("*, bookings(*)")
      .single()

    if (paymentError || !payment) {
      console.error("Payment update error:", paymentError)
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 })
    }

    // ✅ If successful, update booking (DO NOT TOUCH total_amount)
    if (paystackData.status === "success") {
      const { error: bookingError } = await supabase
        .from("bookings")
        .update({
          status: "confirmed",
          payment_status: "paid",
        })
        .eq("id", payment.booking_id)

      if (bookingError) {
        console.error("Booking update error:", bookingError)
      }

      // 📧 Send confirmation email (non-blocking)
      try {
        await sendBookingConfirmationEmail({
          booking: payment.bookings,
          payment,
          customerEmail: paystackData.customer?.email ?? "",
        })
      } catch (emailError) {
        console.error("Email sending error:", emailError)
      }
    }

    // ✅ SAFE response for frontend
    return NextResponse.json({
      success: true,
      status: paystackData.status,
      amount: Number(paystackData.amount) / 100 || 0, // always number
      customer: {
        email: paystackData.customer?.email ?? "",
      },
      booking_number: payment.bookings?.booking_number ?? null,
    })
  } catch (error) {
    console.error("Payment verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
