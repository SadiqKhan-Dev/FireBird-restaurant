"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Menu,
  Tag,
  MapPin,
  Phone,
  ShoppingBag,
  User,
  LogOut,
  Settings,
  Heart,
  Gift,
  Ticket,
  Bell,
  Info,
  BookOpen,
  Truck,
  Star,
  HelpCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
  } | null;
}

const mainLinks = [
  { label: "Home", href: "/", icon: Home },
  { label: "Menu", href: "/menu", icon: Menu },
  { label: "Deals", href: "/deals", icon: Tag },
  { label: "Rewards", href: "/rewards", icon: Gift },
  { label: "Catering", href: "/catering", icon: Truck },
  { label: "Locations", href: "/locations", icon: MapPin },
  { label: "About Us", href: "/about", icon: Info },
  { label: "Contact", href: "/contact", icon: Phone },
];

const accountLinks = [
  { label: "My Orders", href: "/account/orders", icon: ShoppingBag },
  { label: "My Rewards", href: "/account/rewards", icon: Gift },
  { label: "Favorites", href: "/account/favorites", icon: Heart },
  { label: "Gift Cards", href: "/account/gift-cards", icon: Ticket },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Profile", href: "/account/profile", icon: User },
  { label: "Settings", href: "/account/settings", icon: Settings },
];

const supportLinks = [
  { label: "Help Center", href: "/help", icon: HelpCircle },
  { label: "FAQs", href: "/faqs", icon: BookOpen },
  { label: "Write a Review", href: "/reviews/write", icon: Star },
];

export function MobileNav({ user }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 pb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-xl">
          F
        </div>
        <span className="font-heading text-xl font-bold">FireBird</span>
      </div>

      <Separator />

      {/* Main Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {mainLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {user && (
          <>
            <Separator className="my-4" />
            <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">
              My Account
            </p>
            <ul className="mt-2 space-y-1">
              {accountLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}

        <Separator className="my-4" />
        <p className="px-3 py-1 text-xs font-medium text-muted-foreground uppercase">
          Support
        </p>
        <ul className="mt-2 space-y-1">
          {supportLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <Separator />

      {/* Auth Section */}
      <div className="py-4">
        {user ? (
          <div className="flex items-center gap-3">
            {user.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.firstName || "User"}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                <User className="h-5 w-5" />
              </div>
            )}
            <div className="flex-1">
              <p className="text-sm font-medium">
                {user.firstName} {user.lastName}
              </p>
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Sign out</span>
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link
              href="/login"
              className="flex h-9 flex-1 items-center justify-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="flex h-9 flex-1 items-center justify-center rounded-lg border border-border bg-background px-2.5 text-sm font-medium transition-colors hover:bg-muted"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
