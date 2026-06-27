"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const featuredItems = [
  {
    id: "1",
    name: "Classic Fire Bird",
    slug: "classic-fire-bird",
    description: "Our signature crispy chicken sandwich with fire sauce",
    price: 12.99,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80",
    calories: 650,
    spiceLevel: 2,
    category: "Chicken",
  },
  {
    id: "2",
    name: "BBQ Blaze Tower",
    slug: "bbq-blaze-tower",
    description: "Double-stacked chicken with smoky BBQ sauce and crispy onions",
    price: 18.99,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400&q=80",
    calories: 820,
    spiceLevel: 2,
    category: "Chicken",
  },
  {
    id: "3",
    name: "Nashville Hot Crunch",
    slug: "nashville-hot",
    description: "Nashville-style hot chicken with pickles on a brioche bun",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400&q=80",
    calories: 480,
    spiceLevel: 4,
    category: "Chicken",
  },
  {
    id: "4",
    name: "Family Feast Bucket",
    slug: "family-feast",
    description: "8pc chicken, 2 large sides, 4 biscuits, and 4 drinks",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400&q=80",
    calories: 3200,
    spiceLevel: 0,
    category: "Family",
  },
];

export function FeaturedSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Featured Favorites
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Our most popular items, loved by thousands
            </p>
          </div>
          <Link
            href="/menu"
            className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <Badge className="absolute top-2 left-2" variant="secondary">
                    {item.category}
                  </Badge>
                  {item.spiceLevel > 0 && (
                    <span className="absolute top-2 right-2 text-sm">
                      {"🌶️".repeat(item.spiceLevel)}
                    </span>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading font-bold">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">
                      ${item.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {item.calories} cal
                    </span>
                  </div>
                  <Link
                    href={`/menu/${item.slug}`}
                    className="mt-3 block w-full rounded-lg bg-primary py-2 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    Order Now
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            View All Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
