"use client";

import { ProductDetail } from "@/components/menu/product-detail";

// Mock data - will be replaced with API call
const mockItem = {
  id: "1",
  name: "Classic Fire Bird",
  slug: "classic-fire-bird",
  description:
    "Our signature crispy chicken sandwich, hand-breaded and fried to golden perfection. Topped with our exclusive Fire Bird sauce, crisp lettuce, and juicy tomato, all on a toasted brioche bun. A bold flavor experience that keeps you coming back for more.",
  shortDescription: "Our signature crispy chicken sandwich with fire sauce",
  basePrice: 1299,
  imageUrl: "/images/placeholder-food.jpg",
  calories: 650,
  allergens: ["gluten", "dairy", "eggs"],
  spiceLevel: 2,
  isAvailable: true,
  isFeatured: true,
  isSeasonal: false,
  preparationTime: 12,
  category: { name: "Chicken", slug: "chicken" },
  customizations: [
    {
      id: "spice",
      name: "Spice Level",
      type: "single" as const,
      isRequired: false,
      options: [
        { id: "mild", name: "Mild", priceModifier: 0, isDefault: false, isAvailable: true },
        { id: "medium", name: "Medium", priceModifier: 0, isDefault: true, isAvailable: true },
        { id: "hot", name: "Hot", priceModifier: 0, isDefault: false, isAvailable: true },
        { id: "extra-hot", name: "Extra Hot", priceModifier: 0, isDefault: false, isAvailable: true },
      ],
    },
    {
      id: "sauce",
      name: "Sauce",
      type: "single" as const,
      isRequired: false,
      options: [
        { id: "fire-bird", name: "Fire Bird Sauce", priceModifier: 0, isDefault: true, isAvailable: true },
        { id: "bbq", name: "BBQ", priceModifier: 0, isDefault: false, isAvailable: true },
        { id: "ranch", name: "Ranch", priceModifier: 0, isDefault: false, isAvailable: true },
        { id: "buffalo", name: "Buffalo", priceModifier: 50, isDefault: false, isAvailable: true },
        { id: "honey-mustard", name: "Honey Mustard", priceModifier: 0, isDefault: false, isAvailable: true },
      ],
    },
    {
      id: "size",
      name: "Meal Size",
      type: "single" as const,
      isRequired: true,
      options: [
        { id: "regular", name: "Regular", priceModifier: 0, isDefault: true, isAvailable: true },
        { id: "large", name: "Large", priceModifier: 200, isDefault: false, isAvailable: true },
        { id: "family", name: "Family", priceModifier: 500, isDefault: false, isAvailable: true },
      ],
    },
    {
      id: "toppings",
      name: "Extra Toppings",
      type: "multiple" as const,
      isRequired: false,
      maxSelections: 4,
      options: [
        { id: "cheese", name: "Extra Cheese", priceModifier: 75, isDefault: false, isAvailable: true },
        { id: "bacon", name: "Bacon", priceModifier: 125, isDefault: false, isAvailable: true },
        { id: "jalapenos", name: "Jalapeños", priceModifier: 50, isDefault: false, isAvailable: true },
        { id: "pickles", name: "Pickles", priceModifier: 0, isDefault: false, isAvailable: true },
        { id: "onions", name: "Onions", priceModifier: 0, isDefault: false, isAvailable: true },
      ],
    },
  ],
};

export default function ProductDetailPage() {
  const handleAddToCart = (item: {
    menuItemId: string;
    quantity: number;
    selectedCustomizations: { customizationOptionId: string; priceModifier: number }[];
    specialInstructions?: string;
  }) => {
    console.log("Adding to cart:", item);
    // Will be implemented with cart context
  };

  const handleToggleFavorite = (itemId: string) => {
    console.log("Toggle favorite:", itemId);
    // Will be implemented with favorites context
  };

  return (
    <ProductDetail
      item={mockItem}
      onAddToCart={handleAddToCart}
      onToggleFavorite={handleToggleFavorite}
    />
  );
}
