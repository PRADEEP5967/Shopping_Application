# Project Architecture & Documentation

## 🏗️ Architecture Overview

### Technology Stack
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite
- **Routing**: React Router DOM v6
- **UI Framework**: Tailwind CSS with Shadcn UI components
- **State Management**: React Context API
- **Data Persistence**: LocalStorage
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Theme**: Forced Dark Mode with Modern Design System

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn UI components (Button, Card, Input, etc.)
│   ├── account/        # Account management components
│   ├── admin/          # Admin dashboard components
│   ├── analytics/      # Analytics & A/B testing
│   ├── auth/           # Authentication components
│   ├── branding/       # Logo and branding elements
│   ├── cart/           # Shopping cart components
│   ├── category/       # Category-specific components
│   ├── checkout/       # Checkout flow components
│   ├── contact/        # Contact form components
│   ├── deals/          # Deals and promotions
│   ├── features/       # Product comparison features
│   ├── inventory/      # Inventory tracking
│   ├── marketing/      # Marketing components (coupons, newsletters)
│   ├── modern/         # Modern design components
│   ├── navbar/         # Navigation components
│   ├── order/          # Order management
│   ├── portfolio/      # Portfolio components
│   ├── product/        # Product display components
│   ├── reviews/        # Review system
│   ├── search/         # Search functionality
│   ├── sections/       # Page sections
│   ├── services/       # Service components
│   ├── shared/         # Shared utilities
│   ├── smallbusiness/  # Small business features
│   └── tracking/       # Order tracking
│
├── contexts/           # React Context providers
│   ├── AuthContext.tsx        # User authentication
│   ├── CartContext.tsx        # Shopping cart
│   ├── WishlistContext.tsx    # Wishlist management
│   ├── ReviewsContext.tsx     # Product reviews
│   └── ThemeContext.tsx       # Dark theme (forced)
│
├── data/               # Static data and utilities
│   └── products/       # Product data files
│       ├── accessories.ts
│       ├── clothing.ts
│       ├── computers.ts
│       ├── electronics.ts
│       ├── furniture.ts
│       ├── gaming.ts
│       ├── photography.ts
│       ├── shoes.ts
│       ├── smartHome.ts
│       ├── wearables.ts
│       ├── productsData.ts
│       ├── productFunctions.ts
│       └── index.ts
│
├── hooks/              # Custom React hooks
│   ├── use-media-query.ts
│   ├── use-mobile.tsx
│   ├── use-toast.ts
│   ├── useApiProducts.ts
│   ├── useCategoryProducts.ts
│   ├── useCustomerBehavior.ts
│   ├── useOrderTracking.ts
│   └── useProductFilters.ts
│
├── lib/                # Utility libraries
│   └── utils.ts
│
├── pages/              # Route pages
│   ├── admin/          # Admin pages
│   └── HomeSections/   # Homepage sections
│
├── providers/          # Context providers wrapper
│   └── AppProviders.tsx
│
├── routes/             # Route definitions
│   ├── AppRoutes.tsx
│   ├── MainRoutes.tsx
│   ├── AdminRoutes.tsx
│   └── PendingRoutes.tsx
│
├── services/           # Service layer
│   ├── apiService.ts
│   ├── carrierService.ts
│   └── orderService.ts
│
├── types/              # TypeScript type definitions
│   ├── database.ts
│   ├── index.ts
│   └── reviews.ts
│
└── utils/              # Utility functions
    ├── categoryUtils.ts
    └── invoiceGenerator.ts
