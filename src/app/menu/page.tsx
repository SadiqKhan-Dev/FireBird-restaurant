import { CustomerLayout } from "@/components/layout";
import { MenuGrid } from "@/components/menu/menu-grid";
import { CategoryNav } from "@/components/menu/category-nav";

const categories = [
  { id: "1", name: "All", slug: "all" },
  { id: "2", name: "Chicken", slug: "chicken" },
  { id: "3", name: "Burgers & Sandwiches", slug: "burgers-sandwiches" },
  { id: "4", name: "Combo Meals", slug: "combo-meals" },
  { id: "5", name: "Sides", slug: "sides" },
  { id: "6", name: "Beverages", slug: "beverages" },
  { id: "7", name: "Desserts", slug: "desserts" },
  { id: "8", name: "Kids Meals", slug: "kids-meals" },
  { id: "9", name: "Family Buckets", slug: "family-buckets" },
  { id: "10", name: "Breakfast", slug: "breakfast" },
];

// Mock data - will be replaced with API call
const menuItems = [
  {
    id: "1",
    name: "Classic Fire Bird",
    slug: "classic-fire-bird",
    shortDescription: "Our signature crispy chicken sandwich with fire sauce",
    basePrice: 1299,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 650,
    spiceLevel: 2,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: false,
    category: { name: "Chicken", slug: "chicken" },
  },
  {
    id: "2",
    name: "Spicy Tenders Basket",
    slug: "spicy-tenders-basket",
    shortDescription: "Crispy spicy tenders with curly fries and dipping sauce",
    basePrice: 1499,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 820,
    spiceLevel: 3,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: false,
    category: { name: "Chicken", slug: "chicken" },
  },
  {
    id: "3",
    name: "Family Feast Bucket",
    slug: "family-feast-bucket",
    shortDescription: "8pc chicken, 2 large sides, 4 biscuits, and 4 drinks",
    basePrice: 3999,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 3200,
    spiceLevel: 0,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: false,
    category: { name: "Family Buckets", slug: "family-buckets" },
  },
  {
    id: "4",
    name: "Buffalo Wings Platter",
    slug: "buffalo-wings-platter",
    shortDescription: "12pc buffalo wings with ranch and celery sticks",
    basePrice: 1699,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 980,
    spiceLevel: 3,
    isAvailable: true,
    isFeatured: true,
    isSeasonal: false,
    category: { name: "Chicken", slug: "chicken" },
  },
  {
    id: "5",
    name: "Curly Fries",
    slug: "curly-fries",
    shortDescription: "Seasoned curly fries, crispy and golden",
    basePrice: 499,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 420,
    spiceLevel: 0,
    isAvailable: true,
    isFeatured: false,
    isSeasonal: false,
    category: { name: "Sides", slug: "sides" },
  },
  {
    id: "6",
    name: "Chocolate Milkshake",
    slug: "chocolate-milkshake",
    shortDescription: "Rich and creamy chocolate milkshake",
    basePrice: 599,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 580,
    spiceLevel: 0,
    isAvailable: true,
    isFeatured: false,
    isSeasonal: false,
    category: { name: "Beverages", slug: "beverages" },
  },
  {
    id: "7",
    name: "Apple Pie",
    slug: "apple-pie",
    shortDescription: "Warm apple pie with cinnamon",
    basePrice: 399,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 350,
    spiceLevel: 0,
    isAvailable: true,
    isFeatured: false,
    isSeasonal: false,
    category: { name: "Desserts", slug: "desserts" },
  },
  {
    id: "8",
    name: "Kids Nuggets Meal",
    slug: "kids-nuggets-meal",
    shortDescription: "4pc chicken nuggets with fries and juice box",
    basePrice: 699,
    imageUrl: "/images/placeholder-food.jpg",
    calories: 450,
    spiceLevel: 0,
    isAvailable: true,
    isFeatured: false,
    isSeasonal: false,
    category: { name: "Kids Meals", slug: "kids-meals" },
  },
];

export default function MenuPage() {
  return (
    <CustomerLayout>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Our Menu
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Explore our full range of delicious options
          </p>
        </div>

        {/* Category Navigation */}
        <CategoryNav categories={categories} activeCategory="all" />

        {/* Menu Grid */}
        <div className="mt-8">
          <MenuGrid items={menuItems} />
        </div>
      </div>
    </CustomerLayout>
  );
}
