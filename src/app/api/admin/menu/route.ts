// @ts-nocheck
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// GET - Fetch all menu items (admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const available = searchParams.get("available");
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");

    const where: any = {};

    if (category && category !== "all") {
      where.category = { slug: category };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    if (available !== null && available !== undefined) {
      where.isAvailable = available === "true";
    }

    const [items, total] = await Promise.all([
      prisma.menuItem.findMany({
        where,
        include: {
          category: {
            select: { id: true, name: true, slug: true },
          },
          _count: {
            select: { orderItems: true },
          },
        },
        orderBy: { sortOrder: "asc" },
        take: limit,
        skip: offset,
      }),
      prisma.menuItem.count({ where }),
    ]);

    return NextResponse.json({
      items,
      total,
      limit,
      offset,
      hasMore: offset + limit < total,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      { error: "Failed to fetch menu items" },
      { status: 500 }
    );
  }
}

// POST - Create menu item
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDescription,
      basePrice,
      categoryId,
      imageUrl,
      thumbnailUrl,
      calories,
      allergens,
      isAvailable,
      isFeatured,
      isSeasonal,
      preparationTime,
      spiceLevel,
      tags,
    } = body;

    // Check if slug already exists
    const existing = await prisma.menuItem.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A menu item with this slug already exists" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        basePrice,
        categoryId,
        imageUrl,
        thumbnailUrl,
        calories,
        allergens: allergens || [],
        isAvailable: isAvailable ?? true,
        isFeatured: isFeatured ?? false,
        isSeasonal: isSeasonal ?? false,
        preparationTime,
        spiceLevel: spiceLevel ?? 0,
        tags: tags || [],
      },
      include: {
        category: true,
      },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      { error: "Failed to create menu item" },
      { status: 500 }
    );
  }
}

// PUT - Update menu item
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID required" },
        { status: 400 }
      );
    }

    const item = await prisma.menuItem.update({
      where: { id },
      data,
      include: {
        category: true,
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { error: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

// DELETE - Delete menu item
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Menu item ID required" },
        { status: 400 }
      );
    }

    await prisma.menuItem.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
