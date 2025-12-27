"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"

type PaymentData = {
  status?: string
  amount?: number | string
  booking_number?: string
  customer?: {
    email?: string
  }
  [k: string]: any
}

const formatCurrency = (value?: number) => {
  if (typeof value !== "number" || Number.isNaN(value)) return "0"
  return value.toLocaleString()
}

export default function PaymentCallbackPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "failed">("loading")
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const reference = searchParams.get("reference")
    const trxref = searchParams.get("trxref")

    const paymentReference = reference || trxref

    if (!paymentReference) {
      setStatus("failed")
      setError("No payment reference found")
      return
    }

    verifyPayment(paymentReference)
  }, [searchParams])

  const verifyPayment = async (reference: string) => {
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reference }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data?.error || "Payment verification failed")
      }

      if (data?.status === "success") {
        // Normalize amount (Paystack usually returns kobo)
        const rawAmount = Number(data?.amount)
        const amountInNaira = Number.isFinite(rawAmount)
          ? rawAmount / 100 // remove /100 if backend already converts
          : 0

        setPaymentData({
          ...data,
          amount: amountInNaira,
        })

        setStatus("success")
      } else {
        setStatus("failed")
        setError("Payment was not successful")
      }
    } catch (err) {
      setStatus("failed")
      setError(err instanceof Error ? err.message : "Payment verification failed")
    }
  }

  const handleContinue = () => {
    if (status === "success" && paymentData?.booking_number) {
      router.push(`/booking/status?ref=${paymentData.booking_number}`)
    } else {
      router.push("/")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4 text-rose-600" />
              <CardTitle>Verifying Payment</CardTitle>
              <CardDescription>Please wait while we confirm your payment...</CardDescription>
            </>
          )}

          {status === "success" && (
            <>
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-600" />
              <CardTitle className="text-green-800">Payment Successful!</CardTitle>
              <CardDescription>Your booking has been confirmed</CardDescription>
            </>
          )}

          {status === "failed" && (
            <>
              <XCircle className="h-12 w-12 mx-auto mb-4 text-red-600" />
              <CardTitle className="text-red-800">Payment Failed</CardTitle>
              <CardDescription>There was an issue with your payment</CardDescription>
            </>
          )}
        </CardHeader>

        <CardContent className="space-y-4">
          {status === "success" && paymentData && (
            <div className="space-y-3">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Payment Details</h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Amount:</span>
                    <span className="font-medium">
                      ₦{formatCurrency(paymentData.amount as number)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer:</span>
                    <span className="font-medium">
                      {paymentData.customer?.email ?? "—"}
                    </span>
                  </div>
                </div>
              </div>

              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  A confirmation email has been sent to your email address with all the booking details.
                </AlertDescription>
              </Alert>
            </div>
          )}

          {status === "failed" && error && (
            <Alert className="border-red-200 bg-red-50">
              <XCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800">{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-3">
            {status === "success" && (
              <>
                <Button onClick={handleContinue} className="flex-1">
                  View Booking Status
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
                  Back to Home
                </Button>
              </>
            )}

            {status === "failed" && (
              <>
                <Button variant="outline" onClick={() => router.back()} className="flex-1">
                  Try Again
                </Button>
                <Button onClick={() => router.push("/")} className="flex-1">
                  Back to Home
                </Button>
              </>
            )}

            {status === "loading" && (
              <Button disabled className="w-full">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Verifying...
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
