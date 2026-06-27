// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch cart
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const sessionId = searchParams.get("sessionId");

    if (!userId && !sessionId) {
      return NextResponse.json(
        { error: "userId or sessionId required" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId },
      include: {
        items: {
          include: {
            menuItem: true,
            selectedCustomizations: {
              include: {
                customizationOption: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [], total: 0 });
    }

    // Calculate total
    const total = cart.items.reduce((sum: number, item: { unitPrice: number; quantity: number; selectedCustomizations: { priceModifier: number }[] }) => {
      const customizationsTotal = item.selectedCustomizations.reduce(
        (s: number, c: { priceModifier: number }) => s + c.priceModifier,
        0
      );
      return sum + (item.unitPrice + customizationsTotal) * item.quantity;
    }, 0);

    return NextResponse.json({
      id: cart.id,
      items: cart.items,
      total,
      itemCount: cart.items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

// POST - Add item to cart
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, sessionId, menuItemId, quantity, selectedCustomizations, specialInstructions } = body;

    if (!menuItemId || !quantity) {
      return NextResponse.json(
        { error: "menuItemId and quantity required" },
        { status: 400 }
      );
    }

    // Get menu item price
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: menuItemId },
    });

    if (!menuItem) {
      return NextResponse.json(
        { error: "Menu item not found" },
        { status: 404 }
      );
    }

    // Find or create cart
    let cart = await prisma.cart.findFirst({
      where: userId ? { userId } : { sessionId },
    });

    if (!cart) {
      cart = await prisma.cart.create({
        data: userId ? { userId } : { sessionId },
      });
    }

    // Create cart item
    const cartItem = await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        menuItemId,
        quantity,
        unitPrice: menuItem.basePrice,
        specialInstructions,
        selectedCustomizations: {
          create: selectedCustomizations?.map((c: any) => ({
            customizationOptionId: c.customizationOptionId,
            priceModifier: c.priceModifier,
          })) || [],
        },
      },
      include: {
        menuItem: true,
        selectedCustomizations: {
          include: {
            customizationOption: true,
          },
        },
      },
    });

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    console.error("Error adding to cart:", error);
    return NextResponse.json(
      { error: "Failed to add to cart" },
      { status: 500 }
    );
  }
}

// PUT - Update cart item quantity
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { cartItemId, quantity } = body;

    if (!cartItemId || quantity === undefined) {
      return NextResponse.json(
        { error: "cartItemId and quantity required" },
        { status: 400 }
      );
    }

    if (quantity <= 0) {
      // Delete item if quantity is 0
      await prisma.cartItem.delete({
        where: { id: cartItemId },
      });
      return NextResponse.json({ success: true });
    }

    const cartItem = await prisma.cartItem.update({
      where: { id: cartItemId },
      data: { quantity },
    });

    return NextResponse.json(cartItem);
  } catch (error) {
    console.error("Error updating cart:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}

// DELETE - Remove item from cart
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartItemId = searchParams.get("cartItemId");

    if (!cartItemId) {
      return NextResponse.json(
        { error: "cartItemId required" },
        { status: 400 }
      );
    }

    await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error removing from cart:", error);
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 }
    );
  }
}
