# FireBird Chicken - Product Specification

## 1. Product Vision

FireBird Chicken is a premium fast-food restaurant ordering platform for a multi-location franchise in the United States. The platform delivers a Fortune 500-grade digital experience for browsing the menu, customizing orders, and tracking deliveries in real-time.

### 1.1 Goals
- Enable customers to order food for delivery, pickup, dine-in, or scheduled times
- Provide full menu customization (spice, sauces, toppings, sizes, cooking preferences)
- Support a loyalty/rewards ecosystem (points, cashback, referrals, gift cards, coupons)
- Deliver real-time order tracking with live GPS and ETA
- Equip restaurant staff with KDS (Kitchen Display System) and printer integration
- Offer admin dashboards for analytics, menu, inventory, orders, marketing, and CMS
- Achieve Lighthouse 95+ performance and WCAG 2.2 AA accessibility

### 1.2 Success Metrics
| Metric | Target |
|--------|--------|
| Lighthouse Performance | >= 95 |
| Lighthouse Accessibility | >= 100 |
| Lighthouse SEO | >= 100 |
| Lighthouse Best Practices | >= 100 |
| Core Web Vitals LCP | < 2.5s |
| Core Web Vitals FID | < 100ms |
| Core Web Vitals CLS | < 0.1 |
| Order completion rate | >= 85% |
| Average order value | $18+ |

---

## 2. User Personas

### 2.1 Primary: Busy Professional (Sarah, 28)
- Orders lunch at work, values speed and convenience
- Wants quick reorder of favorites
- Uses mobile primarily
- Prefers contactless pickup

### 2.2 Secondary: Family Orderer (Mike, 38)
- Orders family meals for 4-6 people
- Needs customization for kids (no spice, different sides)
- Uses desktop and mobile
- Schedules orders in advance

### 2.3 Tertiary: Late-Night Craver (Jake, 22)
- Orders late-night delivery
- Wants real-time tracking
- Heavy customization (extra sauce, specific sides)
- Uses mobile app

### 2.4 Staff: Kitchen Worker (Carlos, 32)
- Receives orders on KDS screen
- Needs clear, large text for busy kitchen
- Updates order status in real-time
- Needs printer integration

### 2.5 Admin: Restaurant Manager (Lisa, 45)
- Manages menu, inventory, and staff
- Reviews analytics and sales data
- Handles customer complaints
- Manages promotions and campaigns

---

## 3. Feature Specification

### 3.1 Location Selection & Delivery Zones

#### 3.1.1 Location Picker
- **Trigger:** First visit or via header button
- **Behavior:**
  - Detect user location via browser Geolocation API
  - Show nearest FireBird locations sorted by distance
  - Display: name, address, distance, estimated delivery time, open/closed status
  - Allow manual zip code / city search
  - Persist selected location in localStorage + cookie
  - Show "Change Location" in header

#### 3.1.2 Delivery Zone Validation
- Each restaurant location defines:
  - Delivery radius (miles)
  - Supported zip codes
  - Delivery fee tiers (by distance)
  - Minimum order amount
- On checkout, validate delivery address falls within zone
- Show clear error if address is outside delivery zone
- Suggest nearest location if delivery is unavailable

#### 3.1.3 Location-Based Behavior
- Menu items availability may vary by location (core menu is unified)
- Pricing is unified across locations
- Delivery fees vary by distance from selected location
- Operating hours vary by location
- Tax rates vary by delivery address

---

### 3.2 Menu System

#### 3.2.1 Menu Categories
| Category | Description | Example Items |
|----------|-------------|---------------|
| Chicken | Signature pieces, tenders, wings | 8pc Family Meal, Spicy Tenders, Boneless Wings |
| Burgers & Sandwiches | Chicken burgers, wraps | Classic Burger, Spicy Deluxe, Veggie Wrap |
| Combo Meals | Entree + Side + Drink | Chicken Combo, Tenders Combo, Burger Combo |
| Sides | Fries, coleslaw, corn, biscuits | Curly Fries, Mac & Cheese, Biscuit |
| Beverages | Soft drinks, shakes, juice | Lemonade, Chocolate Shake, Iced Tea |
| Desserts | Pies, cookies, sundaes | Apple Pie, Chocolate Cookie, Sundae |
| Kids Meals | Kid-friendly portions | Kids Tenders, Kids Nugget Meal |
| Family Buckets | Group meals for 4-6 | Family Feast, Party Bucket |
| Breakfast | Morning menu (time-gated) | Chicken Biscuit, Breakfast Platter |
| Seasonal/LTO | Limited-time offers | Summer Spice Wing, Holiday Meal |

