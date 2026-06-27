"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle } from "lucide-react";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-background border border-border p-8 md:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 mb-4">
              <Mail className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-3xl font-heading font-bold sm:text-4xl">
              Stay in the Loop
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Subscribe to our newsletter for exclusive deals, new menu items,
              and a free meal on your birthday!
            </p>

            {isSubscribed ? (
              <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">
                  Thanks for subscribing! Check your inbox for a welcome offer.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" size="lg">
                    Subscribe
                  </Button>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  By subscribing, you agree to our Privacy Policy. Unsubscribe
                  anytime.
                </p>
              </form>
            )}

            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">10%</p>
                <p className="text-xs text-muted-foreground">Off first order</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">Free</p>
                <p className="text-xs text-muted-foreground">Birthday meal</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">2x</p>
                <p className="text-xs text-muted-foreground">Points weekends</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
