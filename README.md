# QR Menu Management System

Modern, scalable QR Menu Management System built with a monorepo architecture and microfrontend approach.

> 🚧 **Development Status: In Progress** 🚧
>
> This project is currently under active development. Core features are implemented, but some advanced functionality is still being built.

## 🏗️ Project Architecture

This project follows a **monorepo** structure using **Turborepo** and **pnpm workspaces**, with **microfrontend** architecture for the tenant applications.

### 📁 Project Structure

```
qr-menu/
├── apps/                          # Application packages
│   ├── backend/                   # NestJS API server
│   ├── landing/                   # Marketing landing page
│   ├── tenant/                    # Customer-facing menu app (microfrontend)
│   └── tenant-dashboard/          # Restaurant management dashboard (microfrontend)
├── packages/                      # Shared packages
│   ├── shared-components/         # Reusable React components
│   ├── shared-config/            # Configuration and environment variables
│   ├── shared-styles/            # Global styles and design system
│   ├── shared-types/             # TypeScript type definitions
│   ├── shared-utils/             # Utility functions and API clients
│   └── shared-validation/        # Zod validation schemas
```

## 🚀 Applications

### Backend API (`apps/backend`)

- **Framework**: NestJS with TypeScript
- **Database**: Supabase (PostgreSQL)
- **Features**: RESTful API, authentication, file uploads, menu management
- **Port**: Configurable (default: 3000)
- **Status**: ✅ **Core API Complete**

### Landing Page (`apps/landing`)

- **Framework**: Next.js 15 with React 19
- **Styling**: Tailwind CSS + HeroUI
- **Features**: Marketing site, authentication, restaurant registration
- **Port**: 3000
- **Status**: ✅ **Complete**

### Tenant App (`apps/tenant`)

- **Framework**: Next.js 15 with React 19
- **Architecture**: Microfrontend (Vercel Microfrontends)
- **Features**: Customer-facing QR menu display
- **Port**: 3001 (microfrontend proxy)
- **Status**: 🔄 **In Development**

### Tenant Dashboard (`apps/tenant-dashboard`)

- **Framework**: Next.js 15 with React 19
- **Architecture**: Microfrontend (Vercel Microfrontends)
- **Features**: Restaurant management, menu editing, drag & drop
- **Port**: 3002 (microfrontend proxy)
- **Status**: 🔄 **In Development**

## 🎯 Development Roadmap

### ✅ **Completed Features**

- [x] Monorepo architecture setup
- [x] Backend API with authentication
- [x] Landing page with marketing content
- [x] Shared packages and utilities
- [x] Database schema and migrations
- [x] Basic menu management

### 🔄 **Currently In Development**

- [ ] Tenant app UI/UX improvements
- [ ] Dashboard drag & drop functionality
- [ ] Image upload and management
- [ ] Real-time menu updates
- [ ] Advanced form validation

### 🚀 **Upcoming Features (Q1 2025)**

- [ ] **Analytics Dashboard**: Restaurant performance metrics
- [ ] **Multi-language Support**: Internationalization
- [ ] **Advanced QR Code Features**: Custom QR designs
- [ ] **Mobile App**: React Native companion app
- [ ] **Payment Integration**: Stripe/PayPal integration
- [ ] **Inventory Management**: Stock tracking
- [ ] **Customer Reviews**: Rating and feedback system
- [ ] **Push Notifications**: Real-time updates

### 🔮 **Future Enhancements (Q2-Q3 2025)**

- [ ] **AI-Powered Menu Suggestions**: ML-based recommendations
- [ ] **Advanced Analytics**: Customer behavior insights
- [ ] **Multi-location Support**: Chain restaurant management
- [ ] **API Marketplace**: Third-party integrations
- [ ] **White-label Solutions**: Custom branding options
- [ ] **Advanced Security**: 2FA, audit logs
- [ ] **Performance Optimization**: CDN, caching strategies

## 📦 Shared Packages

### `@qr-menu/shared-types`

- TypeScript type definitions
- API response/request types
- Database schema types
- **Status**: ✅ **Complete**

### `@qr-menu/shared-components`

- Reusable React components
- Form components with validation
- UI primitives
- **Status**: 🔄 **Expanding**

### `@qr-menu/shared-config`

- Environment configuration
- API endpoints
- Feature flags
- **Status**: ✅ **Complete**

### `@qr-menu/shared-utils`

- API client utilities
- Helper functions
- Subdomain handling
- **Status**: 🔄 **In Development**

### `@qr-menu/shared-validation`

- Zod validation schemas
- Form validation rules
- API request validation
- **Status**: 🔄 **Expanding**

### `@qr-menu/shared-styles`

- Global CSS styles
- Design system tokens
- Hero section animations
- **Status**: ✅ **Complete**

## 🛠️ Technology Stack

### Core Technologies

- **Node.js**: >=18.0.0
- **TypeScript**: ^5.0.0
- **pnpm**: >=8.0.0 (Package Manager)

### Frontend

