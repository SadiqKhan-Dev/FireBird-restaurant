# FireBird Chicken - Information Architecture

## 1. Site Map

```
firebird-chicken.com/
├── / (Homepage)
├── /menu
│   ├── /menu/[category]
│   └── /menu/[category]/[item]
├── /deals
├── /order
│   ├── /cart
│   ├── /checkout
│   └── /checkout/success
├── /auth
│   ├── /login
│   ├── /register
│   ├── /forgot-password
│   └── /reset-password
├── /account
│   ├── /profile
│   ├── /addresses
│   ├── /payment-methods
│   ├── /orders
│   ├── /orders/[orderId]
│   ├── /favorites
│   ├── /rewards
│   ├── /gift-cards
│   ├── /coupons
│   ├── /notifications
│   └── /settings
├── /locations
├── /contact
├── /about
├── /careers
├── /franchise
├── /blog
│   └── /blog/[slug]
├── /faq
├── /privacy
├── /terms
├── /admin
│   ├── /admin/dashboard
│   ├── /admin/orders
│   ├── /admin/orders/[orderId]
│   ├── /admin/menu
│   ├── /admin/menu/[itemId]
│   ├── /admin/menu/new
│   ├── /admin/categories
│   ├── /admin/inventory
│   ├── /admin/locations
│   ├── /admin/locations/[locationId]
│   ├── /admin/customers
│   ├── /admin/customers/[customerId]
│   ├── /admin/marketing
│   │   ├── /admin/marketing/coupons
│   │   ├── /admin/marketing/flash-sales
│   │   ├── /admin/marketing/banners
│   │   └── /admin/marketing/campaigns
│   ├── /admin/cms
│   │   ├── /admin/cms/pages
│   │   ├── /admin/cms/blog
│   │   └── /admin/cms/media
│   ├── /admin/reviews
│   ├── /admin/analytics
│   ├── /admin/reports
│   ├── /admin/staff
│   └── /admin/settings
├── /kitchen
│   └── /kitchen/kds
├── /driver
│   ├── /driver/dashboard
│   ├── /driver/active
│   └── /driver/history
├── /track/[orderId]
└── /api/
    ├── /api/menu
    ├── /api/cart
    ├── /api/orders
    ├── /api/payments
    ├── /api/webhooks
    ├── /api/rewards
    ├── /api/reviews
    ├── /api/locations
    ├── /api/search
    └── /api/admin
```

---

## 2. Navigation Structure

