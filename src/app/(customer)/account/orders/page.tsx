"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { CustomerLayout } from "@/components/layout";
import { Badge } from "@/components/ui/badge";

// Mock data - will be replaced with API call
const mockOrders = [
  {
    id: "1",
    orderNumber: "FB-1001",
    status: "DELIVERED",
    total: 2898,
    createdAt: "2026-06-25T18:30:00Z",
    items: [
      { name: "Classic Fire Bird", quantity: 2 },
      { name: "Curly Fries", quantity: 1 },
    ],
  },
  {
    id: "2",
    orderNumber: "FB-1002",
    status: "PREPARING",
    total: 1499,
    createdAt: "2026-06-27T12:15:00Z",
    items: [
      { name: "Spicy Tenders Basket", quantity: 1 },
    ],
  },
];

function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function getStatusColor(status: string) {
  switch (status) {
    case "DELIVERED":
      return "bg-success-100 text-success-700";
    case "PREPARING":
      return "bg-warning-100 text-warning-700";
    case "OUT_FOR_DELIVERY":
      return "bg-info-100 text-info-700";
    case "CANCELLED":
      return "bg-destructive/10 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

export default function OrdersPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <CustomerLayout>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-muted rounded mb-4" />
            <div className="h-4 w-96 bg-muted rounded mb-8" />
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded" />
              ))}
            </div>
          </div>
        </div>
      </CustomerLayout>
    );
  }

  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Order History</h1>

        {mockOrders.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto">
              <svg
                className="h-8 w-8 text-muted-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="mt-4 text-lg font-medium">No orders yet</h2>
            <p className="mt-2 text-muted-foreground">
              Start ordering to see your order history here.
            </p>
            <Link
              href="/menu"
              className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.id}`}
                className="block rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <p className="mt-2 text-sm">
                      {order.items.map((item) => `${item.quantity}x ${item.name}`).join(", ")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">{formatPrice(order.total)}</p>
                    {order.status === "DELIVERED" && (
                      <button
                        className="mt-2 text-sm text-primary hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          // Reorder functionality
                        }}
                      >
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </CustomerLayout>
  );
}
