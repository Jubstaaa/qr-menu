# Backend (NestJS)

NestJS-based API server. Provides authentication, admin endpoints for menu/category/item management, and public endpoints. Uses Supabase (PostgreSQL + Auth + Storage).

## Features

- Auth: Supabase Auth
- Admin API: Menu, category, and item CRUD + reorder
- Public API: Read-only menu, category, and item endpoints
- Validation: Zod (shared-validation)
- Types: End-to-end type safety via shared-types

## Requirements

- Node.js 18+
- pnpm 8+
- Supabase project

## Setup

```bash
cd apps/backend
pnpm install
```

## Environment Variables

Create a `.env` file:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NODE_ENV=development
```

Additional envs may exist at the repository root (e.g., for shared packages).

## Run

Development:

```bash
pnpm dev
```

Production build and start:

```bash
pnpm build
pnpm start
```

## Scripts

- `pnpm dev`: Start dev server (watch)
- `pnpm build`: Build for production
- `pnpm start`: Run production build
- `pnpm lint`: Lint code
- `pnpm type-check`: Type check

## Project Structure (overview)

```
src/
├── common/               # Guards, interceptors, pipes, services
├── modules/
│   ├── admin/
│   │   ├── menu/
│   │   ├── category/
│   │   └── item/
│   ├── auth/
│   └── public/
├── app.module.ts
└── main.ts
```

## API Overview

- Base URL: `/`
- Admin endpoints require authentication.

Example endpoints:

- Admin
  - `POST /admin/category`
  - `GET /admin/item`
  - `POST /admin/item/reorder`
  - `GET /admin/menu`
- Public
  - `GET /public/menu/:subdomain`
  - `GET /public/category`
- Auth
  - `GET /auth/check`

See `packages/shared-types` and `packages/shared-validation` for exact request/response contracts and schemas.

## Development Notes

- When adding new endpoints, update `shared-validation` (Zod) and `shared-types` first.
- Use `SupabaseService` to access the Supabase client in services.
- Map database rows to shared-types consistently in service returns.

## Deployment

- Build with `pnpm build`
- Set required env variables in production
- Keep Supabase credentials secure

## License

MIT (see root README)
