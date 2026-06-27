"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  Filter,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";

const mockOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    type: "DELIVERY",
    status: "PREPARING",
    items: [
      { name: "Classic Fire Bird", qty: 2, price: 12.99 },
      { name: "Spicy Wings (6pc)", qty: 1, price: 8.99 },
      { name: "Large Fries", qty: 1, price: 4.99 },
    ],
    subtotal: 39.96,
    tax: 3.20,
    deliveryFee: 5.99,
    total: 49.15,
    address: "123 Main St, Apt 4B, New York, NY 10001",
    createdAt: "2026-06-27T10:30:00Z",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    phone: "(555) 234-5678",
    type: "PICKUP",
    status: "PENDING",
    items: [
      { name: "BBQ Blaze Tower", qty: 1, price: 18.99 },
      { name: "Onion Rings", qty: 1, price: 5.99 },
    ],
    subtotal: 24.98,
    tax: 2.00,
    deliveryFee: 0,
    total: 26.98,
    address: null,
    createdAt: "2026-06-27T10:25:00Z",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 345-6789",
    type: "DELIVERY",
    status: "OUT_FOR_DELIVERY",
    items: [
      { name: "Classic Fire Bird", qty: 1, price: 12.99 },
      { name: "Medium Fries", qty: 1, price: 3.99 },
      { name: "Coke", qty: 2, price: 2.49 },
    ],
    subtotal: 21.96,
    tax: 1.76,
    deliveryFee: 4.99,
    total: 28.71,
    address: "456 Oak Ave, Brooklyn, NY 11201",
    createdAt: "2026-06-27T10:15:00Z",
  },
  {
    id: "ORD-004",
    customer: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "(555) 456-7890",
    type: "DINE_IN",
    status: "COMPLETED",
    items: [
      { name: "Nashville Hot Crunch", qty: 2, price: 14.99 },
      { name: "Coleslaw", qty: 1, price: 3.49 },
    ],
    subtotal: 33.47,
    tax: 2.68,
    deliveryFee: 0,
    total: 36.15,
    address: null,
    createdAt: "2026-06-27T09:45:00Z",
  },
  {
    id: "ORD-005",
    customer: "Tom Brown",
    email: "tom@example.com",
    phone: "(555) 567-8901",
    type: "DELIVERY",
    status: "DELIVERED",
    items: [
      { name: "Classic Fire Bird", qty: 1, price: 12.99 },
      { name: "Garlic Bread", qty: 1, price: 4.99 },
    ],
    subtotal: 17.98,
    tax: 1.44,
    deliveryFee: 3.99,
    total: 23.41,
    address: "789 Pine St, Manhattan, NY 10002",
    createdAt: "2026-06-27T09:30:00Z",
  },
  {
    id: "ORD-006",
    customer: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 678-9012",
    type: "DELIVERY",
    status: "CANCELLED",
    items: [
      { name: "BBQ Blaze Tower", qty: 1, price: 18.99 },
    ],
    subtotal: 18.99,
    tax: 1.52,
    deliveryFee: 4.99,
    total: 25.50,
    address: "321 Elm St, Queens, NY 11375",
    createdAt: "2026-06-27T09:15:00Z",
  },
];

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-800",
  PREPARING: "bg-blue-100 text-blue-800",
  READY: "bg-purple-100 text-purple-800",
  OUT_FOR_DELIVERY: "bg-orange-100 text-orange-800",
  DELIVERED: "bg-green-100 text-green-800",
  COMPLETED: "bg-green-100 text-green-800",
  CANCELLED: "bg-red-100 text-red-800",
};

const statusLabels: Record<string, string> = {
  PENDING: "Pending",
  PREPARING: "Preparing",
  READY: "Ready",
  OUT_FOR_DELIVERY: "Out for Delivery",
  DELIVERED: "Delivered",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

const typeLabels: Record<string, string> = {
  DELIVERY: "Delivery",
  PICKUP: "Pickup",
  DINE_IN: "Dine-in",
};

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof mockOrders[0] | null>(null);

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders
          </p>
        </div>
        <Button>Export Orders</Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v ?? "all")}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="PREPARING">Preparing</SelectItem>
                <SelectItem value="READY">Ready</SelectItem>
                <SelectItem value="OUT_FOR_DELIVERY">Out for Delivery</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Order ID
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Type
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Total
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Time
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4 font-medium">{order.id}</td>
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{order.customer}</p>
                        <p className="text-sm text-muted-foreground">
                          {order.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4">
                      <Badge variant="outline">{typeLabels[order.type]}</Badge>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          statusColors[order.status]
                        }`}
                      >
                        {statusLabels[order.status]}
                      </span>
                    </td>
                    <td className="py-4 font-medium">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </td>
                    <td className="py-4 text-right">
                      <Dialog>
                        <DialogTrigger render={<Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}><Eye className="h-4 w-4" /></Button>} />
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Order {order.id}</DialogTitle>
                          </DialogHeader>
                          {selectedOrder && (
                            <div className="space-y-4">
                              <div>
                                <p className="text-sm font-medium">Customer</p>
                                <p>{selectedOrder.customer}</p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedOrder.email}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {selectedOrder.phone}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Items</p>
                                {selectedOrder.items.map((item, i) => (
                                  <div
                                    key={i}
                                    className="flex justify-between text-sm"
                                  >
                                    <span>
                                      {item.qty}x {item.name}
                                    </span>
                                    <span>
                                      ${(item.price * item.qty).toFixed(2)}
                                    </span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t pt-4">
                                <div className="flex justify-between text-sm">
                                  <span>Subtotal</span>
                                  <span>
                                    ${selectedOrder.subtotal.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Tax</span>
                                  <span>${selectedOrder.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                  <span>Delivery</span>
                                  <span>
                                    ${selectedOrder.deliveryFee.toFixed(2)}
                                  </span>
                                </div>
                                <div className="flex justify-between font-medium mt-2">
                                  <span>Total</span>
                                  <span>${selectedOrder.total.toFixed(2)}</span>
                                </div>
                              </div>
                              {selectedOrder.address && (
                                <div>
                                  <p className="text-sm font-medium">
                                    Delivery Address
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {selectedOrder.address}
                                  </p>
                                </div>
                              )}
                              <div className="flex gap-2">
                                <Button className="flex-1">Update Status</Button>
                                <Button variant="outline" className="flex-1">
                                  Cancel Order
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              Showing 1-6 of 6 orders
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" disabled>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" disabled>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
