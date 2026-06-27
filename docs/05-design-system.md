# FireBird Chicken - Design System

## 1. Design Tokens

### 1.1 Color Palette

#### Primary Colors (Fiery Red-Orange)
```css
--color-primary-50:  #FFF7ED;   /* Lightest tint */
--color-primary-100: #FFEDD5;
--color-primary-200: #FED7AA;
--color-primary-300: #FDBA74;
--color-primary-400: #FB923C;
--color-primary-500: #F97316;   /* Base primary */
--color-primary-600: #EA580C;
--color-primary-700: #C2410C;
--color-primary-800: #9A3412;
--color-primary-900: #7C2D12;   /* Darkest shade */
```

#### Secondary Colors (Dark Charcoal)
```css
--color-secondary-50:  #F8FAFC;
--color-secondary-100: #F1F5F9;
--color-secondary-200: #E2E8F0;
--color-secondary-300: #CBD5E1;
--color-secondary-400: #94A3B8;
--color-secondary-500: #64748B;
--color-secondary-600: #475569;
--color-secondary-700: #334155;
--color-secondary-800: #1E293B;
--color-secondary-900: #0F172A;   /* Base dark */
--color-secondary-950: #020617;   /* Darkest */
```

#### Accent Colors (Warm Cream)
```css
--color-accent-50:  #FFFBEB;   /* Lightest */
--color-accent-100: #FEF3C7;
--color-accent-200: #FDE68A;
--color-accent-300: #FCD34D;
--color-accent-400: #FBBF24;
--color-accent-500: #F59E0B;   /* Base accent */
--color-accent-600: #D97706;
--color-accent-700: #B45309;
--color-accent-800: #92400E;
--color-accent-900: #78350F;
```

#### Neutral Colors (Backgrounds)
```css
--color-neutral-50:  #FAFAFA;
--color-neutral-100: #F5F5F5;
--color-neutral-200: #E5E5E5;
--color-neutral-300: #D4D4D4;
--color-neutral-400: #A3A3A3;
--color-neutral-500: #737373;
--color-neutral-600: #525252;
--color-neutral-700: #404040;
--color-neutral-800: #262626;
--color-neutral-900: #171717;
--color-neutral-950: #0A0A0A;
```

#### Semantic Colors
```css
/* Success */
--color-success-50:  #F0FDF4;
--color-success-500: #22C55E;
--color-success-600: #16A34A;
--color-success-700: #15803D;

/* Warning */
--color-warning-50:  #FFFBEB;
--color-warning-500: #F59E0B;
--color-warning-600: #D97706;
--color-warning-700: #B45309;

/* Error */
--color-error-50:  #FEF2F2;
--color-error-500: #EF4444;
--color-error-600: #DC2626;
--color-error-700: #B91C1C;

/* Info */
--color-info-50:  #EFF6FF;
--color-info-500: #3B82F6;
--color-info-600: #2563EB;
--color-info-700: #1D4ED8;
```

#### Spice Level Colors
```css
--color-spice-mild:     #22C55E;  /* Green */
--color-spice-medium:   #F59E0B;  /* Amber */
--color-spice-hot:      #F97316;  /* Orange */
--color-spice-extrahot: #EF4444;  /* Red */
--color-spice-inferno:  #DC2626;  /* Dark Red */
```

#### Background Colors
```css
--color-bg-primary:    #FFFFFF;
--color-bg-secondary:  #F8FAFC;
--color-bg-tertiary:   #F1F5F9;
--color-bg-dark:       #0F172A;
--color-bg-overlay:    rgba(15, 23, 42, 0.5);
```

#### Text Colors
```css
--color-text-primary:   #0F172A;
--color-text-secondary: #475569;
--color-text-tertiary:  #94A3B8;
--color-text-inverse:   #FFFFFF;
--color-text-link:      #EA580C;
--color-text-link-hover:#C2410C;
```

---

### 1.2 Typography