### 2.1 Primary Navigation (Header)
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo]   Menu   Deals   Locations   [Search Icon]   [Account]   [Cart] │
└─────────────────────────────────────────────────────────────────────────┘
```

**Desktop:**
- Logo (left) - links to homepage
- Menu link
- Deals link
- Locations link
- Search icon (expands to search bar)
- User account icon (dropdown when logged in)
- Cart icon with badge count

**Mobile:**
- Logo (left)
- Search icon
- Cart icon with badge
- Hamburger menu (drawer navigation)

### 2.2 Mobile Navigation Drawer
```
┌─────────────────────┐
│ [Close]        [Logo]│
├─────────────────────┤
│ Menu                │
│ Deals               │
│ Locations           │
│ Contact             │
├─────────────────────┤
│ My Orders           │
│ My Rewards          │
│ Favorites           │
│ Profile             │
│ Settings            │
├─────────────────────┤
│ Login / Register    │
│ (or Logout)         │
└─────────────────────┘
```

### 2.3 Footer Navigation
```
┌─────────────────────────────────────────────────────────────────────────┐
│ [Logo]                                                                 │
│                                                                         │
│ Menu          Company        Support          Legal                     │
│ - Chicken     - About        - Contact        - Privacy Policy          │
│ - Combos      - Careers      - FAQ            - Terms of Service        │
│ - Sides       - Franchise    - Locations      - Accessibility           │
│ - Drinks      - Blog         - Order Support  - Cookie Policy           │
│ - Desserts                                                     │
│                                                                         │
│ [Facebook] [Instagram] [Twitter] [TikTok]                              │
│                                                                         │
│ Download our app:  [App Store] [Google Play]                           │
│                                                                         │
│ © 2026 FireBird Chicken. All rights reserved.                          │
└─────────────────────────────────────────────────────────────────────────┘
```

### 2.4 Admin Sidebar Navigation
```
┌──────────────────────────────────────────┐
│ [Logo]   FireBird Admin                  │
├──────────────────────────────────────────┤
│ 📊 Dashboard                             │
│ 📦 Orders                                │
│ 🍗 Menu                                  │
│   - Menu Items                           │
│   - Categories                           │
│ 📦 Inventory                             │
│ 📍 Locations                             │
│ 👥 Customers                             │
│ ⭐ Reviews                               │
│ 📣 Marketing                             │
│   - Coupons                              │
│   - Flash Sales                          │
│   - Banners                              │
│   - Campaigns                            │
│ 📝 CMS                                   │
│   - Pages                                │
│   - Blog                                 │
│   - Media                                │
│ 📈 Analytics                             │
│ 📋 Reports                               │
│ 👨‍🍳 Staff                                 │
│ ⚙️ Settings                              │
├──────────────────────────────────────────┤
│ [User Avatar]                            │
│ Lisa Manager                             │
│ Restaurant Manager                       │
│ [Logout]                                 │
└──────────────────────────────────────────┘
```

### 2.5 Kitchen Display System (KDS) Navigation
```
┌─────────────────────────────────────────────────────────────────────────┐
│ 🔥 FireBird KDS    [Location: Downtown]    [Sound: ON]    [Settings]   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│ │ #1042       │ │ #1043       │ │ #1044       │ │ #1045       │       │
│ │ DELIVERY    │ │ PICKUP      │ │ DINE-IN     │ │ DELIVERY    │       │
│ │             │ │             │ │             │ │             │       │
│ │ 2x Classic  │ │ 1x Spicy    │ │ 4x Family   │ │ 1x Tenders  │       │
│ │   Burger    │ │   Tenders   │ │   Bucket    │ │   Combo     │       │
│ │   (no pick.)│ │   (hot)     │ │   (med)     │ │   (ranch)   │       │
│ │ 1x Curly    │ │ 1x Fries    │ │ 2x Fries    │ │ 1x Fries    │       │
│ │   Fries     │ │   (large)   │ │ 2x Coleslaw │ │   (large)   │       │
│ │ 1x Coke     │ │ 1x Lemonade │ │ 4x Coke     │ │ 1x Sprite   │       │
│ │             │ │             │ │             │ │             │       │
│ │ ⏱️ 8 min    │ │ ⏱️ 5 min    │ │ ⏱️ 12 min   │ │ ⏱️ 6 min    │       │
│ │ [PREPARE]   │ │ [PREPARE]   │ │ [PREPARE]   │ │ [PREPARE]   │       │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘       │
│                                                                         │
│ [NEW: 2] [PREPARING: 3] [READY: 1] [BUMPED: 12]                       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Page Hierarchy & Routing

### 3.1 Route Groups (Next.js App Router)

| Route Group | Purpose | Layout |
|-------------|---------|--------|
| `(auth)` | Authentication pages | Minimal layout, centered card |
| `(customer)` | Customer-facing pages | Full site header/footer |
| `(admin)` | Admin dashboard | Admin sidebar + header |
| `(kitchen)` | Kitchen display | Full-screen KDS layout |
| `(driver)` | Driver app | Mobile-optimized layout |
| `(marketing)` | Public marketing pages | Full site header/footer |
| `(legal)` | Legal pages | Full site header/footer, simple layout |

### 3.2 Layout Components

#### Customer Layout
```
┌─────────────────────────────────────────────┐
│ Header (Navigation)                         │
├─────────────────────────────────────────────┤
│ Location Banner (if no location selected)   │
├─────────────────────────────────────────────┤
│                                             │
│ Page Content                                │
│                                             │
├─────────────────────────────────────────────┤
│ Footer                                      │
├─────────────────────────────────────────────┤
│ Cart Slide-Over (conditional)               │
│ Toast Notifications                         │
│ Cookie Consent Banner                       │
└─────────────────────────────────────────────┘
```

