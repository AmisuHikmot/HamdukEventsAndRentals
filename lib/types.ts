export interface User {
  id: string
  email: string
  first_name?: string
  last_name?: string
  phone?: string
  role: "customer" | "admin" | "staff"
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image_url?: string
  created_at: string
  updated_at: string
}

export interface RentalItem {
  id: string
  name: string
  slug: string
  description?: string
  category_id: string
  price_per_unit: number
  quantity_available: number
  minimum_rental_quantity: number
  image_urls: string[]
  specifications?: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
  categories?: Category
}

export interface Service {
  id: string
  name: string
  slug: string
  description?: string
  short_description?: string
  base_price?: number
  price_type: "fixed" | "hourly" | "per_guest" | "custom"
  image_url?: string
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Booking {
  id: string
  user_id?: string
  booking_number: string
  event_type?: string
  event_date?: string
  event_time?: string
  guest_count?: number
  venue_location?: string
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  total_amount?: number
  deposit_amount?: number
  payment_status: "pending" | "partial" | "paid" | "refunded"
  notes?: string
  special_requirements?: string
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  email: string
  event_type?: string
  event_date?: string
  rating: number
  testimonial: string
  is_approved: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
  status: "new" | "in_progress" | "resolved"
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured_image_url?: string
  author_id: string
  status: "draft" | "published" | "archived"
  published_at?: string
  meta_title?: string
  meta_description?: string
  tags: string[]
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: string
  title?: string
  description?: string
  image_url: string
  event_type?: string
  venue_type?: string
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Payment {
  id: string
  booking_id: string
  payment_reference: string
  amount: number
  payment_method?: string
  payment_gateway?: string
  gateway_transaction_id?: string
  status: "pending" | "successful" | "failed" | "cancelled" | "refunded"
  gateway_response?: Record<string, any>
  created_at: string
  updated_at: string
}
