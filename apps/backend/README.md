# Backend API

Express.js backend API for the QR Menu Management System.

## Features

- **Authentication**: Supabase auth integration
- **Admin APIs**: Category, item, and menu management
- **Public APIs**: Public menu access
- **File Upload**: Image upload support
- **Database**: Supabase PostgreSQL integration

## Tech Stack

- **Runtime**: Node.js with Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **File Storage**: Supabase Storage
- **Validation**: Zod schemas

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- Supabase project

### Installation

```bash
cd apps/backend
pnpm install
```

### Environment Variables

Create a `.env` file:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
NODE_ENV=development
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

## API Structure

### Admin Routes

- `POST /api/admin/category` - Create category
- `GET /api/admin/category` - Get all categories
- `PUT /api/admin/category/:id` - Update category
- `DELETE /api/admin/category/:id` - Delete category

- `POST /api/admin/item` - Create item
- `GET /api/admin/item` - Get all items
- `PUT /api/admin/item/:id` - Update item
- `DELETE /api/admin/item/:id` - Delete item

- `POST /api/admin/menu` - Create menu
- `GET /api/admin/menu` - Get current user's menu

### Public Routes

- `GET /api/public/menu/:subdomain` - Get menu by subdomain
- `GET /api/public/category` - Get public categories
- `GET /api/public/item` - Get public items

### Auth Routes

- `GET /api/auth/check` - Check authentication
- `GET /api/auth/current-user` - Get current user
- `GET /api/auth/user-menus` - Get user's menus

## Database Schema

The backend uses Supabase with the following main tables:

- `menus` - Restaurant menus
- `categories` - Menu categories
- `items` - Menu items
- `subscriptions` - User subscriptions

## Middleware

- **Auth Middleware**: JWT token validation
- **Upload Middleware**: File upload handling
- **Validation**: Request body validation with Zod

## Development

### Project Structure

```
src/
├── controllers/     # Route controllers
├── middleware/      # Express middleware
├── routes/          # API route definitions
├── utils/           # Utility functions
└── supabase/        # Database configuration
```

### Adding New Routes

1. Create controller in `src/controllers/`
2. Define route in `src/routes/`
3. Add validation schema in `packages/shared-validation`
4. Update types in `packages/shared-types`

### Testing

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch
```

## Deployment

### Production Build

```bash
pnpm build
pnpm start
```

### Environment Variables

Ensure all required environment variables are set in production:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NODE_ENV=production`
- `PORT` (optional, defaults to 3001)

## Contributing

1. Follow the existing code structure
2. Use TypeScript for all new code
3. Add proper error handling
4. Include input validation
5. Update documentation

## License

MIT License - see main project README for details.
