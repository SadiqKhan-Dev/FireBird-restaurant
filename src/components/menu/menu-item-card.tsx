"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface MenuItem {
  id: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  basePrice: number;
  imageUrl: string;
  calories?: number | null;
  spiceLevel: number;
  isAvailable: boolean;
  isFeatured: boolean;
  isSeasonal: boolean;
  category: {
    name: string;
    slug: string;
  };
}

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem) => void;
  onToggleFavorite?: (itemId: string) => void;
  isFavorite?: boolean;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function SpiceIndicator({ level }: { level: number }) {
  if (level === 0) return null;

  return (
    <div className="flex items-center gap-0.5" aria-label={`Spice level: ${level} out of 4`}>
      {Array.from({ length: 4 }).map((_, i) => (
        <Flame
          key={i}
          className={cn(
            "h-3 w-3",
            i < level ? "text-spice-hot fill-spice-hot" : "text-neutral-200"
          )}
        />
      ))}
    </div>
  );
}

export function MenuItemCard({
  item,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: MenuItemCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        !item.isAvailable && "opacity-60"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={cn(
            "object-cover transition-transform duration-300",
            isHovered && "scale-105"
          )}
        />

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {item.isSeasonal && (
            <Badge variant="default" className="bg-accent text-accent-foreground">
              Limited Time
            </Badge>
          )}
          {item.isFeatured && (
            <Badge variant="secondary">Featured</Badge>
          )}
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            e.preventDefault();
            onToggleFavorite?.(item.id);
          }}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"
            )}
          />
          <span className="sr-only">
            {isFavorite ? "Remove from favorites" : "Add to favorites"}
          </span>
        </Button>

        {/* Sold Out Overlay */}
        {!item.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/60">
            <Badge variant="destructive" className="text-sm">
              Sold Out
            </Badge>
          </div>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link
              href={`/menu/${item.category.slug}/${item.slug}`}
              className="block"
            >
              <h3 className="text-lg font-semibold leading-tight hover:text-primary transition-colors">
                {item.name}
              </h3>
            </Link>
            {item.shortDescription && (
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {item.shortDescription}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-primary">
              {formatPrice(item.basePrice)}
            </p>
          </div>
        </div>

        {/* Meta Info */}
        <div className="mt-3 flex items-center gap-3 text-sm text-muted-foreground">
          <SpiceIndicator level={item.spiceLevel} />
          {item.calories && <span>{item.calories} cal</span>}
        </div>

        {/* Add to Cart */}
        <Button
          className="mt-4 w-full"
          disabled={!item.isAvailable}
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.(item);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}