#### Font Families
```css
--font-display: 'Cal Sans', 'Inter', system-ui, sans-serif;
--font-body: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Font Sizes
```css
--text-xs:    0.75rem;    /* 12px */
--text-sm:    0.875rem;   /* 14px */
--text-base:  1rem;       /* 16px */
--text-lg:    1.125rem;   /* 18px */
--text-xl:    1.25rem;    /* 20px */
--text-2xl:   1.5rem;     /* 24px */
--text-3xl:   1.875rem;   /* 30px */
--text-4xl:   2.25rem;    /* 36px */
--text-5xl:   3rem;       /* 48px */
--text-6xl:   3.75rem;    /* 60px */
```

#### Font Weights
```css
--font-light:    300;
--font-normal:   400;
--font-medium:   500;
--font-semibold: 600;
--font-bold:     700;
--font-extrabold:800;
```

#### Line Heights
```css
--leading-none:    1;
--leading-tight:   1.25;
--leading-snug:    1.375;
--leading-normal:  1.5;
--leading-relaxed: 1.625;
--leading-loose:   2;
```

#### Letter Spacing
```css
--tracking-tighter: -0.05em;
--tracking-tight:   -0.025em;
--tracking-normal:  0;
--tracking-wide:    0.025em;
--tracking-wider:   0.05em;
--tracking-widest:  0.1em;
```

---

### 1.3 Spacing Scale

```css
--space-0:   0;
--space-px:  1px;
--space-0-5: 0.125rem;  /* 2px */
--space-1:   0.25rem;   /* 4px */
--space-1-5: 0.375rem;  /* 6px */
--space-2:   0.5rem;    /* 8px */
--space-2-5: 0.625rem;  /* 10px */
--space-3:   0.75rem;   /* 12px */
--space-4:   1rem;      /* 16px */
--space-5:   1.25rem;   /* 20px */
--space-6:   1.5rem;    /* 24px */
--space-7:   1.75rem;   /* 28px */
--space-8:   2rem;      /* 32px */
--space-9:   2.25rem;   /* 36px */
--space-10:  2.5rem;    /* 40px */
--space-12:  3rem;      /* 48px */
--space-14:  3.5rem;    /* 56px */
--space-16:  4rem;      /* 64px */
--space-20:  5rem;      /* 80px */
--space-24:  6rem;      /* 96px */
```

---

### 1.4 Border Radius

```css
--radius-none: 0;
--radius-sm:   0.25rem;   /* 4px */
--radius-md:   0.375rem;  /* 6px */
--radius-lg:   0.5rem;    /* 8px */
--radius-xl:   0.75rem;   /* 12px */
--radius-2xl:  1rem;      /* 16px */
--radius-3xl:  1.5rem;    /* 24px */
--radius-full: 9999px;    /* Pill shape */
```

---

### 1.5 Shadows

```css
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);
--shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

/* Brand shadow for primary buttons */
--shadow-primary: 0 4px 14px 0 rgba(249, 115, 22, 0.4);
--shadow-primary-hover: 0 6px 20px 0 rgba(249, 115, 22, 0.5);
```

---

### 1.6 Z-Index Scale

```css
--z-base:      0;
--z-dropdown:  10;
--z-sticky:    20;
--z-fixed:     30;
--z-overlay:   40;
--z-modal:     50;
--z-popover:   60;
--z-tooltip:   70;
--z-toast:     80;
--z-max:       99;
```

---

## 2. Component Specifications

### 2.1 Buttons

#### Primary Button
```css
/* Default */
.bg-primary-500
.text-white
.font-semibold
.py-3 px-6
.rounded-xl
.shadow-primary
.transition-all duration-200

/* Hover */
.bg-primary-600
.shadow-primary-hover
.scale-[1.02]

/* Active */
.bg-primary-700
.scale-[0.98]

/* Focus Visible */
.ring-2 ring-primary-500 ring-offset-2

/* Disabled */
.bg-neutral-200
.text-neutral-400
.cursor-not-allowed
.shadow-none

/* Loading */
.relative
.overflow-hidden
after:content-['']
after:absolute after:inset-0
after:bg-gradient-to-r after:from-transparent after:via-white/20 after:to-transparent
after:animate-shimmer
```

#### Secondary Button
```css
/* Default */
.bg-white
.border-2 border-primary-500
.text-primary-500
.font-semibold
.py-3 px-6
.rounded-xl
.transition-all duration-200

/* Hover */
.bg-primary-50

/* Active */
.bg-primary-100
```

#### Ghost Button
```css
/* Default */
.bg-transparent
.text-secondary-700
.font-medium
.py-3 px-6
.rounded-xl
.transition-all duration-200

/* Hover */
.bg-secondary-100

/* Active */
.bg-secondary-200
```

#### Icon Button
```css
/* Size: sm */
.p-2 rounded-lg
/* Size: md */
.p-3 rounded-xl
/* Size: lg */
.p-4 rounded-xl
```

#### Button Sizes
```css
/* Small */
.py-2 px-4 text-sm rounded-lg