#### Admin Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ Admin Header (Search, Notifications, User Menu)                 │
├──────────┬──────────────────────────────────────────────────────┤
│          │                                                      │
│ Sidebar  │  Page Content                                        │
│          │                                                      │
│          │                                                      │
│          │                                                      │
│          │                                                      │
└──────────┴──────────────────────────────────────────────────────┘
```

---

## 4. Component Architecture

### 4.1 Layout Components
| Component | Description | Used In |
|-----------|-------------|---------|
| `<SiteHeader>` | Main navigation bar | Customer pages |
| `<SiteFooter>` | Footer with links | Customer pages |
| `<MobileNav>` | Mobile drawer navigation | Customer pages |
| `<AdminSidebar>` | Admin navigation sidebar | Admin pages |
| `<AdminHeader>` | Admin top bar | Admin pages |
| `<KDSHeader>` | Kitchen display header | KDS pages |
| `<LocationBanner>` | Prompt to select location | Customer pages |
| `<CartSlideOver>` | Slide-over cart panel | Customer pages |
| `<CookieConsent>` | GDPR cookie consent | All pages |

### 4.2 Menu Components
| Component | Description |
|-----------|-------------|
| `<CategoryNav>` | Horizontal category tabs |
| `<MenuGrid>` | Grid of menu item cards |
| `<MenuItemCard>` | Individual menu item card |
| `<MenuItemDetail>` | Full product detail view |
| `<CustomizationPanel>` | Customization options panel |
| `<SpiceSelector>` | Spice level selector |
| `<SauceSelector>` | Sauce selection |
| `<ToppingSelector>` | Extra toppings multi-select |
| `<SizeSelector>` | Meal size selector |
| `<SideDrinkPicker>` | Combo side/drink picker |
| `<SpecialInstructions>` | Free-text special instructions |
| `<AllergenInfo>` | Allergen information display |

### 4.3 Cart & Checkout Components
| Component | Description |
|-----------|-------------|
| `<CartBadge>` | Cart icon with item count |
| `<CartList>` | List of cart items |
| `<CartItem>` | Individual cart item row |
| `<CartSummary>` | Price breakdown |
| `<CouponInput>` | Coupon code input |
| `<OrderTypeSelector>` | Delivery/Pickup/Dine-in/Scheduled tabs |
| `<DeliveryForm>` | Delivery address form |
| `<PickupSelector>` | Pickup location + time |
| `<DineInSelector>` | Dine-in options |
| `<ScheduledPicker>` | Date + time slot picker |
| `<PaymentSelector>` | Payment method selection |
| `<TipSelector>` | Tip amount selection |
| `<OrderReview>` | Final order summary |
| `<OrderConfirmation>` | Success page |

### 4.4 Order Components
| Component | Description |
|-----------|-------------|
| `<OrderTimeline>` | Status stepper/progress |
| `<OrderCard>` | Order summary card |
| `<OrderDetails>` | Full order details |
| `<OrderItems>` | List of items in order |
| `<TrackingMap>` | Live delivery map |
| `<DriverInfo>` | Driver details card |
| `<ETACountdown>` | Estimated time countdown |
| `<ReorderButton>` | Reorder from past order |

### 4.5 User Account Components
| Component | Description |
|-----------|-------------|
| `<ProfileForm>` | Edit profile form |
| `<AddressList>` | List of saved addresses |
| `<AddressForm>` | Add/edit address form |
| `<PaymentMethodList>` | Saved payment methods |
| `<PaymentMethodCard>` | Single payment method |
| `<OrderHistory>` | Paginated order list |
| `<FavoritesGrid>` | Saved favorite items |
| `<RewardsDashboard>` | Points, tier, history |
| `<GiftCardManager>` | Gift card purchase/balance |
| `<CouponList>` | Available coupons |
| `<NotificationCenter>` | In-app notifications |
| `<NotificationItem>` | Single notification |

### 4.6 Admin Components
| Component | Description |
|-----------|-------------|
| `<StatsCard>` | Metric card (revenue, orders, etc.) |
| `<RevenueChart>` | Revenue line chart |
| `<OrdersChart>` | Orders bar chart |
| `<TopItemsList>` | Best-selling items list |
| `<RecentOrders>` | Recent orders table |
| `<DataTable>` | Reusable data table |
| `<OrderQueue>` | Real-time order queue |
| `<MenuItemForm>` | Create/edit menu item |
| `<CategoryForm>` | Create/edit category |
| `<CouponForm>` | Create/edit coupon |
| `<BannerForm>` | Create/edit banner |
| `<FlashSaleForm>` | Create/edit flash sale |
| `<InventoryTable>` | Stock levels table |
| `<LocationForm>` | Create/edit location |
| `<StaffTable>` | Staff management table |
| `<RichTextEditor>` | CMS content editor |
| `<MediaUploader>` | Image upload component |

### 4.7 Kitchen Display Components
| Component | Description |
|-----------|-------------|
| `<KDSOrderCard>` | Large order card for kitchen |
| `<KDSOrderItem>` | Item with customizations |
| `<KDSStatusBar>` | Status tabs with counts |
| `<KDSAlert>` | New order alert |
| `<KDSBumpedOrders>` | Recently completed orders |

### 4.8 Driver Components
| Component | Description |
|-----------|-------------|
| `<DriverDashboard>` | Driver home view |
| `<DeliveryCard>` | Delivery assignment card |
| `<ActiveDelivery>` | Current delivery view |
| `<DriverMap>` | Navigation map |
| `<DeliveryHistory>` | Past deliveries list |

---

## 5. State Management

### 5.1 Client-Side State
| State | Location | Purpose |
|-------|----------|---------|
| Cart | localStorage + React Context | Shopping cart items |
| Location | localStorage + cookie | Selected restaurant location |
| UI State | React State | Modals, drawers, toasts |
| Search | React State | Search query, filters |
| Form State | React Hook Form | Form inputs |

### 5.2 Server-Side State
| State | Method | Purpose |
|-------|--------|---------|
| Menu Items | Prisma + Cache | Menu data |
| User Profile | Clerk + Prisma | User data |
| Orders | Prisma | Order history |
| Rewards | Prisma | Loyalty data |
| Reviews | Prisma | Review data |

### 5.3 Real-Time State
| State | Method | Purpose |
|-------|--------|---------|
| Order Status | WebSocket/SSE | Live order updates |
| KDS Orders | WebSocket/SSE | Kitchen order queue |
| Driver Location | WebSocket/GPS | Live driver tracking |
| Notifications | WebSocket/SSE | In-app notifications |

---

## 6. URL Structure

### 6.1 Customer URLs
| URL Pattern | Page | Dynamic |
|-------------|------|---------|
| `/` | Homepage | No |
| `/menu` | Menu page | No |
| `/menu/[category]` | Category page | Yes - category slug |
| `/menu/[category]/[item]` | Item detail | Yes - category + item slug |
| `/deals` | Deals page | No |
| `/cart` | Shopping cart | No |
| `/checkout` | Checkout | No |
| `/checkout/success` | Order confirmation | No |
| `/track/[orderId]` | Order tracking | Yes - order ID |
| `/locations` | Find locations | No |
| `/contact` | Contact page | No |
| `/about` | About page | No |
| `/blog` | Blog listing | No |
| `/blog/[slug]` | Blog post | Yes - post slug |
| `/faq` | FAQ page | No |
| `/careers` | Careers page | No |
| `/franchise` | Franchise page | No |

### 6.2 Account URLs
| URL Pattern | Page | Dynamic |
|-------------|------|---------|
| `/account/profile` | Edit profile | No |
| `/account/addresses` | Manage addresses | No |
| `/account/payment-methods` | Manage payments | No |
| `/account/orders` | Order history | No |
| `/account/orders/[orderId]` | Order detail | Yes - order ID |
| `/account/favorites` | Favorites | No |
| `/account/rewards` | Rewards dashboard | No |
| `/account/gift-cards` | Gift cards | No |
| `/account/coupons` | My coupons | No |
| `/account/notifications` | Notifications | No |
| `/account/settings` | Account settings | No |

### 6.3 Auth URLs
| URL Pattern | Page | Dynamic |
|-------------|------|---------|
| `/login` | Login | No |
| `/register` | Register | No |
| `/forgot-password` | Forgot password | No |
| `/reset-password` | Reset password | No |

### 6.4 Admin URLs
| URL Pattern | Page | Dynamic |
|-------------|------|---------|
| `/admin` | Dashboard | No |
| `/admin/orders` | Orders list | No |
| `/admin/orders/[orderId]` | Order detail | Yes - order ID |
| `/admin/menu` | Menu items list | No |
| `/admin/menu/new` | Create menu item | No |
| `/admin/menu/[itemId]` | Edit menu item | Yes - item ID |
| `/admin/categories` | Categories list | No |
| `/admin/inventory` | Inventory | No |
| `/admin/locations` | Locations list | No |
| `/admin/locations/[locationId]` | Edit location | Yes - location ID |
| `/admin/customers` | Customers list | No |
| `/admin/customers/[customerId]` | Customer detail | Yes - customer ID |
| `/admin/marketing/coupons` | Coupons | No |
| `/admin/marketing/flash-sales` | Flash sales | No |
| `/admin/marketing/banners` | Banners | No |
| `/admin/cms/pages` | Pages | No |
| `/admin/cms/blog` | Blog posts | No |
| `/admin/reviews` | Reviews | No |
| `/admin/analytics` | Analytics | No |
| `/admin/reports` | Reports | No |
| `/admin/staff` | Staff | No |
| `/admin/settings` | Settings | No |

### 6.5 Kitchen & Driver URLs
| URL Pattern | Page | Dynamic |
|-------------|------|---------|
| `/kitchen/kds` | Kitchen Display | No |
| `/driver` | Driver Dashboard | No |
| `/driver/active` | Active Delivery | No |
| `/driver/history` | Delivery History | No |

---

## 7. API Route Architecture

### 7.1 Public APIs
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/menu` | Get menu items (with filters, pagination) |
| GET | `/api/menu/[id]` | Get single menu item |
| GET | `/api/categories` | Get all categories |
| GET | `/api/locations` | Get all restaurant locations |
| GET | `/api/locations/[id]` | Get single location |
| GET | `/api/deals` | Get active deals/promotions |
| GET | `/api/search` | Search menu items |
| GET | `/api/reviews/[itemId]` | Get reviews for item |
| GET | `/api/faq` | Get FAQ items |
| GET | `/api/blog` | Get blog posts |
| GET | `/api/blog/[slug]` | Get single blog post |

