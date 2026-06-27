"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What makes FireBird Chicken different from other fast food?",
    answer:
      "We use only the finest ingredients and our signature Fire Bird seasoning blend that's been perfected over years. Our chicken is never frozen, always fresh, and cooked to order to ensure the perfect crunch and flavor in every bite.",
  },
  {
    question: "How spicy are your menu items?",
    answer:
      "We offer a range of spice levels from mild to extra hot! Each menu item has a spice indicator (0-5 peppers) so you can choose what's right for you. Our Nashville Hot Crunch is our spiciest chicken sandwich, while our Classic Fire Bird is a medium heat that most people enjoy.",
  },
  {
    question: "Do you offer delivery?",
    answer:
      "Yes! We offer delivery through our app and website. You can also order through popular delivery platforms. Delivery fees vary by location, and we offer free delivery on orders over $35 for FireBird Rewards members.",
  },
  {
    question: "What are FireBird Rewards?",
    answer:
      "FireBird Rewards is our loyalty program where you earn points with every purchase. 1 point for every $1 spent. Redeem points for free food, discounts, and exclusive offers. Gold and Platinum members get additional perks like free delivery and double points days.",
  },
  {
    question: "Can I customize my order?",
    answer:
      "Absolutely! We encourage customization. Choose your spice level, pick your favorite sauces, add or remove toppings, and specify any special instructions. Our goal is to make your meal exactly how you want it.",
  },
  {
    question: "Do you cater for events?",
    answer:
      "Yes, we offer catering services for events of all sizes! From family gatherings to corporate events, we can create a custom menu that feeds your guests. Contact us at least 48 hours in advance for catering orders.",
  },
  {
    question: "Are there vegetarian or vegan options?",
    answer:
      "While we specialize in chicken, we do offer vegetarian sides like our Famous Fries, Onion Rings, and Coleslaw. We're also working on introducing plant-based options in the near future!",
  },
  {
    question: "How can I earn more rewards points?",
    answer:
      "You can earn bonus points by: ordering through the app (2x points), referring friends (500 bonus points), participating in special promotions, and purchasing gift cards. Gold members earn 1.5x points, Platinum members earn 2x points!",
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-heading font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers!
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <Card
              key={index}
              className={cn(
                "transition-all",
                openIndex === index && "border-primary"
              )}
            >
              <button
                className="w-full text-left"
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              >
                <CardContent className="pt-6 pb-6">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-medium">{faq.question}</h3>
                    {openIndex === index ? (
                      <ChevronUp className="h-5 w-5 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  {openIndex === index && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      {faq.answer}
                    </p>
                  )}
                </CardContent>
              </button>
            </Card>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="mt-2 inline-flex items-center text-sm font-medium text-primary hover:underline"
          >
            Contact our support team →
          </a>
        </div>
      </div>
    </section>
  );
}
