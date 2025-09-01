# Landing Page

Marketing landing page for the QR Menu Management System.

## Features

- **Hero Section**: Compelling introduction with CTA
- **Features**: Product feature showcase
- **Pricing**: Subscription plan comparison
- **Testimonials**: Customer success stories
- **FAQ**: Common questions and answers
- **Authentication**: Login/register modals
- **Responsive Design**: Mobile-first approach

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Forms**: React Hook Form with Zod
- **Authentication**: Supabase Auth
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Supabase project

### Installation

```bash
cd apps/landing
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
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
│   ├── auth/              # Authentication pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── forms/             # Form components
│   ├── modals/            # Modal components
│   └── sections/          # Page sections
├── contexts/               # React contexts
├── hooks/                  # Custom hooks
└── providers/              # App providers
```

## Components

### Page Sections

- **HeroSection**: Main landing section with CTA
- **FeaturesSection**: Product features grid
- **PricingSection**: Subscription plans
- **TestimonialsSection**: Customer reviews
- **FAQSection**: Frequently asked questions
- **CTASection**: Final call-to-action

### Forms

- **LoginForm**: User authentication
- **RegisterForm**: User registration
- **RestaurantForm**: Restaurant setup

### Modals

- **AuthModal**: Authentication modal
- **CreateMenuModal**: Menu creation modal

## Authentication Flow

1. User clicks "Get Started" or "Login"
2. Modal opens with login/register options
3. User completes authentication
4. Redirected to dashboard or menu creation

## Styling

### Tailwind CSS

The project uses Tailwind CSS for styling with custom design tokens:

```css
/* Custom colors */
--color-primary: #3b82f6 --color-secondary: #64748b --color-accent: #f59e0b;
```

### Responsive Design

- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## Content Management

### Hero Content

Update hero section content in `src/app/hero.ts`:

```typescript
export const heroContent = {
  title: "Create Digital Menus in Minutes",
  subtitle:
    "Transform your restaurant menu into an interactive digital experience",
  cta: "Get Started Free",
};
```

### Features

Add new features in `src/components/FeaturesSection.tsx`:

```typescript
const features = [
  {
    title: "Easy Setup",
    description: "Create your menu in minutes",
    icon: "⚡",
  },
];
```

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms

- **Netlify**: Static site hosting
- **Railway**: Full-stack deployment
- **DigitalOcean**: App Platform

## Performance

### Optimization

- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: `@next/bundle-analyzer`

### Lighthouse Score

Target scores:

- **Performance**: 90+
- **Accessibility**: 95+
- **Best Practices**: 90+
- **SEO**: 95+

## SEO

### Meta Tags

Update metadata in `src/app/layout.tsx`:

```typescript
export const metadata = {
  title: "QR Menu - Digital Menu Management",
  description: "Create beautiful digital menus for your restaurant",
  keywords: ["menu", "restaurant", "qr", "digital"],
};
```

### Open Graph

Social media sharing optimization:

```typescript
export const metadata = {
  openGraph: {
    title: "QR Menu - Digital Menu Management",
    description: "Create beautiful digital menus for your restaurant",
    images: ["/og-image.jpg"],
  },
};
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

## Contributing

1. Follow the existing component structure
2. Use TypeScript for all new code
3. Ensure responsive design
4. Add proper accessibility attributes
5. Update documentation

## License

MIT License - see main project README for details.