### 7.2 Authenticated APIs
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/cart` | Get user cart |
| POST | `/api/cart` | Add to cart |
| PUT | `/api/cart/[itemId]` | Update cart item |
| DELETE | `/api/cart/[itemId]` | Remove from cart |
| POST | `/api/orders` | Create order |
| GET | `/api/orders` | Get user orders |
| GET | `/api/orders/[id]` | Get order details |
| POST | `/api/orders/[id]/cancel` | Cancel order |
| POST | `/api/orders/[id]/reorder` | Reorder |
| GET | `/api/orders/[id]/track` | Get tracking data |
| GET | `/api/addresses` | Get user addresses |
| POST | `/api/addresses` | Create address |
| PUT | `/api/addresses/[id]` | Update address |
| DELETE | `/api/addresses/[id]` | Delete address |
| GET | `/api/payments/methods` | Get saved payment methods |
| POST | `/api/payments/methods` | Save payment method |
| DELETE | `/api/payments/methods/[id]` | Delete payment method |
| POST | `/api/payments/create-intent` | Create Stripe intent |
| POST | `/api/payments/confirm` | Confirm payment |
| GET | `/api/rewards` | Get rewards info |
| POST | `/api/rewards/redeem` | Redeem points |
| POST | `/api/rewards/earn` | Earn points (internal) |
| GET | `/api/gift-cards` | Get gift cards |
| POST | `/api/gift-cards` | Purchase gift card |
| GET | `/api/gift-cards/[code]/balance` | Check balance |
| GET | `/api/coupons` | Get user coupons |
| POST | `/api/coupons/apply` | Apply coupon |
| POST | `/api/reviews` | Create review |
| PUT | `/api/reviews/[id]` | Update review |
| DELETE | `/api/reviews/[id]` | Delete review |
| POST | `/api/reviews/[id]/report` | Report review |
| GET | `/api/favorites` | Get favorites |
| POST | `/api/favorites/[itemId]` | Toggle favorite |
| GET | `/api/notifications` | Get notifications |
| PUT | `/api/notifications/[id]/read` | Mark as read |
| PUT | `/api/notifications/read-all` | Mark all as read |
| GET | `/api/profile` | Get profile |
| PUT | `/api/profile` | Update profile |

### 7.3 Webhook APIs
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/webhooks/stripe` | Stripe payment webhook |
| POST | `/api/webhooks/clerk` | Clerk auth webhook |
| POST | `/api/webhooks/twilio` | Twilio SMS webhook |