```

---

## 🚀 Core Features

### 1. **E-Commerce Functionality**
- Product browsing and filtering
- Shopping cart with variants support
- Wishlist management
- Order tracking and history
- Checkout flow with address autofill
- Invoice generation (PDF)
- Product reviews and ratings
- Product comparison tool
- Visual search
- Voice search
- Advanced filtering

### 2. **User Management**
- Registration and login (localStorage-based)
- User profiles
- Account dashboard with tabs:
  - Profile
  - Orders
  - Addresses
  - Payment methods
  - Notifications
  - Security settings

### 3. **Admin Dashboard**
- Product management (CRUD)
- Order management
- Customer analytics
- Inventory tracking
- A/B testing
- Real-time analytics
- Sales reporting
- Discount management
- Security settings (SSL, PCI, 2FA info)

### 4. **Content Management**
- Blog with posts
- Buying guides by category
- FAQ system
- Team/About pages
- Portfolio showcase
- Career listings
- Services pages

### 5. **Marketing Features**
- Deals and discounts
- Special offers
- Flash sales
- Personalized offers
- Coupon system
- Newsletter signup
- Product subscriptions
- Promotional banners

---

## 🗺️ Complete Route Map

### Core Routes
- `/` - Homepage
- `/products` - All products
- `/product/:productId` - Product detail page

### E-commerce Flow
- `/cart` - Shopping cart
- `/wishlist` - Wishlist
- `/checkout` - Checkout process
- `/order-confirmation` - Order confirmation
- `/orders` - User orders
- `/order-tracking` - Order tracking search
- `/order-tracking/:orderId` - Track specific order
- `/order-detail/:orderId` - Order details
- `/order-history` - Order history

### Categories
- `/categories` - All categories
- `/category/:categoryName` - Dynamic category page
- `/category/clothing` - Clothing
- `/category/electronics` - Electronics
- `/category/accessories` - Accessories
- `/category/baby` - Baby products
- `/category/heart` - Health products
- `/category/tv` - TVs
- `/category/sofa` - Furniture
- `/category/dumbbell` - Fitness
- `/category/smart-home` - Smart home
- `/category/gaming` - Gaming
- `/category/photography` - Photography

### Search & Discovery
- `/search` - Search results
- `/visual-search` - Visual search
- `/product-comparison` - Compare products

### Content & Blog
- `/blog` - Blog listing
- `/blog/:slug` - Blog post
- `/buying-guides` - Buying guides
- `/buying-guides/:category` - Category guides

### Deals & Offers
- `/deals` - Deals page
- `/special-offers` - Special offers
- `/new-arrivals` - New products
- `/offers` - Personalized offers

### Auth & Account
- `/login` - Login page
- `/register` - Registration
- `/my-account` - Account dashboard

### Business Pages
- `/about` - About us
- `/services` - Services
- `/team` - Team page
- `/careers` - Career opportunities
- `/portfolio` - Portfolio
- `/small-business` - Small business solutions

### Information & Policies
- `/contact` - Contact form
- `/faq` - FAQ
- `/terms` - Terms of service
- `/return-policy` - Return policy
- `/shopping-policy` - Shopping policy
- `/returns` - Returns & exchanges

### Feature Pages
- `/efficiency` - Efficiency features
- `/performance` - Performance features
- `/quality` - Quality features
- `/subscriptions` - Product subscriptions
- `/api-showcase` - API showcase

### Admin Routes
- `/admin` - Admin dashboard
- `/admin/products` - Product management
- `/admin/add-product` - Add product
- `/admin/orders` - Order management
- `/admin/customers` - Customer management
- `/admin/categories` - Category management
- `/admin/discounts` - Discount management
- `/admin/inventory` - Inventory management
- `/admin/pages` - Page management
- `/admin/analytics` - Analytics dashboard
- `/admin/customer-analytics` - Customer analytics
- `/admin/ab-testing` - A/B testing
- `/admin/activity` - Activity log
- `/admin/real-time-analysis` - Real-time analysis
- `/admin/customer-reports` - Customer reports
- `/admin/insights` - Insights
- `/admin/ssl-encryption` - SSL info
- `/admin/pci-compliance` - PCI compliance info
- `/admin/2fa-support` - 2FA support info
- `/admin/settings` - Admin settings
- `/admin/notifications` - Admin notifications
- `/admin/help` - Help & documentation

### Pending Routes
- `/pending` - General pending
- `/pending/order-processing` - Order processing
- `/pending/payment` - Payment pending
- `/pending/account-verification` - Account verification

---

## 🎨 Design System

### Color Palette (Deep Space Theme)
```css
--background: 222 47% 8%        /* Deep space black */
--foreground: 210 40% 98%       /* Clean white */
--primary: 213 94% 68%          /* Electric blue */
--primary-glow: 213 94% 78%     /* Lighter electric blue */
--secondary: 263 70% 60%        /* Deep purple */
--accent: 189 94% 63%           /* Cyan */
--muted: 217 33% 17%            /* Dark gray */
--card: 222 47% 11%             /* Card background */
--border: 217 33% 20%           /* Border color */
```

### Gradients
- `--gradient-primary` - Primary gradient (blue)
- `--gradient-secondary` - Secondary gradient (purple to pink)
- `--gradient-accent` - Accent gradient (cyan to blue)
- `--gradient-subtle` - Subtle background gradient

### Effects
- Glass morphism effects
- Glow effects on hover
- Smooth transitions (cubic-bezier)
- Modern shadows with color tints
- Animated gradients

### Typography
- Gradient text for headings
- Consistent font sizing
- Modern line heights
- Letter spacing for headings

---

## 💾 Data Storage (LocalStorage)

### Storage Keys
- `users` - User accounts array
- `cart` - Shopping cart items
- `wishlist` - Wishlist items
- `reviews` - Product reviews
- `orders` - Order history
- `currentUser` - Current logged-in user

### Data Structure Examples

#### User Object
```typescript
{
  id: string;
  email: string;
  password: string; // Hashed in production
  firstName: string;
  lastName: string;
  address?: string;
  gender?: string;
  createdAt: string;
}
```

#### Cart Item
```typescript
{
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}
```

#### Order Object
```typescript
{
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  createdAt: string;
  trackingNumber?: string;
}
```

---

## 🔄 Context APIs

### AuthContext
- User login/logout
- Registration
- Current user state
- Authentication check

### CartContext
- Add/remove items
- Update quantities
- Cart total calculation
- Item count
- Variant support

### WishlistContext
- Add/remove from wishlist
- Check if item is in wishlist
- Wishlist count

### ReviewsContext
- Submit reviews
- Get product reviews
- Average rating calculation
- Review filtering

### ThemeContext
- Forced dark mode
- Theme state management

---

## 🛠️ Recent Fixes & Improvements

### ✅ Route Fixes (Current Update)
1. **Added 23 Missing Routes**:
   - Auth pages (Login, Register, My Account)
   - Business pages (About, Services, Team, Careers, Portfolio)
   - Information pages (Contact, FAQ, Terms, Policies)
   - Deals pages (Deals, Special Offers, New Arrivals)
   - Feature pages (Efficiency, Performance, Quality)
   - Small Business page
   - Wishlist page

2. **Route Organization**:
   - Organized routes into logical groups
   - Added clear comments for navigation
   - Consistent naming conventions
   - Proper route hierarchy

3. **Import Organization**:
   - Grouped imports by functionality
   - Clear separation of concerns
   - Easy to find and maintain

### ✅ Backend Removal
- Removed Supabase dependencies
- Implemented localStorage persistence
- Maintained all functionality
- Created mock Supabase client to prevent errors

### ✅ Dark Theme Implementation
- Modern "Deep Space" color palette
- HSL color system for consistency
- Glass morphism effects
- Animated gradients
- Glow effects on interactive elements
- Custom scrollbar styling
- Enhanced button, card, input, and badge components

---

## 🚀 Getting Started

### Installation
```bash
npm install
# or
bun install
```

### Development
```bash
npm run dev
# or
bun dev
```

### Build
```bash
npm run build
# or
bun build
```

### Preview Production Build
```bash
npm run preview
# or
bun preview
```

---

## 📦 Key Dependencies

### Core
- react ^18.3.1
- react-dom ^18.3.1
- react-router-dom ^6.26.2
- typescript

### UI & Styling
- tailwindcss
- @radix-ui/* (various components)
- framer-motion ^12.16.0
- lucide-react ^0.462.0
- next-themes ^0.3.0

### Forms & Validation
- react-hook-form ^7.53.0
- @hookform/resolvers ^3.9.0
- zod ^3.23.8

### Utilities
- date-fns ^3.6.0
- recharts ^2.12.7 (for charts)
- jspdf ^3.0.1 (for invoice generation)
- sonner ^1.5.0 (for toast notifications)

---

## 🔒 Security Considerations

### Current Implementation (LocalStorage)
⚠️ **Note**: Current implementation uses localStorage for demo purposes.

**Limitations**:
- Passwords stored in plain text (not production-ready)
- No server-side validation
- No rate limiting
- Data visible in browser DevTools
- No session management
- Vulnerable to XSS attacks

**For Production**:
- Implement proper backend authentication
- Use bcrypt/argon2 for password hashing
- Implement JWT or session-based auth
- Add HTTPS encryption
- Implement CSRF protection
- Add rate limiting
- Use secure HTTP-only cookies
- Implement proper input validation
- Add XSS protection

---

## 🎯 Future Enhancements

### Planned Features
1. **Backend Integration**
   - Connect to real database
   - Implement proper authentication
   - Add server-side validation
   - Real-time inventory updates

2. **Payment Integration**
   - Stripe/PayPal integration
   - Multiple payment methods
   - Payment history

3. **Enhanced Analytics**
   - User behavior tracking
   - Conversion funnels
   - Heat maps
   - A/B test results

4. **Advanced Features**
   - AI-powered recommendations
   - Chat support integration
   - Multi-language support
   - Currency conversion
   - Advanced inventory management
   - Automated email notifications

5. **Performance**
   - Lazy loading optimization
   - Image optimization
   - Code splitting
   - PWA capabilities
   - Offline support

---

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Use functional components with hooks
- Implement proper error boundaries
- Write meaningful component names
- Add JSDoc comments for complex logic

### Component Structure
```typescript
// Imports
import React from 'react';
import { useContext } from 'react';

