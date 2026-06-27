import { Header } from "./header";
import { Footer } from "./footer";
import { LocationBanner } from "./location-banner";

interface CustomerLayoutProps {
  children: React.ReactNode;
  cartItemCount?: number;
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    avatarUrl?: string | null;
  } | null;
  selectedLocation?: {
    name: string;
    address: string;
  } | null;
  showLocationBanner?: boolean;
}

export function CustomerLayout({
  children,
  cartItemCount = 0,
  user,
  selectedLocation,
  showLocationBanner = true,
}: CustomerLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        cartItemCount={cartItemCount}
        user={user}
        selectedLocation={selectedLocation}
      />
      {showLocationBanner && !selectedLocation && <LocationBanner />}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
