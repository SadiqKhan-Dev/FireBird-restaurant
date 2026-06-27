# FireBird Chicken

![FireBird Chicken](https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=1200&q=80)

## 🔥 Premium Fast-Food Ordering Platform

A full-stack restaurant ordering platform built with Next.js 16, React 19, Tailwind CSS v4, shadcn/ui, Prisma, PostgreSQL, Clerk, and Stripe.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Available Scripts](#available-scripts)
- [API Routes](#api-routes)
- [Admin Dashboard](#admin-dashboard)
- [Deployment](#deployment)

---

## ✨ Features

### Customer Features
- 🔐 **Authentication** - Clerk-powered sign-up/login with email, Google, GitHub
- 🍗 **Full Menu** - Browse menu with categories, filters, and search
- 🎨 **Deep Customization** - Spice levels, sauces, toppings, removals, sizes, cooking preferences
- 🛒 **Shopping Cart** - Persistent cart with real-time updates
- 💳 **Multiple Payment Methods** - Stripe, PayPal, Apple Pay, Google Pay, Cash on Delivery, Gift Cards
- 📍 **Multi-Location** - Order from nearest restaurant with GPS detection
- 🎁 **Rewards Program** - Points loyalty, cashback, referrals, gift cards, coupons
- 📦 **Order Tracking** - Live status updates with ETA
- ❤️ **Favorites** - Save and reorder favorite meals
- ⭐ **Reviews** - Rate and review menu items with photos
- 🎫 **Gift Cards** - Purchase and redeem digital gift cards

### Admin Features
- 📊 **Dashboard** - Real-time sales analytics and KPIs
- 📋 **Order Management** - View, update, and track all orders
- 🍽️ **Menu Management** - CRUD operations for menu items
- 👥 **Customer Management** - View customer profiles and order history
- 🚚 **Delivery Management** - Assign drivers and track deliveries
- 📈 **Reports** - Sales reports, inventory reports, customer analytics

### Technical Features
- ⚡ **Next.js 16** - App Router with React Server Components
- 🎨 **Tailwind CSS v4** - Utility-first styling with design tokens
- 🧩 **shadcn/ui v4** - Accessible component library
- 🗄️ **Prisma 5** - Type-safe database ORM
- 🔒 **Clerk** - Production-ready authentication
- 💰 **Stripe** - Secure payment processing
- 📱 **Responsive** - Mobile-first design
- ♿ **Accessible** - WCAG 2.2 AA compliant
- 🎭 **Animated** - Smooth transitions with Framer Motion

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui v4 (Base UI) |
| Database | PostgreSQL |
| ORM | Prisma 5 |
| Auth | Clerk |
| Payments | Stripe, PayPal, Apple Pay, Google Pay |
| Animations | Framer Motion |
| Icons | Lucide React |
| Language | TypeScript |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (recommended: 20)
- npm, yarn, or pnpm
- PostgreSQL database (local or cloud)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/firebird-chicken.git

# Navigate to project
cd firebird-chicken

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your keys

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Seed the database
npx tsx prisma/seed.ts

# Start development server
npm run dev
```

### Access the Application

- **Customer App**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Login**: http://localhost:3000/login

---

## 📁 Project Structure

```
firebird-chicken/
├── prisma/
│   ├── schema.prisma          # Database schema (25+ models)
│   └── seed.ts                # Seed script
├── src/
│   ├── app/
│   │   ├── (auth)/            # Auth route group
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (customer)/        # Customer route group
│   │   │   └── account/       # Profile, orders, addresses, etc.
│   │   ├── (marketing)/       # Public pages
│   │   │   ├── about/
│   │   │   ├── catering/
│   │   │   ├── deals/
│   │   │   ├── faqs/
│   │   │   ├── help/
│   │   │   ├── locations/
│   │   │   └── rewards/
│   │   ├── admin/             # Admin dashboard
│   │   │   ├── dashboard/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   └── customers/
│   │   ├── api/               # API routes
│   │   │   ├── admin/
│   │   │   ├── cart/
│   │   │   ├── menu/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   └── webhooks/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── menu/
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── home/              # Homepage sections
│   │   ├── layout/            # Header, Footer, Nav
│   │   └── ui/                # shadcn/ui components
│   ├── lib/
│   │   ├── prisma.ts          # Prisma client
│   │   └── stripe.ts          # Stripe client
│   └── middleware.ts          # Clerk middleware
├── public/                    # Static assets
├── .env                       # Environment variables
├── components.json            # shadcn/ui config
├── next.config.ts             # Next.js config
├── tailwind.config.ts         # Tailwind config
└── package.json
```

---

## 🔐 Environment Variables

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/firebird"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/login"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/register"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

# Stripe Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

---

## 🗄️ Database

### Models (25+)

- **Users** - Clerk-synced user profiles
- **Restaurants** - Multi-location support
- **Menu Categories** - Food categories
- **Menu Items** - Products with variants
- **Item Variants** - Size/price options
- **Item Customizations** - Add-ons and modifiers
- **Orders** - Order management
- **Order Items** - Line items
- **Payments** - Transaction records
- **Cart** - Persistent shopping cart
- **Reviews** - Customer feedback
- **Rewards** - Loyalty points
- **Addresses** - Saved locations
- **Inventory** - Stock management

### Run Migrations

```bash
# Create migration
npx prisma migrate dev --name init

# Apply migrations
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Seed database
npx tsx prisma/seed.ts
```

---

## 📡 API Routes

### Public Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/menu` | Get all menu items |
| GET | `/api/menu/[id]` | Get single item |
| GET | `/api/categories` | Get categories |
| GET | `/api/locations` | Get restaurant locations |

### Protected Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart` | Update cart |
| DELETE | `/api/cart` | Clear cart |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get user orders |
| POST | `/api/payments` | Process payment |

### Admin Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/orders` | All orders |
| PUT | `/api/admin/orders` | Update order |
| GET | `/api/admin/menu` | Menu management |
| POST | `/api/admin/menu` | Create item |
| PUT | `/api/admin/menu` | Update item |
| DELETE | `/api/admin/menu` | Delete item |
| GET | `/api/admin/customers` | Customer list |

### Webhooks
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/webhooks/stripe` | Stripe events |

---

## 📊 Admin Dashboard

Access at `/admin/dashboard` after logging in.

### Pages
- **Dashboard** - Sales overview, recent orders, top items
- **Orders** - Manage all orders with filters
- **Menu** - CRUD for menu items
- **Customers** - View customer profiles
- **Settings** - Restaurant configuration

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build
npm run build

# Start
npm start
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Clerk](https://clerk.com/)
- [Stripe](https://stripe.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