#### 3.2.2 Menu Item Data Model
```
MenuItem {
  id: UUID
  name: string
  slug: string
  description: string
  shortDescription: string
  basePrice: number (cents)
  categoryId: UUID
  imageUrl: string
  thumbnailUrl: string
  calories: number
  allergens: string[]
  isAvailable: boolean
  isFeatured: boolean
  isSeasonal: boolean
  availableFrom: datetime (for breakfast/seasonal)
  availableUntil: datetime (for breakfast/seasonal)
  preparationTime: number (minutes)
  spiceLevel: 0-4
  tags: string[]
  metadata: JSON
  createdAt: datetime
  updatedAt: datetime
}
```

#### 3.2.3 Menu Display
- **Category Navigation:** Horizontal scrollable tabs or sidebar
- **Item Grid:** Responsive grid (2 cols mobile, 3 cols tablet, 4 cols desktop)
- **Item Card:** Thumbnail, name, short description, price, spice indicator, "Add to Cart" button
- **Featured Items:** Highlighted section on menu page
- **Seasonal Badge:** Visual indicator for LTO items
- **Sold Out:** Grayed out with "Sold Out" badge, no add-to-cart
- **Breakfast Timer:** Show countdown when breakfast menu is time-gated

---

### 3.3 Product Detail & Customization

#### 3.3.1 Product Detail Page
- Large hero image (swipeable gallery on mobile)
- Item name, description, calorie count, allergen info
- Spice level indicator (flame icons)
- Base price display
- Customization sections (accordion or tabs)
- Quantity selector
- "Add to Cart" with live price update
- Related items / "You Might Also Like"
- Customer reviews section (stars + text + photos)

#### 3.3.2 Customization Options

##### Spice Level
- Options: Mild (0), Medium (1), Hot (2), Extra Hot (3), Inferno (4)
- Visual: Flame icons that fill based on selection
- Default: Medium (1)
- Some items restrict available spice levels

##### Sauce Selection
- Single select or multi-select (max 2-3 depending on item)
- Options: BBQ, Ranch, Buffalo, Honey Mustard, Garlic Parm, Sweet Chili, Fire Bird Sauce
- Some sauces are premium (+$0.50)
- Default varies by item

##### Extra Toppings / Add-ons
- Multi-select with price modifiers
- Options: Cheese (+$0.75), Bacon (+$1.25), Jalapeños (+$0.50), Pickles (free), Onions (free), Lettuce (free), Tomato (free)
- Maximum 6 add-ons per item

##### Remove Ingredients
- Multi-select (no charge)
- Options vary by item: Pickles, Onions, Tomatoes, Lettuce, Sauce, Cheese
- Visual: Strikethrough style on removed items

##### Meal Size / Portions
- Single select
- Options: Regular, Large (+$2.00), Family (+$5.00)
- Affects portion size and price
- Default: Regular

##### Side & Drink Substitution (for Combos)
- Side selection: Fries, Coleslaw, Corn, Mac & Cheese, Biscuit
- Drink selection: Coke, Diet Coke, Sprite, Lemonade, Iced Tea
- Some substitutions have upcharges

##### Cooking Preferences / Special Instructions
- Free-text field (max 200 characters)
- Common presets: "Extra crispy", "Light on salt", "Well done", "No onions"
- Preset chips for quick selection

#### 3.3.3 Price Calculation
```
Final Item Price = Base Price
  + Size Modifier
  + Premium Sauce Upcharge
  + Extra Toppings Cost
  - (no deduction for removals)
```
- Display price updates in real-time as customer customizes
- Show breakdown in cart: base + modifiers = item total

---

### 3.4 Shopping Cart

#### 3.4.1 Cart Behavior
- **Add to Cart:** Toast notification with undo option, cart icon badge updates
- **Cart Persistence:** Saved to localStorage (guest) or database (logged-in user)
- **Cart Sync:** Merge localStorage cart on login
- **Max Items:** 50 items per order
- **Session Timeout:** Cart expires after 2 hours of inactivity

