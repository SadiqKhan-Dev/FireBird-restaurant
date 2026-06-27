import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FireBird Chicken | Premium Chicken Restaurant",
    template: "%s | FireBird Chicken",
  },
  description:
    "Order premium chicken meals online from FireBird Chicken. Delivery, pickup, and dine-in available. Bold flavors, crispy perfection.",
  keywords: [
    "chicken",
    "restaurant",
    "food delivery",
    "fried chicken",
    "chicken wings",
    "chicken tenders",
    "family meals",
    "online ordering",
  ],
  authors: [{ name: "FireBird Chicken" }],
  creator: "FireBird Chicken",
  publisher: "FireBird Chicken",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://firebirdchicken.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "FireBird Chicken",
    title: "FireBird Chicken | Premium Chicken Restaurant",
    description:
      "Order premium chicken meals online. Bold flavors, crispy perfection.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "FireBird Chicken",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FireBird Chicken | Premium Chicken Restaurant",
    description:
      "Order premium chicken meals online. Bold flavors, crispy perfection.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${inter.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:m-4"
          >
            Skip to main content
          </a>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