### 7.4 Admin APIs
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/dashboard` | Dashboard stats |
| GET | `/api/admin/orders` | All orders (with filters) |
| PUT | `/api/admin/orders/[id]` | Update order status |
| POST | `/api/admin/orders/[id]/refund` | Process refund |
| GET | `/api/admin/menu` | All menu items |
| POST | `/api/admin/menu` | Create menu item |
| PUT | `/api/admin/menu/[id]` | Update menu item |
| DELETE | `/api/admin/menu/[id]` | Delete menu item |
| POST | `/api/admin/menu/bulk-update` | Bulk update items |
| GET | `/api/admin/categories` | All categories |
| POST | `/api/admin/categories` | Create category |
| PUT | `/api/admin/categories/[id]` | Update category |
| DELETE | `/api/admin/categories/[id]` | Delete category |
| PUT | `/api/admin/categories/reorder` | Reorder categories |
| GET | `/api/admin/inventory` | Inventory levels |
| PUT | `/api/admin/inventory/[id]` | Update stock |
| POST | `/api/admin/inventory/restock` | Log restock |
| GET | `/api/admin/locations` | All locations |
| POST | `/api/admin/locations` | Create location |
| PUT | `/api/admin/locations/[id]` | Update location |
| GET | `/api/admin/customers` | All customers |
| GET | `/api/admin/customers/[id]` | Customer detail |
| PUT | `/api/admin/customers/[id]/note` | Add customer note |
| GET | `/api/admin/reviews` | All reviews |
| PUT | `/api/admin/reviews/[id]/respond` | Respond to review |
| GET | `/api/admin/marketing/coupons` | All coupons |
| POST | `/api/admin/marketing/coupons` | Create coupon |
| PUT | `/api/admin/marketing/coupons/[id]` | Update coupon |
| DELETE | `/api/admin/marketing/coupons/[id]` | Delete coupon |
| GET | `/api/admin/marketing/flash-sales` | All flash sales |
| POST | `/api/admin/marketing/flash-sales` | Create flash sale |
| PUT | `/api/admin/marketing/flash-sales/[id]` | Update flash sale |
| GET | `/api/admin/marketing/banners` | All banners |
| POST | `/api/admin/marketing/banners` | Create banner |
| PUT | `/api/admin/marketing/banners/[id]` | Update banner |
| PUT | `/api/admin/marketing/banners/reorder` | Reorder banners |
| GET | `/api/admin/cms/pages` | All pages |
| POST | `/api/admin/cms/pages` | Create page |
| PUT | `/api/admin/cms/pages/[id]` | Update page |
| DELETE | `/api/admin/cms/pages/[id]` | Delete page |
| GET | `/api/admin/cms/blog` | All blog posts |
| POST | `/api/admin/cms/blog` | Create blog post |
| PUT | `/api/admin/cms/blog/[id]` | Update blog post |
| DELETE | `/api/admin/cms/blog/[id]` | Delete blog post |
| POST | `/api/admin/cms/media` | Upload media |
| GET | `/api/admin/analytics` | Analytics data |
| GET | `/api/admin/reports/[type]` | Generate report |
| GET | `/api/admin/staff` | All staff |
| POST | `/api/admin/staff` | Invite staff |
| PUT | `/api/admin/staff/[id]` | Update staff role |
| DELETE | `/api/admin/staff/[id]` | Remove staff |
| GET | `/api/admin/settings` | Get settings |
| PUT | `/api/admin/settings` | Update settings |

### 7.5 Kitchen APIs
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/kitchen/orders` | Get order queue |
| PUT | `/api/kitchen/orders/[id]/status` | Update order status |
| PUT | `/api/kitchen/orders/[id]/bump` | Bump order |
| POST | `/api/kitchen/orders/[id]/print` | Print order ticket |

