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
pnpm db:migrate   # create tables + seed sample products
pnpm dev          # api on :3000, web on :5173 (proxies /api)
```

Other scripts: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm db:down`.

## API

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/new-arrivals` (newest first)
- `GET /api/products/best-sellers` (highest rated first)