#### 3.4.2 Cart Display
- Slide-over panel (desktop) or full page (mobile)
- List of items with:
  - Thumbnail image
  - Item name
  - Customization summary (truncated, expandable)
  - Quantity +/- controls
  - Individual item price
  - Remove button
- Order summary section:
  - Subtotal
  - Delivery fee (or "Free" badge)
  - Tax estimate
  - Discount (if coupon applied)
  - **Total**
- "Proceed to Checkout" button (primary CTA)
- "Continue Shopping" link
- Empty cart state with CTA to browse menu

#### 3.4.3 Cart Actions
- Update quantity (min 1, max 10 per item)
- Remove item
- Edit customization (opens product detail modal)
- Apply coupon/promo code
- Clear entire cart

---

### 3.5 Checkout Flow

#### 3.5.1 Checkout Steps
```
Cart Review -> Account/Login -> Order Type -> Delivery/Pickup Info -> Payment -> Review -> Confirmation
```

#### 3.5.2 Step 1: Order Type Selection
- **Delivery:** Show delivery form
- **Pickup:** Show pickup location selector + time selection
- **Dine-in:** Show table/section selector (if supported)
- **Scheduled:** Show date + time slot picker

#### 3.5.3 Step 2: Delivery Information
- Saved addresses (if logged in)
- "Add New Address" form:
  - Street address (with Google Places autocomplete)
  - Apartment/Suite/Unit (optional)
  - City, State, Zip
  - Delivery instructions (optional)
  - Label (Home, Work, Other)
- Address validation against delivery zones
- Estimated delivery time display
- Delivery fee calculation (distance-based)

#### 3.5.4 Step 3: Pickup Information
- Select pickup location (show nearest first)
- Available time slots:
  - "Ready in 15 minutes" (ASAP)
  - Scheduled slots (30-min intervals during operating hours)
- Pickup instructions (optional): "Call on arrival", "Leave at door"

#### 3.5.5 Step 4: Dine-in Information
- Select restaurant location
- Party size selector
- Preferred seating (indoor, outdoor, bar) - if applicable
- Special requests

#### 3.5.6 Step 5: Scheduled Order
- Date picker (today + next 7 days)
- Time slot picker (30-min intervals)
- Show operating hours for selected date
- Blocked slots for holidays/closures

#### 3.5.7 Step 6: Payment
- **Payment Methods:**
  - Credit/Debit Card (Stripe)
  - PayPal
  - Apple Pay (if available on device)
  - Google Pay (if available on device)
  - Cash on Delivery (delivery only)
  - Gift Card Balance
- **Saved Cards:** Display saved cards, allow new card
- **Tip Selection:** Preset percentages (15%, 18%, 20%, 25%) + Custom
- **Gift Card:** Enter code, check balance, apply
- **Coupon Code:** Apply promo, show discount

#### 3.5.8 Step 7: Order Review
- Complete order summary:
  - All items with customizations
  - Subtotal, delivery fee, tax, discount, tip, total
  - Delivery/pickup address
  - Estimated time
  - Payment method
  - Special instructions
- "Place Order" button (final CTA)
- Terms acceptance checkbox

#### 3.5.9 Step 8: Order Confirmation
- Success animation (confetti or checkmark)
- Order number
- Estimated delivery/preparation time
- Order tracking CTA
- "Track Your Order" button
- "Continue Shopping" link
- Email confirmation sent

---

### 3.6 Order Tracking

#### 3.6.1 Order Statuses
```
PLACED -> CONFIRMED -> PREPARING -> READY -> OUT_FOR_DELIVERED -> DELIVERED
     \-> REJECTED (by restaurant)
           \-> CANCELLED (by customer before preparation)
```

#### 3.6.2 Tracking Page
- **Visual Timeline:** Horizontal/vertical stepper showing current status
- **Status Details:**
  - PLACED: "Your order has been received"
  - CONFIRMED: "Restaurant is reviewing your order"
  - PREPARING: "Your food is being prepared" + estimated time
  - READY: "Your order is ready for pickup" / "Waiting for driver"
  - OUT_FOR_DELIVERY: "Your order is on the way" + live map + driver info
  - DELIVERED: "Order delivered" + rating prompt
- **Live Map:** Embedded map showing driver location (Google Maps / Mapbox)
- **Driver Info:** Name, photo, phone (call button), vehicle info
- **ETA:** Countdown timer, updated in real-time
- **Order Details:** Expandable section showing all items