- **React**: 19.1.0
- **Next.js**: 15.4.6+
- **Tailwind CSS**: ^4.0.0
- **HeroUI**: ^2.8.0
- **Framer Motion**: ^12.23.12

### Backend

- **NestJS**: ^10.x
- **Supabase**: ^2.56.0
- **PostgreSQL**: Database
- **Multer**: File uploads
- **Sharp**: Image processing

### Development Tools

- **Turborepo**: ^1.10.0 (Monorepo build system)
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Husky**: Git hooks

## 🚀 Getting Started

### Prerequisites

- Node.js >=18.0.0
- pnpm >=8.0.0
- Supabase account and project

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd qr-menu
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   # Copy environment files
   cp apps/backend/.env.example apps/backend/.env
   cp apps/landing/.env.example apps/landing/.env
   cp apps/tenant/.env.example apps/tenant/.env
   cp apps/tenant-dashboard/.env.example apps/tenant-dashboard/.env
   ```

4. **Configure Supabase**
   - Create a new Supabase project
   - Run migrations from `supabase/migrations/`
   - Update environment variables with your Supabase credentials

### Development

#### Start all applications

```bash
pnpm dev
```

#### Start specific applications

```bash
# Backend (NestJS) only
pnpm --filter @qrmenu/backend dev

# Landing page only
pnpm --filter @qrmenu/landing dev

# Tenant app with microfrontend proxy
pnpm --filter tenant dev

# Tenant dashboard with microfrontend proxy
pnpm --filter tenant-dashboard dev
```

#### Microfrontend Development

```bash
# Start microfrontend proxy
pnpm dev:proxy

# This will start both tenant apps with proper routing
```

### Building

#### Build all packages and applications

```bash
pnpm build
```

#### Build specific packages

```bash
pnpm --filter @qr-menu/shared-types build
pnpm --filter @qrmenu/backend build
```

## 🔧 Available Scripts

### Root Level

- `pnpm dev` - Start all applications in development mode
- `pnpm build` - Build all packages and applications
- `pnpm test` - Run tests across all packages
- `pnpm lint` - Lint all packages
- `pnpm clean` - Clean build artifacts
- `pnpm type-check` - Type check all packages
- `pnpm format` - Format code with Prettier

### Package Level

- `pnpm --filter <package-name> dev` - Start specific package
- `pnpm --filter <package-name> build` - Build specific package
- `pnpm --filter <package-name> lint` - Lint specific package

## 🌐 Microfrontend Architecture

The tenant applications use Vercel's Microfrontends framework for seamless integration:

### Configuration

- **tenant**: Customer-facing menu app
- **tenant-dashboard**: Restaurant management interface
- **Routing**: Automatic route handling between microfrontends
- **Development**: Local development with proxy for seamless integration

### Benefits

- Independent development and deployment
- Technology agnostic
- Scalable team structure
- Better performance through code splitting

## 🗄️ Database Schema

The system uses Supabase (PostgreSQL) with the following main entities:

- **menus**: Restaurant menu configurations
- **categories**: Menu categories
- **items**: Menu items with pricing and descriptions
- **subscriptions**: Restaurant subscription plans
- **users**: Restaurant owners and staff

## 🔐 Authentication & Security

- **Supabase Auth**: User authentication and management
- **JWT Tokens**: Secure API access
- **Role-based Access**: Different permissions for different user types
- **CORS Protection**: Secure cross-origin requests
- **Helmet**: Security headers

## 📱 Features

### Restaurant Owners

- Create and manage menus
- Upload images and manage content
- Track analytics and performance
- Manage subscription plans

### Customers

- Scan QR codes to view menus
- Browse categories and items
- View pricing and descriptions
- Access restaurant information

### Technical Features

- Real-time updates
- Responsive design
- SEO optimization
- Performance monitoring
- Type safety with TypeScript

## 🚀 Deployment

### Production Build

```bash
pnpm build
```

### Environment Variables

Ensure all required environment variables are set:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NODE_ENV`

### Deployment Platforms

- **Vercel**: Frontend applications
- **Railway/Render**: Backend API
- **Supabase**: Database and authentication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

### Development Guidelines

- Follow TypeScript best practices
- Use shared packages for common functionality
- Maintain consistent code style
- Write meaningful commit messages

### 🎯 **Contributing to In-Progress Features**

We welcome contributions! Here are some areas you can help with:

- **UI/UX Improvements**: Help polish the tenant apps
- **Testing**: Add comprehensive test coverage
- **Documentation**: Improve docs and examples
- **Performance**: Optimize loading and rendering
- **Accessibility**: Ensure inclusive design

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Check the documentation
- Review the code examples

## 🔄 Version History

- **v1.0.0**: Initial release with monorepo structure
- **v1.1.0**: Added microfrontend architecture
- **v1.2.0**: Enhanced shared packages and validation
- **v1.3.0**: 🚧 **In Development** - Advanced features and UI improvements

---

> 💡 **Want to contribute?** Check out our [Contributing Guide](CONTRIBUTING.md) and join our development community!
>
> 🚀 **Stay updated** on our progress by watching this repository or joining our discussions.

Built with ❤️ using modern web technologies and best practices.
