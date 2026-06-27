// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch dashboard stats
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get("locationId");
    const period = searchParams.get("period") || "today"; // today, week, month, year

    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case "today":
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case "week":
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case "month":
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case "year":
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }

    const locationFilter = locationId ? { locationId } : {};

    // Get stats
    const [
      totalOrders,
      totalRevenue,
      totalCustomers,
      activeOrders,
      recentOrders,
      ordersByStatus,
      topItems,
    ] = await Promise.all([
      // Total orders in period
      prisma.order.count({
        where: {
          ...locationFilter,
          createdAt: { gte: startDate },
          status: { not: "CANCELLED" },
        },
      }),

      // Total revenue in period
      prisma.order.aggregate({
        where: {
          ...locationFilter,
          createdAt: { gte: startDate },
          status: { not: "CANCELLED" },
          paymentStatus: "COMPLETED",
        },
        _sum: { total: true },
      }),

      // Total customers
      prisma.user.count({
        where: { role: "CUSTOMER_SUPPORT" },
      }),

      // Active orders (not delivered/cancelled)
      prisma.order.count({
        where: {
          ...locationFilter,
          status: {
            in: ["PLACED", "CONFIRMED", "PREPARING", "READY", "OUT_FOR_DELIVERY"],
          },
        },
      }),

      // Recent orders
      prisma.order.findMany({
        where: locationFilter,
        include: {
          user: {
            select: {
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          items: {
            select: {
              name: true,
              quantity: true,
            },
            take: 2,
          },
        },
        orderBy: { createdAt: "desc" },
        take: 10,
      }),

      // Orders by status
      prisma.order.groupBy({
        by: ["status"],
        where: {
          ...locationFilter,
          createdAt: { gte: startDate },
        },
        _count: true,
      }),

      // Top selling items
      prisma.orderItem.groupBy({
        by: ["menuItemId"],
        where: {
          order: {
            ...locationFilter,
            createdAt: { gte: startDate },
            status: { not: "CANCELLED" },
          },
        },
        _sum: { quantity: true },
        _count: true,
        orderBy: { _sum: { quantity: "desc" } },
        take: 10,
      }),
    ]);

    // Get menu item details for top items
    const topItemIds = topItems.map((item: { menuItemId: string }) => item.menuItemId);
    const menuItems = await prisma.menuItem.findMany({
      where: { id: { in: topItemIds } },
      select: {
        id: true,
        name: true,
        imageUrl: true,
      },
    });

    const topItemsWithDetails = topItems.map((item: { menuItemId: string; _sum: { quantity: number | null }; _count: number }) => ({
      ...item,
      menuItem: menuItems.find((m: { id: string }) => m.id === item.menuItemId),
      totalQuantity: item._sum.quantity,
      orderCount: item._count,
    }));

    return NextResponse.json({
      stats: {
        totalOrders,
        totalRevenue: totalRevenue._sum.total || 0,
        totalCustomers,
        activeOrders,
        averageOrderValue:
          totalOrders > 0 ? Math.round((totalRevenue._sum.total || 0) / totalOrders) : 0,
      },
      recentOrders,
      ordersByStatus: ordersByStatus.map((item: { status: string; _count: number }) => ({
        status: item.status,
        count: item._count,
      })),
      topItems: topItemsWithDetails,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard stats" },
      { status: 500 }
    );
  }
}
