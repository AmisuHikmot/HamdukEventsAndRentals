import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Default client instance
export const supabase = createClient()

// Admin client with service role key (server-side only)
export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

// Database types
export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          created_at: string
          customer_name: string
          customer_email: string
          customer_phone: string
          event_date: string
          event_type: string
          venue: string
          guest_count: number
          total_amount: number
          payment_status: string
          payment_reference: string
          status: string
          notes: string
        }
        Insert: {
          id?: string
          created_at?: string
          customer_name: string
          customer_email: string
          customer_phone: string
          event_date: string
          event_type: string
          venue: string
          guest_count: number
          total_amount: number
          payment_status?: string
          payment_reference?: string
          status?: string
          notes?: string
        }
        Update: {
          id?: string
          created_at?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          event_date?: string
          event_type?: string
          venue?: string
          guest_count?: number
          total_amount?: number
          payment_status?: string
          payment_reference?: string
          status?: string
          notes?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          image_url?: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          image_url?: string
          created_at?: string
        }
      }
      rentals: {
        Row: {
          id: string
          name: string
          description: string
          price_per_day: number
          category: string
          image_url: string
          availability: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price_per_day: number
          category: string
          image_url?: string
          availability?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price_per_day?: number
          category?: string
          image_url?: string
          availability?: boolean
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          email: string
          event_type: string
          rating: number
          testimonial: string
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          event_type: string
          rating: number
          testimonial: string
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          event_type?: string
          rating?: number
          testimonial?: string
          approved?: boolean
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          subject?: string
          message?: string
          created_at?: string
        }
      }
    }
  }
}

export type Tables<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Row"]
export type Inserts<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Insert"]
export type Updates<T extends keyof Database["public"]["Tables"]> = Database["public"]["Tables"][T]["Update"]
