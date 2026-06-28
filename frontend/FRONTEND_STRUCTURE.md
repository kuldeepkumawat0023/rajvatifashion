# FRONTEND FOLDER STRUCTURE — Rajvati Fashion
> **Reference**: AI-Job-Fit project jaisa reusable, scalable component structure
> **Framework**: Next.js 16 (App Router) | **Tailwind CSS v4** | **TypeScript**

---

## 📁 Complete Folder Structure (`src/` ke andar)

```
src/
│
├── app/                                    # Next.js App Router
│   │
│   ├── globals.css                         # ✅ CENTRALIZED CSS (saari styles yahan)
│   ├── layout.tsx                          # Root layout — fonts, metadata
│   ├── not-found.tsx                       # 404 page
│   ├── robots.ts                           # SEO robots.txt
│   ├── sitemap.ts                          # SEO sitemap
│   │
│   ├── (landing)/                          # 🏠 Route Group: Public landing pages
│   │   ├── layout.tsx                      # Layout with Header + Footer
│   │   ├── page.tsx                        # Home page (/)
│   │   ├── about/
│   │   │   └── page.tsx                    # /about
│   │   ├── contact/
│   │   │   └── page.tsx                    # /contact
│   │   └── track-order/
│   │       └── page.tsx                    # /track-order
│   │
│   ├── (shop)/                             # 🛍️ Route Group: Product/Shopping pages
│   │   ├── layout.tsx                      # Layout with Header + Footer (same)
│   │   ├── shop/
│   │   │   └── page.tsx                    # /shop — All products
│   │   ├── best-sellers/
│   │   │   └── page.tsx                    # /best-sellers
│   │   ├── new-arrivals/
│   │   │   └── page.tsx                    # /new-arrivals
│   │   ├── co-ord-sets/
│   │   │   └── page.tsx                    # /co-ord-sets
│   │   ├── solid-essentials/
│   │   │   └── page.tsx                    # /solid-essentials
│   │   ├── sale/
│   │   │   └── page.tsx                    # /sale
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       └── page.tsx                # /product/nargis-kurti (SSG)
│   │   ├── cart/
│   │   │   └── page.tsx                    # /cart
│   │   ├── checkout/
│   │   │   └── page.tsx                    # /checkout
│   │   └── order-success/
│   │       └── page.tsx                    # /order-success
│   │
│   ├── (auth)/                             # 🔐 Route Group: Login/Register
│   │   ├── layout.tsx                      # Auth layout (no header/footer)
│   │   ├── login/
│   │   │   └── page.tsx                    # /login
│   │   ├── register/
│   │   │   └── page.tsx                    # /register
│   │   ├── forgot-password/
│   │   │   └── page.tsx                    # /forgot-password
│   │   └── reset-password/
│   │       └── page.tsx                    # /reset-password
│   │
│   ├── (account)/                          # 👤 Route Group: My Account (protected)
│   │   ├── layout.tsx                      # Account layout (sidebar)
│   │   └── account/
│   │       ├── page.tsx                    # /account — Dashboard overview
│   │       ├── orders/
│   │       │   ├── page.tsx                # /account/orders — Order history
│   │       │   └── [orderId]/
│   │       │       └── page.tsx            # /account/orders/RJV123
│   │       ├── wishlist/
│   │       │   └── page.tsx                # /account/wishlist
│   │       ├── profile/
│   │       │   └── page.tsx                # /account/profile
│   │       ├── addresses/
│   │       │   └── page.tsx                # /account/addresses
│   │       └── returns/
│   │           └── page.tsx                # /account/returns
│   │
│   └── (legal)/                            # 📄 Route Group: Static legal pages
│       ├── layout.tsx
│       ├── terms/
│       │   └── page.tsx                    # /terms
│       ├── privacy/
│       │   └── page.tsx                    # /privacy
│       └── returns/
│           └── page.tsx                    # /returns
│
├── components/                             # ♻️ Reusable Components
│   │
│   ├── landing/                            # 🏠 Home page sections
│   │   ├── layout/
│   │   │   ├── Header.tsx                  # Sticky header (navbar)
│   │   │   ├── AnnouncementBar.tsx         # Top scrolling bar
│   │   │   ├── MobileMenu.tsx              # Hamburger menu (mobile)
│   │   │   └── Footer.tsx                  # Footer
│   │   ├── home/
│   │   │   ├── HeroSection.tsx             # Hero banner
│   │   │   ├── ShopByCategory.tsx          # Category filter + product grid
│   │   │   ├── TrendingNow.tsx             # Trending carousel
│   │   │   ├── WhyChooseUs.tsx             # Trust features section
│   │   │   ├── Testimonials.tsx            # Customer reviews
│   │   │   ├── InstagramFeed.tsx           # @rajvatifashion feed
│   │   │   └── Newsletter.tsx              # Email subscription
│   │   ├── about/
│   │   │   └── AboutView.tsx
│   │   └── contact/
│   │       └── ContactView.tsx
│   │
│   ├── shop/                               # 🛍️ Shopping pages components
│   │   ├── ProductCard.tsx                 # Reusable product card
│   │   ├── ProductGrid.tsx                 # Grid wrapper
│   │   ├── ProductFilters.tsx              # Left sidebar filters
│   │   ├── FilterTabs.tsx                  # All/Best Sellers/New Arrivals tabs
│   │   ├── SortBar.tsx                     # Sort + view toggle
│   │   ├── SearchBar.tsx                   # Live autocomplete search
│   │   ├── SearchDropdown.tsx              # Search results dropdown
│   │   └── CategoryBanner.tsx              # Page header banner
│   │
│   ├── product/                            # 👗 Product Detail page
│   │   ├── ProductGallery.tsx              # Image gallery + zoom
│   │   ├── ProductInfo.tsx                 # Name, price, tags
│   │   ├── SizeSelector.tsx                # Size buttons (XS-XL)
│   │   ├── SizeGuideModal.tsx              # Size chart popup
│   │   ├── QuantitySelector.tsx            # - 1 + counter
│   │   ├── TrustBadges.tsx                 # Free shipping, COD, Made in India
│   │   ├── OfferBadges.tsx                 # 5%/10% offer tags
│   │   ├── ProductTabs.tsx                 # Description/Info/Reviews tabs
│   │   ├── ReviewsList.tsx                 # Customer reviews list
│   │   ├── ReviewForm.tsx                  # Write a review
│   │   └── RelatedProducts.tsx             # Related products section
│   │
│   ├── cart/                               # 🛒 Cart page
│   │   ├── CartItem.tsx                    # Single cart row
│   │   ├── CartSummary.tsx                 # Price breakdown
│   │   ├── CouponInput.tsx                 # Coupon code field
│   │   └── EmptyCart.tsx                   # Empty state
│   │
│   ├── checkout/                           # 💳 Checkout page
│   │   ├── CheckoutSteps.tsx               # Step 1/2/3 progress bar
│   │   ├── PersonalInfoForm.tsx            # Name, Email, Phone
│   │   ├── AddressForm.tsx                 # Shipping address
│   │   ├── PaymentSelector.tsx             # COD / Online
│   │   ├── OrderSummary.tsx                # Right side order preview
│   │   └── RazorpayButton.tsx              # Online payment trigger
│   │
│   ├── account/                            # 👤 My Account pages
│   │   ├── layout/
│   │   │   ├── AccountSidebar.tsx          # Left nav: Orders, Profile, etc.
│   │   │   └── AccountLayout.tsx
│   │   ├── dashboard/
│   │   │   └── AccountDashboardView.tsx    # Overview: stats, quick links
│   │   ├── orders/
│   │   │   ├── OrderHistoryView.tsx        # Orders list
│   │   │   └── OrderDetailView.tsx         # Single order detail
│   │   ├── wishlist/
│   │   │   └── WishlistView.tsx
│   │   ├── profile/
│   │   │   └── ProfileEditView.tsx
│   │   ├── addresses/
│   │   │   ├── AddressBookView.tsx
│   │   │   └── AddressForm.tsx
│   │   └── returns/
│   │       └── ReturnRequestView.tsx
│   │
│   ├── auth/                               # 🔐 Auth forms
│   │   ├── AuthLayout.tsx                  # Split layout (form + brand image)
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   └── ResetPasswordForm.tsx
│   │
│   └── common/                             # ✅ Shared / Reusable components
│       ├── Button.tsx                      # Primary, Secondary, Outline variants
│       ├── Input.tsx                       # Form input with label + error
│       ├── Select.tsx                      # Dropdown select
│       ├── Textarea.tsx                    # Multiline input
│       ├── Badge.tsx                       # Status/tag badges
│       ├── Modal.tsx                       # Base modal wrapper
│       ├── ConfirmDialog.tsx               # Delete/confirm popup
│       ├── Loader.tsx                      # Spinner + skeleton
│       ├── SkeletonCard.tsx                # Product card skeleton
│       ├── Toast.tsx                       # Notification toasts
│       ├── StarRating.tsx                  # Star rating (read + write)
│       ├── Breadcrumb.tsx                  # Page breadcrumb
│       ├── Pagination.tsx                  # Page navigation
│       ├── EmptyState.tsx                  # No data found
│       └── ScrollToTop.tsx                 # Auto scroll to top on navigate
│
├── hooks/                                  # 🪝 Custom React Hooks
│   ├── useCart.ts                          # Cart add/remove/update logic
│   ├── useWishlist.ts                      # Wishlist toggle logic
│   ├── useAuth.ts                          # Login state, user info
│   ├── useSearch.ts                        # Live search with debounce
│   ├── useProducts.ts                      # Fetch products with filters
│   ├── useOrders.ts                        # Fetch order history
│   └── useRazorpay.ts                      # Payment integration hook
│
├── lib/                                    # 📦 API + Utilities
│   ├── apiClient.ts                        # Axios instance (base URL, interceptors)
│   └── services/                           # API calls by feature
│       ├── auth.services.ts                # Login, register, logout
│       ├── product.services.ts             # Get products, search, filters
│       ├── order.services.ts               # Place order, track, history
│       ├── user.services.ts                # Profile, addresses
│       ├── payment.services.ts             # Razorpay create + verify
│       ├── coupon.services.ts              # Apply coupon code
│       ├── review.services.ts              # Submit + fetch reviews
│       └── wishlist.services.ts            # Add/remove wishlist
│
├── store/                                  # 🗂️ State Management (Zustand)
│   ├── store.ts                            # Root store (combine slices)
│   ├── cartSlice.ts                        # Cart items state
│   ├── wishlistSlice.ts                    # Wishlist state
│   ├── authSlice.ts                        # User auth state
│   └── hooks/
│       └── storeHooks.ts                   # Typed useAppStore hooks
│
├── provider/                               # 🔌 Context Providers
│   ├── StoreProvider.tsx                   # Zustand store hydration (SSR safe)
│   ├── HydrationGuard.tsx                  # SSR hydration mismatch fix
│   ├── ThemeProvider.tsx                   # Dark/Light mode (next-themes)
│   ├── GoogleAuthProvider.tsx              # Google OAuth session provider
│   └── AppProviders.tsx                    # Sab providers ek jagah wrap
│
├── types/                                  # 📝 TypeScript Types
│   ├── product.ts                          # Product, Category types
│   ├── order.ts                            # Order, OrderItem types
│   ├── user.ts                             # User, Address types
│   ├── cart.ts                             # Cart types
│   └── api.ts                              # API response types
│
└── utils/                                  # 🔧 Helper Functions
    ├── cn.ts                               # className utility (clsx)
    ├── formatPrice.ts                      # Rs.499 formatting
    ├── calcDiscount.ts                     # Discount % calculate
    ├── seoConfig.ts                        # SEO metadata helper
    └── validators.ts                       # Form validation helpers
```

