"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft, CreditCard, Clock, MapPin, Check } from "lucide-react";
import { CustomerLayout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type OrderType = "delivery" | "pickup" | "dine-in" | "scheduled";

interface CheckoutStep {
  id: string;
  label: string;
  status: "complete" | "current" | "upcoming";
}

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

export default function CheckoutPage() {
  const router = useRouter();
  const [orderType, setOrderType] = useState<OrderType>("delivery");
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock cart data
  const cartItems = [
    { id: "1", name: "Classic Fire Bird", quantity: 2, price: 1299, customizations: "Hot, Extra Cheese" },
    { id: "2", name: "Curly Fries", quantity: 1, price: 499, customizations: "" },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = orderType === "delivery" ? (subtotal >= 2500 ? 0 : 499) : 0;
  const tax = Math.round(subtotal * 0.0875);
  const tip = 0;
  const total = subtotal + deliveryFee + tax + tip;

  const steps: CheckoutStep[] = [
    { id: "order-type", label: "Order Type", status: currentStep > 1 ? "complete" : "current" },
    { id: "info", label: "Information", status: currentStep > 2 ? "complete" : currentStep === 2 ? "current" : "upcoming" },
    { id: "payment", label: "Payment", status: currentStep > 3 ? "complete" : currentStep === 3 ? "current" : "upcoming" },
    { id: "review", label: "Review", status: currentStep === 4 ? "current" : "upcoming" },
  ];

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    router.push("/checkout/success");
  };

  return (
    <CustomerLayout showLocationBanner={false}>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-4"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Checkout progress">
            <ol className="flex items-center">
              {steps.map((step, index) => (
                <li key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium",
                      step.status === "complete"
                        ? "bg-primary text-primary-foreground"
                        : step.status === "current"
                        ? "bg-primary/10 text-primary border-2 border-primary"
                        : "bg-muted text-muted-foreground"
                    )}
                  >
                    {step.status === "complete" ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      "ml-2 text-sm font-medium hidden sm:block",
                      step.status === "current" ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "mx-4 h-0.5 w-12 sm:w-24",
                        step.status === "complete" ? "bg-primary" : "bg-muted"
                      )}
                    />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Order Type */}
            {currentStep === 1 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6">Select Order Type</h2>
                <RadioGroup
                  value={orderType}
                  onValueChange={(value) => setOrderType(value as OrderType)}
                  className="space-y-4"
                >
                  <Label
                    htmlFor="delivery"
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                      orderType === "delivery"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="delivery" id="delivery" />
                    <div className="flex-1">
                      <p className="font-medium">Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Delivered to your door (30-45 min)
                      </p>
                    </div>
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                  </Label>

                  <Label
                    htmlFor="pickup"
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                      orderType === "pickup"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="pickup" id="pickup" />
                    <div className="flex-1">
                      <p className="font-medium">Pickup</p>
                      <p className="text-sm text-muted-foreground">
                        Ready in 15-20 minutes
                      </p>
                    </div>
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </Label>

                  <Label
                    htmlFor="scheduled"
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                      orderType === "scheduled"
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="scheduled" id="scheduled" />
                    <div className="flex-1">
                      <p className="font-medium">Scheduled</p>
                      <p className="text-sm text-muted-foreground">
                        Choose a future time slot
                      </p>
                    </div>
                    <Clock className="h-5 w-5 text-muted-foreground" />
                  </Label>
                </RadioGroup>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleNextStep}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 2: Information */}
            {currentStep === 2 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6">
                  {orderType === "delivery"
                    ? "Delivery Information"
                    : orderType === "pickup"
                    ? "Pickup Information"
                    : "Order Information"}
                </h2>

                {orderType === "delivery" && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" placeholder="123 Main Street" className="mt-1" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="apt">Apt/Suite/Unit</Label>
                        <Input id="apt" placeholder="Apt 4B" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="zip">Zip Code</Label>
                        <Input id="zip" placeholder="10001" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="instructions">Delivery Instructions (Optional)</Label>
                      <Input
                        id="instructions"
                        placeholder="Leave at door, ring doorbell, etc."
                        className="mt-1"
                      />
                    </div>
                  </div>
                )}

                {orderType === "pickup" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Select Pickup Location</Label>
                      <div className="mt-2 space-y-2">
                        <Label
                          className={cn(
                            "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                            "border-primary bg-primary/5"
                          )}
                        >
                          <RadioGroupItem value="downtown" />
                          <div>
                            <p className="font-medium">Downtown Location</p>
                            <p className="text-sm text-muted-foreground">
                              123 Main St, Downtown
                            </p>
                          </div>
                        </Label>
                      </div>
                    </div>
                    <div>
                      <Label>Select Pickup Time</Label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <Button variant="outline" className="border-primary bg-primary/5">
                          ASAP (15 min)
                        </Button>
                        <Button variant="outline">12:00 PM</Button>
                        <Button variant="outline">12:30 PM</Button>
                      </div>
                    </div>
                  </div>
                )}

                {orderType === "scheduled" && (
                  <div className="space-y-4">
                    <div>
                      <Label>Select Date</Label>
                      <Input type="date" className="mt-1" />
                    </div>
                    <div>
                      <Label>Select Time Slot</Label>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        <Button variant="outline">11:00 AM</Button>
                        <Button variant="outline">11:30 AM</Button>
                        <Button variant="outline">12:00 PM</Button>
                        <Button variant="outline">12:30 PM</Button>
                        <Button variant="outline">1:00 PM</Button>
                        <Button variant="outline">1:30 PM</Button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>Continue</Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                <div className="space-y-4">
                  <Label
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                      "border-primary bg-primary/5"
                    )}
                  >
                    <RadioGroupItem value="card" />
                    <div className="flex-1">
                      <p className="font-medium">Credit/Debit Card</p>
                      <p className="text-sm text-muted-foreground">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                  </Label>

                  <Label
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                      "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="paypal" />
                    <div className="flex-1">
                      <p className="font-medium">PayPal</p>
                      <p className="text-sm text-muted-foreground">
                        Pay with your PayPal account
                      </p>
                    </div>
                  </Label>

                  <Label
                    className={cn(
                      "flex items-center gap-4 rounded-xl border-2 p-4 cursor-pointer transition-all",
                      "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="cod" />
                    <div className="flex-1">
                      <p className="font-medium">Cash on Delivery</p>
                      <p className="text-sm text-muted-foreground">
                        Pay when you receive your order
                      </p>
                    </div>
                  </Label>
                </div>

                <div className="mt-6">
                  <Label>Tip for Driver</Label>
                  <div className="mt-2 grid grid-cols-5 gap-2">
                    <Button variant="outline" size="sm">$0</Button>
                    <Button variant="outline" size="sm">$2</Button>
                    <Button variant="outline" size="sm">$3</Button>
                    <Button variant="outline" size="sm">$5</Button>
                    <Button variant="outline" size="sm">Custom</Button>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button onClick={handleNextStep}>Review Order</Button>
                </div>
              </div>
            )}

            {/* Step 4: Review */}
            {currentStep === 4 && (
              <div className="rounded-2xl border border-border bg-card p-6">
                <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

                {/* Order Items */}
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <p className="font-medium">
                          {item.quantity}x {item.name}
                        </p>
                        {item.customizations && (
                          <p className="text-sm text-muted-foreground">
                            {item.customizations}
                          </p>
                        )}
                      </div>
                      <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>

                <Separator className="my-6" />

                {/* Delivery/Pickup Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Order Type</span>
                    <span className="capitalize">{orderType}</span>
                  </div>
                  {orderType === "delivery" && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Address</span>
                      <span>123 Main St, Apt 4B</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={handlePrevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    size="lg"
                  >
                    {isProcessing ? "Processing..." : "Place Order"}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {orderType === "delivery" && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Delivery Fee</span>
                    <span>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                {tip > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tip</span>
                    <span>{formatPrice(tip)}</span>
                  </div>
                )}
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomerLayout>
  );
}
