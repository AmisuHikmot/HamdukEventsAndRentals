import { createClient as createSupabaseClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key
export const supabaseAdmin = createSupabaseClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!)

// Export createClient function for use in other modules
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