---

## 🔁 Route Groups — Kya Hote Hain?

```
(landing)  → Public pages — Header + Footer ke saath
(shop)     → Shopping pages — Header + Footer ke saath
(auth)     → Login/Register — Clean layout, no header/footer
(account)  → My Account — Account sidebar ke saath (protected)
(legal)    → Terms/Privacy — Simple layout
```

> **Note**: Route groups `(folder)` se URL affect **nahi** hota.  
> e.g. `(shop)/cart/page.tsx` → URL hoga `/cart` — `(shop)` URL mein nahi aata.

---

## 🔌 Providers — Detail

### 1. `AppProviders.tsx` — Sab providers wrap karta hai

```tsx
// src/provider/AppProviders.tsx
// Root layout mein yeh ek file import karni hai — sab providers yahan
'use client'
import { ThemeProvider } from './ThemeProvider'
import { GoogleAuthProvider } from './GoogleAuthProvider'
import { StoreProvider } from './StoreProvider'
import { HydrationGuard } from './HydrationGuard'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <GoogleAuthProvider>
      <ThemeProvider>
        <StoreProvider>
          <HydrationGuard>
            {children}
          </HydrationGuard>
        </StoreProvider>
      </ThemeProvider>
    </GoogleAuthProvider>
  )
}
```

