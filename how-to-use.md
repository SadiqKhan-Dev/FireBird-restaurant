# 🍗 FireBird Chicken - Complete User Guide

> A comprehensive guide to using and developing the FireBird Chicken ordering platform.

---

## 📑 Table of Contents

1. [Quick Start](#quick-start)
2. [For Customers](#for-customers)
3. [For Administrators](#for-administrators)
4. [For Developers](#for-developers)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### First Time Setup

```bash
# 1. Install dependencies
npm install

# 2. Set up database (requires PostgreSQL running)
npx prisma migrate dev

# 3. Seed sample data
npx tsx prisma/seed.ts

# 4. Start dev server
npm run dev
```

### Access Points

| URL | Description |
|-----|-------------|
| `http://localhost:3000` | Customer-facing website |
| `http://localhost:3000/login` | Sign in page |
| `http://localhost:3000/register` | Create account |
| `http://localhost:3000/admin/dashboard` | Admin panel |

---

## 👤 For Customers

### Creating an Account

1. Navigate to `/register`
2. Enter email, password, and name
3. Or sign up with Google/GitHub
4. Verify email if required
5. Complete profile setup

### Browsing the Menu

1. Click **"Menu"** in navigation
2. Browse by category (Chicken, Sides, Drinks, etc.)
3. Use filters for dietary preferences
4. Search for specific items

### Customizing Your Order

1. Select a menu item
2. Choose size (Regular, Large, Family)
3. Select spice level (Mild, Medium, Hot, Inferno)
4. Add sauces and toppings
5. Remove unwanted ingredients
6. Add cooking notes if needed
7. Set quantity
8. Click **"Add to Cart"**

### Managing Your Cart

1. Click cart icon in header
2. Review items and quantities
3. Update quantities or remove items
4. Apply promo code if available
5. Click **"Proceed to Checkout"**

### Checkout Process

#### Step 1: Delivery Method
- **Delivery** - Enter delivery address
- **Pickup** - Select restaurant location
- **Dine-in** - Choose table preference

#### Step 2: Delivery Address
- Select saved address
- Or enter new address
- Use current location

#### Step 3: Payment
- Credit/Debit Card (Stripe)
- PayPal
- Apple Pay
- Google Pay
- Cash on Delivery
- Gift Card

#### Step 4: Review & Place Order
- Review order summary
- Check delivery time
- Confirm total
- Click **"Place Order"**

### Tracking Your Order

1. Go to **Account > Orders**
2. Click on order number
3. View real-time status:
   - ✅ Order Confirmed
   - 👨‍🍳 Preparing
   - 🚚 Out for Delivery
   - 📦 Delivered
4. View delivery driver location (if delivery)

### Using Rewards

1. Go to **Account > Rewards**
2. View current points balance
3. See tier status (Bronze → Gold → Diamond)
4. Redeem points for discounts
5. Track cashback earnings

### Managing Favorites

1. Browse menu items
2. Click heart icon to favorite
3. Access favorites in **Account > Favorites**
4. Quick reorder from favorites

### Writing Reviews

1. Go to **Account > Orders**
2. Click completed order
3. Click **"Write Review"**
4. Rate item (1-5 stars)
5. Add written feedback
6. Upload photos (optional)
7. Submit review

---

## 🛡️ For Administrators

### Logging In

1. Navigate to `/admin/dashboard`
2. Sign in with admin credentials
3. Access denied if not admin role

### Dashboard Overview

- **Today's Sales** - Revenue, orders, average order value
- **Revenue Chart** - Daily/weekly/monthly trends
- **Recent Orders** - Latest incoming orders
- **Top Items** - Best selling products
- **Inventory Alerts** - Low stock warnings

### Managing Orders

#### View Orders
1. Go to **Admin > Orders**
2. Filter by status, date, location
3. Search by order number or customer

#### Update Order Status
1. Click on order
2. Update status:
   - New → Preparing → Ready → Picked Up
   - New → Preparing → Ready → Delivered
3. Add internal notes
4. Notify customer of update

#### Handle Refunds
1. Open order details
2. Click **"Issue Refund"**
3. Select refund amount
4. Confirm refund

### Menu Management

#### Add New Item
1. Go to **Admin > Menu**
2. Click **"Add Item"**
3. Fill details:
   - Name & description
   - Category
   - Base price
   - Image URL
   - Nutrition info
4. Add variants (sizes)
5. Add customizations
6. Set availability
7. Save

#### Edit Item
1. Find item in list
2. Click **"Edit"**
3. Update fields
4. Save changes

#### Delete Item
1. Find item
2. Click **"Delete"**
3. Confirm deletion

### Customer Management

1. Go to **Admin > Customers**
2. View customer list
3. Click customer to see:
   - Profile info
   - Order history
   - Total spend
   - Rewards status
4. Export customer data

### Inventory Management

1. View inventory alerts on dashboard
2. Track stock levels
3. Set low-stock thresholds
4. Receive notifications

---

## 💻 For Developers

### Architecture

```
Client (React 19)
    ↓
Next.js 16 App Router
    ↓
API Routes (Server Actions)
    ↓
Prisma 5 ORM
    ↓
PostgreSQL Database
```

### Key Files

| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout with providers |
| `src/middleware.ts` | Auth middleware |
| `src/lib/prisma.ts` | Database client |
| `src/lib/stripe.ts` | Stripe client |
| `prisma/schema.prisma` | Database schema |

### Adding a New Page

1. Create route group if needed
2. Create `page.tsx` in appropriate folder
3. Add to navigation in `Header`
4. Add to footer links if public

### Adding a New API Route

```typescript
// src/app/api/your-route/route.ts
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  // Your logic here
  
  return NextResponse.json({ data: "result" });
}
```

### Adding a New Admin Page

1. Create in `src/app/(admin)/admin/your-page/page.tsx`
2. Use `AdminLayout` wrapper
3. Add navigation item
4. Protect with auth check

### Database Changes

1. Update `prisma/schema.prisma`
2. Run migration:
   ```bash
   npx prisma migrate dev --name description
   ```
3. Update seed script if needed
4. Regenerate client: `npx prisma generate`

### Styling with Tailwind

```tsx
// Use design tokens
<div className="bg-primary text-primary-foreground">
  Styled content
</div>

// Use shadcn/ui components
import { Button } from "@/components/ui/button";
<Button variant="outline">Click me</Button>
```

### Adding Animations

```tsx
import { motion } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Animated content
</motion.div>
```

### Environment Variables

Add new variables to:
1. `.env` (local development)
2. `.env.example` (documentation)
3. Vercel dashboard (production)

### Testing

```bash
# Run build
npm run build

# Run lint
npm run lint

# Type check
npx tsc --noEmit
```

---

## 🔧 Troubleshooting

### Common Issues

#### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
npm install
npm run build
```

#### Database Connection Error
1. Check PostgreSQL is running
2. Verify `DATABASE_URL` in `.env`
3. Run `npx prisma migrate dev`

#### Clerk Auth Not Working
1. Verify Clerk keys in `.env`
2. Check Clerk dashboard for app status
3. Ensure redirect URLs are correct

#### Stripe Payments Fail
1. Use test card: `4242 4242 4242 4242`
2. Check Stripe dashboard for errors
3. Verify webhook endpoint

#### Images Not Loading
1. Check network connection
2. Verify Unsplash URLs
3. Check browser console for errors

#### TypeScript Errors
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache
npx tsc --noEmit
```

#### Prisma Client Not Found
```bash
npx prisma generate
```

### Performance Tips

1. **Images**: Use optimized URLs with width/quality params
2. **Bundle**: Use dynamic imports for heavy components
3. **Caching**: Leverage Next.js cache for API routes
4. **Database**: Add indexes for frequently queried fields

### Debug Mode

```bash
# Enable Prisma debug logging
DATABASE_URL="postgresql://...?logging=true"

# Next.js debug
NODE_ENV=development npm run dev
```

---

## 📚 Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Prisma](https://www.prisma.io/docs)
- [Clerk](https://clerk.com/docs)
- [Stripe](https://stripe.com/docs)

---

## 🆘 Getting Help

1. Check this guide
2. Search existing issues
3. Create new issue with:
   - Description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable

---

## 📝 License

MIT License - See LICENSE file for details.
