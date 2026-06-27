"use client";

import { CustomerLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Flame, Tag, Percent, Gift, ArrowRight } from "lucide-react";
import Link from "next/link";

const deals = [
  {
    id: 1,
    title: "Family Feast Deal",
    description:
      "Get 4 Classic Fire Birds, 2 Large Fries, 4 Drinks, and a Coleslaw for just $39.99. Save $15!",
    originalPrice: 54.96,
    dealPrice: 39.99,
    discount: 27,
    validUntil: "June 30, 2026",
    category: "Family",
    isHot: true,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
  },
  {
    id: 2,
    title: "Lunch Combo Special",
    description:
      "Any sandwich, side, and drink for just $9.99. Available Monday-Friday, 11am-2pm.",
    originalPrice: 14.97,
    dealPrice: 9.99,
    discount: 33,
    validUntil: "Ongoing",
    category: "Lunch",
    isHot: false,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    id: 3,
    title: "Wings Wednesday",
    description:
      "Buy 12 wings, get 6 free! Choose from any flavor. Every Wednesday only.",
    originalPrice: 17.98,
    dealPrice: 11.99,
    discount: 33,
    validUntil: "Every Wednesday",
    category: "Weekly",
    isHot: true,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80",
  },
  {
    id: 4,
    title: "Student Discount",
    description:
      "Show your student ID and get 15% off your entire order. Dine-in and takeout only.",
    originalPrice: null,
    dealPrice: null,
    discount: 15,
    validUntil: "Ongoing",
    category: "Special",
    isHot: false,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80",
  },
  {
    id: 5,
    title: "First App Order",
    description:
      "Download our app and get $5 off your first order of $15 or more. Use code: WELCOME5",
    originalPrice: null,
    dealPrice: 5,
    discount: null,
    validUntil: "Ongoing",
    category: "New Customer",
    isHot: true,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80",
  },
  {
    id: 6,
    title: "Date Night Combo",
    description:
      "2 BBQ Blaze Towers, 2 Large Fries, 2 Drinks, and a Dessert for $24.99.",
    originalPrice: 32.96,
    dealPrice: 24.99,
    discount: 24,
    validUntil: "June 30, 2026",
    category: "Combo",
    isHot: false,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
  },
];

const limitedOffers = [
  {
    id: 1,
    title: "Mystery Box Challenge",
    description:
      "Order our Mystery Box and discover a surprise selection of items worth up to $50!",
    price: 29.99,
    endsIn: "2 days",
    spotsLeft: 15,
  },
  {
    id: 2,
    title: "Spice Level 5 Challenge",
    description:
      "Try our Level 5 spicy chicken and get a free dessert if you finish it!",
    price: 14.99,
    endsIn: "5 days",
    spotsLeft: 30,
  },
];

export default function DealsPage() {
  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <Tag className="mr-1 h-3 w-3" />
              Hot Deals
            </Badge>
            <h1 className="text-4xl font-heading font-bold sm:text-5xl">
              Today&apos;s Best Deals
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Save big on your favorites. Limited time offers you don&apos;t want
              to miss!
            </p>
          </div>
        </div>
      </section>

      {/* Main Deals */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {deals.map((deal) => (
              <Card
                key={deal.id}
                className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <div className="h-48 bg-muted relative overflow-hidden">
                  <img
                    src={deal.image}
                    alt={deal.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {deal.category}
                  </Badge>
                  {deal.isHot && (
                    <Badge className="absolute top-2 right-2 bg-red-500">
                      <Flame className="mr-1 h-3 w-3" />
                      Hot
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-heading font-bold">
                    {deal.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
                    {deal.description}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {deal.dealPrice && (
                      <>
                        <span className="text-2xl font-bold text-primary">
                          ${deal.dealPrice.toFixed(2)}
                        </span>
                        {deal.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${deal.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </>
                    )}
                    {!deal.dealPrice && deal.discount && (
                      <span className="text-2xl font-bold text-primary">
                        {deal.discount}% OFF
                      </span>
                    )}
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      Valid: {deal.validUntil}
                    </div>
                    <Button size="sm">
                      Order Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Limited Time Offers */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-500">
              <Gift className="mr-1 h-3 w-3" />
              Limited Time
            </Badge>
            <h2 className="text-3xl font-heading font-bold">
              Exclusive Challenges
            </h2>
            <p className="mt-3 text-muted-foreground">
              Special offers for brave food lovers!
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {limitedOffers.map((offer) => (
              <Card
                key={offer.id}
                className="border-orange-200 bg-orange-50/50 dark:border-orange-800 dark:bg-orange-950/50 flex flex-col"
              >
                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between flex-1">
                    <div>
                      <h3 className="text-xl font-heading font-bold">
                        {offer.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">
                        {offer.description}
                      </p>
                    </div>
                    <span className="text-2xl font-bold text-primary">
                      ${offer.price}
                    </span>
                  </div>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-orange-600 font-medium">
                        Ends in {offer.endsIn}
                      </span>
                      <span className="text-muted-foreground">
                        {offer.spotsLeft} spots left
                      </span>
                    </div>
                    <Button>Accept Challenge</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-heading font-bold">
                Want More Deals?
              </h2>
              <p className="mt-3 text-primary-foreground/90">
                Join FireBird Rewards and get exclusive offers, free food on your
                birthday, and earn points with every order!
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link href="/rewards">
                  <Button
                    variant="secondary"
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    Join Rewards
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    View Menu
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </CustomerLayout>
  );
}