---

### 2. `ThemeProvider.tsx` — Dark / Light Mode

```tsx
// src/provider/ThemeProvider.tsx
// next-themes se dark/light mode support
'use client'
import { ThemeProvider as NextThemeProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"        // HTML class toggle: <html class="dark">
      defaultTheme="light"     // Default: light mode
      enableSystem={false}     // System preference ignore karo
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  )
}
```

**Install**: `npm install next-themes`

**Use in any component**:
```tsx
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  )
}
```

**globals.css mein dark mode colors**:
```css
/* Dark mode CSS variables */
.dark {
  --color-bg:      #0F0F0F;
  --color-text:    #F5F0EB;
  --color-border:  #2A2A2A;
  --color-white:   #1A1A1A;
}
```

---

### 3. `GoogleAuthProvider.tsx` — Google Login

```tsx
// src/provider/GoogleAuthProvider.tsx
// Next-Auth SessionProvider — Google OAuth ke liye
'use client'
import { SessionProvider } from 'next-auth/react'

export function GoogleAuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}
```

**Install**: `npm install next-auth`

**Setup** (`src/app/api/auth/[...nextauth]/route.ts`):
```ts
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Yahan backend ko Google user info bhejo
      // User register karva do ya existing user find karo
      return true
    },
    async session({ session }) {
      return session
    },
  },
})

export { handler as GET, handler as POST }
```