### 7.6 Driver APIs
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/driver/available` | Get available deliveries |
| GET | `/api/driver/active` | Get active delivery |
| POST | `/api/driver/deliveries/[id]/accept` | Accept delivery |
| POST | `/api/driver/deliveries/[id]/pickup` | Confirm pickup |
| POST | `/api/driver/deliveries/[id]/deliver` | Mark delivered |
| PUT | `/api/driver/location` | Update driver location |

---

## 8. Data Flow Diagrams

### 8.1 Order Creation Flow
```
Customer                    Frontend                    Backend                    Payment
   │                           │                           │                          │
   │── Place Order ──────────>│                           │                          │
   │                           │── Validate Cart ────────>│                          │
   │                           │── Validate Address ─────>│                          │
   │                           │── Calculate Totals ─────>│                          │
   │                           │── Create Payment Intent ─┼─────────────────────────>│
   │                           │                          │<── Client Secret ────────│
   │                           │<── Client Secret ────────│                          │
   │                           │── Process Payment ───────┼─────────────────────────>│
   │                           │                          │<── Payment Confirmed ────│
   │                           │── Create Order ─────────>│                          │
   │                           │── Deduct Inventory ─────>│                          │
   │                           │── Award Points ─────────>│                          │
   │                           │── Send Confirmation ────>│                          │
   │<── Order Confirmation ───│                          │                          │
   │                           │                           │                          │
