import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { paystack } from "@/lib/paystack"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, email, amount, customerInfo } = body

    // Verify booking exists
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Generate payment reference
    const reference = paystack.generateReference()

    // Initialize Paystack transaction
    const paystackResponse = await paystack.initializeTransaction({
      email,
      amount: Math.round(amount * 100), // Convert to kobo
      reference,
      callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/callback`,
      metadata: {
        booking_id: bookingId,
        customer_name: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customer_phone: customerInfo.phone,
      },
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    })

    if (!paystackResponse.status) {
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 })
    }

    // Store payment record
    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: bookingId,
      payment_reference: reference,
      amount,
      payment_method: "paystack",
      payment_gateway: "paystack",
      status: "pending",
      gateway_response: paystackResponse.data,
    })

    if (paymentError) {
      console.error("Payment record error:", paymentError)
      return NextResponse.json({ error: "Failed to create payment record" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      authorization_url: paystackResponse.data.authorization_url,
      access_code: paystackResponse.data.access_code,
      reference,
    })
  } catch (error) {
    console.error("Payment initialization error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
