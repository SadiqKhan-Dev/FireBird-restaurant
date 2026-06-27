"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Search, Eye, Mail, Phone, MapPin, Calendar, ShoppingBag } from "lucide-react";

const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    orders: 24,
    totalSpent: 589.76,
    loyaltyPoints: 589,
    joinedAt: "2025-01-15T00:00:00Z",
    lastOrder: "2026-06-27T10:30:00Z",
    addresses: ["123 Main St, Apt 4B, New York, NY 10001"],
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "(555) 234-5678",
    orders: 18,
    totalSpent: 445.62,
    loyaltyPoints: 445,
    joinedAt: "2025-03-22T00:00:00Z",
    lastOrder: "2026-06-27T10:25:00Z",
    addresses: ["456 Oak Ave, Brooklyn, NY 11201"],
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    phone: "(555) 345-6789",
    orders: 32,
    totalSpent: 823.44,
    loyaltyPoints: 823,
    joinedAt: "2024-11-08T00:00:00Z",
    lastOrder: "2026-06-27T10:15:00Z",
    addresses: ["789 Pine St, Manhattan, NY 10002"],
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    phone: "(555) 456-7890",
    orders: 12,
    totalSpent: 298.88,
    loyaltyPoints: 298,
    joinedAt: "2025-06-10T00:00:00Z",
    lastOrder: "2026-06-27T09:45:00Z",
    addresses: ["321 Elm St, Queens, NY 11375"],
  },
  {
    id: "5",
    name: "Tom Brown",
    email: "tom@example.com",
    phone: "(555) 567-8901",
    orders: 8,
    totalSpent: 187.92,
    loyaltyPoints: 187,
    joinedAt: "2025-09-05T00:00:00Z",
    lastOrder: "2026-06-27T09:30:00Z",
    addresses: ["654 Cedar Ln, Bronx, NY 10451"],
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    phone: "(555) 678-9012",
    orders: 45,
    totalSpent: 1156.35,
    loyaltyPoints: 1156,
    joinedAt: "2024-08-20T00:00:00Z",
    lastOrder: "2026-06-26T18:45:00Z",
    addresses: ["987 Maple Dr, Staten Island, NY 10301"],
  },
];

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof mockCustomers[0] | null>(null);

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer base and loyalty programs
          </p>
        </div>
        <Button>Export Customers</Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Customers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,456</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Lifetime Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245.80</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search customers by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Customers ({filteredCustomers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Customer
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Orders
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Total Spent
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Loyalty Points
                  </th>
                  <th className="pb-3 text-left text-sm font-medium text-muted-foreground">
                    Last Order
                  </th>
                  <th className="pb-3 text-right text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-medium">{customer.orders}</td>
                    <td className="py-4 font-medium">
                      ${customer.totalSpent.toFixed(2)}
                    </td>
                    <td className="py-4">
                      <Badge variant="secondary">
                        {customer.loyaltyPoints} pts
                      </Badge>
                    </td>
                    <td className="py-4 text-sm text-muted-foreground">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </td>
                    <td className="py-4 text-right">
                      <Dialog>
                        <DialogTrigger render={<Button variant="ghost" size="icon" onClick={() => setSelectedCustomer(customer)}><Eye className="h-4 w-4" /></Button>} />
                        <DialogContent className="max-w-md">
                          <DialogHeader>
                            <DialogTitle>Customer Details</DialogTitle>
                          </DialogHeader>
                          {selectedCustomer && (
                            <div className="space-y-4">
                              <div className="flex items-center gap-4">
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-xl font-medium text-primary">
                                    {selectedCustomer.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </span>
                                </div>
                                <div>
                                  <h3 className="text-lg font-medium">
                                    {selectedCustomer.name}
                                  </h3>
                                  <p className="text-muted-foreground">
                                    Member since{" "}
                                    {new Date(
                                      selectedCustomer.joinedAt
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-2 text-sm">
                                  <Mail className="h-4 w-4 text-muted-foreground" />
                                  {selectedCustomer.email}
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <Phone className="h-4 w-4 text-muted-foreground" />
                                  {selectedCustomer.phone}
                                </div>
                              </div>

                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="rounded-lg bg-muted p-3">
                                  <p className="text-2xl font-bold">
                                    {selectedCustomer.orders}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Orders
                                  </p>
                                </div>
                                <div className="rounded-lg bg-muted p-3">
                                  <p className="text-2xl font-bold">
                                    ${selectedCustomer.totalSpent.toFixed(0)}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Total Spent
                                  </p>
                                </div>
                                <div className="rounded-lg bg-muted p-3">
                                  <p className="text-2xl font-bold">
                                    {selectedCustomer.loyaltyPoints}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Points
                                  </p>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm font-medium mb-2">
                                  Saved Addresses
                                </p>
                                {selectedCustomer.addresses.map(
                                  (address, i) => (
                                    <div
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-muted-foreground"
                                    >
                                      <MapPin className="h-4 w-4 mt-0.5" />
                                      {address}
                                    </div>
                                  )
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Button className="flex-1">
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Email
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <ShoppingBag className="mr-2 h-4 w-4" />
                                  View Orders
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
        </CardContent>
      </Card>
    </div>
  );
}
