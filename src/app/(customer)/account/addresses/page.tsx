"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Plus, Pencil, Trash2, Home, Building, Star } from "lucide-react";

const mockAddresses = [
  {
    id: "1",
    label: "Home",
    street: "123 Main Street",
    apt: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    isDefault: true,
    icon: "home",
  },
  {
    id: "2",
    label: "Work",
    street: "456 Office Park",
    apt: "Suite 200",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    isDefault: false,
    icon: "building",
  },
  {
    id: "3",
    label: "Gym",
    street: "789 Fitness Ave",
    apt: "",
    city: "Manhattan",
    state: "NY",
    zip: "10002",
    isDefault: false,
    icon: "other",
  },
];

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(mockAddresses);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<typeof mockAddresses[0] | null>(null);

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
    );
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "building":
        return <Building className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Saved Addresses</h1>
          <p className="text-muted-foreground">
            Manage your delivery addresses
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger render={<Button onClick={() => { setEditingAddress(null); setIsDialogOpen(true); }}><Plus className="mr-2 h-4 w-4" />Add Address</Button>} />
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="label">Label</Label>
                <Input
                  id="label"
                  placeholder="e.g. Home, Work, Gym"
                  defaultValue={editingAddress?.label}
                />
              </div>
              <div>
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="123 Main Street"
                  defaultValue={editingAddress?.street}
                />
              </div>
              <div>
                <Label htmlFor="apt">Apartment/Suite (Optional)</Label>
                <Input
                  id="apt"
                  placeholder="Apt 4B"
                  defaultValue={editingAddress?.apt}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    defaultValue={editingAddress?.city}
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    defaultValue={editingAddress?.state}
                  />
                </div>
                <div>
                  <Label htmlFor="zip">ZIP Code</Label>
                  <Input
                    id="zip"
                    placeholder="10001"
                    defaultValue={editingAddress?.zip}
                  />
                </div>
              </div>
              <Button
                className="w-full"
                onClick={() => setIsDialogOpen(false)}
              >
                {editingAddress ? "Save Changes" : "Add Address"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Addresses Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {addresses.map((address) => (
          <Card
            key={address.id}
            className={address.isDefault ? "border-primary" : ""}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {getIcon(address.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{address.label}</h3>
                      {address.isDefault && (
                        <Badge variant="secondary" className="text-xs">
                          Default
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {address.street}
                      {address.apt && `, ${address.apt}`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {address.city}, {address.state} {address.zip}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                {!address.isDefault && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleSetDefault(address.id)}
                  >
                    <Star className="mr-1 h-3 w-3" />
                    Set Default
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingAddress(address);
                    setIsDialogOpen(true);
                  }}
                >
                  <Pencil className="h-3 w-3" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(address.id)}
                >
                  <Trash2 className="h-3 w-3 text-destructive" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
