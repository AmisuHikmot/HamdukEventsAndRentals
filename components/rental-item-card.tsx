import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface RentalItemCardProps {
  image: string
  title: string
  price: number
  category: string
}

export function RentalItemCard({ image, title, price, category }: RentalItemCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-rose-600 hover:bg-rose-700">{category}</Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-rose-600 font-semibold">${price} per unit</p>
      </CardContent>
    </Card>
  )
}
