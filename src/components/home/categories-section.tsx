"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const categories = [
  {
    id: "1",
    name: "Chicken",
    slug: "chicken",
    itemCount: 12,
    image: "https://images.unsplash.com/photo-1562967916-eb82221dfb92?w=400&q=80",
  },
  {
    id: "2",
    name: "Wings",
    slug: "wings",
    itemCount: 8,
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=400&q=80",
  },
  {
    id: "3",
    name: "Sides",
    slug: "sides",
    itemCount: 10,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80",
  },
  {
    id: "4",
    name: "Combos",
    slug: "combos",
    itemCount: 15,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80",
  },
  {
    id: "5",
    name: "Desserts",
    slug: "desserts",
    itemCount: 6,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&q=80",
  },
  {
    id: "6",
    name: "Drinks",
    slug: "drinks",
    itemCount: 12,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80",
  },
];

export function CategoriesSection() {
  return (
    <section className="bg-muted py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Our Menu
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Something for everyone
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/menu?category=${category.slug}`}
                className="group block"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-background">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View Full Menu
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