**`.env.local` mein add karo**:
```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_random_secret
NEXTAUTH_URL=http://localhost:3000
```

**Login page mein Google button**:
```tsx
// components/auth/LoginForm.tsx
import { signIn } from 'next-auth/react'

<button
  onClick={() => signIn('google', { callbackUrl: '/' })}
  className="btn btn-outline btn-full flex items-center gap-3"
>
  <img src="/icons/google.svg" alt="Google" width={20} height={20} />
  Google se Login karo
</button>
```

---

### 4. `StoreProvider.tsx` — Zustand SSR Safe

```tsx
// src/provider/StoreProvider.tsx
// Zustand store ko SSR ke saath properly hydrate karta hai
'use client'
import { useRef } from 'react'

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // Zustand persist middleware localStorage se automatically hydrate karta hai
  // Yeh provider future ke liye extendable hai (Redux jaisa agar kabhi switch karna ho)
  return <>{children}</>
}
```

---

### 5. `HydrationGuard.tsx` — SSR Mismatch Fix

```tsx
// src/provider/HydrationGuard.tsx
// Client-only components (localStorage, window) ke liye hydration mismatch rokta hai
'use client'
import { useEffect, useState } from 'react'

export function HydrationGuard({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Jab tak client-side mount na ho, children render mat karo
  if (!mounted) return null

  return <>{children}</>
}
```

**Kab use karo**: Cart count badge, Theme toggle, Wishlist — jo localStorage pe depend karte hain.

---

## 📂 Components Design Pattern

### AI-Job-Fit jaisi pattern follow karna:

```
components/
  [feature]/           # Feature ka naam (landing, shop, product, account)
    [SubFolder]/       # Sub-feature
      [FeatureView].tsx  # Main view component (page ka content)
  common/              # Shared across features
```

### Rule: Page file (`page.tsx`) mein sirf View import hogi

```tsx
// app/(shop)/shop/page.tsx
import ShopView from '@/components/shop/ShopView'

export default function ShopPage() {
  return <ShopView />
}
```

```tsx
// components/shop/ShopView.tsx — actual UI yahan hogi
export default function ShopView() {
  return (
    <div>
      <FilterTabs />
      <ProductFilters />
      <ProductGrid />
      <Pagination />
    </div>
  )
}
```

