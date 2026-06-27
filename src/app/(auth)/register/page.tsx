"use client";

import { useState, useEffect } from "react";
import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

function ClerkLoadingSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Clerk Card Skeleton */}
      <div className="rounded-2xl border border-border bg-card shadow-lg p-8">
        {/* Header Skeleton */}
        <div className="text-center mb-6">
          <div className="h-6 w-36 bg-muted rounded mx-auto mb-2 animate-pulse" />
          <div className="h-4 w-52 bg-muted rounded mx-auto animate-pulse" />
        </div>

        {/* Social Login Skeleton */}
        <div className="space-y-3 mb-6">
          <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
          <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
        </div>

        {/* Divider Skeleton */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px bg-muted" />
          <div className="h-4 w-8 bg-muted rounded animate-pulse" />
          <div className="flex-1 h-px bg-muted" />
        </div>

        {/* Form Fields Skeleton */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="h-4 w-16 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
            </div>
            <div>
              <div className="h-4 w-14 bg-muted rounded mb-2 animate-pulse" />
              <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
            </div>
          </div>
          <div>
            <div className="h-4 w-12 bg-muted rounded mb-2 animate-pulse" />
            <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
          </div>
          <div>
            <div className="h-4 w-20 bg-muted rounded mb-2 animate-pulse" />
            <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 w-full bg-muted rounded-lg mb-4 animate-pulse" />

        {/* Footer Links Skeleton */}
        <div className="flex justify-center">
          <div className="h-4 w-40 bg-muted rounded animate-pulse" />
        </div>
      </div>

      {/* Loading Text */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <svg
            className="h-4 w-4 animate-spin"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading authentication...
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate Clerk loading time
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl">
              F
            </div>
            <span className="font-heading text-2xl font-bold">FireBird</span>
          </Link>
        </div>

        {/* Loading State */}
        {!isLoaded && <ClerkLoadingSkeleton />}

        {/* Sign Up Form */}
        {isLoaded && (
          <SignUp
            appearance={{
              elements: {
                rootBox: "mx-auto",
                card: "shadow-lg",
              },
            }}
            routing="path"
            path="/register"
            fallbackRedirectUrl="/"
            signInUrl="/login"
          />
        )}

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
