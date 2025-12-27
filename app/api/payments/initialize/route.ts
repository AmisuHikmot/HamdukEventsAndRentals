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
    if (!bookingId || !email) {
      return NextResponse.json(
        { error: "Missing required fields: bookingId or email" },
        { status: 400 }
      )
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

    // Use booking.total_amount as source of truth if present; otherwise fall back to client amount
    let amount: number | null = null
    if (booking.total_amount != null) {
      const n = Number(booking.total_amount)
      if (!Number.isFinite(n) || n <= 0) {
        return NextResponse.json({ error: "Invalid booking total_amount" }, { status: 400 })
      }
      amount = n
    } else if (rawAmount != null) {
      const n = Number(rawAmount)
      if (!Number.isFinite(n) || n <= 0) {
        return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
      }
      amount = n
    } else {
      return NextResponse.json({ error: "No amount available for payment" }, { status: 400 })
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

    // Build callback_url - ensure your NEXT_PUBLIC_BASE_URL is set and correct for production
    const base = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "")
    const callbackUrl = base ? `${base}/payment/callback` : `/payment/callback`

    // NOTE: pass amount in NAIRA to paystack.initializePayment (service converts to kobo)
    const paystackResponse = await paystack.initializePayment({
      email,
      amount,
      reference,
      callback_url: callbackUrl,
      metadata: {
        booking_id: bookingId,
        booking_number: booking.booking_number ?? null,
        customer_name: `${customerInfo?.firstName ?? ""} ${customerInfo?.lastName ?? ""}`.trim(),
        customer_phone: customerInfo?.phone ?? null,
      },
      // channels param may be ignored by your service; included for completeness
      // channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
    })

    if (!paystackResponse?.status) {
      console.error("Paystack initialization failed", paystackResponse)
      return NextResponse.json({ error: "Failed to initialize payment" }, { status: 502 })
    }

    // Persist payment record (store both Naira & kobo)
    const amountKobo = Math.round(amount * 100)

    const { error: paymentError } = await supabase.from("payments").insert({
      booking_id: bookingId,
      payment_reference: reference,
      amount, // Naira
      amount_kobo: amountKobo,
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
