import { Star } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

interface TestimonialCardProps {
  name: string
  role: string
  quote: string
  rating: number
}

export function TestimonialCard({ name, role, quote, rating }: TestimonialCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <CardContent className="p-6">
        <div className="flex gap-0.5 mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
          ))}
        </div>
        <p className="italic mb-4">&ldquo;{quote}&rdquo;</p>
        <div className="mt-4">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </CardContent>
    </Card>
  )
}
