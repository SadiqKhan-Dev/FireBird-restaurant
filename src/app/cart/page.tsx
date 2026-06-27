"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBag, Trash2 } from "lucide-react";
import { CustomerLayout } from "@/components/layout";
import { CartItem, CartItemData } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data - will be replaced with cart context
const mockCartItems: CartItemData[] = [
  {
    id: "1",
    menuItem: {
      id: "1",
      name: "Classic Fire Bird",
      imageUrl: "/images/placeholder-food.jpg",
      basePrice: 1299,
    },
    quantity: 2,
    unitPrice: 1299,
    selectedCustomizations: [
      { name: "Hot", priceModifier: 0 },
      { name: "Extra Cheese", priceModifier: 75 },
    ],
    specialInstructions: "Extra crispy",
  },
  {
    id: "2",
    menuItem: {
      id: "5",
      name: "Curly Fries",
      imageUrl: "/images/placeholder-food.jpg",
      basePrice: 499,
    },
    quantity: 1,
    unitPrice: 499,
    selectedCustomizations: [],
  },
];

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => {
    const customizationsTotal = item.selectedCustomizations.reduce(
      (s, c) => s + c.priceModifier,
      0
    );
    return sum + (item.unitPrice + customizationsTotal) * item.quantity;
  }, 0);

  const deliveryFee = subtotal >= 2500 ? 0 : 499;
  const tax = Math.round(subtotal * 0.0875); // 8.75% tax
  const total = subtotal + deliveryFee + tax;

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((items) => items.filter((item) => item.id !== itemId));
  };

  const handleApplyCoupon = async (code: string) => {
    setCouponError("");
    setCouponSuccess("");

    // Mock coupon validation
    if (code === "FAMILY25") {
      setCouponSuccess("Coupon applied! 25% off your order.");
    } else if (code === "FREEDEL") {
      setCouponSuccess("Free delivery applied!");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  if (cartItems.length === 0) {
    return (
      <CustomerLayout>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="h-12 w-12 text-muted-foreground" />
            </div>
            <h1 className="mt-6 text-2xl font-bold">Your cart is empty</h1>
            <p className="mt-2 text-muted-foreground">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Your Cart</h1>
            <p className="mt-2 text-muted-foreground">
              {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your
              cart
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-destructive hover:text-destructive"
            onClick={handleClearCart}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              subtotal={subtotal}
              deliveryFee={deliveryFee}
              tax={tax}
              total={total}
              onApplyCoupon={handleApplyCoupon}
              couponError={couponError}
              couponSuccess={couponSuccess}
            />

            <Link
              href="/checkout"
              className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
