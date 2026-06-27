"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CartSummaryProps {
  subtotal: number;
  deliveryFee?: number;
  tax: number;
  discount?: number;
  tip?: number;
  total: number;
  onApplyCoupon?: (code: string) => Promise<void>;
  couponError?: string;
  couponSuccess?: string;
  isLoading?: boolean;
  showCouponInput?: boolean;
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export function CartSummary({
  subtotal,
  deliveryFee = 0,
  tax,
  discount = 0,
  tip = 0,
  total,
  onApplyCoupon,
  couponError,
  couponSuccess,
  isLoading = false,
  showCouponInput = true,
}: CartSummaryProps) {
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim() || !onApplyCoupon) return;
    setIsApplyingCoupon(true);
    try {
      await onApplyCoupon(couponCode.trim().toUpperCase());
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="text-lg font-semibold">Order Summary</h2>

      {/* Coupon Input */}
      {showCouponInput && (
        <div className="mt-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="pl-9 uppercase"
                disabled={isApplyingCoupon}
              />
            </div>
            <Button
              variant="outline"
              onClick={handleApplyCoupon}
              disabled={!couponCode.trim() || isApplyingCoupon}
            >
              {isApplyingCoupon ? "Applying..." : "Apply"}
            </Button>
          </div>
          {couponError && (
            <p className="mt-2 text-sm text-destructive">{couponError}</p>
          )}
          {couponSuccess && (
            <p className="mt-2 text-sm text-success-600">{couponSuccess}</p>
          )}
        </div>
      )}

      <Separator className="my-4" />

      {/* Price Breakdown */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {deliveryFee > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span>{formatPrice(deliveryFee)}</span>
          </div>
        )}

        {deliveryFee === 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Delivery Fee</span>
            <span className="text-success-600 font-medium">Free</span>
          </div>
        )}

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatPrice(tax)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Discount</span>
            <span className="text-success-600">-{formatPrice(discount)}</span>
          </div>
        )}

        {tip > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tip</span>
            <span>{formatPrice(tip)}</span>
          </div>
        )}
      </div>

      <Separator className="my-4" />

      {/* Total */}
      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
