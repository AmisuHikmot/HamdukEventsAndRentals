import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { paystack } from "@/lib/paystack"

// Use server-only env vars for Supabase service client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, email, amount: rawAmount, customerInfo } = body ?? {}

    // Basic validation
    if (!bookingId || !email || rawAmount == null) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId, email or amount" },
        { status: 400 }
      )
    }

    const amount = Number(rawAmount)
    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Verify booking exists
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single()

    if (bookingError || !booking) {
      console.error("Booking lookup failed", bookingError)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    // Try to validate amount against booking record (common field names)
    // If your bookings table uses a different field name for the price, update these keys.
    const bookingAmountCandidate =
      booking.amount ?? booking.price ?? booking.total_amount ?? null

    if (bookingAmountCandidate != null) {
      const bookingAmountNum = Number(bookingAmountCandidate)
      // If booking has a price and it doesn't match the client's amount, reject to avoid tampering.
      if (Number.isFinite(bookingAmountNum) && bookingAmountNum !== amount) {
        console.error(
          "Amount mismatch: client provided",
          amount,
          "but booking expects",
          bookingAmountNum
        )
        return NextResponse.json(
          { error: "Amount does not match booking total" },
          { status: 400 }
        )
      }
    }

    // Prevent duplicate pending payment for same booking (optional but recommended)
    const { data: existingPayments } = await supabase
      .from("payments")
      .select("*")
      .eq("booking_id", bookingId)
      .eq("status", "pending")
      .limit(1)

    if (Array.isArray(existingPayments) && existingPayments.length > 0) {
      const existing = existingPayments[0]
      // If we already have a pending payment, return its auth url (if stored) to avoid duplicates
      if (existing?.gateway_response?.authorization_url) {
        return NextResponse.json({
          success: true,
          authorization_url: existing.gateway_response.authorization_url,
          reference: existing.payment_reference,
          note: "Existing pending payment returned",
        })
      }
    }

    // Generate unique reference server-side
    const reference = paystack.generateReference()

    // Convert to kobo for Paystack (Naira * 100)
    const paystackAmount = Math.round(amount * 100)

    // Build callback_url - ensure your NEXT_PUBLIC_BASE_URL is set and correct for production
    const callbackUrl = `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") || ""}/payment/callback`

    // Initialize Paystack transaction
    const paystackResponse = await paystack.initializeTransaction({
      email,
      amount: paystackAmount,
      reference,
      callback_url: callbackUrl,
      metadata: {
        booking_id: bookingId,
        customer_name: `${customerInfo?.firstName ?? ""} ${customerInfo?.lastName ?? ""}`.trim(),
        customer_phone: customerInfo?.phone ?? null,
      },
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    })

    if (!paystackResponse?.status) {
      console.error("Paystack initialization failed", paystackResponse)
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 502 })
    }

    // Persist payment record (store amount as received from client, but you can store both naira & kobo if you prefer)
    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: bookingId,
      payment_reference: reference,
      amount, // in Naira (keep consistent with your app)
      amount_kobo: paystackAmount, // optional: useful for debugging/verification
      payment_method: "paystack",
      payment_gateway: "paystack",
      status: "pending",
      gateway_response: paystackResponse.data, // assuming column type is json/jsonb
      customer_info: customerInfo ?? {},
      created_at: new Date().toISOString(),
    })

    if (paymentError) {
      console.error("Payment record creation error:", paymentError)
      return NextResponse.json({ error: "Failed to create payment record" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      authorization_url: paystackResponse.data.authorization_url,
      access_code: paystackResponse.data.access_code,
      reference,
    })
  } catch (err) {
    console.error("Payment initialization error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
