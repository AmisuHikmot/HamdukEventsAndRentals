"use client"

import type React from "react"

import { useState } from "react"
import { Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RentalItemCard } from "@/components/rental-item-card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StructuredData } from "@/components/structured-data"
import { generateProductSchema, generateBreadcrumbSchema } from "@/lib/jsonld"

// Initial rental items data
const initialRentalItems = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=400",
    title: "Chiavari Chairs",
    price: 8,
    category: "Furniture",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400",
    title: 'Round Tables (60")',
    price: 12,
    category: "Furniture",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=400",
    title: "Premium Linens",
    price: 15,
    category: "Decor",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=400",
    title: "Charger Plates",
    price: 3,
    category: "Tableware",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=400",
    title: "String Lights",
    price: 25,
    category: "Lighting",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=400",
    title: "Speaker System",
    price: 75,
    category: "Audio",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=300&width=400",
    title: "Cocktail Tables",
    price: 10,
    category: "Furniture",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=400",
    title: "Champagne Flutes (Set of 10)",
    price: 12,
    category: "Tableware",
  },
  {
    id: 9,
    image: "/placeholder.svg?height=300&width=400",
    title: "Backdrop Stand",
    price: 35,
    category: "Decor",
  },
  {
    id: 10,
    image: "/placeholder.svg?height=300&width=400",
    title: "Uplighting",
    price: 20,
    category: "Lighting",
  },
  {
    id: 11,
    image: "/placeholder.svg?height=300&width=400",
    title: "Microphone Set",
    price: 45,
    category: "Audio",
  },
  {
    id: 12,
    image: "/placeholder.svg?height=300&width=400",
    title: "Folding Chairs",
    price: 4,
    category: "Furniture",
  },
]

// Additional items to load more
const additionalItems = [
  {
    id: 13,
    image: "/placeholder.svg?height=300&width=400",
    title: "Dance Floor Sections",
    price: 50,
    category: "Furniture",
  },
  {
    id: 14,
    image: "/placeholder.svg?height=300&width=400",
    title: "Projector & Screen",
    price: 85,
    category: "Audio",
  },
  {
    id: 15,
    image: "/placeholder.svg?height=300&width=400",
    title: "Lounge Furniture Set",
    price: 120,
    category: "Furniture",
  },
  {
    id: 16,
    image: "/placeholder.svg?height=300&width=400",
    title: "Candelabras",
    price: 18,
    category: "Decor",
  },
  {
    id: 17,
    image: "/placeholder.svg?height=300&width=400",
    title: "Outdoor Heaters",
    price: 65,
    category: "Equipment",
  },
  {
    id: 18,
    image: "/placeholder.svg?height=300&width=400",
    title: "Photo Booth",
    price: 250,
    category: "Entertainment",
  },
  {
    id: 19,
    image: "/placeholder.svg?height=300&width=400",
    title: "Silverware Set (10 pcs)",
    price: 15,
    category: "Tableware",
  },
  {
    id: 20,
    image: "/placeholder.svg?height=300&width=400",
    title: "Tent (20' x 20')",
    price: 40000,
    category: "Equipment",
  },
]

export default function RentalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortOption, setSortOption] = useState("")
  const [rentalItems, setRentalItems] = useState(initialRentalItems)
  const [showLoadMore, setShowLoadMore] = useState(true)

  // Generate Product schemas for all rental items
  const productSchemas = rentalItems.map((item) =>
    generateProductSchema({
      id: item.id.toString(),
      name: item.title,
      description: `High-quality ${item.title} for rent. Perfect for events and celebrations.`,
      price: item.price,
      category: item.category,
      imageUrl: item.image,
      availability: "InStock",
    })
  )

  // Generate Breadcrumb schema
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Rentals", url: "/rentals" },
  ])

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
  }

  // Handle sort option selection
  const handleSortChange = (value: string) => {
    setSortOption(value)
  }

  // Handle load more button click
  const handleLoadMore = () => {
    setRentalItems([...rentalItems, ...additionalItems])
    setShowLoadMore(false) // Hide the button after loading all items
  }

  // Filter and sort items
  const filteredItems = rentalItems
    .filter((item) => {
      // Filter by search term
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())

      // Filter by category
      const matchesCategory =
        selectedCategory === "all" || item.category.toLowerCase() === selectedCategory.toLowerCase()

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      // Sort items based on selected option
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price
        case "price-desc":
          return b.price - a.price
        case "name-asc":
          return a.title.localeCompare(b.title)
        case "name-desc":
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  return (
    <>
      <StructuredData schema={breadcrumbSchema} />
      <StructuredData schema={productSchemas} />
      <div className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-rose-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Rental Equipment</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Browse our selection of high-quality rental equipment for your next event.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="w-full py-6 border-b">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span className="font-medium">Filters:</span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:flex md:flex-1 md:items-center md:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search rentals..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="decor">Decor</SelectItem>
                    <SelectItem value="tableware">Tableware</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="audio">Audio Equipment</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </section>

        {/* Rentals Grid */}
        <section className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            {filteredItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredItems.map((item) => (
                  <RentalItemCard
                    key={item.id}
                    image={item.image}
                    title={item.title}
                    price={item.price}
                    category={item.category}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No rental items match your search criteria.</p>
              </div>
            )}

            {showLoadMore && (
              <div className="flex justify-center mt-8">
                <Button variant="outline" className="mt-4 bg-transparent" onClick={handleLoadMore}>
                  Load More
                </Button>
              </div>
            )}
        </div>
      </section>
      </div>
    </>
  )
}
