// Paystack integration utilities
export interface PaystackConfig {
  publicKey: string
  secretKey: string
  baseUrl: string
}

export interface PaymentData {
  email: string
  amount: number // in kobo
  reference?: string
  currency?: string
  callback_url?: string
  metadata?: Record<string, any>
}

export interface PaymentResponse {
  status: boolean
  message: string
  data?: {
    authorization_url: string
    access_code: string
    reference: string
  }
}

export class PaystackService {
  private config: PaystackConfig

  constructor() {
    this.config = {
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
      secretKey: process.env.PAYSTACK_SECRET_KEY || "",
      baseUrl: "https://api.paystack.co",
    }
  }

  // Generate payment reference
  generateReference(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 1000000)
    return `HMD_${timestamp}_${random}`
  }

  // Convert amount to kobo (Paystack uses kobo)
  toKobo(amount: number): number {
    return Math.round(amount * 100)
  }

  // Convert amount from kobo to naira
  fromKobo(amount: number): number {
    return amount / 100
  }

  // Initialize payment
  async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    try {
      const response = await fetch(`${this.config.baseUrl}/transaction/initialize`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...paymentData,
          amount: this.toKobo(paymentData.amount),
          reference: paymentData.reference || this.generateReference(),
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
  async verifyPayment(reference: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/transaction/verify/${reference}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          "Content-Type": "application/json",
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

  // Get transaction details
  async getTransaction(transactionId: string): Promise<any> {
    try {
      const response = await fetch(`${this.config.baseUrl}/transaction/${transactionId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack transaction fetch error:", error)
      return {
        status: false,
        message: "Failed to fetch transaction",
      }
    }
  }

  // List transactions
  async listTransactions(params: Record<string, any> = {}): Promise<any> {
    try {
      const queryString = new URLSearchParams(params).toString()
      const response = await fetch(`${this.config.baseUrl}/transaction?${queryString}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.config.secretKey}`,
          "Content-Type": "application/json",
        },
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack transactions list error:", error)
      return {
        status: false,
        message: "Failed to fetch transactions",
      }
    }
  }
}

// Create and export paystack instance
export const paystack = new PaystackService()

// Export utilities
export default paystack
