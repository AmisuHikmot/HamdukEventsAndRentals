/* paystack.ts */
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

interface VerificationData {
  reference: string
  amount: number
  status: string
  gateway_response: string
  paid_at: string
  created_at: string
  channel: string
  currency: string
  ip_address: string
  metadata: any
  fees: number
  customer?: {
    id?: number
    first_name?: string
    last_name?: string
    email?: string
    phone?: string
  }
}

class PaystackService {
  private baseUrl = "https://api.paystack.co"
  private secretKey: string

  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY ?? ""
    if (!this.secretKey) {
      // Fail fast so devs notice missing secret key
      throw new Error("PAYSTACK_SECRET_KEY is not set in environment")
    }
  }

  private async makeRequest(
    endpoint: string,
    method: "GET" | "POST" = "GET",
    data?: any
  ): Promise<PaystackResponse> {
    try {
      const url = `${this.baseUrl}${endpoint}`
      const headers: Record<string, string> = {
        Authorization: `Bearer ${this.secretKey}`,
        "Content-Type": "application/json",
      }

      const opts: RequestInit = {
        method,
        headers,
      }

      // Only attach a body for non-GET requests
      if (method !== "GET" && data !== undefined) {
        opts.body = JSON.stringify(data)
      }

      const response = await fetch(url, opts)

      // Try parse JSON safely
      const result = await (async () => {
        try {
          return await response.json()
        } catch (e) {
          return { status: false, message: "Invalid JSON response from Paystack", data: null }
        }
      })()

      if (!response.ok) {
        // Normalize error shape
        const message = result?.message || response.statusText || "Paystack API error"
        return {
          status: false,
          message,
          data: result?.data ?? result,
        }
      }

      // success case (Paystack returns {status: true/false, message, data})
      return {
        status: !!result?.status,
        message: result?.message ?? "",
        data: result?.data ?? null,
      }
    } catch (error) {
      console.error("Paystack API error:", error)
      return {
        status: false,
        message: "Network error occurred",
      }
    }
  }

  // Convert Naira to Kobo (Paystack uses kobo)
  private toKobo(amount: number): number {
    return Math.round(amount * 100)
  }

  // Convert Kobo to Naira (returns number with 2 dp)
  private toNaira(amount: number): number {
    return Math.round((amount / 100) * 100) / 100
  }

  // Generate payment reference
  generateReference(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `HER_${timestamp}_${random}`.toUpperCase()
  }

  // Initialize payment
  async initializePayment(paymentData: PaymentData): Promise<PaystackResponse> {
    if (!paymentData?.email) {
      return { status: false, message: "Missing email in payment data" }
    }
    const amountNum = Number(paymentData.amount)
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      return { status: false, message: "Invalid amount" }
    }

    const data = {
      ...paymentData,
      amount: this.toKobo(amountNum),
      reference: paymentData.reference || this.generateReference(),
    }

    return await this.makeRequest("/transaction/initialize", "POST", data)
  }

  // Verify payment (same as getTransaction)
  async verifyPayment(reference: string): Promise<PaystackResponse> {
    if (!reference) return { status: false, message: "Missing reference" }
    const res = await this.makeRequest(`/transaction/verify/${encodeURIComponent(reference)}`, "GET")
    // Normalize Paystack's amount (kobo -> naira) in returned data for convenience
    if (res.status && res.data && typeof res.data.amount === "number") {
      res.data.amount_naira = this.toNaira(res.data.amount)
    }
    return res
  }

  // Alias for verifyPayment
  async getTransaction(reference: string): Promise<PaystackResponse> {
    return this.verifyPayment(reference)
  }

  // List transactions with safe query building
  async listTransactions(params?: {
    perPage?: number
    page?: number
    customer?: string
    status?: string
    from?: string
    to?: string
    amount?: number
  }): Promise<PaystackResponse> {
    const queryParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, String(value))
        }
      })
    }
    const endpoint = `/transaction${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return await this.makeRequest(endpoint, "GET")
  }

  // Create customer
  async createCustomer(customerData: {
    email: string
    first_name?: string
    last_name?: string
    phone?: string
  }): Promise<PaystackResponse> {
    if (!customerData?.email) return { status: false, message: "Missing customer email" }
    return await this.makeRequest("/customer", "POST", customerData)
  }

  // Get customer by id or code
  async getCustomer(emailOrCode: string): Promise<PaystackResponse> {
    if (!emailOrCode) return { status: false, message: "Missing customer identifier" }
    return await this.makeRequest(`/customer/${encodeURIComponent(emailOrCode)}`, "GET")
  }

  // Refund transaction
  async refundTransaction(reference: string, amount?: number): Promise<PaystackResponse> {
    if (!reference) return { status: false, message: "Missing transaction reference" }
    const data: any = { transaction: reference }
    if (amount !== undefined) data.amount = this.toKobo(Number(amount))
    return await this.makeRequest("/refund", "POST", data)
  }

  // Get banks
  async getBanks(country = "nigeria"): Promise<PaystackResponse> {
    return await this.makeRequest(`/bank?country=${encodeURIComponent(country)}`, "GET")
  }

  // Resolve account number
  async resolveAccountNumber(accountNumber: string, bankCode: string): Promise<PaystackResponse> {
    if (!accountNumber || !bankCode) return { status: false, message: "Missing account or bank code" }
    return await this.makeRequest(`/bank/resolve?account_number=${encodeURIComponent(accountNumber)}&bank_code=${encodeURIComponent(bankCode)}`, "GET")
  }

  // Create transfer recipient
  async createTransferRecipient(recipientData: {
    type: string
    name: string
    account_number: string
    bank_code: string
    currency?: string
  }): Promise<PaystackResponse> {
    return await this.makeRequest("/transferrecipient", "POST", {
      ...recipientData,
      currency: recipientData.currency || "NGN",
    })
  }

  // Initiate transfer
  async initiateTransfer(transferData: {
    source: string
    amount: number
    recipient: string
    reason?: string
  }): Promise<PaystackResponse> {
    if (!transferData.recipient) return { status: false, message: "Missing recipient" }
    return await this.makeRequest("/transfer", "POST", {
      ...transferData,
      amount: this.toKobo(Number(transferData.amount)),
    })
  }

  // Utility methods
  formatAmount(amount: number | string | undefined | null): string {
    const n = Number(amount)
    if (!Number.isFinite(n)) return "₦0"
    return `₦${n.toLocaleString()}`
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(String(email ?? ""))
  }

  isValidPhone(phone: string): boolean {
    if (!phone) return false
    const cleaned = phone.replace(/\s/g, "")
    const phoneRegex = /^(\+234|234|0)[789]\d{9}$/
    return phoneRegex.test(cleaned)
  }

  // Payment status helpers
  isPaymentSuccessful(status: string): boolean {
    return status === "success"
  }

  isPaymentPending(status: string): boolean {
    return status === "pending"
  }

  isPaymentFailed(status: string): boolean {
    return status === "failed" || status === "abandoned"
  }
}

export const paystack = new PaystackService()
export { PaystackService }
export type { PaystackResponse, PaymentData, VerificationData }
export default paystack
