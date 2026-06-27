"use client";

import { Flame, Users, MapPin, Award } from "lucide-react";

const stats = [
  {
    icon: Flame,
    value: "10M+",
    label: "Meals Served",
    description: "And counting every day",
  },
  {
    icon: Users,
    value: "500K+",
    label: "Happy Customers",
    description: "Across the nation",
  },
  {
    icon: MapPin,
    value: "250+",
    label: "Locations",
    description: "In all 50 states",
  },
  {
    icon: Award,
    value: "#1",
    label: "Rated Chicken",
    description: "By our loyal fans",
  },
];

export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-foreground/10">
                <stat.icon className="h-7 w-7" />
              </div>
              <p className="mt-4 text-3xl font-bold sm:text-4xl">{stat.value}</p>
              <p className="mt-1 text-sm font-medium">{stat.label}</p>
              <p className="mt-1 text-xs opacity-80">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