---

## 🔗 Services Pattern (API Calls)

```ts
// lib/services/product.services.ts
import apiClient from '../apiClient'

export const productServices = {
  getAll: (params) => apiClient.get('/products', { params }),
  getBySlug: (slug) => apiClient.get(`/products/${slug}`),
  getBestSellers: () => apiClient.get('/products/best-sellers'),
  getNewArrivals: () => apiClient.get('/products/new-arrivals'),
  search: (q) => apiClient.get('/products/search', { params: { q } }),
}
```

```ts
// lib/apiClient.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
})

// Auth token attach
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default apiClient
```

---

## 🗂️ Zustand Store Pattern

```ts
// store/cartSlice.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  size: string
  qty: number
}

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQty: (id: string, size: string, qty: number) => void
  clearCart: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(i => i.id === item.id && i.size === item.size)
        if (existing) {
          set(s => ({ items: s.items.map(i =>
            i.id === item.id && i.size === item.size
              ? { ...i, qty: i.qty + item.qty }
              : i
          )}))
        } else {
          set(s => ({ items: [...s.items, item] }))
        }
      },
      removeItem: (id, size) =>
        set(s => ({ items: s.items.filter(i => !(i.id === id && i.size === size)) })),
      updateQty: (id, size, qty) =>
        set(s => ({ items: s.items.map(i =>
          i.id === id && i.size === size ? { ...i, qty } : i
        )})),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((s, i) => s + i.qty, 0),
      totalPrice: () => get().items.reduce((s, i) => s + i.price * i.qty, 0),
    }),
    { name: 'rajvati-cart' }  // localStorage mein save hoga
  )
)
```

---

## 🪝 Custom Hook Pattern

```ts
// hooks/useSearch.ts
import { useState, useEffect } from 'react'
import { productServices } from '@/lib/services/product.services'

export function useSearch() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (query.length < 2) { setResults([]); return }

    const timeout = setTimeout(async () => {
      setLoading(true)
      const res = await productServices.search(query)
      setResults(res.data.products)
      setLoading(false)
    }, 300)  // 300ms debounce

    return () => clearTimeout(timeout)
  }, [query])

  return { query, setQuery, results, loading }
}
```

---

## ✅ Common Component Pattern

```tsx
// components/common/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
  type?: 'button' | 'submit' | 'reset'
  className?: string
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'btn'
  const variants = {
    primary:   'btn-primary',
    secondary: 'btn-secondary',
    outline:   'btn-outline',
    ghost:     'btn-ghost',
    danger:    'btn-danger',
  }
  const sizes = {
    sm: 'btn-sm',
    md: '',
    lg: 'btn-lg',
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <span className="spinner-sm" /> : children}
    </button>
  )
}
```

---

## 📋 Build Priority (Konsa Pehle Banana Hai)

| Priority | Component/Page | File |
|----------|---------------|------|
| 1 | `globals.css` | Poori CSS centralized |
| 2 | Header + Footer | `components/landing/layout/` |
| 3 | AnnouncementBar | `components/landing/layout/` |
| 4 | Home page | `components/landing/home/` |
| 5 | ProductCard | `components/shop/ProductCard.tsx` |
| 6 | ProductGrid | `components/shop/ProductGrid.tsx` |
| 7 | Shop page | `app/(shop)/shop/page.tsx` |
| 8 | Product Detail | `app/(shop)/product/[slug]/page.tsx` |
| 9 | Cart page | `app/(shop)/cart/page.tsx` |
| 10 | Checkout | `app/(shop)/checkout/page.tsx` |
| 11 | Auth pages | `app/(auth)/` |
| 12 | My Account | `app/(account)/account/` |

---

## 🚀 Next Steps — Kya Karna Hai?

```bash
# 1. Packages install karo
cd frontend
npm install axios zustand clsx

# 2. Folder structure banao (manually ya script se)

# 3. globals.css mein brand CSS copy karo (FRONTEND_GUIDE.md se)

# 4. layout.tsx update karo — Playfair Display + Inter fonts

# 5. Pehla component banao: Header.tsx
```

---

*Last Updated: June 2026*
