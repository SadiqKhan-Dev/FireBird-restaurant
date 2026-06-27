"use client";

import { CustomerLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Gift,
  Star,
  Zap,
  Crown,
  TrendingUp,
  ArrowRight,
  Check,
  CreditCard,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Bronze",
    pointsRequired: 0,
    benefits: [
      "Earn 1 point per $1 spent",
      "Birthday reward",
      "Member-only deals",
    ],
    color: "bg-amber-600",
  },
  {
    name: "Silver",
    pointsRequired: 1000,
    benefits: [
      "Earn 1.5x points",
      "Free delivery on orders $25+",
      "Early access to new items",
      "Double points Tuesdays",
    ],
    color: "bg-gray-400",
  },
  {
    name: "Gold",
    pointsRequired: 2500,
    benefits: [
      "Earn 2x points",
      "Free delivery on all orders",
      "Exclusive menu items",
      "Priority customer support",
      "Free upsizes",
    ],
    color: "bg-yellow-500",
  },
  {
    name: "Platinum",
    pointsRequired: 5000,
    benefits: [
      "Earn 3x points",
      "Free delivery + no service fee",
      "VIP events & tastings",
      "Personal account manager",
      "Free meals monthly",
      "Custom rewards",
    ],
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
  },
];

const waysToEarn = [
  {
    icon: CreditCard,
    title: "Order Online",
    description: "Earn 1 point for every $1 spent on all orders",
    points: "1x",
  },
  {
    icon: Smartphone,
    title: "Use the App",
    description: "Get 2x points when you order through our mobile app",
    points: "2x",
  },
  {
    icon: Gift,
    title: "Refer Friends",
    description: "Earn 500 bonus points for each friend who joins",
    points: "500",
  },
  {
    icon: Star,
    title: "Write Reviews",
    description: "Earn 50 points for every review with photo",
    points: "50",
  },
];

const rewards = [
  {
    name: "Free Classic Fire Bird",
    points: 500,
    description: "Redeem for a free Classic Fire Bird sandwich",
  },
  {
    name: "Free Large Fries",
    points: 250,
    description: "Redeem for free large fries",
  },
  {
    name: "20% Off Next Order",
    points: 300,
    description: "Get 20% off your next order (max $10)",
  },
  {
    name: "Free Delivery",
    points: 150,
    description: "Free delivery on your next order",
  },
];

export default function RewardsPage() {
  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <Star className="mr-1 h-3 w-3" />
              FireBird Rewards
            </Badge>
            <h1 className="text-4xl font-heading font-bold sm:text-5xl">
              Earn Points. Get Rewards.
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Join our loyalty program and earn free food, exclusive perks, and
              more with every order!
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Join Now - It&apos;s Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">
              How It Works
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Start earning rewards in 3 simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                1
              </div>
              <h3 className="mt-4 text-lg font-heading font-bold">Join</h3>
              <p className="mt-2 text-muted-foreground">
                Create a free account in seconds. No credit card required.
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                2
              </div>
              <h3 className="mt-4 text-lg font-heading font-bold">Earn</h3>
              <p className="mt-2 text-muted-foreground">
                Earn points with every purchase. More orders = more points!
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl font-bold">
                3
              </div>
              <h3 className="mt-4 text-lg font-heading font-bold">Redeem</h3>
              <p className="mt-2 text-muted-foreground">
                Use your points for free food, discounts, and exclusive rewards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Earn */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">
              Ways to Earn Points
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Multiple ways to rack up your rewards
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {waysToEarn.map((way) => (
              <Card key={way.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <way.icon className="h-6 w-6" />
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <h3 className="font-heading font-bold">{way.title}</h3>
                    <Badge variant="secondary">
                      <Zap className="mr-1 h-3 w-3" />
                      {way.points} pts
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {way.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">
              Membership Tiers
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Level up and unlock more benefits
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={
                  tier.name === "Gold"
                    ? "border-primary shadow-lg relative"
                    : ""
                }
              >
                {tier.name === "Gold" && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">
                      <Crown className="mr-1 h-3 w-3" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="pt-6">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${tier.color} text-white`}
                  >
                    {tier.name === "Platinum" ? (
                      <Crown className="h-6 w-6" />
                    ) : (
                      <Star className="h-6 w-6" />
                    )}
                  </div>
                  <h3 className="mt-4 text-xl font-heading font-bold">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tier.pointsRequired === 0
                      ? "Starting tier"
                      : `${tier.pointsRequired.toLocaleString()} points`}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {tier.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Rewards */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">
              Popular Rewards
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              See what you can redeem your points for
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {rewards.map((reward) => (
              <Card key={reward.name}>
                <CardContent className="pt-6">
                  <h3 className="font-heading font-bold">{reward.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {reward.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Zap className="h-4 w-4 text-primary" />
                      <span className="font-bold">{reward.points} pts</span>
                    </div>
                    <Button size="sm" variant="outline">
                      Redeem
                    </Button>
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
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8 text-center">
              <TrendingUp className="mx-auto h-12 w-12 mb-4" />
              <h2 className="text-3xl font-heading font-bold">
                Start Earning Today
              </h2>
              <p className="mt-3 text-primary-foreground/90">
                Join over 500,000 members who are already earning free food and
                exclusive rewards!
              </p>
              <Link href="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-6 bg-white text-primary hover:bg-white/90"
                >
                  Join FireBird Rewards
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </CustomerLayout>
  );
}
