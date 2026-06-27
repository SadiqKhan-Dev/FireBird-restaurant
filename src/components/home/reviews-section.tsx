"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2 days ago",
    comment:
      "Best fried chicken I've ever had! The Classic Fire Bird is absolutely amazing. Crispy on the outside, juicy on the inside. Will definitely order again!",
    avatar: null,
    orderItem: "Classic Fire Bird",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    date: "1 week ago",
    comment:
      "The Nashville Hot Crunch is fire! Literally! Perfect spice level and the pickles add a nice touch. Delivery was fast and food was still hot.",
    avatar: null,
    orderItem: "Nashville Hot Crunch",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 4,
    date: "3 days ago",
    comment:
      "Great wings! The Garlic Parmesan wings are my go-to. Only wish they had a bigger portion size. Overall excellent experience.",
    avatar: null,
    orderItem: "Garlic Parmesan Wings",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    date: "5 days ago",
    comment:
      "Ordered the Family Combo for movie night and it was perfect. Plenty of food for everyone. The fries are crispy and the coleslaw is fresh.",
    avatar: null,
    orderItem: "Family Combo",
  },
  {
    id: 5,
    name: "Jessica Williams",
    rating: 5,
    date: "1 week ago",
    comment:
      "Love the rewards program! Earned enough points for a free meal already. The app is easy to use and tracking orders is so convenient.",
    avatar: null,
    orderItem: "BBQ Blaze Tower",
  },
  {
    id: 6,
    name: "James Anderson",
    rating: 4,
    date: "4 days ago",
    comment:
      "Consistent quality every time I order. The BBQ Blaze Tower is my favorite. Would love to see more combo options in the future.",
    avatar: null,
    orderItem: "BBQ Blaze Tower",
  },
];

export function ReviewsSection() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">
            What Our Customers Say
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Don&apos;t just take our word for it - hear from our satisfied customers
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm font-medium">4.8 out of 5</span>
            <span className="text-sm text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">2,456 reviews</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-medium text-primary">
                      {review.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{review.name}</h4>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <div className="mt-1 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${
                            star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  {review.comment}
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                    {review.orderItem}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Reviews */}
        <div className="mt-8 text-center">
          <a
            href="/reviews"
            className="inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            View all reviews →
          </a>
        </div>
      </div>
    </section>
  );
}