#### 3.6.3 Real-time Updates
- WebSocket or Server-Sent Events for live status
- Push notification on status change
- Email notification on key status changes
- SMS for delivery out and delivered

#### 3.6.4 Reorder
- "Reorder" button on completed orders
- Adds all items to cart with same customizations
- Validates items are still available

---

### 3.7 User Account

#### 3.7.1 Authentication
- **Provider:** Clerk
- **Methods:**
  - Email + Password
  - Google OAuth
  - Apple Sign-In
  - Phone number (SMS OTP)
- **MFA:** Optional two-factor authentication
- **Session:** Persistent login, 30-day session

#### 3.7.2 Profile Page
- **Personal Info:** Name, email, phone, profile photo
- **Addresses:** CRUD for saved addresses (max 10)
- **Payment Methods:** Manage saved cards (via Stripe)
- **Notification Preferences:**
  - Email: Order updates, Promotions, Newsletter
  - SMS: Order updates, Delivery alerts
  - Push: All notifications
- **Privacy Settings:** Data export, account deletion
- **Change Password / Email**

#### 3.7.3 Order History
- Paginated list of all past orders
- Filter by: All, Delivery, Pickup, Dine-in, Completed, Cancelled
- Each order shows:
  - Order number
  - Date & time
  - Items summary (first 2 + count)
  - Total amount
  - Status badge
  - "Reorder" button
  - "View Details" link

#### 3.7.4 Favorites
- Save menu items as favorites (heart icon)
- Quick access to favorite items
- "Order Favorites" shortcut

#### 3.7.5 Recently Ordered
- Quick reorder from last 10 orders
- One-click add to cart

---

### 3.8 Rewards & Loyalty System

#### 3.8.1 Points System
- Earn 1 point per $1 spent
- Bonus points for:
  - First order: 100 points
  - Referral: 500 points
  - Birthday: 200 points
  - Special promotions: Variable
- Points expire after 12 months of inactivity

#### 3.8.2 Reward Tiers
| Tier | Points Required | Benefits |
|------|----------------|----------|
| Flame | 0 | Base earning rate, birthday reward |
| Blaze | 500 | 1.25x points, free delivery monthly |
| Inferno | 2000 | 1.5x points, free delivery weekly, exclusive items |
| Phoenix | 5000 | 2x points, free delivery always, priority support, VIP events |

#### 3.8.3 Rewards Redemption
- 100 points = $1 off
- Minimum redemption: 500 points ($5)
- Maximum per order: 2000 points ($20)
- Can combine with coupons

#### 3.8.4 Gift Cards
- Purchase gift cards ($25, $50, $75, $100, custom amount)
- Send via email with personal message
- Digital delivery (instant)
- Check balance
- Redeem at checkout

#### 3.8.5 Referral Program
- Unique referral code per user
- Share via link, email, SMS
- Referrer: 500 points when friend completes first order
- Referee: $10 off first order (min $20)
- Track referral history

#### 3.8.6 Coupons & Promo Codes
- Percentage off (10%, 20%, etc.)
- Fixed amount off ($5, $10, etc.)
- Free item coupon
- BOGO (Buy One Get One)
- Free delivery coupon
- Minimum order requirement
- Expiration date
- One-time use vs. reusable
- Stackable vs. exclusive

---

### 3.9 Reviews & Ratings

#### 3.9.1 Review System
- **Rating:** 1-5 stars (required)
- **Title:** Optional short title (max 50 chars)
- **Text:** Optional review text (max 500 chars)
- **Photos:** Optional, up to 5 photos (max 5MB each)
- **Order Verification:** Only verified purchasers can review
- **Timing:** Review prompt 2 hours after delivery
- **Edit/Delete:** Users can edit/delete their reviews

#### 3.9.2 Review Display
- Average rating on menu item cards
- Rating breakdown (5-star histogram)
- Sort by: Most recent, Highest rated, Most helpful
- Filter by: With photos, Verified purchases
- Report review (spam, inappropriate, offensive)

#### 3.9.3 Owner Responses
- Restaurant can respond to reviews
- Response shown below the review
- "Response from FireBird Chicken" badge

---

### 3.10 Search & Filtering

#### 3.10.1 Search
- **Search Bar:** Persistent in header, expandable on mobile
- **Search Typeahead:** Real-time suggestions as user types
- **Search Results:** Grid of matching items
- **Search History:** Last 10 searches (stored locally)
- **Popular Searches:** Show trending items

