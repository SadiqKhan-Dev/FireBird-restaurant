"use client";

import Image from "next/image";
import { Trash2, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "@/components/menu/quantity-selector";
import { cn } from "@/lib/utils";

export interface CartItemData {
  id: string;
  menuItem: {
    id: string;
    name: string;
    imageUrl: string;
    basePrice: number;
  };
  quantity: number;
  unitPrice: number;
  selectedCustomizations: {
    name: string;
    priceModifier: number;
  }[];
  specialInstructions?: string | null;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemove: (itemId: string) => void;
  onEdit?: (itemId: string) => void;
  disabled?: boolean;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function CartItem({
  item,
  onUpdateQuantity,
  onRemove,
  onEdit,
  disabled = false,
}: CartItemProps) {
  const customizationsTotal = item.selectedCustomizations.reduce(
    (sum, c) => sum + c.priceModifier,
    0
  );
  const itemTotal = (item.unitPrice + customizationsTotal) * item.quantity;

  return (
    <div className="flex gap-4 py-4">
      {/* Image */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={item.menuItem.imageUrl}
          alt={item.menuItem.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-medium">{item.menuItem.name}</h3>
            {item.selectedCustomizations.length > 0 && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.selectedCustomizations.map((c) => c.name).join(", ")}
              </p>
            )}
            {item.specialInstructions && (
              <p className="mt-1 text-sm text-muted-foreground italic">
                &quot;{item.specialInstructions}&quot;
              </p>
            )}
          </div>
          <p className="font-semibold">{formatPrice(itemTotal)}</p>
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <QuantitySelector
            value={item.quantity}
            onChange={(qty) => onUpdateQuantity(item.id, qty)}
            min={1}
            max={10}
            size="sm"
            disabled={disabled}
          />
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onEdit(item.id)}
                disabled={disabled}
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit item</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive"
              onClick={() => onRemove(item.id)}
              disabled={disabled}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove item</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
