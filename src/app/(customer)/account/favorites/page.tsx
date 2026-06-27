"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Trash2, Plus } from "lucide-react";
import Link from "next/link";

const mockFavorites = [
  {
    id: "1",
    name: "Classic Fire Bird",
    description: "Crispy fried chicken with our signature Fire Bird seasoning",
    price: 12.99,
    category: "Chicken",
    spiceLevel: 3,
    image: null,
  },
  {
    id: "2",
    name: "Spicy Wings (6pc)",
    description: "Crispy chicken wings tossed in spicy buffalo sauce",
    price: 8.99,
    category: "Wings",
    spiceLevel: 3,
    image: null,
  },
  {
    id: "3",
    name: "Large Fries",
    description: "Crispy golden fries with sea salt",
    price: 4.99,
    category: "Sides",
    spiceLevel: 0,
    image: null,
  },
];

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState(mockFavorites);

  const handleRemove = (id: string) => {
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-heading font-bold">My Favorites</h1>
        <p className="text-muted-foreground">
          Your favorite items for quick reorder
        </p>
      </div>

      {/* Favorites Grid */}
      {favorites.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground text-sm">No Image</div>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 bg-background/80 backdrop-blur"
                  onClick={() => handleRemove(item.id)}
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </Button>
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <p className="font-bold text-primary">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                  {item.spiceLevel > 0 && (
                    <span className="text-sm">
                      {"🌶️".repeat(item.spiceLevel)}
                    </span>
                  )}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="mr-1 h-3 w-3" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemove(item.id)}
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <Heart className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No favorites yet</h3>
            <p className="text-muted-foreground mb-4">
              Start adding items to your favorites for quick reorder
            </p>
            <Link href="/menu">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Browse Menu
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