#### 3.10.2 Filters
- **Category:** Multi-select checkboxes
- **Price Range:** Slider ($0 - $30)
- **Spice Level:** Flame selector
- **Dietary:** Vegetarian, Vegan, Gluten-Free
- **Allergens:** Exclude specific allergens
- **Calories:** Under 500, Under 800, Any
- **Sort By:** Price (low-high, high-low), Popularity, Rating, Newest

#### 3.10.3 Search Analytics
- Track search queries
- Track filter usage
- Use for menu recommendations

---

### 3.11 Notifications

#### 3.11.1 Email Notifications
| Trigger | Template |
|---------|----------|
| Order placed | Order confirmation |
| Order confirmed | Restaurant confirmed |
| Order preparing | Being prepared |
| Order ready | Ready for pickup |
| Out for delivery | Driver assigned |
| Delivered | Delivery complete + rate prompt |
| Refund processed | Refund confirmation |
| Reward earned | Points added |
| Reward redeemed | Discount applied |
| Welcome | Account created |
| Password reset | Reset link |
| Weekly digest | Promotions, new items |

#### 3.11.2 SMS Notifications
| Trigger | Message |
|---------|---------|
| Order placed | "Order #{id} confirmed. ETA: {time}" |
| Out for delivery | "Your order is on its way!" |
| Delivered | "Order delivered. Enjoy!" |
| Delivery issue | "Issue with delivery. Contact support." |

#### 3.11.3 Push Notifications
- All order status changes
- Promotional offers
- Flash sale alerts
- Loyalty point updates
- New menu items

#### 3.11.4 In-App Notifications
- Notification bell icon with badge count
- Notification center page
- Mark as read/unread
- Clear all
- Filter by type

---

### 3.12 Admin Dashboard

#### 3.12.1 Roles & Permissions

| Role | Permissions |
|------|-------------|
| Super Admin | Full access to everything |
| Restaurant Manager | Manage own location: menu, orders, staff, inventory, reports |
| Kitchen Staff | View orders, update order status, mark items unavailable |
| Customer Support | View orders, process refunds, handle complaints, manage reviews |
| Delivery Driver | View assigned deliveries, update delivery status, GPS tracking |

#### 3.12.2 Dashboard Home
- **Revenue Widget:** Today/Week/Month revenue, comparison to previous period
- **Orders Widget:** Total orders, average order value, conversion rate
- **Customers Widget:** New vs returning, total active
- **Top Items:** Best-selling items today
- **Recent Orders:** Last 10 orders with status
- **Quick Actions:** Add menu item, Create coupon, View reports

#### 3.12.3 Order Management
- **Order Queue:** Real-time list of incoming orders
- **KDS View:** Large-card view for kitchen displays
- **Filters:** By status, order type, date range
- **Actions:**
  - Accept/Reject order
  - Update status (preparing, ready, etc.)
  - Assign driver
  - Add order notes
  - Process refund
  - View customer details
- **Order Details:** Full order info, customization, payment, history

#### 3.12.4 Menu Management
- **Categories:** CRUD, reorder via drag-and-drop
- **Menu Items:** CRUD with:
  - Name, description, price
  - Category assignment
  - Images (upload or URL)
  - Customization options
  - Availability toggle
  - Featured/Seasonal flags
  - Preparation time
  - Spice level
  - Calories, allergens
  - SEO metadata
- **Bulk Actions:** Toggle availability, update prices, delete items
- **Menu Preview:** Preview as customer would see it

#### 3.12.5 Inventory Management
- **Stock Levels:** Track quantity per item
- **Low Stock Alerts:** Email/push when below threshold
- **Auto Sold-Out:** Mark unavailable when stock = 0
- **Restock Tracking:** Log restock events
- **Inventory Reports:** Stock value, turnover rate

#### 3.12.6 Location Management
- **Locations:** CRUD for restaurant locations
- **Settings per location:**
  - Operating hours (per day, holiday schedules)
  - Delivery radius and zones
  - Delivery fees
  - Minimum order amount
  - Staff assignments
  - Tax rates
  - Contact info
- **Location Status:** Open/Closed toggle

#### 3.12.7 Customer Management
- **Customer List:** Searchable, filterable list
- **Customer Profile:** Order history, rewards, contact info
- **Notes:** Internal notes on customers
- **Blacklist:** Block problematic customers