```

### 8.2 Real-Time Order Tracking
```
Kitchen Staff              KDS Display              Customer               Driver
      │                        │                       │                      │
      │── Update Status ──────>│                       │                      │
      │                        │── Broadcast ─────────>│                      │
      │                        │── Broadcast ───────────────────────────────>│
      │                        │                       │                      │
      │                        │<── Driver Location ─────────────────────────│
      │                        │── Broadcast ─────────>│                      │
      │                        │                       │                      │
```

---

## 9. Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, stacked layout, bottom nav |
| Tablet | 640px - 1024px | 2-column grid, side nav collapses |
| Desktop | 1024px - 1280px | Full layout, sidebar navigation |
| Large Desktop | > 1280px | Expanded content area, larger cards |

---

## 10. Loading States

### 10.1 Skeleton Screens
- Menu grid: Card skeletons with image + text placeholders
- Order list: Row skeletons with date + status
- Profile: Form field skeletons
- Dashboard: Chart and stat card skeletons

### 10.2 Spinner Variants
- Page loading: Full-page spinner with brand animation
- Button loading: Inline spinner within button
- Card loading: Card-specific skeleton
- Image loading: Blur placeholder with fade-in

### 10.3 Optimistic Updates
- Cart add/remove: Immediate UI update, rollback on error
- Favorite toggle: Immediate heart animation
- Quantity change: Immediate price update

---

## 11. Empty States

| Context | Icon | Message | CTA |
|---------|------|---------|-----|
| Empty cart | Shopping bag | "Your cart is empty" | "Browse Menu" |
| No orders | Receipt | "No orders yet" | "Order Now" |
| No favorites | Heart | "No favorites saved" | "Browse Menu" |
| No addresses | Map pin | "No saved addresses" | "Add Address" |
| No coupons | Ticket | "No coupons available" | "View Deals" |
| No notifications | Bell | "No notifications" | "You're all caught up!" |
| No search results | Search | "No items found" | "Try different keywords" |
| No reviews | Star | "No reviews yet" | "Be the first to review" |
| Empty inventory | Package | "No inventory items" | "Add Menu Items" |
| No blog posts | File | "No posts yet" | "Create First Post" |

---

## 12. Error States

| Error | Page | Action |
|-------|------|--------|
| 404 | Not Found | "Page not found" + Home link |
| 500 | Server Error | "Something went wrong" + Retry |
| 403 | Unauthorized | "Access denied" + Login link |
| Network Error | Any | "Connection lost" + Retry |
| Payment Failed | Checkout | "Payment failed" + Retry |
| Delivery Unavailable | Checkout | "Delivery not available" + Pickup option |
| Item Unavailable | Cart | "Item no longer available" + Remove |
| Stock Reduced | Cart | "Quantity adjusted" + Update |

---

*End of Information Architecture*
