"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { SpiceIndicator } from "./spice-indicator";
import { QuantitySelector } from "./quantity-selector";
import { CustomizationPanel } from "./customization-panel";
import { cn } from "@/lib/utils";

interface CustomizationOption {
  id: string;
  name: string;
  priceModifier: number;
  isDefault: boolean;
  isAvailable: boolean;
}

interface ItemCustomization {
  id: string;
  name: string;
  type: "single" | "multiple" | "text";
  isRequired: boolean;
  maxSelections?: number;
  options: CustomizationOption[];
}

interface ProductDetailProps {
  item: {
    id: string;
    name: string;
    slug: string;
    description: string;
    shortDescription?: string | null;
    basePrice: number;
    imageUrl: string;
    calories?: number | null;
    allergens?: string[];
    spiceLevel: number;
    isAvailable: boolean;
    isFeatured: boolean;
    isSeasonal: boolean;
    preparationTime: number;
    category: {
      name: string;
      slug: string;
    };
    customizations: ItemCustomization[];
  };
  onAddToCart?: (item: {
    menuItemId: string;
    quantity: number;
    selectedCustomizations: { customizationOptionId: string; priceModifier: number }[];
    specialInstructions?: string;
  }) => void;
  onToggleFavorite?: (itemId: string) => void;
  isFavorite?: boolean;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function ProductDetail({
  item,
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    { customizationOptionId: string; priceModifier: number }[]
  >([]);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isFavoriteState, setIsFavoriteState] = useState(isFavorite);

  const customizationsTotal = selectedCustomizations.reduce(
    (sum, c) => sum + c.priceModifier,
    0
  );
  const itemTotal = (item.basePrice + customizationsTotal) * quantity;

  const handleCustomizationChange = (
    customizationId: string,
    selectedOptions: { customizationOptionId: string; priceModifier: number }[]
  ) => {
    // Remove old selections for this customization
    const otherSelections = selectedCustomizations.filter((s) => {
      const customization = item.customizations.find((c) =>
        c.options.some((o) => o.id === s.customizationOptionId)
      );
      return customization?.id !== customizationId;
    });

    // Add new selections
    setSelectedCustomizations([...otherSelections, ...selectedOptions]);
  };

  const handleAddToCart = () => {
    onAddToCart?.({
      menuItemId: item.id,
      quantity,
      selectedCustomizations,
      specialInstructions: specialInstructions || undefined,
    });
  };

  const handleToggleFavorite = () => {
    setIsFavoriteState(!isFavoriteState);
    onToggleFavorite?.(item.id);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/menu" className="flex items-center gap-1 hover:text-foreground">
          <ChevronLeft className="h-4 w-4" />
          Menu
        </Link>
        <span>/</span>
        <Link href={`/menu/${item.category.slug}`} className="hover:text-foreground">
          {item.category.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{item.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left: Image */}
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-muted">
            <Image
              src={item.imageUrl}
              alt={item.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              priority
            />

            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {item.isSeasonal && (
                <Badge className="bg-accent text-accent-foreground">
                  Limited Time
                </Badge>
              )}
              {item.isFeatured && (
                <Badge variant="secondary">Featured</Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="absolute right-4 top-4 flex gap-2">
              <button
                onClick={handleToggleFavorite}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background"
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isFavoriteState ? "fill-red-500 text-red-500" : "text-muted-foreground"
                  )}
                />
                <span className="sr-only">
                  {isFavoriteState ? "Remove from favorites" : "Add to favorites"}
                </span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-colors hover:bg-background">
                <Share2 className="h-5 w-5 text-muted-foreground" />
                <span className="sr-only">Share</span>
              </button>
            </div>

            {/* Sold Out Overlay */}
            {!item.isAvailable && (
              <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/60">
                <Badge variant="destructive" className="text-lg">
                  Sold Out
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          {/* Category */}
          <Link
            href={`/menu/${item.category.slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {item.category.name}
          </Link>

          {/* Title */}
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {item.name}
          </h1>

          {/* Description */}
          <p className="mt-4 text-lg text-muted-foreground">
            {item.description}
          </p>

          {/* Meta Info */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Spice Level:</span>
              <SpiceIndicator level={item.spiceLevel} size="md" showLabel />
            </div>
            {item.calories && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Calories:</span>
                <span className="text-sm font-medium">{item.calories}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Prep Time:</span>
              <span className="text-sm font-medium">{item.preparationTime} min</span>
            </div>
          </div>

          {/* Allergens */}
          {item.allergens && item.allergens.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                <span className="font-medium">Allergens:</span>{" "}
                {item.allergens.join(", ")}
              </p>
            </div>
          )}

          <Separator className="my-6" />

          {/* Price */}
          <div className="mb-6">
            <span className="text-3xl font-bold text-primary">
              {formatPrice(item.basePrice)}
            </span>
            <span className="ml-2 text-sm text-muted-foreground">
              Starting price
            </span>
          </div>

          {/* Customizations */}
          {item.customizations.length > 0 && (
            <CustomizationPanel
              customizations={item.customizations}
              selectedCustomizations={selectedCustomizations}
              onCustomizationChange={handleCustomizationChange}
              specialInstructions={specialInstructions}
              onSpecialInstructionsChange={setSpecialInstructions}
            />
          )}

          {/* Quantity & Add to Cart */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              min={1}
              max={10}
              disabled={!item.isAvailable}
            />

            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">
                Total: {formatPrice(itemTotal)}
              </span>
              <Button
                size="lg"
                disabled={!item.isAvailable}
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
