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
  customer: {
    id: number
    first_name: string
    last_name: string
    email: string
    phone: string
  }
}

class PaystackService {
  private baseUrl = "https://api.paystack.co"
  private secretKey: string

  constructor() {
    this.secretKey = process.env.PAYSTACK_SECRET_KEY || ""
  }

  private async makeRequest(endpoint: string, method: "GET" | "POST" = "GET", data?: any): Promise<PaystackResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method,
        headers: {
          Authorization: `Bearer ${this.secretKey}`,
          "Content-Type": "application/json",
        },
        body: data ? JSON.stringify(data) : undefined,
      })

      const result = await response.json()
      return result
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

  // Convert Kobo to Naira
  private toNaira(amount: number): number {
    return amount / 100
  }

  // Generate payment reference
  generateReference(): string {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 15)
    return `HER_${timestamp}_${random}`.toUpperCase()
  }

  // Initialize payment
  async initializePayment(paymentData: PaymentData): Promise<PaystackResponse> {
    const data = {
      ...paymentData,
      amount: this.toKobo(paymentData.amount),
      reference: paymentData.reference || this.generateReference(),
    }

    return await this.makeRequest("/transaction/initialize", "POST", data)
  }

  // Verify payment
  async verifyPayment(reference: string): Promise<PaystackResponse> {
    return await this.makeRequest(`/transaction/verify/${reference}`)
  }

  // Get transaction details
  async getTransaction(reference: string): Promise<PaystackResponse> {
    return await this.makeRequest(`/transaction/verify/${reference}`)
  }

  // List transactions
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
        if (value !== undefined) {
          queryParams.append(key, value.toString())
        }
      })
    }

    const endpoint = `/transaction${queryParams.toString() ? `?${queryParams.toString()}` : ""}`
    return await this.makeRequest(endpoint)
  }

  // Create customer
  async createCustomer(customerData: {
    email: string
    first_name: string
    last_name: string
    phone?: string
  }): Promise<PaystackResponse> {
    return await this.makeRequest("/customer", "POST", customerData)
  }

  // Get customer
  async getCustomer(emailOrCode: string): Promise<PaystackResponse> {
    return await this.makeRequest(`/customer/${emailOrCode}`)
  }

  // Refund transaction
  async refundTransaction(reference: string, amount?: number): Promise<PaystackResponse> {
    const data: any = { transaction: reference }
    if (amount) {
      data.amount = this.toKobo(amount)
    }

    return await this.makeRequest("/refund", "POST", data)
  }

  // Get banks
  async getBanks(country = "nigeria"): Promise<PaystackResponse> {
    return await this.makeRequest(`/bank?country=${country}`)
  }

  // Resolve account number
  async resolveAccountNumber(accountNumber: string, bankCode: string): Promise<PaystackResponse> {
    return await this.makeRequest(`/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`)
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
    return await this.makeRequest("/transfer", "POST", {
      ...transferData,
      amount: this.toKobo(transferData.amount),
    })
  }

  // Utility methods
  formatAmount(amount: number): string {
    return `₦${amount.toLocaleString()}`
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  isValidPhone(phone: string): boolean {
    const phoneRegex = /^(\+234|234|0)[789][01]\d{8}$/
    return phoneRegex.test(phone.replace(/\s/g, ""))
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

// Create and export instance
export const paystack = new PaystackService()

// Export class for custom instances
export { PaystackService }

// Export types
export type { PaystackResponse, PaymentData, VerificationData }

// Default export
export default paystack
