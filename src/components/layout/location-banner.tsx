"use client";

import Link from "next/link";
import { MapPin, X } from "lucide-react";
import { useState } from "react";

export function LocationBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary/10 border-b border-primary/20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-primary" />
          <p className="text-sm">
            <span className="font-medium">Select your location</span> to see
            delivery availability and menu options.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/locations"
            className="inline-flex h-7 items-center rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
          >
            Choose Location
          </Link>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
}
