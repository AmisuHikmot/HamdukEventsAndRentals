"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AppCookies } from "@/lib/cookies"
import { trackBookingCompleted } from "@/lib/analytics"
import { CreditCard, Shield, Loader2 } from "lucide-react"

type BookingSession = {
  bookingId?: string
  bookingNumber?: string
  amount?: number
  customerInfo?: {
    firstName?: string
    lastName?: string
    email?: string
    phone?: string
  }
  [k: string]: any
}

const formatCurrency = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "0"
  // show no decimal places for Naira; change as needed
  return value.toLocaleString()
}

export default function PaymentPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookingSession, setBookingSession] = useState<BookingSession | null>(null)

  useEffect(() => {
    const sessionRaw = AppCookies.getBookingSession()
    if (!sessionRaw) {
      router.push("/booking")
      return
    }

    // Normalize session and ensure amount is a number
    const normalized: BookingSession = {
      ...sessionRaw,
      amount: (() => {
        const a = sessionRaw?.amount
        // handle string numbers, numeric types, etc.
        const n = Number(a)
        return Number.isFinite(n) ? n : 0
      })(),
      customerInfo: {
        ...(sessionRaw?.customerInfo ?? {}),
      },
    }

    setBookingSession(normalized)
  }, [router])

  const handlePayment = async () => {
    if (!bookingSession) return

    setLoading(true)
    setError(null)

    try {
      // NOTE: Paystack usually expects amount in kobo (Naira * 100). Convert if needed.
      // const paystackAmount = Math.round((bookingSession.amount || 0) * 100);

      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookingId: bookingSession.bookingId,
          email: bookingSession.customerInfo?.email,
          amount: bookingSession.amount,
          customerInfo: bookingSession.customerInfo,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Failed to initialize payment")
      }

      // Track payment initiation (safe: only call with a number)
      trackBookingCompleted?.("payment_initiated", bookingSession.amount ?? 0)

      // Redirect to Paystack (authorization_url expected from backend)
      if (data?.authorization_url) {
        window.location.href = data.authorization_url
      } else {
        throw new Error("Payment gateway did not return an authorization URL")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment initialization failed")
    } finally {
      setLoading(false)
    }
  }

  if (!bookingSession) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardContent className="pt-6 text-center">
            <p>Loading payment details...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const amt = bookingSession.amount ?? 0
  const baseFee = amt * 0.7
  const addServices = amt * 0.25
  const processing = amt * 0.05

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Complete Your Payment
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Secure your booking with our trusted payment gateway
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
            <CardDescription>Booking #{bookingSession.bookingNumber ?? "—"}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Service Fee</span>
                <span>₦{formatCurrency(baseFee)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Additional Services</span>
                <span>₦{formatCurrency(addServices)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Processing Fee</span>
                <span>₦{formatCurrency(processing)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total Amount</span>
                <span>₦{formatCurrency(amt)}</span>
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                💡 This is a deposit to secure your booking. Final pricing will be confirmed during our consultation.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Choose your preferred payment option</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg bg-rose-50 border-rose-200">
                <CreditCard className="h-5 w-5 text-rose-600" />
                <div className="flex-1">
                  <p className="font-medium">Card Payment</p>
                  <p className="text-sm text-gray-600">Visa, Mastercard, Verve</p>
                </div>
                <Badge>Recommended</Badge>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-5 w-5 bg-green-600 rounded"></div>
                <div className="flex-1">
                  <p className="font-medium">Bank Transfer</p>
                  <p className="text-sm text-gray-600">Direct bank transfer</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="h-5 w-5 bg-blue-600 rounded"></div>
                <div className="flex-1">
                  <p className="font-medium">USSD</p>
                  <p className="text-sm text-gray-600">Pay with your phone</p>
                </div>
              </div>
            </div>

            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <Button onClick={handlePayment} disabled={loading} className="w-full bg-rose-600 hover:bg-rose-700">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Shield className="h-4 w-4 mr-2" />
                  Pay ₦{formatCurrency(amt)}
                </>
              )}
            </Button>

            <div className="text-center">
              <p className="text-xs text-gray-500">🔒 Your payment is secured by Paystack</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Information */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Customer Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <Label>Name</Label>
              <p className="font-medium">
                {`${bookingSession.customerInfo?.firstName ?? ""} ${bookingSession.customerInfo?.lastName ?? ""}`.trim() || "—"}
              </p>
            </div>
            <div>
              <Label>Email</Label>
              <p className="font-medium">{bookingSession.customerInfo?.email ?? "—"}</p>
            </div>
            <div>
              <Label>Phone</Label>
              <p className="font-medium">{bookingSession.customerInfo?.phone ?? "—"}</p>
            </div>
            <div>
              <Label>Booking Reference</Label>
              <p className="font-medium">{bookingSession.bookingNumber ?? "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
