"use client";

import { CustomerLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Flame,
  Users,
  Target,
  Heart,
  Leaf,
  Award,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Flame,
    title: "Bold Flavors",
    description:
      "We never compromise on taste. Every bite is crafted with our signature Fire Bird seasoning blend.",
  },
  {
    icon: Leaf,
    title: "Fresh Ingredients",
    description:
      "We use only the freshest ingredients. Our chicken is never frozen, always fresh.",
  },
  {
    icon: Heart,
    title: "Made with Love",
    description:
      "Every meal is prepared with care. We treat every customer like family.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We give back to the communities we serve through local partnerships and initiatives.",
  },
];

const milestones = [
  { year: "2015", event: "First FireBird Chicken opens in New York City" },
  { year: "2017", event: "Expanded to 10 locations across the Northeast" },
  { year: "2019", event: "Launched FireBird Rewards loyalty program" },
  { year: "2020", event: "Introduced contactless delivery and curbside pickup" },
  { year: "2022", event: "Reached 100 locations nationwide" },
  { year: "2024", event: "Expanded to 250+ locations in all 50 states" },
  { year: "2026", event: "Celebrating 10 million meals served!" },
];

const team = [
  {
    name: "Marcus Johnson",
    role: "Founder & CEO",
    bio: "Started FireBird with a simple dream: to bring bold, flavorful chicken to everyone.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  {
    name: "Sarah Chen",
    role: "Head Chef",
    bio: "With 20 years of culinary experience, Sarah perfects every recipe.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
  },
  {
    name: "David Rodriguez",
    role: "VP of Operations",
    bio: "Ensures every location delivers the same quality and service.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function AboutPage() {
  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 text-primary-foreground">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <Flame className="mr-1 h-3 w-3" />
              Our Story
            </Badge>
            <h1 className="text-4xl font-heading font-bold sm:text-5xl lg:text-6xl">
              Bold Flavors, Crispy Perfection
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/90">
              FireBird Chicken was born from a passion for creating the most
              flavorful, crispy chicken imaginable. What started as a small
              restaurant in New York City has grown into a nationwide phenomenon,
              but our commitment to quality remains the same.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                To serve bold, flavorful chicken that brings people together and
                creates memorable dining experiences, while making a positive
                impact on our communities and the environment.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">10M+</p>
                  <p className="text-sm text-muted-foreground">Meals Served</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">250+</p>
                  <p className="text-sm text-muted-foreground">Locations</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">5,000+</p>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <p className="text-3xl font-bold text-primary">50</p>
                  <p className="text-sm text-muted-foreground">States</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-muted flex items-center justify-center">
                <Flame className="h-32 w-32 text-primary/20" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-xl bg-primary text-primary-foreground p-4 shadow-lg">
                <p className="font-heading font-bold">Est. 2015</p>
                <p className="text-sm opacity-90">New York City</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Our Values</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mt-4 text-lg font-heading font-bold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Our Journey</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              From a single restaurant to a nationwide brand
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="relative flex gap-6">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold z-10">
                    {milestone.year.slice(2)}
                  </div>
                  <div>
                    <p className="font-medium text-primary">{milestone.year}</p>
                    <p className="text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-bold">Leadership Team</h2>
            <p className="mt-3 text-lg text-muted-foreground">
              The people behind the fire
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="overflow-hidden">
                <div className="relative h-48">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <CardContent className="pt-6 text-center">
                  <h3 className="text-lg font-heading font-bold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-primary font-medium">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-200 dark:border-green-800">
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-8 lg:grid-cols-2 items-center">
                <div>
                  <Badge className="mb-4 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                    <Leaf className="mr-1 h-3 w-3" />
                    Sustainability
                  </Badge>
                  <h2 className="text-3xl font-heading font-bold">
                    Committed to Our Planet
                  </h2>
                  <p className="mt-4 text-muted-foreground">
                    We believe great food shouldn&apos;t come at the expense of
                    our environment. That&apos;s why we&apos;re committed to
                    sustainable practices across our operations.
                  </p>
                  <ul className="mt-6 space-y-3">
                    <li className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-green-600" />
                      100% recyclable packaging by 2025
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-green-600" />
                      Locally sourced ingredients when possible
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-green-600" />
                      Carbon-neutral delivery fleet
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Award className="h-4 w-4 text-green-600" />
                      Food waste reduction programs
                    </li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-6 text-center">
                    <p className="text-3xl font-bold text-green-600">75%</p>
                    <p className="text-sm text-muted-foreground">
                      Recyclable Packaging
                    </p>
                  </div>
                  <div className="rounded-xl bg-background p-6 text-center">
                    <p className="text-3xl font-bold text-green-600">50%</p>
                    <p className="text-sm text-muted-foreground">
                      Local Sourcing
                    </p>
                  </div>
                  <div className="rounded-xl bg-background p-6 text-center">
                    <p className="text-3xl font-bold text-green-600">100%</p>
                    <p className="text-sm text-muted-foreground">
                      Renewable Energy
                    </p>
                  </div>
                  <div className="rounded-xl bg-background p-6 text-center">
                    <p className="text-3xl font-bold text-green-600">Zero</p>
                    <p className="text-sm text-muted-foreground">
                      Food to Landfill
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-heading font-bold">
              Join the FireBird Family
            </h2>
            <p className="mt-3 text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re looking for a delicious meal or a rewarding
              career, we&apos;d love to have you.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/menu">
                <Button size="lg">
                  Order Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/careers">
                <Button size="lg" variant="outline">
                  View Careers
                </Button>
              </Link>
              <Link href="/franchise">
                <Button size="lg" variant="outline">
                  Franchise Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
