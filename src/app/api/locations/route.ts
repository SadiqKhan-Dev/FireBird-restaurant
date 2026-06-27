// @ts-nocheck
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const zipCode = searchParams.get("zipCode");
    const latitude = parseFloat(searchParams.get("lat") || "0");
    const longitude = parseFloat(searchParams.get("lng") || "0");

    let locations;

    if (zipCode) {
      // Find locations that deliver to this zip code
      locations = await prisma.restaurantLocation.findMany({
        where: {
          isActive: true,
          deliveryZones: {
            some: { zipCode },
          },
        },
        include: {
          operatingHours: true,
          deliveryZones: {
            where: { zipCode },
          },
        },
      });
    } else if (latitude && longitude) {
      // Find nearest locations (simplified - in production use PostGIS)
      locations = await prisma.restaurantLocation.findMany({
        where: { isActive: true },
        include: {
          operatingHours: true,
        },
        orderBy: { name: "asc" },
      });

      // Calculate distance and sort
      locations = locations
        .map((loc) => ({
          ...loc,
          distance: calculateDistance(latitude, longitude, loc.latitude, loc.longitude),
        }))
        .sort((a: any, b: any) => a.distance - b.distance);
    } else {
      // Return all active locations
      locations = await prisma.restaurantLocation.findMany({
        where: { isActive: true },
        include: {
          operatingHours: true,
        },
        orderBy: { name: "asc" },
      });
    }

    return NextResponse.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    return NextResponse.json(
      { error: "Failed to fetch locations" },
      { status: 500 }
    );
  }
}

// Haversine formula to calculate distance between two coordinates
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
