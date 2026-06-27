import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public routes that don't require authentication
const publicRoutes = createRouteMatcher([
  "/",
  "/menu(.*)",
  "/deals(.*)",
  "/rewards",
  "/catering",
  "/locations",
  "/about",
  "/contact",
  "/careers",
  "/franchise",
  "/blog(.*)",
  "/faqs",
  "/help",
  "/privacy",
  "/terms",
  "/cookies",
  "/accessibility",
  "/api/menu(.*)",
  "/api/categories",
  "/api/locations",
]);

// Define auth routes
const authRoutes = createRouteMatcher([
  "/login(.*)",
  "/register(.*)",
  "/forgot-password(.*)",
  "/reset-password(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (publicRoutes(req)) {
    return;
  }

  // Allow auth routes
  if (authRoutes(req)) {
    return;
  }

  // Protect all other routes
  const { userId } = await auth();

  if (!userId) {
    const signInUrl = new URL("/login", req.url);
    signInUrl.searchParams.set("redirect_url", req.url);
    return Response.redirect(signInUrl);
  }

  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, but run for API and dynamic routes
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for Clerk-specific frontend API routes
    "/__clerk/(.*)",
  ],
};
