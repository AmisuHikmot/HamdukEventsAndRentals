import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side Supabase client
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client with service role key
export const supabaseAdmin = createSupabaseClient(supabaseUrl, supabaseServiceKey)

// Export createClient for compatibility
export const createClient = (url?: string, key?: string) => {
  return createSupabaseClient(url || supabaseUrl, key || supabaseAnonKey)
}

// Database types
export interface Database {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string
          booking_number: string
          customer_name: string
          customer_email: string
          customer_phone: string
          event_type: string
          event_date: string
          event_time: string
          guest_count: number
          location: string | null
          additional_info: string | null
          status: "pending" | "confirmed" | "cancelled" | "completed"
          total_amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          booking_number: string
          customer_name: string
          customer_email: string
          customer_phone: string
          event_type: string
          event_date: string
          event_time: string
          guest_count: number
          location?: string | null
          additional_info?: string | null
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          total_amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          booking_number?: string
          customer_name?: string
          customer_email?: string
          customer_phone?: string
          event_type?: string
          event_date?: string
          event_time?: string
          guest_count?: number
          location?: string | null
          additional_info?: string | null
          status?: "pending" | "confirmed" | "cancelled" | "completed"
          total_amount?: number
          created_at?: string
          updated_at?: string
        }
      }
      rental_items: {
        Row: {
          id: string
          name: string
          description: string | null
          price_per_unit: number
          category_id: string
          image_url: string | null
          is_active: boolean
          quantity_available: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_per_unit: number
          category_id: string
          image_url?: string | null
          is_active?: boolean
          quantity_available: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_per_unit?: number
          category_id?: string
          image_url?: string | null
          is_active?: boolean
          quantity_available?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          created_at?: string
        }
      }
    }
  }
}
