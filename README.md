# E-commerce site

pnpm monorepo.

```
apps/api         Express 5 + pg REST API (TypeScript)
apps/web         React 19 + Vite + Tailwind 4 storefront (TypeScript)
packages/shared  Shared Product type + zod schema
```

## Setup

Requires Node 22+, pnpm, Docker.

```sh
cp .env.example .env
pnpm install
pnpm db:up        # Postgres 17 in Docker (host port 5433 by default)
pnpm db:reset     # drop + create tables (apps/api/db/schema.sql) and load demo data (seed.sql)
pnpm dev          # api on :3000, web on :5173 (proxies /api)
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm db:down`, `pnpm db:schema` (tables only), `pnpm db:seed` (data only).

Backend layout: `apps/api/src/index.ts` (app), `routes/*.routes.ts`, `controllers/*.controller.ts` (SQL lives in the controllers), `db.ts` (pool). The database is defined by hand in `apps/api/db/schema.sql`; edit it and run `pnpm db:reset`.

## API

- `GET /api/health`
- `GET /api/products?type&style&minPrice&maxPrice&colors&sizes&onSale&q&sort&page&pageSize` (paginated)
- `GET /api/products/:id`, `/:id/related`, `/:id/reviews`
- `GET /api/products/new-arrivals` (newest first)
- `GET /api/products/best-sellers` (highest rated first)
