import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: "Chicken",
        slug: "chicken",
        description: "Signature chicken pieces, tenders, and wings",
        imageUrl: "/images/category-chicken.jpg",
        sortOrder: 1,
      },
    }),
    prisma.category.create({
      data: {
        name: "Burgers & Sandwiches",
        slug: "burgers-sandwiches",
        description: "Chicken burgers, wraps, and sandwiches",
        imageUrl: "/images/category-burgers.jpg",
        sortOrder: 2,
      },
    }),
    prisma.category.create({
      data: {
        name: "Combo Meals",
        slug: "combo-meals",
        description: "Complete meals with entree, side, and drink",
        imageUrl: "/images/category-combos.jpg",
        sortOrder: 3,
      },
    }),
    prisma.category.create({
      data: {
        name: "Sides",
        slug: "sides",
        description: "Fries, coleslaw, corn, biscuits, and more",
        imageUrl: "/images/category-sides.jpg",
        sortOrder: 4,
      },
    }),
    prisma.category.create({
      data: {
        name: "Beverages",
        slug: "beverages",
        description: "Soft drinks, shakes, juices, and more",
        imageUrl: "/images/category-beverages.jpg",
        sortOrder: 5,
      },
    }),
    prisma.category.create({
      data: {
        name: "Desserts",
        slug: "desserts",
        description: "Pies, cookies, sundaes, and sweet treats",
        imageUrl: "/images/category-desserts.jpg",
        sortOrder: 6,
      },
    }),
    prisma.category.create({
      data: {
        name: "Kids Meals",
        slug: "kids-meals",
        description: "Kid-friendly portions and favorites",
        imageUrl: "/images/category-kids.jpg",
        sortOrder: 7,
      },
    }),
    prisma.category.create({
      data: {
        name: "Family Buckets",
        slug: "family-buckets",
        description: "Group meals for 4-6 people",
        imageUrl: "/images/category-family.jpg",
        sortOrder: 8,
      },
    }),
  ]);

  console.log(`Created ${categories.length} categories`);

  // Create menu items
  const menuItems = await Promise.all([
    // Chicken items
    prisma.menuItem.create({
      data: {
        name: "Classic Fire Bird",
        slug: "classic-fire-bird",
        description:
          "Our signature crispy chicken sandwich, hand-breaded and fried to golden perfection. Topped with our exclusive Fire Bird sauce, crisp lettuce, and juicy tomato, all on a toasted brioche bun.",
        shortDescription: "Crispy chicken sandwich with fire sauce",
        basePrice: 1299,
        categoryId: categories[0].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 650,
        allergens: ["gluten", "dairy", "eggs"],
        spiceLevel: 2,
        preparationTime: 12,
        isFeatured: true,
        tags: ["popular", "signature"],
      },
    }),
    prisma.menuItem.create({
      data: {
        name: "Spicy Tenders Basket",
        slug: "spicy-tenders-basket",
        description:
          "Crispy spicy chicken tenders served with curly fries and your choice of dipping sauce.",
        shortDescription: "Spicy tenders with curly fries",
        basePrice: 1499,
        categoryId: categories[0].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 820,
        allergens: ["gluten", "dairy"],
        spiceLevel: 3,
        preparationTime: 15,
        isFeatured: true,
        tags: ["spicy", "popular"],
      },
    }),
    prisma.menuItem.create({
      data: {
        name: "Buffalo Wings Platter",
        slug: "buffalo-wings-platter",
        description:
          "12pc buffalo wings tossed in our signature buffalo sauce, served with ranch dressing and celery sticks.",
        shortDescription: "12pc buffalo wings with ranch",
        basePrice: 1699,
        categoryId: categories[0].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 980,
        allergens: ["dairy"],
        spiceLevel: 3,
        preparationTime: 18,
        isFeatured: true,
        tags: ["spicy", "sharing"],
      },
    }),
    // Sides
    prisma.menuItem.create({
      data: {
        name: "Curly Fries",
        slug: "curly-fries",
        description:
          "Seasoned curly fries, crispy and golden brown. A perfect side for any meal.",
        shortDescription: "Seasoned crispy curly fries",
        basePrice: 499,
        categoryId: categories[3].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 420,
        allergens: [],
        spiceLevel: 0,
        preparationTime: 8,
        tags: ["side", "popular"],
      },
    }),
    prisma.menuItem.create({
      data: {
        name: "Mac & Cheese",
        slug: "mac-and-cheese",
        description:
          "Creamy, cheesy macaroni and cheese made with real cheddar.",
        shortDescription: "Creamy cheddar mac & cheese",
        basePrice: 449,
        categoryId: categories[3].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 380,
        allergens: ["dairy", "gluten"],
        spiceLevel: 0,
        preparationTime: 10,
        tags: ["side", "comfort"],
      },
    }),
    // Beverages
    prisma.menuItem.create({
      data: {
        name: "Chocolate Milkshake",
        slug: "chocolate-milkshake",
        description:
          "Rich and creamy chocolate milkshake made with real ice cream.",
        shortDescription: "Rich chocolate milkshake",
        basePrice: 599,
        categoryId: categories[4].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 580,
        allergens: ["dairy"],
        spiceLevel: 0,
        preparationTime: 5,
        tags: ["drink", "sweet"],
      },
    }),
    // Desserts
    prisma.menuItem.create({
      data: {
        name: "Apple Pie",
        slug: "apple-pie",
        description:
          "Warm apple pie with cinnamon and a flaky crust. Served with vanilla ice cream.",
        shortDescription: "Warm apple pie with cinnamon",
        basePrice: 399,
        categoryId: categories[5].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 350,
        allergens: ["gluten", "dairy"],
        spiceLevel: 0,
        preparationTime: 8,
        tags: ["dessert", "warm"],
      },
    }),
    // Kids Meals
    prisma.menuItem.create({
      data: {
        name: "Kids Nuggets Meal",
        slug: "kids-nuggets-meal",
        description:
          "4pc chicken nuggets with fries and a juice box. Perfect for little ones.",
        shortDescription: "4pc nuggets with fries and juice",
        basePrice: 699,
        categoryId: categories[6].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 450,
        allergens: ["gluten"],
        spiceLevel: 0,
        preparationTime: 10,
        tags: ["kids", "popular"],
      },
    }),
    // Family Buckets
    prisma.menuItem.create({
      data: {
        name: "Family Feast Bucket",
        slug: "family-feast-bucket",
        description:
          "8pc chicken, 2 large sides, 4 biscuits, and 4 drinks. Feeds 4-6 people.",
        shortDescription: "8pc chicken with sides and drinks",
        basePrice: 3999,
        categoryId: categories[7].id,
        imageUrl: "/images/placeholder-food.jpg",
        calories: 3200,
        allergens: ["gluten", "dairy"],
        spiceLevel: 0,
        preparationTime: 25,
        isFeatured: true,
        tags: ["family", "sharing", "value"],
      },
    }),
  ]);

  console.log(`Created ${menuItems.length} menu items`);

  // Create customizations for Classic Fire Bird
  const classicFireBird = menuItems[0];

  const spiceCustomization = await prisma.itemCustomization.create({
    data: {
      menuItemId: classicFireBird.id,
      name: "Spice Level",
      type: "single",
      isRequired: false,
      sortOrder: 1,
    },
  });

  await prisma.customizationOption.createMany({
    data: [
      { itemCustomizationId: spiceCustomization.id, name: "Mild", sortOrder: 1 },
      { itemCustomizationId: spiceCustomization.id, name: "Medium", isDefault: true, sortOrder: 2 },
      { itemCustomizationId: spiceCustomization.id, name: "Hot", sortOrder: 3 },
      { itemCustomizationId: spiceCustomization.id, name: "Extra Hot", sortOrder: 4 },
    ],
  });

  const sauceCustomization = await prisma.itemCustomization.create({
    data: {
      menuItemId: classicFireBird.id,
      name: "Sauce",
      type: "single",
      isRequired: false,
      sortOrder: 2,
    },
  });

  await prisma.customizationOption.createMany({
    data: [
      { itemCustomizationId: sauceCustomization.id, name: "Fire Bird Sauce", isDefault: true, sortOrder: 1 },
      { itemCustomizationId: sauceCustomization.id, name: "BBQ", sortOrder: 2 },
      { itemCustomizationId: sauceCustomization.id, name: "Ranch", sortOrder: 3 },
      { itemCustomizationId: sauceCustomization.id, name: "Buffalo", priceModifier: 50, sortOrder: 4 },
      { itemCustomizationId: sauceCustomization.id, name: "Honey Mustard", sortOrder: 5 },
    ],
  });

  const sizeCustomization = await prisma.itemCustomization.create({
    data: {
      menuItemId: classicFireBird.id,
      name: "Meal Size",
      type: "single",
      isRequired: true,
      sortOrder: 3,
    },
  });

  await prisma.customizationOption.createMany({
    data: [
      { itemCustomizationId: sizeCustomization.id, name: "Regular", isDefault: true, sortOrder: 1 },
      { itemCustomizationId: sizeCustomization.id, name: "Large", priceModifier: 200, sortOrder: 2 },
      { itemCustomizationId: sizeCustomization.id, name: "Family", priceModifier: 500, sortOrder: 3 },
    ],
  });

  const toppingsCustomization = await prisma.itemCustomization.create({
    data: {
      menuItemId: classicFireBird.id,
      name: "Extra Toppings",
      type: "multiple",
      isRequired: false,
      maxSelections: 4,
      sortOrder: 4,
    },
  });

  await prisma.customizationOption.createMany({
    data: [
      { itemCustomizationId: toppingsCustomization.id, name: "Extra Cheese", priceModifier: 75, sortOrder: 1 },
      { itemCustomizationId: toppingsCustomization.id, name: "Bacon", priceModifier: 125, sortOrder: 2 },
      { itemCustomizationId: toppingsCustomization.id, name: "Jalapeños", priceModifier: 50, sortOrder: 3 },
      { itemCustomizationId: toppingsCustomization.id, name: "Pickles", sortOrder: 4 },
      { itemCustomizationId: toppingsCustomization.id, name: "Onions", sortOrder: 5 },
    ],
  });

  console.log("Created customizations for Classic Fire Bird");

  // Create a restaurant location
  const location = await prisma.restaurantLocation.create({
    data: {
      name: "FireBird Downtown",
      slug: "downtown",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      latitude: 40.7128,
      longitude: -74.006,
      phone: "(212) 555-0123",
      email: "downtown@firebirdchicken.com",
      taxRate: 8.875,
      deliveryFee: 499,
      minimumOrder: 1500,
      deliveryRadius: 5.0,
      preparationTime: 15,
    },
  });

  console.log(`Created location: ${location.name}`);

  // Create operating hours
  const operatingHours = [];
  for (let day = 0; day < 7; day++) {
    operatingHours.push({
      locationId: location.id,
      dayOfWeek: day,
      openTime: day === 0 ? "10:00" : "09:00", // Sunday opens later
      closeTime: day === 5 || day === 6 ? "23:00" : "22:00", // Weekend closes later
      isClosed: false,
    });
  }

  await prisma.operatingHour.createMany({
    data: operatingHours,
  });

  console.log("Created operating hours");

  // Create delivery zones
  await prisma.deliveryZone.createMany({
    data: [
      { locationId: location.id, zipCode: "10001", deliveryFee: 0, estimatedTime: 30 },
      { locationId: location.id, zipCode: "10002", deliveryFee: 0, estimatedTime: 35 },
      { locationId: location.id, zipCode: "10003", deliveryFee: 100, estimatedTime: 40 },
      { locationId: location.id, zipCode: "10004", deliveryFee: 100, estimatedTime: 40 },
      { locationId: location.id, zipCode: "10005", deliveryFee: 200, estimatedTime: 45 },
    ],
  });

  console.log("Created delivery zones");

  // Create inventory for all menu items
  for (const item of menuItems) {
    await prisma.inventory.create({
      data: {
        locationId: location.id,
        menuItemId: item.id,
        quantity: 100,
        lowStockThreshold: 20,
      },
    });
  }

  console.log("Created inventory");

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
