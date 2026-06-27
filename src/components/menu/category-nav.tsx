"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface CategoryNavProps {
  categories: Category[];
  activeCategory: string;
}

export function CategoryNav({ categories, activeCategory }: CategoryNavProps) {
  return (
    <div className="flex overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
      <nav className="flex gap-2" aria-label="Menu categories">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={category.slug === "all" ? "/menu" : `/menu/${category.slug}`}
            className={cn(
              "inline-flex items-center whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === category.slug
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
            )}
            aria-current={activeCategory === category.slug ? "page" : undefined}
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
