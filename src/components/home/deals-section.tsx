"use client";

import Link from "next/link";
import { ArrowRight, Clock, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";

const deals = [
  {
    id: "1",
    title: "Family Feast Deal",
    description: "Get a free large side with any Family Bucket purchase",
    code: "FAMILY25",
    discount: "Free Side",
    validUntil: "2026-07-15",
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80",
  },
  {
    id: "2",
    title: "Lunch Special",
    description: "Any combo meal for just $8.99, Mon-Fri 11am-2pm",
    code: "LUNCH899",
    discount: "$8.99",
    validUntil: "2026-07-31",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
  },
  {
    id: "3",
    title: "Free Delivery",
    description: "Free delivery on orders over $25",
    code: "FREEDEL",
    discount: "Free Delivery",
    validUntil: "2026-07-10",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?w=600&q=80",
  },
];

export function DealsSection() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
              Hot Deals
            </h2>
            <p className="mt-2 text-lg text-muted-foreground">
              Save big on your favorites
            </p>
          </div>
          <Link
            href="/deals"
            className="hidden items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground sm:flex"
          >
            View All Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link href={`/deals`} className="group block">
                <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={deal.image}
                      alt={deal.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <Badge className="absolute left-4 top-4 bg-primary">
                      <Tag className="mr-1 h-3 w-3" />
                      {deal.discount}
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{deal.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {deal.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>
                          Valid until{" "}
                          {new Date(deal.validUntil).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      </div>
                      <span className="text-sm font-medium text-primary group-hover:underline">
                        Order Now
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/deals"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            View All Deals
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
