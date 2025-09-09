import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const sortBy = searchParams.get("sortBy")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("rental_items")
      .select(`
        *,
        categories(name, slug)
      `)
      .eq("is_active", true)

    if (category && category !== "all") {
      query = query.eq("categories.slug", category)
    }

    if (search) {
      query = query.ilike("name", `%${search}%`)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-asc":
        query = query.order("price_per_unit", { ascending: true })
        break
      case "price-desc":
        query = query.order("price_per_unit", { ascending: false })
        break
      case "name-asc":
        query = query.order("name", { ascending: true })
        break
      case "name-desc":
        query = query.order("name", { ascending: false })
        break
      default:
        query = query.order("created_at", { ascending: false })
    }

    query = query.range(offset, offset + limit - 1)

    const { data: rentals, error } = await query

    if (error) {
      console.error("Fetch rentals error:", error)
      return NextResponse.json({ error: "Failed to fetch rentals" }, { status: 500 })
    }

    return NextResponse.json({ rentals })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