#### 3.12.8 Marketing Management
- **Coupons:** CRUD with rules (min order, expiry, usage limit)
- **Promotions:** Create/manage promotional campaigns
- **Banners:** Manage homepage/section banners
- **Flash Sales:** Create time-limited deals
- **Email Campaigns:** Basic email template editor
- **Referral Program:** Configure referral rewards

#### 3.12.9 CMS Management
- **Pages:** Create/edit static pages (About, FAQ, etc.)
- **Blog:** Create/edit blog posts with rich text editor
- **Media Library:** Upload and manage images
- **SEO:** Meta titles, descriptions, OG images per page

#### 3.12.10 Analytics & Reports
- **Dashboard Charts:**
  - Revenue over time (line chart)
  - Orders by hour (bar chart)
  - Top items (pie chart)
  - Revenue by location (map)
- **Reports:**
  - Sales report (date range, export CSV)
  - Item performance report
  - Customer report
  - Revenue report
  - Delivery performance report
  - Inventory report

#### 3.12.11 Settings
- **General:** Business name, logo, contact info
- **Notifications:** Configure notification templates
- **Integrations:** Stripe, Google Maps, email service
- **Tax Settings:** Tax rates by location
- **Operating Hours:** Global and per-location
- **Staff Management:** Invite/remove staff, assign roles

---

### 3.13 Kitchen Display System (KDS)

#### 3.13.1 KDS Dashboard
- **Order Queue:** Real-time list of incoming orders
- **Card View:** Each order as a large card with:
  - Order number
  - Order type (Delivery/Pickup/Dine-in)
  - Items list with customizations
  - Time since order placed
  - Status indicator
- **Color Coding:**
  - New: Red border
  - Preparing: Yellow border
  - Ready: Green border
  - Overdue: Flashing red

#### 3.13.2 KDS Actions
- Start preparing (move to "Preparing")
- Mark item as done
- Mark entire order as ready
- Bump order (remove from screen)
- Recall bumped orders
- Sound alert for new orders

#### 3.13.3 Printer Integration
- Print order ticket on thermal printer
- Auto-print on new order
- Custom print format
- Multiple printer support (for different stations)

---

### 3.14 Delivery Driver App

#### 3.14.1 Driver Dashboard
- **Available Deliveries:** List of unassigned deliveries
- **My Deliveries:** Assigned deliveries in progress
- **Delivery History:** Past deliveries with earnings

#### 3.14.2 Delivery Flow
1. Receive delivery assignment (push notification)
2. Accept/Reject delivery
3. Navigate to restaurant (integrate with maps)
4. Pick up order (confirm pickup)
5. Navigate to customer
6. Mark as delivered (with photo proof option)
7. Rate customer (optional)

#### 3.14.3 GPS Tracking
- Share real-time location during active delivery
- Update location every 10 seconds
- Show route to customer

---

### 3.15 Static & Dynamic Pages

#### 3.15.1 Public Pages
| Page | Description |
|------|-------------|
| Home | Hero, featured items, categories, promotions, CTA |
| Menu | Full menu with categories, search, filters |
| Deals | Current promotions, flash sales, coupons |
| About | Brand story, mission, team |
| Locations | Find nearby restaurants, map view |
| Contact | Contact form, phone, email, social |
| Careers | Job listings, application form |
| Franchise | Franchise information, inquiry form |
| Blog | Article listings, categories |
| FAQ | Frequently asked questions |
| Privacy Policy | Legal privacy policy |
| Terms of Service | Terms and conditions |

#### 3.15.2 Auth Pages
| Page | Description |
|------|-------------|
| Login | Email/password + social logins |
| Register | Create account form |
| Forgot Password | Password reset flow |
| Verify Email | Email verification |
| Reset Password | Set new password |

#### 3.15.3 User Pages
| Page | Description |
|------|-------------|
| Profile | Edit personal info |
| Addresses | Manage saved addresses |
| Payment Methods | Manage saved cards |
| Orders | Order history list |
| Order Detail | Single order details + tracking |
| Favorites | Saved menu items |
| Rewards | Points, tier, redemption |
| Gift Cards | Buy/check balance |
| Coupons | Available coupons |
| Notifications | Notification center |
| Settings | Account settings |

---

## 4. User Flows