// Types/Interfaces
interface ComponentProps {
  // props
}

// Component
const Component: React.FC<ComponentProps> = ({ props }) => {
  // Hooks
  // State
  // Effects
  // Handlers
  // Render
  return (
    // JSX
  );
};

export default Component;
```

### File Naming
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utils/Hooks: camelCase (e.g., `useAuth.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_CONFIG.ts`)
- Types: PascalCase (e.g., `UserTypes.ts`)

### Git Workflow
- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-description`
- Hotfixes: `hotfix/critical-fix`
- Clear commit messages
- Regular commits

---

## 🐛 Known Issues & Limitations

### Current Limitations
1. ~~Missing routes for many pages~~ ✅ **FIXED**
2. LocalStorage-based auth (not production-ready)
3. Mock data for products and orders
4. No real payment processing
5. No email notifications
6. No real-time features
7. Limited accessibility features
8. No internationalization

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- LocalStorage API required

---

## 📧 Support & Contact

For issues, questions, or contributions:
- Check the FAQ page: `/faq`
- Contact page: `/contact`
- Admin help: `/admin/help`

---

## 📄 License

[Add your license information here]

---

## 🎉 Version History

### v1.2.0 (Current)
- ✅ Fixed all missing routes (23 routes added)
- ✅ Organized routes by functionality
- ✅ Updated route documentation
- ✅ Improved project structure documentation

### v1.1.0
- ✅ Implemented modern dark theme
- ✅ Enhanced design system
- ✅ Added glass morphism effects
- ✅ Updated all UI components

### v1.0.0
- ✅ Removed Supabase backend
- ✅ Implemented localStorage persistence
- ✅ Initial project structure
- ✅ Core e-commerce features
- ✅ Admin dashboard
- ✅ Product management

---

**Last Updated**: 2025
**Status**: ✅ All routes working, Dark theme active, LocalStorage persistence
