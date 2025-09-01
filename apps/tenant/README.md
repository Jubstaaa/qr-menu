# Tenant App

Customer-facing menu display application for restaurants.

## Features

- **Menu Display**: Beautiful menu presentation
- **Category Navigation**: Organized menu browsing
- **Product Details**: Detailed item information
- **Responsive Design**: Mobile-optimized interface
- **QR Code Access**: Direct menu access via QR codes
- **Wifi Information**: Restaurant WiFi details

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React hooks
- **Data Fetching**: Server-side rendering
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Backend API running

### Installation

```bash
cd apps/tenant
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

### Development

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── categories/         # Category pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Page footer
│   ├── ProductGrid.tsx    # Menu items grid
│   ├── ProductDetailModal.tsx # Item detail modal
│   └── WifiPopover.tsx    # WiFi information
└── providers/              # App providers
```

## Pages

### Home Page (`/`)

- Restaurant information
- Menu categories overview
- Featured items
- Quick navigation

### Category Page (`/categories/[slug]`)

- Category-specific items
- Filtered product grid
- Category description
- Breadcrumb navigation

## Components

### Core Components

- **Header**: Navigation and restaurant branding
- **ProductGrid**: Responsive item display grid
- **ProductDetailModal**: Item information modal
- **WifiPopover**: WiFi credentials display

### Layout Components

- **Footer**: Contact information and links
- **ResponsiveContainer**: Mobile-first layout wrapper

## Data Flow

1. **Page Load**: Server-side data fetching
2. **Menu Data**: Fetch from backend API
3. **Category Filtering**: Client-side filtering
4. **Item Details**: Modal-based detail view

## API Integration

### Endpoints Used

- `GET /api/public/menu/:subdomain` - Get menu data
- `GET /api/public/category` - Get categories
- `GET /api/public/item` - Get menu items

### Data Fetching

```typescript
// Server-side data fetching
async function getMenuData(subdomain: string) {
  const response = await fetch(`${API_URL}/api/public/menu/${subdomain}`);
  return response.json();
}
```

## Styling

### Design System

- **Color Palette**: Restaurant-branded colors
- **Typography**: Readable font hierarchy
- **Spacing**: Consistent spacing scale
- **Components**: Reusable UI patterns

### Responsive Breakpoints

- **Mobile**: 320px - 768px (default)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Performance

### Optimization Strategies

- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Route-based code splitting
- **Static Generation**: Pre-rendered pages

### Core Web Vitals

Target metrics:

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## SEO

### Meta Tags

Dynamic metadata based on restaurant:

```typescript
export async function generateMetadata({ params }: Props) {
  const menu = await getMenuData(params.subdomain);

  return {
    title: `${menu.restaurant_name} - Menu`,
    description: `Browse ${menu.restaurant_name} menu online`,
  };
}
```

### URL Structure

- **Home**: `/{subdomain}`
- **Category**: `/{subdomain}/categories/{category-slug}`

## Customization

### Restaurant Branding

Update branding in the header component:

```typescript
// src/components/Header.tsx
const Header = ({ restaurant }) => (
  <header className="bg-white shadow-sm">
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-gray-900">
        {restaurant.name}
      </h1>
    </div>
  </header>
);
```

### Color Scheme

Customize colors in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fef7ee",
          500: "#f59e0b",
          900: "#92400e",
        },
      },
    },
  },
};
```

## Deployment

### Vercel Deployment

1. Connect GitHub repository
2. Set environment variables
3. Configure custom domain (optional)
4. Deploy automatically

### Environment Setup

Production environment variables:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

## Testing

### Component Testing

```bash
# Run component tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

### E2E Testing

```bash
# Run Playwright tests
pnpm test:e2e
```

## Monitoring

### Analytics

- **Page Views**: Track menu page visits
- **Item Clicks**: Monitor popular items
- **Category Navigation**: Understand user behavior
- **Mobile Usage**: Track device preferences

### Error Tracking

- **API Errors**: Monitor backend connectivity
- **Page Errors**: Track frontend issues
- **Performance**: Monitor Core Web Vitals

## Contributing

1. Follow the existing component structure
2. Ensure mobile-first responsive design
3. Add proper accessibility attributes
4. Test across different devices
5. Update documentation

## License

MIT License - see main project README for details.