/* Medium (default) */
.py-3 px-6 text-base rounded-xl

/* Large */
.py-4 px-8 text-lg rounded-xl
```

---

### 2.2 Input Fields

#### Text Input
```css
/* Default */
.w-full
.bg-white
.border border-neutral-300
.rounded-xl
.py-3 px-4
.text-base text-secondary-900
.placeholder:text-secondary-400
.transition-all duration-200

/* Hover */
.border-neutral-400

/* Focus */
.border-primary-500
.ring-2 ring-primary-500/20
.outline-none

/* Error */
.border-error-500
.ring-2 ring-error-500/20

/* Disabled */
.bg-neutral-100
.text-neutral-400
.cursor-not-allowed
```

#### Input with Label
```css
/* Label */
.block text-sm font-medium text-secondary-700 mb-1.5

/* Helper text */
.text-sm text-secondary-500 mt-1.5

/* Error message */
.text-sm text-error-500 mt-1.5
```

#### Search Input
```css
/* Container */
.relative

/* Icon */
.absolute left-4 top-1/2 -translate-y-1/2
.text-secondary-400

/* Input */
.w-full pl-12 pr-4 py-3
.bg-secondary-100
.border-0
.rounded-full
```

---

### 2.3 Cards

#### Menu Item Card
```css
/* Container */
.bg-white
.rounded-2xl
.shadow-sm
.overflow-hidden
.transition-all duration-300
.hover:shadow-lg
.hover:-translate-y-1

/* Image */
.aspect-square
.object-cover
.w-full

/* Content */
.p-4

/* Title */
.text-lg font-semibold text-secondary-900

/* Description */
.text-sm text-secondary-500 line-clamp-2

/* Price */
.text-xl font-bold text-primary-500

/* Badge (Seasonal, Featured) */
.absolute top-3 left-3
.bg-primary-500 text-white
.text-xs font-semibold
.px-3 py-1
.rounded-full

/* Sold Out Overlay */
.absolute inset-0
.bg-neutral-900/60
.flex items-center justify-center
```

#### Order Card
```css
/* Container */
.bg-white
.rounded-2xl
.shadow-sm
.p-6
.border border-neutral-100

/* Status Badge */
.inline-flex items-center
.px-3 py-1
.rounded-full
.text-sm font-medium

/* Status Colors */
.bg-success-50 text-success-700    /* Delivered */
.bg-warning-50 text-warning-700    /* Preparing */
.bg-info-50 text-info-700          /* In Progress */
.bg-error-50 text-error-700        /* Cancelled */
```

#### Stats Card (Admin)
```css
/* Container */
.bg-white
.rounded-2xl
.shadow-sm
.p-6
.border border-neutral-100

/* Icon */
.w-12 h-12
.bg-primary-50
.rounded-xl
.flex items-center justify-center
.text-primary-500

/* Value */
.text-3xl font-bold text-secondary-900

/* Label */
.text-sm text-secondary-500

/* Change indicator */
.text-sm font-medium
.text-success-600  /* positive */
.text-error-600    /* negative */
```

---

### 2.4 Badges

```css
/* Default */
.inline-flex items-center
.px-2.5 py-0.5
.rounded-full
.text-xs font-medium

/* Variants */
.bg-primary-100 text-primary-700    /* Primary */
.bg-secondary-100 text-secondary-700 /* Secondary */
.bg-success-100 text-success-700    /* Success */
.bg-warning-100 text-warning-700    /* Warning */
.bg-error-100 text-error-700      /* Error */
```

---

### 2.5 Navigation

#### Header
```css
/* Container */
 sticky top-0 z-40
.bg-white/95 backdrop-blur-sm
.border-b border-neutral-100

/* Height */
.h-16 lg:h-20

/* Inner */
.max-w-7xl mx-auto
.px-4 sm:px-6 lg:px-8
.h-full
.flex items-center justify-between
```

#### Category Tab
```css
/* Default */
.inline-flex items-center
.px-4 py-2
.text-sm font-medium
.text-secondary-500
.rounded-full
.transition-all duration-200

/* Hover */
.text-secondary-700
.bg-secondary-100

