"use client";

import { useState } from "react";
import { CustomerLayout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Search,
  Store,
  Car,
  Wifi,
  Accessibility,
} from "lucide-react";

const locations = [
  {
    id: 1,
    name: "FireBird Times Square",
    address: "123 Broadway, New York, NY 10036",
    phone: "(212) 555-0101",
    hours: {
      weekday: "10:00 AM - 12:00 AM",
      weekend: "10:00 AM - 2:00 AM",
    },
    features: ["Drive-Thru", "WiFi", "Delivery"],
    isOpen: true,
    distance: "0.3 mi",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80",
  },
  {
    id: 2,
    name: "FireBird Brooklyn",
    address: "456 Atlantic Ave, Brooklyn, NY 11217",
    phone: "(718) 555-0102",
    hours: {
      weekday: "10:00 AM - 11:00 PM",
      weekend: "10:00 AM - 12:00 AM",
    },
    features: ["Drive-Thru", "WiFi", "Outdoor Seating"],
    isOpen: true,
    distance: "2.1 mi",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
  },
  {
    id: 3,
    name: "FireBird Manhattan",
    address: "789 5th Ave, New York, NY 10022",
    phone: "(212) 555-0103",
    hours: {
      weekday: "8:00 AM - 10:00 PM",
      weekend: "9:00 AM - 11:00 PM",
    },
    features: ["WiFi", "Indoor Seating", "Delivery"],
    isOpen: false,
    distance: "3.5 mi",
    image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&q=80",
  },
  {
    id: 4,
    name: "FireBird Queens",
    address: "321 Queens Blvd, Queens, NY 11375",
    phone: "(718) 555-0104",
    hours: {
      weekday: "10:00 AM - 11:00 PM",
      weekend: "10:00 AM - 12:00 AM",
    },
    features: ["Drive-Thru", "Parking", "WiFi"],
    isOpen: true,
    distance: "5.2 mi",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=400&q=80",
  },
  {
    id: 5,
    name: "FireBird Bronx",
    address: "555 Grand Concourse, Bronx, NY 10451",
    phone: "(718) 555-0105",
    hours: {
      weekday: "10:00 AM - 11:00 PM",
      weekend: "10:00 AM - 12:00 AM",
    },
    features: ["Drive-Thru", "Parking", "Delivery"],
    isOpen: true,
    distance: "7.8 mi",
    image: "https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=400&q=80",
  },
  {
    id: 6,
    name: "FireBird Staten Island",
    address: "888 Victory Blvd, Staten Island, NY 10301",
    phone: "(718) 555-0106",
    hours: {
      weekday: "10:00 AM - 10:00 PM",
      weekend: "10:00 PM - 11:00 PM",
    },
    features: ["Drive-Thru", "Parking", "Outdoor Seating"],
    isOpen: false,
    distance: "12.3 mi",
    image: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=400&q=80",
  },
];

export default function LocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);

  const filteredLocations = locations.filter(
    (loc) =>
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CustomerLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 bg-primary-foreground/20 text-primary-foreground border-0">
              <MapPin className="mr-1 h-3 w-3" />
              Find a Location
            </Badge>
            <h1 className="text-4xl font-heading font-bold sm:text-5xl">
              Our Locations
            </h1>
            <p className="mt-4 text-lg text-primary-foreground/90">
              Find a FireBird Chicken near you. Over 250 locations across all 50
              states!
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 border-b border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by city, state, or zip code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button>
              <Navigation className="mr-2 h-4 w-4" />
              Use My Location
            </Button>
          </div>
        </div>
      </section>

      {/* Locations List + Map */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Locations List */}
            <div className="lg:col-span-1 space-y-4 max-h-[600px] overflow-y-auto">
              <p className="text-sm text-muted-foreground">
                {filteredLocations.length} locations found
              </p>
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedLocation.id === location.id
                      ? "border-primary"
                      : ""
                  }`}
                  onClick={() => setSelectedLocation(location)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-heading font-bold">
                          {location.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {location.address}
                        </p>
                      </div>
                      <Badge
                        variant={location.isOpen ? "default" : "secondary"}
                      >
                        {location.isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {location.hours.weekday}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {location.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" className="flex-1">
                        Order Now
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Map Placeholder */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 h-[600px] rounded-xl border border-border bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="mx-auto h-12 w-12 text-muted-foreground" />
                  <p className="mt-4 text-muted-foreground">
                    Interactive map would be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Integrate with Google Maps or Mapbox
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-12 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-heading font-bold mb-6">
            {selectedLocation.name}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.address}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-sm text-muted-foreground">
                      Mon-Fri: {selectedLocation.hours.weekday}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Sat-Sun: {selectedLocation.hours.weekend}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedLocation.phone}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h3 className="font-medium mb-3">Location Features</h3>
            <div className="flex flex-wrap gap-4">
              {selectedLocation.features.includes("Drive-Thru") && (
                <div className="flex items-center gap-2 text-sm">
                  <Car className="h-4 w-4 text-primary" />
                  Drive-Thru
                </div>
              )}
              {selectedLocation.features.includes("WiFi") && (
                <div className="flex items-center gap-2 text-sm">
                  <Wifi className="h-4 w-4 text-primary" />
                  Free WiFi
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Accessibility className="h-4 w-4 text-primary" />
                Accessible
              </div>
            </div>
          </div>
        </div>
      </section>
    </CustomerLayout>
  );
}
