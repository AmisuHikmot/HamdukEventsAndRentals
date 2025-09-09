interface PaystackResponse {
  status: boolean
  message: string
  data?: any
}

interface PaymentData {
  email: string
  amount: number
  reference?: string
  callback_url?: string
  metadata?: any
}

class PaystackService {
  private secretKey: string
  private publicKey: string
  private baseUrl = "https://api.paystack.co"

  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY || ""
    this.publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || ""
  }

  // Generate payment reference
  generateReference(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000000)
    return `hamduk_${timestamp}_${random}`
  }

  // Initialize payment
  async initializePayment(data: PaymentData): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          amount: data.amount * 100, // Convert to kobo
          reference: data.reference || this.generateReference(),
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack initialization error:", error)
      return {
        status: false,
        message: "Failed to initialize payment",
      }
    }
  }

  // Verify payment
  async verifyPayment(reference: string): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack verification error:", error)
      return {
        status: false,
        message: "Failed to verify payment",
      }
    }
  }

  // Get payment details
  async getPayment(id: string): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/transaction/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack get payment error:", error)
      return {
        status: false,
        message: "Failed to get payment details",
      }
    }
  }

  // List transactions
  async listTransactions(params?: any): Promise<PaystackResponse> {
    try {
      const queryParams = new URLSearchParams(params).toString()
      const response = await fetch(`${this.baseUrl}/transaction?${queryParams}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
        },
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack list transactions error:", error)
      return {
        status: false,
        message: "Failed to list transactions",
      }
    }
  }

  // Convert amount to kobo
  toKobo(amount: number): number {
    return Math.round(amount * 100)
  }

  // Convert amount from kobo
  fromKobo(amount: number): number {
    return amount / 100
  }

  // Get public key
  getPublicKey(): string {
    return this.publicKey
  }
}

// Export singleton instance
export const paystack = new PaystackService()

// Export class for custom instances
export { PaystackService }

// Export utilities
export const paystackUtils = {
  generateReference: () => paystack.generateReference(),
  toKobo: (amount: number) => paystack.toKobo(amount),
  fromKobo: (amount: number) => paystack.fromKobo(amount),
  getPublicKey: () => paystack.getPublicKey(),
}

export default paystack
