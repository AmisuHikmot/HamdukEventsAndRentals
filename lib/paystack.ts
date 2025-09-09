interface PaystackConfig {
  publicKey: string
  secretKey: string
  baseUrl: string
}

const config: PaystackConfig = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  secretKey: process.env.PAYSTACK_SECRET_KEY || "",
  baseUrl: "https://api.paystack.co",
}

export interface PaystackInitializeData {
  email: string
  amount: number // in kobo (multiply by 100)
  reference?: string
  callback_url?: string
  metadata?: Record<string, any>
  channels?: string[]
}

export interface PaystackResponse {
  status: boolean
  message: string
  data: any
}

export class PaystackService {
  private headers = {
    Authorization: `Bearer ${config.secretKey}`,
    "Content-Type": "application/json",
  }

  async initializeTransaction(data: PaystackInitializeData): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${config.baseUrl}/transaction/initialize`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify(data),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack initialization error:", error)
      throw new Error("Failed to initialize payment")
    }
  }

  async verifyTransaction(reference: string): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${config.baseUrl}/transaction/verify/${reference}`, {
        method: "GET",
        headers: this.headers,
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack verification error:", error)
      throw new Error("Failed to verify payment")
    }
  }

  async createCustomer(
    email: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
  ): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${config.baseUrl}/customer`, {
        method: "POST",
        headers: this.headers,
        body: JSON.stringify({
          email,
          first_name: firstName,
          last_name: lastName,
          phone,
        }),
      })

      const result = await response.json()
      return result
    } catch (error) {
      console.error("Paystack customer creation error:", error)
      throw new Error("Failed to create customer")
    }
  }

  generateReference(): string {
    return `HE_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
  }
}

export const paystack = new PaystackService()
