import { Header } from "./header";
import { Footer } from "./footer";
import { LocationBanner } from "./location-banner";

interface CustomerLayoutProps {
  children: React.ReactNode;
  cartItemCount?: number;
  selectedLocation?: {
    name: string;
    address: string;
  } | null;
  showLocationBanner?: boolean;
}

export function CustomerLayout({
  children,
  cartItemCount = 0,
  selectedLocation,
  showLocationBanner = true,
}: CustomerLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        cartItemCount={cartItemCount}
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
