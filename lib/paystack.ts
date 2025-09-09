export interface PaystackConfig {
  publicKey: string
  secretKey: string
  baseUrl: string
}

export interface PaymentData {
  email: string
  amount: number // in kobo
  reference: string
  callback_url?: string
  metadata?: {
    booking_id: string
    customer_name: string
    event_type: string
    [key: string]: any
  }
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

export interface VerificationResponse {
  status: boolean
  message: string
  data?: {
    id: number
    domain: string
    status: string
    reference: string
    amount: number
    message: string
    gateway_response: string
    paid_at: string
    created_at: string
    channel: string
    currency: string
    ip_address: string
    metadata: any
    log: any
    fees: number
    fees_split: any
    authorization: {
      authorization_code: string
      bin: string
      last4: string
      exp_month: string
      exp_year: string
      channel: string
      card_type: string
      bank: string
      country_code: string
      brand: string
      reusable: boolean
      signature: string
      account_name: string
    }
    customer: {
      id: number
      first_name: string
      last_name: string
      email: string
      customer_code: string
      phone: string
      metadata: any
      risk_action: string
    }
    plan: any
    split: any
    order_id: any
    paidAt: string
    createdAt: string
    requested_amount: number
    pos_transaction_data: any
    source: any
    fees_breakdown: any
  }
}

const config: PaystackConfig = {
  publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
  secretKey: process.env.PAYSTACK_SECRET_KEY || "",
  baseUrl: "https://api.paystack.co",
}

export async function initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${config.baseUrl}/transaction/initialize`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error initializing payment:", error)
    return {
      status: false,
      message: "Failed to initialize payment",
    }
  }
}

export async function verifyPayment(reference: string): Promise<VerificationResponse> {
  try {
    const response = await fetch(`${config.baseUrl}/transaction/verify/${reference}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.secretKey}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()
    return result
  } catch (error) {
    console.error("Error verifying payment:", error)
    return {
      status: false,
      message: "Failed to verify payment",
    }
  }
}

export function generatePaymentReference(): string {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substring(2, 15)
  return `HAMDUK_${timestamp}_${random}`.toUpperCase()
}

export function convertToKobo(nairaAmount: number): number {
  return Math.round(nairaAmount * 100)
}

export function convertFromKobo(koboAmount: number): number {
  return koboAmount / 100
}

// Paystack service class
export class PaystackService {
  async initializePayment(paymentData: PaymentData): Promise<PaymentResponse> {
    return initializePayment(paymentData)
  }

  async verifyPayment(reference: string): Promise<VerificationResponse> {
    return verifyPayment(reference)
  }

  generatePaymentReference(): string {
    return generatePaymentReference()
  }

  convertToKobo(nairaAmount: number): number {
    return convertToKobo(nairaAmount)
  }

  convertFromKobo(koboAmount: number): number {
    return convertFromKobo(koboAmount)
  }
}

// Export paystack service instance
export const paystack = new PaystackService()