### 4.1 First-Time Visitor Flow
```
1. Land on homepage
2. Location detection prompt
3. Select/confirm location
4. Browse menu or search
5. Add items to cart
6. Click checkout
7. Redirect to login/register
8. Create account (Clerk)
9. Complete checkout
10. Order confirmation
```

### 4.2 Returning Customer Flow
```
1. Land on homepage (location remembered)
2. Quick reorder from "Recently Ordered" or favorites
3. Or browse menu
4. Add to cart
5. Checkout (saved address + payment)
6. Place order
7. Track order
```

### 4.3 Delivery Order Flow
```
1. Select "Delivery" order type
2. Enter/select delivery address
3. Validate address in delivery zone
4. Show delivery fee + estimated time
5. Select payment method
6. Add tip
7. Review order
8. Place order
9. Track delivery with live map
```

### 4.4 Pickup Order Flow
```
1. Select "Pickup" order type
2. Choose pickup location
3. Select time (ASAP or scheduled)
4. Add pickup instructions
5. Select payment method
6. Review order
7. Place order
8. Receive ready notification
9. Pick up order
```

### 4.5 Scheduled Order Flow
```
1. Select "Scheduled" order type
2. Choose date (today + 7 days)
3. Choose time slot
4. Complete checkout
5. Order queued for scheduled time
6. Restaurant receives order at scheduled time
7. Prep and delivery/pickup as normal
```

---

## 5. Non-Functional Requirements

### 5.1 Performance
- Lighthouse score >= 95 across all metrics
- LCP < 2.5s
- FID < 100ms
- CLS < 0.1
- TTFB < 600ms
- Image optimization (WebP/AVIF, lazy loading, responsive sizes)
- Code splitting and dynamic imports
- Edge caching via Vercel CDN

### 5.2 Accessibility
- WCAG 2.2 AA compliance
- Semantic HTML throughout
- ARIA labels and roles
- Keyboard navigation (Tab, Enter, Escape, Arrow keys)
- Focus visible indicators
- Skip navigation links
- Alt text for all images
- Color contrast >= 4.5:1 (text), >= 3:1 (large text)
- Reduced motion support (`prefers-reduced-motion`)
- Screen reader testing (VoiceOver, NVDA)

### 5.3 Security
- CSRF protection (Next.js built-in)
- Rate limiting on API routes
- Input validation (Zod schemas)
- SQL injection prevention (Prisma parameterized queries)
- XSS prevention (React auto-escaping + CSP headers)
- Secure authentication (Clerk handles)
- Secure payments (Stripe PCI compliance)
- RBAC for admin routes
- Environment variable protection
- HTTPS enforcement

### 5.4 SEO
- JSON-LD structured data (Restaurant, Menu, Product, BreadcrumbList, FAQPage)
- Open Graph meta tags (dynamic per page)
- Twitter Card meta tags
- Dynamic sitemap.xml
- robots.txt
- Canonical URLs
- Semantic HTML (headings, landmarks)
- Internal linking strategy

### 5.5 Internationalization
- English only for launch
- USD currency
- US date/time format
- Architecture ready for future i18n (next-intl)

### 5.6 Monitoring
- Error tracking (Sentry)
- Performance monitoring (Vercel Analytics)
- Uptime monitoring
- Log aggregation

---

## 6. Technical Architecture

### 6.1 Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5.x |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui |
| Animation | Motion (Framer Motion) |
| Database | PostgreSQL |
| ORM | Prisma |
| Auth | Clerk |
| Payments | Stripe, PayPal |
| Cache | Next.js built-in caching |
| Deployment | Vercel (production), Docker (development) |
| Email | Resend / SendGrid |
| SMS | Twilio |
| Maps | Google Maps / Mapbox |
| Storage | Cloudflare R2 / AWS S3 |