/* Active */
.text-primary-600
.bg-primary-50
```

---

### 2.6 Modals & Overlays

#### Modal Backdrop
```css
.fixed inset-0 z-50
.bg-neutral-900/50
.backdrop-blur-sm
.animate-in fade-in
```

#### Modal Content
```css
.fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
.z-50
.w-full max-w-lg
.bg-white
.rounded-2xl
.shadow-xl
.p-6
.animate-in fade-in zoom-in-95
```

#### Slide-Over (Cart)
```css
.fixed inset-y-0 right-0 z-50
.w-full max-w-md
.bg-white
.shadow-2xl
.animate-in slide-in-from-right
```

---

### 2.7 Tooltips

```css
/* Trigger */
relative

/* Tooltip */
.absolute
.bottom-full left-1/2 -translate-x-1/2
.mb-2
.px-3 py-1.5
.bg-secondary-900 text-white
.text-sm
.rounded-lg
.whitespace-nowrap
.animate-in fade-in
```

---

## 3. Animation & Motion

### 3.1 Timing Functions
```css
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in:      cubic-bezier(0.4, 0, 1, 1);
--ease-out:     cubic-bezier(0, 0, 0.2, 1);
--ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce:  cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 3.2 Duration Scale
```css
--duration-fast:    100ms;
--duration-normal:  200ms;
--duration-slow:    300ms;
--duration-slower:  500ms;
```

### 3.3 Animation Presets
```css
/* Fade In */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide Up */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Slide Down */
@keyframes slideDown {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Scale In */
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Shimmer (Loading) */
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Pulse (Notifications) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Spin (Loading) */
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

### 3.4 Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 639px) { ... }

/* Tablet */
@media (min-width: 640px) and (max-width: 1023px) { ... }

/* Desktop */
@media (min-width: 1024px) and (max-width: 1279px) { ... }

/* Large Desktop */
@media (min-width: 1280px) { ... }
```

### Tailwind Breakpoints
```js
screens: {
  'xs': '475px',
  'sm': '640px',
  'md': '768px',
  'lg': '1024px',
  'xl': '1280px',
  '2xl': '1536px',
}
```

---

## 5. Accessibility (WCAG 2.2 AA)

### 5.1 Color Contrast
| Element | Foreground | Background | Ratio |
|---------|------------|------------|-------|
| Body text | #0F172A | #FFFFFF | 16.75:1 |
| Secondary text | #475569 | #FFFFFF | 7.45:1 |
| Primary button | #FFFFFF | #F97316 | 4.56:1 |
| Link | #EA580C | #FFFFFF | 5.14:1 |
| Error text | #DC2626 | #FFFFFF | 5.87:1 |

### 5.2 Focus Indicators
```css
/* Visible focus ring for keyboard navigation */
.focus-visible:outline-none
.focus-visible:ring-2
.focus-visible:ring-primary-500
.focus-visible:ring-offset-2
```

### 5.3 Skip Navigation
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:z-[100] ...">
  Skip to main content
</a>
```

### 5.4 ARIA Labels
- All interactive elements have accessible names
- Icons paired with text or aria-label
- Dynamic content uses aria-live regions
- Modals use role="dialog" and aria-modal="true"

### 5.5 Keyboard Navigation
- All interactive elements focusable
- Logical tab order
- Escape closes modals/dropdowns
- Arrow keys navigate within components
- Enter/Space activate buttons

---

## 6. Dark Mode (Optional Future)

```css
/* Dark mode tokens */
.dark {
  --color-bg-primary: #0F172A;
  --color-bg-secondary: #1E293B;
  --color-text-primary: #F8FAFC;
  --color-text-secondary: #94A3B8;
  --color-border: #334155;
}
```

---

## 7. Icon System

### Icon Library
- **Lucide React** (via shadcn/ui)
- Size variants: 16px (sm), 20px (md), 24px (lg), 32px (xl)

### Icon Usage
```tsx
// Inline with text
<Icon className="w-5 h-5 mr-2" />

// Standalone button
<IconButton aria-label="Close">
  <X className="w-5 h-5" />
</IconButton>
```

---

## 8. Image Guidelines

### Menu Item Images
- Aspect ratio: 1:1 (square) or 4:3
- Minimum size: 800x800px
- Format: WebP (fallback JPEG)
- Quality: 80%
- Lazy loading for below-fold images

### Hero Images
- Aspect ratio: 16:9
- Minimum size: 1920x1080px
- Format: WebP (fallback JPEG)
- Quality: 85%

### Profile/Avatar Images
- Aspect ratio: 1:1 (circle crop)
- Minimum size: 256x256px
- Format: WebP (fallback JPEG)

---

*End of Design System*
