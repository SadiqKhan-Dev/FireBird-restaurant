"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingBag, User, Menu, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

function MobileMenuButton() {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden">
      <Menu className="h-5 w-5" />
      <span className="sr-only">Open menu</span>
    </button>
  );
}

const menuCategories = [
  {
    name: "Chicken",
    href: "/menu?category=chicken",
    items: [
      { name: "Classic Fire Bird", href: "/menu/chicken/classic-fire-bird" },
      { name: "BBQ Blaze Tower", href: "/menu/chicken/bbq-blaze-tower" },
      { name: "Nashville Hot Crunch", href: "/menu/chicken/nashville-hot" },
    ],
  },
  {
    name: "Wings",
    href: "/menu?category=wings",
    items: [
      { name: "Spicy Wings", href: "/menu/wings/spicy-wings" },
      { name: "Garlic Parmesan Wings", href: "/menu/wings/garlic-parmesan" },
      { name: "Honey BBQ Wings", href: "/menu/wings/honey-bbq" },
    ],
  },
  {
    name: "Sides",
    href: "/menu?category=sides",
    items: [
      { name: "Large Fries", href: "/menu/sides/large-fries" },
      { name: "Onion Rings", href: "/menu/sides/onion-rings" },
      { name: "Coleslaw", href: "/menu/sides/coleslaw" },
    ],
  },
  {
    name: "Combos",
    href: "/menu?category=combos",
    items: [
      { name: "Family Combo", href: "/menu/combos/family-combo" },
      { name: "Couple Combo", href: "/menu/combos/couple-combo" },
      { name: "Solo Combo", href: "/menu/combos/solo-combo" },
    ],
  },
];

interface HeaderProps {
  cartItemCount?: number;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
  } | null;
  selectedLocation?: {
    name: string;
    address: string;
  } | null;
}

export function Header({
  cartItemCount = 0,
  user,
  selectedLocation,
}: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo + Nav */}
        <div className="flex items-center gap-8">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger render={<MobileMenuButton />} />
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <MobileNav user={user} />
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
              F
            </div>
            <span className="hidden font-heading text-xl font-bold sm:block">
              FireBird
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {/* Menu Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("menu")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  activeDropdown === "menu"
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                Menu
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    activeDropdown === "menu" && "rotate-180"
                  )}
                />
              </button>
              {activeDropdown === "menu" && (
                <div className="absolute left-0 top-full z-50 mt-1 w-[600px] rounded-xl border border-border bg-background p-4 shadow-lg">
                  <div className="grid grid-cols-4 gap-4">
                    {menuCategories.map((category) => (
                      <div key={category.name}>
                        <Link
                          href={category.href}
                          className="mb-2 block text-sm font-medium text-foreground hover:text-primary"
                        >
                          {category.name}
                        </Link>
                        <ul className="space-y-1">
                          {category.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="block text-sm text-muted-foreground hover:text-foreground"
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 border-t border-border pt-4">
                    <Link
                      href="/menu"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      View Full Menu →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/deals"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Deals
            </Link>
            <Link
              href="/rewards"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Rewards
            </Link>
            <Link
              href="/catering"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Catering
            </Link>
            <Link
              href="/locations"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Locations
            </Link>
            <Link
              href="/about"
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              About
            </Link>
          </nav>
        </div>

        {/* Right: Location + Search + Account + Cart */}
        <div className="flex items-center gap-2">
          {/* Location Selector */}
          <Link
            href="/locations"
            className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:flex"
          >
            <MapPin className="h-4 w-4 text-primary" />
            <span className="max-w-[120px] truncate text-sm">
              {selectedLocation?.name || "Select Location"}
            </span>
          </Link>

          {/* Search */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>

          {/* Account */}
          <Link
            href={user ? "/account/profile" : "/login"}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.firstName || "User"}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <User className="h-5 w-5" />
            )}
            <span className="sr-only">
              {user ? "Account" : "Sign in"}
            </span>
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
              >
                {cartItemCount > 99 ? "99+" : cartItemCount}
              </Badge>
            )}
            <span className="sr-only">Cart</span>
          </Link>
        </div>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="border-t border-border bg-background p-4">
          <div className="mx-auto max-w-7xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search menu items..."
                className="w-full rounded-full bg-muted py-3 pl-12 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsSearchOpen(false);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