### 6.2 Project Structure
```
firebird-chicken/
├── .env.local
├── .env.example
├── docker-compose.yml
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── migrations/
├── public/
│   ├── images/
│   ├── icons/
│   └── fonts/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── (customer)/
│   │   │   ├── menu/
│   │   │   ├── deals/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── orders/
│   │   │   ├── profile/
│   │   │   ├── rewards/
│   │   │   └── ...
│   │   ├── (admin)/
│   │   │   ├── dashboard/
│   │   │   ├── orders/
│   │   │   ├── menu/
│   │   │   ├── inventory/
│   │   │   ├── customers/
│   │   │   ├── marketing/
│   │   │   ├── cms/
│   │   │   ├── analytics/
│   │   │   ├── settings/
│   │   │   └── ...
│   │   ├── (kitchen)/
│   │   │   └── kds/
│   │   ├── (driver)/
│   │   │   └── deliveries/
│   │   ├── api/
│   │   │   ├── orders/
│   │   │   ├── menu/
│   │   │   ├── cart/
│   │   │   ├── payments/
│   │   │   ├── webhooks/
│   │   │   └── ...
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── ui/ (shadcn)
│   │   ├── layout/
│   │   ├── menu/
│   │   ├── cart/
│   │   ├── checkout/
│   │   ├── order/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── kitchen/
│   │   ├── driver/
│   │   └── shared/
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── clerk.ts
│   │   ├── stripe.ts
│   │   ├── utils.ts
│   │   ├── validations.ts
│   │   └── constants.ts
│   ├── hooks/
│   ├── types/
│   ├── styles/
│   │   └── globals.css
│   └── middleware.ts
└── docs/
    ├── 01-requirements.md
    ├── 02-product-specification.md
    ├── 03-information-architecture.md
    ├── 04-database-schema.md
    └── ...
```

### 6.3 API Routes
| Route | Method | Description |
|-------|--------|-------------|
| /api/menu | GET | Get menu items (with filters) |
| /api/menu/[id] | GET | Get single menu item |
| /api/cart | GET/POST/PUT/DELETE | Cart operations |
| /api/orders | POST | Create order |
| /api/orders | GET | Get user orders |
| /api/orders/[id] | GET | Get order details |
| /api/orders/[id]/track | GET | Get order tracking data |
| /api/payments/create-intent | POST | Create Stripe payment intent |
| /api/payments/confirm | POST | Confirm payment |
| /api/webhooks/stripe | POST | Stripe webhook handler |
| /api/webhooks/clerk | POST | Clerk webhook handler |
| /api/rewards | GET | Get user rewards |
| /api/rewards/redeem | POST | Redeem rewards |
| /api/reviews | POST | Create review |
| /api/reviews/[id] | GET/PUT/DELETE | Review CRUD |
| /api/locations | GET | Get restaurant locations |
| /api/search | GET | Search menu items |
| /api/admin/* | Various | Admin API routes |

---

## 7. Database Schema Overview

### Core Tables
- **users** - User accounts (managed by Clerk)
- **addresses** - Saved user addresses
- **restaurant_locations** - Restaurant locations
- **delivery_zones** - Delivery zone definitions
- **categories** - Menu categories
- **menu_items** - Menu items
- **item_customizations** - Customization options per item
- **customization_options** - Individual customization choices
- **carts** - Shopping carts
- **cart_items** - Items in cart with customizations
- **orders** - Customer orders
- **order_items** - Items in order with customizations
- **order_status_history** - Order status changes
- **payments** - Payment transactions
- **tips** - Tip records
- **reviews** - Customer reviews
- **review_responses** - Restaurant responses to reviews
- **review_reports** - Reported reviews
- **loyalty_points** - Points transactions
- **loyalty_tiers** - Tier definitions
- **coupons** - Coupon definitions
- **user_coupons** - Coupons assigned to users
- **gift_cards** - Gift card definitions
- **gift_card_transactions** - Gift card usage
- **referrals** - Referral records
- **notifications** - In-app notifications
- **inventory** - Stock levels per location
- **banners** - Marketing banners
- **blog_posts** - Blog content
- **pages** - Static pages
- **flash_sales** - Flash sale definitions

---

## 8. Success Criteria

### Launch Requirements
- [ ] All customer-facing pages implemented and polished
- [ ] Full ordering flow working (delivery, pickup, dine-in, scheduled)
- [ ] Payment processing (Stripe) functional
- [ ] Auth working (email, Google, Apple)
- [ ] Admin dashboard with all management features
- [ ] KDS with real-time order updates
- [ ] Driver app with GPS tracking
- [ ] Lighthouse 95+ on all public pages
- [ ] WCAG 2.2 AA compliance verified
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Error handling and edge cases covered
- [ ] Loading states and skeleton screens
- [ ] Empty states for all lists
- [ ] Toast notifications for user actions
- [ ] SEO metadata on all pages

---

*End of Product Specification*
