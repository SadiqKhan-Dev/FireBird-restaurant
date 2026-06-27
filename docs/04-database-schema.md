# FireBird Chicken - Database Schema

## Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions", "fullTextSearch"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pgcrypto, pg_trgm]
}

// ============================================================
// ENUMS
// ============================================================

enum UserRole {
  SUPER_ADMIN
  RESTAURANT_MANAGER
  KITCHEN_STAFF
  CUSTOMER_SUPPORT
  DELIVERY_DRIVER
}

enum OrderStatus {
  PLACED
  CONFIRMED
  PREPARING
  READY
  OUT_FOR_DELIVERY
  DELIVERED
  CANCELLED
  REJECTED
}

enum OrderType {
  DELIVERY
  PICKUP
  DINE_IN
  SCHEDULED
}

enum PaymentStatus {
  PENDING
  COMPLETED
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum PaymentMethod {
  STRIPE
  PAYPAL
  APPLE_PAY
  GOOGLE_PAY
  CASH_ON_DELIVERY
  GIFT_CARD
}

enum LoyaltyTier {
  FLAME
  BLAZE
  INFERNO
  PHOENIX
}

enum NotificationType {
  ORDER_UPDATE
  PROMOTION
  LOYALTY
  SYSTEM
  DELIVERY
}

enum ReviewReportReason {
  SPAM
  INAPPROPRIATE
  OFFENSIVE
  FALSE
  OTHER
}

enum BannerPosition {
  HERO
  ABOVE_MENU
  BELOW_MENU
  SIDEBAR
  POPUP
}

enum DayOfWeek {
  MONDAY
  TUESDAY
  WEDNESDAY
  THURSDAY
  FRIDAY
  SATURDAY
  SUNDAY
}

// ============================================================
// USERS & AUTH
// ============================================================

model User {
  id            String    @id @default(uuid()) @db.Uuid
  clerkId       String    @unique
  email         String    @unique
  firstName     String?
  lastName      String?
  phone         String?
  avatarUrl     String?
  role          UserRole  @default(CUSTOMER_SUPPORT)
  isBlocked     Boolean   @default(false)
  lastLoginAt   DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Relations
  addresses          Address[]
  orders             Order[]
  cart               Cart?
  reviews            Review[]
  reviewReports      ReviewReport[]
  favorites          Favorite[]
  loyaltyPoints      LoyaltyTransaction[]
  loyaltyTier        LoyaltyTier  @default(FLAME)
  userCoupons        UserCoupon[]
  giftCards          GiftCard[]
  giftCardTransactions GiftCardTransaction[]
  referrals          Referral[]         @relation("Referrer")
  referredBy         Referral[]         @relation("Referred")
  notifications      Notification[]
  driverDeliveries   Delivery[]         @relation("Driver")
  staffLocations     StaffLocation[]
  savedPaymentMethods SavedPaymentMethod[]
  orderTips          Tip[]
  customerNotes      CustomerNote[]
  createdAt          DateTime  @default(now())
  updatedAt          DateTime  @updatedAt

  @@index([clerkId])
  @@index([email])
  @@index([role])
}

model Address {
  id            String   @id @default(uuid()) @db.Uuid
  userId        String   @db.Uuid
  label         String?  // Home, Work, Other
  street        String
  apartment     String?
  city          String
  state         String
  zipCode       String
  country       String   @default("US")
  latitude      Float?
  longitude     Float?
  isDefault     Boolean  @default(false)
  deliveryInstructions String?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  // Relations
  user     User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  orders   Order[]

  @@index([userId])
}

model SavedPaymentMethod {
  id            String   @id @default(uuid()) @db.Uuid
  userId        String   @db.Uuid
  stripePaymentMethodId String
  brand         String?  // visa, mastercard, etc.
  last4         String
  expMonth      Int
  expYear       Int
  isDefault     Boolean  @default(false)
  createdAt     DateTime @default(now())

  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

// ============================================================
// RESTAURANT LOCATIONS
// ============================================================

model RestaurantLocation {
  id              String   @id @default(uuid()) @db.Uuid
  name            String
  slug            String   @unique
  address         String
  city            String
  state           String
  zipCode         String
  country         String   @default("US")
  latitude        Float
  longitude       Float
  phone           String
  email           String?
  isActive        Boolean  @default(true)
  timezone        String   @default("America/New_York")
  taxRate         Float    @default(0.0) // percentage
  deliveryFee     Int      @default(0)   // cents
  minimumOrder    Int      @default(0)   // cents
  deliveryRadius  Float    @default(5.0) // miles
  preparationTime Int      @default(15)  // minutes
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  operatingHours     OperatingHour[]
  deliveryZones      DeliveryZone[]
  inventory          Inventory[]
  orders             Order[]
  staffLocations     StaffLocation[]
  menuItems          LocationMenuItem[]
  holidays           Holiday[]

  @@index([slug])
  @@index([zipCode])
  @@index([isActive])
}

model OperatingHour {
  id           String  @id @default(uuid()) @db.Uuid
  locationId   String  @db.Uuid
  dayOfWeek    DayOfWeek
  openTime     String  // "09:00"
  closeTime    String  // "22:00"
  isClosed     Boolean @default(false)

  // Relations
  location RestaurantLocation @relation(fields: [locationId], references: [id], onDelete: Cascade)

  @@unique([locationId, dayOfWeek])
}

model Holiday {
  id          String   @id @default(uuid()) @db.Uuid
  locationId  String   @db.Uuid
  name        String
  date        DateTime @db.Date
  isClosed    Boolean  @default(true)
  openTime    String?
  closeTime   String?

  // Relations
  location RestaurantLocation @relation(fields: [locationId], references: [id], onDelete: Cascade)

  @@index([locationId, date])
}

model DeliveryZone {
  id           String  @id @default(uuid()) @db.Uuid
  locationId   String  @db.Uuid
  zipCode      String
  deliveryFee  Int     @default(0) // cents for this zone
  estimatedTime Int    @default(30) // minutes

  // Relations
  location RestaurantLocation @relation(fields: [locationId], references: [id], onDelete: Cascade)

  @@unique([locationId, zipCode])
}

// ============================================================
// MENU SYSTEM
// ============================================================

model Category {
  id          String   @id @default(uuid()) @db.Uuid
  name        String
  slug        String   @unique
  description String?
  imageUrl    String?
  sortOrder   Int      @default(0)
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  menuItems MenuItem[]

  @@index([slug])
  @@index([sortOrder])
}

model MenuItem {
  id              String   @id @default(uuid()) @db.Uuid
  name            String
  slug            String   @unique
  description     String
  shortDescription String?
  basePrice       Int      // cents
  categoryId      String   @db.Uuid
  imageUrl        String
  thumbnailUrl    String?
  calories        Int?
  allergens       String[] // ["gluten", "dairy", "nuts"]
  isAvailable     Boolean  @default(true)
  isFeatured      Boolean  @default(false)
  isSeasonal      Boolean  @default(false)
  availableFrom   DateTime?
  availableUntil  DateTime?
  preparationTime Int      @default(15) // minutes
  spiceLevel      Int      @default(0)  // 0-4
  tags            String[] // ["spicy", "popular", "new"]
  sortOrder       Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  category          Category          @relation(fields: [categoryId], references: [id])
  customizations    ItemCustomization[]
  cartItems         CartItem[]
  orderItems        OrderItem[]
  favorites         Favorite[]
  reviews           Review[]
  locationAvailability LocationMenuItem[]
  inventory         Inventory[]

  @@index([slug])
  @@index([categoryId])
  @@index([isAvailable])
  @@index([isFeatured])
  @@index([basePrice])
  @@index([spiceLevel])
}

model ItemCustomization {
  id          String  @id @default(uuid()) @db.Uuid
  menuItemId  String  @db.Uuid
  name        String  // "Spice Level", "Sauce", "Toppings"
  type        String  // "single", "multiple", "text"
  isRequired  Boolean @default(false)
  maxSelections Int?  // for multiple type
  sortOrder   Int     @default(0)

  // Relations
  menuItem MenuItem @relation(fields: [menuItemId], references: [id], onDelete: Cascade)
  options  CustomizationOption[]

  @@index([menuItemId])
}

model CustomizationOption {
  id                  String  @id @default(uuid()) @db.Uuid
  itemCustomizationId String  @db.Uuid
  name                String  // "Mild", "BBQ Sauce", "Extra Cheese"
  priceModifier       Int     @default(0) // cents (can be negative for removals)
  isDefault           Boolean @default(false)
  isAvailable         Boolean @default(true)
  sortOrder           Int     @default(0)

  // Relations
  itemCustomization ItemCustomization @relation(fields: [itemCustomizationId], references: [id], onDelete: Cascade)

  @@index([itemCustomizationId])
}

model LocationMenuItem {
  id           String  @id @default(uuid()) @db.Uuid
  locationId   String  @db.Uuid
  menuItemId   String  @db.Uuid
  isAvailable  Boolean @default(true)
  customPrice  Int?    // cents, override base price if set

  // Relations
  location RestaurantLocation @relation(fields: [locationId], references: [id], onDelete: Cascade)
  menuItem MenuItem          @relation(fields: [menuItemId], references: [id], onDelete: Cascade)

  @@unique([locationId, menuItemId])
}

// ============================================================
// SHOPPING CART
// ============================================================

model Cart {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String?  @db.Uuid
  sessionId String?  @unique // for anonymous carts
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user      User?       @relation(fields: [userId], references: [id], onDelete: Cascade)
  items     CartItem[]

  @@index([userId])
  @@index([sessionId])
}

model CartItem {
  id        String   @id @default(uuid()) @db.Uuid
  cartId    String   @db.Uuid
  menuItemId String  @db.Uuid
  quantity  Int      @default(1)
  unitPrice Int      // cents at time of adding
  specialInstructions String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  cart     Cart     @relation(fields: [cartId], references: [id], onDelete: Cascade)
  menuItem MenuItem @relation(fields: [menuItemId], references: [id])
  selectedCustomizations CartItemCustomization[]

  @@index([cartId])
}

model CartItemCustomization {
  id                    String @id @default(uuid()) @db.Uuid
  cartItemId            String @db.Uuid
  customizationOptionId String @db.Uuid
  priceModifier         Int    @default(0) // cents at time of adding

  // Relations
  cartItem            CartItem            @relation(fields: [cartItemId], references: [id], onDelete: Cascade)
  customizationOption CustomizationOption @relation(fields: [customizationOptionId], references: [id])

  @@unique([cartItemId, customizationOptionId])
}

// ============================================================
// ORDERS
// ============================================================

model Order {
  id                String      @id @default(uuid()) @db.Uuid
  orderNumber       String      @unique // display number like "FB-12345"
  userId            String      @db.Uuid
  locationId        String      @db.Uuid
  status            OrderStatus @default(PLACED)
  orderType         OrderType
  subtotal          Int         // cents
  deliveryFee       Int         @default(0) // cents
  tax               Int         @default(0) // cents
  discount          Int         @default(0) // cents
  tipAmount         Int         @default(0) // cents
  total             Int         // cents
  currency          String      @default("USD")
  
  // Delivery info
  deliveryAddressId String?     @db.Uuid
  deliveryAddress   String?     // snapshot of address
  deliveryCity      String?
  deliveryState     String?
  deliveryZip       String?
  deliveryLat       Float?
  deliveryLng       Float?
  deliveryInstructions String?
  
  // Pickup info
  pickupTime        DateTime?
  pickupInstructions String?
  
  // Scheduled info
  scheduledDate     DateTime?   @db.Date
  scheduledTime     String?     // "18:30"
  
  // Dine-in info
  partySize         Int?
  seatingPreference String?
  
  // Payment
  paymentMethod     PaymentMethod
  paymentStatus     PaymentStatus @default(PENDING)
  stripePaymentIntentId String?
  stripePaymentIntentId String?
  paidAt            DateTime?
  
  // Timestamps
  confirmedAt       DateTime?
  preparingAt       DateTime?
  readyAt           DateTime?
  outForDeliveryAt  DateTime?
  deliveredAt       DateTime?
  cancelledAt       DateTime?
  cancellationReason String?
  
  createdAt         DateTime    @default(now())
  updatedAt         DateTime    @updatedAt

  // Relations
  user          User              @relation(fields: [userId], references: [id])
  location      RestaurantLocation @relation(fields: [locationId], references: [id])
  deliveryAddressRel Address?     @relation(fields: [deliveryAddressId], references: [id])
  items         OrderItem[]
  statusHistory OrderStatusHistory[]
  payment       Payment?
  tip           Tip?
  review        Review?
  delivery      Delivery?
  notifications Notification[]
  coupons       OrderCoupon[]

  @@index([userId])
  @@index([locationId])
  @@index([status])
  @@index([orderType])
  @@index([createdAt])
  @@index([orderNumber])
}

model OrderItem {
  id          String @id @default(uuid()) @db.Uuid
  orderId     String @db.Uuid
  menuItemId  String @db.Uuid
  name        String // snapshot
  quantity    Int
  unitPrice   Int    // cents
  totalPrice  Int    // cents
  specialInstructions String?

  // Relations
  order     Order    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  menuItem  MenuItem @relation(fields: [menuItemId], references: [id])
  selectedCustomizations OrderItemCustomization[]

  @@index([orderId])
}

model OrderItemCustomization {
  id                    String @id @default(uuid()) @db.Uuid
  orderItemId           String @db.Uuid
  customizationOptionId String @db.Uuid
  name                  String // snapshot
  priceModifier         Int    @default(0) // cents

  // Relations
  orderItem           OrderItem           @relation(fields: [orderItemId], references: [id], onDelete: Cascade)
  customizationOption CustomizationOption @relation(fields: [customizationOptionId], references: [id])

  @@unique([orderItemId, customizationOptionId])
}

model OrderStatusHistory {
  id        String      @id @default(uuid()) @db.Uuid
  orderId   String      @db.Uuid
  status    OrderStatus
  note      String?
  createdAt DateTime    @default(now())

  // Relations
  order Order @relation(fields: [orderId], references: [id], onDelete: Cascade)

  @@index([orderId])
}

model OrderCoupon {
  id       String @id @default(uuid()) @db.Uuid
  orderId  String @db.Uuid
  couponId String @db.Uuid
  discount Int    // cents

  // Relations
  order  Order  @relation(fields: [orderId], references: [id], onDelete: Cascade)
  coupon Coupon @relation(fields: [couponId], references: [id])

  @@unique([orderId, couponId])
}

// ============================================================
// PAYMENTS
// ============================================================

model Payment {
  id                    String   @id @default(uuid()) @db.Uuid
  orderId               String   @unique @db.Uuid
  stripePaymentIntentId String?  @unique
  stripeChargeId        String?
  paypalOrderId         String?
  amount                Int      // cents
  currency              String   @default("USD")
  status                PaymentStatus @default(PENDING)
  method                PaymentMethod
  metadata              Json?
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt

  // Relations
  order Order @relation(fields: [orderId], references: [id])

  @@index([stripePaymentIntentId])
}

model Tip {
  id      String @id @default(uuid()) @db.Uuid
  orderId String @unique @db.Uuid
  userId  String @db.Uuid
  amount  Int    // cents

  // Relations
  order Order @relation(fields: [orderId], references: [id])
  user  User  @relation(fields: [userId], references: [id])
}

model SavedGiftCard {
  id            String   @id @default(uuid()) @db.Uuid
  code          String   @unique
  balance       Int      // cents
  purchaserId   String?  @db.Uuid
  recipientEmail String?
  recipientName String?
  message       String?
  isActive      Boolean  @default(true)
  expiresAt     DateTime?
  createdAt     DateTime @default(now())

  // Relations
  purchaser    User?                  @relation(fields: [purchaserId], references: [id])
  transactions GiftCardTransaction[]

  @@index([code])
}

model GiftCardTransaction {
  id           String   @id @default(uuid()) @db.Uuid
  giftCardId   String   @db.Uuid
  userId       String?  @db.Uuid
  amount       Int      // cents (positive = add, negative = use)
  orderId      String?  @db.Uuid
  description  String
  createdAt    DateTime @default(now())

  // Relations
  giftCard SavedGiftCard @relation(fields: [giftCardId], references: [id])
  user     User?         @relation(fields: [userId], references: [id])

  @@index([giftCardId])
}

// ============================================================
// LOYALTY & REWARDS
// ============================================================

model LoyaltyTransaction {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  points    Int      // positive = earn, negative = redeem
  type      String   // "earn", "redeem", "expire", "bonus"
  source    String   // "order", "referral", "birthday", "promotion"
  orderId   String?  @db.Uuid
  description String
  expiresAt DateTime?
  createdAt DateTime @default(now())

  // Relations
  user  User  @relation(fields: [userId], references: [id])
  order Order? @relation(fields: [orderId], references: [id])

  @@index([userId])
  @@index([expiresAt])
}

model Coupon {
  id              String   @id @default(uuid()) @db.Uuid
  code            String   @unique
  description     String
  discountType    String   // "percentage", "fixed", "free_item", "bogo", "free_delivery"
  discountValue   Int      // cents or percentage (e.g., 2000 = $20, 20 = 20%)
  minimumOrder    Int      @default(0) // cents
  maximumDiscount Int?     // cents, cap for percentage discounts
  usageLimit      Int?     // null = unlimited
  usageCount      Int      @default(0)
  perUserLimit    Int      @default(1)
  applicableItems String[] // menu item IDs, empty = all items
  excludeItems    String[] // menu item IDs to exclude
  isActive        Boolean  @default(true)
  startsAt        DateTime?
  expiresAt       DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  // Relations
  userCoupons UserCoupon[]
  orders      OrderCoupon[]

  @@index([code])
  @@index([isActive])
}

model UserCoupon {
  id       String @id @default(uuid()) @db.Uuid
  userId   String @db.Uuid
  couponId String @db.Uuid
  usedAt   DateTime?
  orderId  String? @db.Uuid

  // Relations
  user   User   @relation(fields: [userId], references: [id])
  coupon Coupon @relation(fields: [couponId], references: [id])

  @@unique([userId, couponId])
}

model Referral {
  id          String   @id @default(uuid()) @db.Uuid
  referrerId  String   @db.Uuid
  referredId  String?  @db.Uuid
  code        String   @unique
  referredEmail String?
  status      String   @default("pending") // "pending", "completed", "expired"
  rewardEarned Boolean @default(false)
  createdAt   DateTime @default(now())

  // Relations
  referrer User @relation("Referrer", fields: [referrerId], references: [id])
  referred User? @relation("Referred", fields: [referredId], references: [id])

  @@index([code])
  @@index([referrerId])
}

// ============================================================
// REVIEWS
// ============================================================

model Review {
  id        String   @id @default(uuid()) @db.Uuid
  userId    String   @db.Uuid
  menuItemId String  @db.Uuid
  orderId   String?  @db.Uuid
  rating    Int      // 1-5
  title     String?
  text      String?
  photos    String[] // URLs
  isVerified Boolean @default(false) // verified purchase
  isApproved Boolean @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  user     User     @relation(fields: [userId], references: [id])
  menuItem MenuItem @relation(fields: [menuItemId], references: [id])
  order    Order?   @relation(fields: [orderId], references: [id])
  response ReviewResponse?
  reports  ReviewReport[]

  @@unique([userId, menuItemId, orderId]) // one review per user per item per order
  @@index([menuItemId])
  @@index([rating])
}

model ReviewResponse {
  id       String   @id @default(uuid()) @db.Uuid
  reviewId String   @unique @db.Uuid
  text     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Relations
  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
}

model ReviewReport {
  id       String           @id @default(uuid()) @db.Uuid
  reviewId String           @db.Uuid
  userId   String           @db.Uuid
  reason   ReviewReportReason
  details  String?
  status   String           @default("pending") // "pending", "reviewed", "resolved"
  createdAt DateTime        @default(now())

  // Relations
  review Review @relation(fields: [reviewId], references: [id], onDelete: Cascade)
  user   User   @relation(fields: [userId], references: [id])

  @@unique([reviewId, userId])
}

// ============================================================
// INVENTORY
// ============================================================

model Inventory {
  id           String   @id @default(uuid()) @db.Uuid
  locationId   String   @db.Uuid
  menuItemId   String   @db.Uuid
  quantity     Int      @default(0)
  lowStockThreshold Int @default(10)
  lastRestockedAt DateTime?
  updatedAt    DateTime @updatedAt

  // Relations
  location RestaurantLocation @relation(fields: [locationId], references: [id])
  menuItem MenuItem          @relation(fields: [menuItemId], references: [id])

  @@unique([locationId, menuItemId])
  @@index([quantity])
}

// ============================================================
// DELIVERY
// ============================================================

model Delivery {
  id          String   @id @default(uuid()) @db.Uuid
  orderId     String   @unique @db.Uuid
  driverId    String?  @db.Uuid
  status      String   @default("pending") // "pending", "assigned", "picked_up", "in_transit", "delivered"
  driverLat   Float?
  driverLng   Float?
  estimatedArrival DateTime?
  actualArrival    DateTime?
  pickupPhoto  String? // photo proof of pickup
  deliveryPhoto String? // photo proof of delivery
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  // Relations
  order  Order @relation(fields: [orderId], references: [id])
  driver User? @relation("Driver", fields: [driverId], references: [id])

  @@index([driverId])
  @@index([status])
}

// ============================================================
// NOTIFICATIONS
// ============================================================

model Notification {
  id        String           @id @default(uuid()) @db.Uuid
  userId    String           @db.Uuid
  type      NotificationType
  title     String
  message   String
  data      Json?            // additional data (orderId, etc.)
  isRead    Boolean          @default(false)
  createdAt DateTime         @default(now())

  // Relations
  user  User   @relation(fields: [userId], references: [id])
  order Order? @relation(fields: [orderId], references: [id])

  @@index([userId])
  @@index([isRead])
  @@index([createdAt])
}

// ============================================================
// FAVORITES
// ============================================================

model Favorite {
  id         String   @id @default(uuid()) @db.Uuid
  userId     String   @db.Uuid
  menuItemId String   @db.Uuid
  createdAt  DateTime @default(now())

  // Relations
  user     User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  menuItem MenuItem @relation(fields: [menuItemId], references: [id], onDelete: Cascade)

  @@unique([userId, menuItemId])
}

// ============================================================
// MARKETING & CMS
// ============================================================

model Banner {
  id          String       @id @default(uuid()) @db.Uuid
  title       String
  subtitle    String?
  imageUrl    String
  linkUrl     String?
  position    BannerPosition
  isActive    Boolean      @default(true)
  sortOrder   Int          @default(0)
  startsAt    DateTime?
  expiresAt   DateTime?
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt

  @@index([position, isActive])
}

model FlashSale {
  id          String   @id @default(uuid()) @db.Uuid
  name        String
  description String?
  discountType String  // "percentage", "fixed"
  discountValue Int    // cents or percentage
  minimumOrder Int    @default(0) // cents
  startTime   DateTime
  endTime     DateTime
  isActive    Boolean  @default(true)
  usageLimit  Int?
  usageCount  Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([isActive, startTime, endTime])
}

model BlogPost {
  id          String   @id @default(uuid()) @db.Uuid
  title       String
  slug        String   @unique
  excerpt     String?
  content     String   // rich text / markdown
  coverImage  String?
  author      String?
  isPublished Boolean  @default(false)
  publishedAt DateTime?
  tags        String[]
  seoTitle    String?
  seoDescription String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@index([slug])
  @@index([isPublished])
}

model Page {
  id              String   @id @default(uuid()) @db.Uuid
  title           String
  slug            String   @unique
  content         String   // rich text / markdown
  metaTitle       String?
  metaDescription String?
  ogImage         String?
  isPublished     Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@index([slug])
}

// ============================================================
// STAFF MANAGEMENT
// ============================================================

model StaffLocation {
  id         String   @id @default(uuid()) @db.Uuid
  userId     String   @db.Uuid
  locationId String   @db.Uuid
  role       UserRole
  isActive   Boolean  @default(true)
  createdAt  DateTime @default(now())

  // Relations
  user     User               @relation(fields: [userId], references: [id])
  location RestaurantLocation @relation(fields: [locationId], references: [id])

  @@unique([userId, locationId])
}

model CustomerNote {
  id        String   @id @default(uuid()) @db.Uuid
  customerId String  @db.Uuid
  authorId  String   @db.Uuid
  note      String
  createdAt DateTime @default(now())

  // Relations
  customer User @relation("Customer", fields: [customerId], references: [id])
  author   User @relation("Author", fields: [authorId], references: [id])

  @@index([customerId])
}

// ============================================================
// SITE SETTINGS
// ============================================================

model SiteSetting {
  id    String @id @default(uuid()) @db.Uuid
  key   String @unique
  value Json
  updatedAt DateTime @updatedAt

  @@index([key])
}
```

---

## Schema Summary

### Tables Count: 42

| Category | Tables |
|----------|--------|
| Users & Auth | User, Address, SavedPaymentMethod |
| Locations | RestaurantLocation, OperatingHour, Holiday, DeliveryZone |
| Menu | Category, MenuItem, ItemCustomization, CustomizationOption, LocationMenuItem |
| Cart | Cart, CartItem, CartItemCustomization |
| Orders | Order, OrderItem, OrderItemCustomization, OrderStatusHistory, OrderCoupon |
| Payments | Payment, Tip, SavedGiftCard, GiftCardTransaction |
| Loyalty | LoyaltyTransaction, Coupon, UserCoupon, Referral |
| Reviews | Review, ReviewResponse, ReviewReport |
| Inventory | Inventory |
| Delivery | Delivery |
| Notifications | Notification |
| Favorites | Favorite |
| Marketing & CMS | Banner, FlashSale, BlogPost, Page |
| Staff | StaffLocation, CustomerNote |
| Settings | SiteSetting |

### Key Relationships

```
User ──1:N──> Address
User ──1:N──> Order
User ──1:1──> Cart
User ──N:M──> MenuItem (Favorites)
User ──1:N──> Review
User ──1:N──> LoyaltyTransaction
User ──N:M──> Coupon (UserCoupon)

RestaurantLocation ──1:N──> OperatingHour
RestaurantLocation ──1:N──> DeliveryZone
RestaurantLocation ──1:N──> Inventory
RestaurantLocation ──1:N──> Order

Category ──1:N──> MenuItem
MenuItem ──1:N──> ItemCustomization
ItemCustomization ──1:N──> CustomizationOption

Cart ──1:N──> CartItem
CartItem ──N:M──> CustomizationOption (CartItemCustomization)

Order ──1:N──> OrderItem
OrderItem ──N:M──> CustomizationOption (OrderItemCustomization)
Order ──1:1──> Payment
Order ──1:1──> Delivery
Order ──1:N──> OrderStatusHistory

Delivery ──N:1──> User (Driver)
```

---

## Indexes Summary

| Table | Indexes | Purpose |
|-------|---------|---------|
| User | clerkId, email, role | Auth lookup, role filtering |
| MenuItem | slug, categoryId, isAvailable, isFeatured, basePrice, spiceLevel | Menu queries, filtering |
| Order | userId, locationId, status, orderType, createdAt, orderNumber | Order queries, admin dashboard |
| Cart | userId, sessionId | Cart lookup |
| Review | menuItemId, rating | Review queries |
| Notification | userId, isRead, createdAt | Notification center |
| Inventory | quantity | Low stock alerts |

---

*End of Database Schema*
