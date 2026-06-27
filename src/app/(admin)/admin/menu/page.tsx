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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, Plus, Pencil, Trash2, Eye, EyeOff, GripVertical } from "lucide-react";

const mockMenuItems = [
  {
    id: "1",
    name: "Classic Fire Bird",
    description: "Crispy fried chicken with our signature Fire Bird seasoning",
    price: 12.99,
    category: "CHICKEN",
    image: null,
    isActive: true,
    isFeatured: true,
    spiceLevel: 3,
    calories: 450,
    prepTime: "12-15 min",
  },
  {
    id: "2",
    name: "BBQ Blaze Tower",
    description: "Double-stacked chicken with smoky BBQ sauce and crispy onions",
    price: 18.99,
    category: "CHICKEN",
    image: null,
    isActive: true,
    isFeatured: true,
    spiceLevel: 2,
    calories: 620,
    prepTime: "15-18 min",
  },
  {
    id: "3",
    name: "Nashville Hot Crunch",
    description: "Nashville-style hot chicken with pickles on a brioche bun",
    price: 14.99,
    category: "CHICKEN",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 4,
    calories: 480,
    prepTime: "12-15 min",
  },
  {
    id: "4",
    name: "Spicy Wings (6pc)",
    description: "Crispy chicken wings tossed in spicy buffalo sauce",
    price: 8.99,
    category: "WINGS",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 3,
    calories: 380,
    prepTime: "10-12 min",
  },
  {
    id: "5",
    name: "Garlic Parmesan Wings (6pc)",
    description: "Wings tossed in garlic butter and parmesan cheese",
    price: 9.99,
    category: "WINGS",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 1,
    calories: 420,
    prepTime: "10-12 min",
  },
  {
    id: "6",
    name: "Large Fries",
    description: "Crispy golden fries with sea salt",
    price: 4.99,
    category: "SIDES",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 0,
    calories: 320,
    prepTime: "5-7 min",
  },
  {
    id: "7",
    name: "Onion Rings",
    description: "Beer-battered onion rings with ranch dipping sauce",
    price: 5.99,
    category: "SIDES",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 0,
    calories: 280,
    prepTime: "5-7 min",
  },
  {
    id: "8",
    name: "Coleslaw",
    description: "Creamy coleslaw with a tangy dressing",
    price: 3.49,
    category: "SIDES",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 0,
    calories: 150,
    prepTime: "2-3 min",
  },
  {
    id: "9",
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with vanilla ice cream",
    price: 6.99,
    category: "DESSERTS",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 0,
    calories: 380,
    prepTime: "3-5 min",
  },
  {
    id: "10",
    name: "Coke",
    description: "Ice-cold Coca-Cola",
    price: 2.49,
    category: "DRINKS",
    image: null,
    isActive: true,
    isFeatured: false,
    spiceLevel: 0,
    calories: 140,
    prepTime: "1 min",
  },
];

const categories = [
  { value: "CHICKEN", label: "Chicken" },
  { value: "WINGS", label: "Wings" },
  { value: "SIDES", label: "Sides" },
  { value: "DESSERTS", label: "Desserts" },
  { value: "DRINKS", label: "Drinks" },
  { value: "COMBOS", label: "Combos" },
];

export default function AdminMenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredItems = mockMenuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-bold">Menu Items</h1>
          <p className="text-muted-foreground">
            Manage your restaurant menu and pricing
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger render={<Button><Plus className="mr-2 h-4 w-4" />Add Item</Button>} />
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add Menu Item</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Item name" />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Item description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price ($)</Label>
                  <Input id="price" type="number" step="0.01" placeholder="0.00" />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input id="calories" type="number" placeholder="0" />
                </div>
                <div>
                  <Label htmlFor="spiceLevel">Spice Level (0-5)</Label>
                  <Input id="spiceLevel" type="number" min="0" max="5" placeholder="0" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1" onClick={() => setIsAddDialogOpen(false)}>
                  Add Item
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search menu items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={(v) => setCategoryFilter(v ?? "all")}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-muted-foreground text-sm">No Image</div>
              )}
              <div className="absolute top-2 right-2 flex gap-1">
                {item.isFeatured && (
                  <Badge className="bg-primary">Featured</Badge>
                )}
                {!item.isActive && (
                  <Badge variant="secondary">Inactive</Badge>
                )}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
                <p className="font-bold text-primary">${item.price.toFixed(2)}</p>
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                <span>{item.calories} cal</span>
                <span>•</span>
                <span>{item.prepTime}</span>
                {item.spiceLevel > 0 && (
                  <>
                    <span>•</span>
                    <span>
                      {"🌶️".repeat(item.spiceLevel)}
                    </span>
                  </>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Pencil className="mr-1 h-3 w-3" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  {item.isActive ? (
                    <EyeOff className="h-3 w-3" />
                  ) : (
                    <Eye className="h-3 w-3" />
                  )}
                </Button>
                <Button variant="outline" size="sm">
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
