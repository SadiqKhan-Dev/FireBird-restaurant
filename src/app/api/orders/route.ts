// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch user orders
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const status = searchParams.get("status");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!userId) {
      return NextResponse.json(
        { error: "userId required" },
        { status: 400 }
      );
    }

    const where: any = { userId };

    if (status) {
      where.status = status;
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          items: {
            include: {
              menuItem: {
                select: {
                  imageUrl: true,
                },
              },
            },
          },
          location: {
            select: {
              name: true,
              address: true,
            },
          },
        },
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.order.count({ where }),
    ]);

    return NextResponse.json({
      orders,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST - Create order
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      locationId,
      orderType,
      deliveryAddressId,
      deliveryAddress,
      deliveryCity,
      deliveryState,
      deliveryZip,
      deliveryInstructions,
      pickupTime,
      pickupInstructions,
      scheduledDate,
      scheduledTime,
      partySize,
      seatingPreference,
      paymentMethod,
      tipAmount,
    } = body;

    if (!userId || !locationId || !orderType || !paymentMethod) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get cart items
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: {
        items: {
          include: {
            menuItem: true,
            selectedCustomizations: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    // Get location details
    const location = await prisma.restaurantLocation.findUnique({
      where: { id: locationId },
    });

    if (!location) {
      return NextResponse.json(
        { error: "Location not found" },
        { status: 404 }
      );
    }

    // Calculate totals
    const subtotal = cart.items.reduce((sum, item) => {
      const customizationsTotal = item.selectedCustomizations.reduce(
        (s, c) => s + c.priceModifier,
        0
      );
      return sum + (item.unitPrice + customizationsTotal) * item.quantity;
    }, 0);

    const deliveryFee = orderType === "DELIVERY" ? location.deliveryFee : 0;
    const tax = Math.round(subtotal * (location.taxRate / 100));
    const total = subtotal + deliveryFee + tax + (tipAmount || 0);

    // Generate order number
    const orderCount = await prisma.order.count();
    const orderNumber = `FB-${String(orderCount + 1001).padStart(5, "0")}`;

    // Create order
    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId,
        locationId,
        orderType,
        subtotal,
        deliveryFee,
        tax,
        tipAmount: tipAmount || 0,
        total,
        deliveryAddressId,
        deliveryAddress,
        deliveryCity,
        deliveryState,
        deliveryZip,
        deliveryInstructions,
        pickupTime: pickupTime ? new Date(pickupTime) : null,
        pickupInstructions,
        scheduledDate: scheduledDate ? new Date(scheduledDate) : null,
        scheduledTime,
        partySize,
        seatingPreference,
        paymentMethod,
        items: {
          create: cart.items.map((item) => ({
            menuItemId: item.menuItemId,
            name: item.menuItem.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
            specialInstructions: item.specialInstructions,
            selectedCustomizations: {
              create: item.selectedCustomizations.map((c) => ({
                customizationOptionId: c.customizationOptionId,
                name: c.customizationOptionId, // Will be populated with actual name
                priceModifier: c.priceModifier,
              })),
            },
          })),
        },
        statusHistory: {
          create: {
            status: "PLACED",
            note: "Order placed successfully",
          },
        },
      },
      include: {
        items: true,
        statusHistory: true,
      },
    });

    // Clear cart
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
