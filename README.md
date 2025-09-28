# Starter Kit

A batteries-included TypeScript scaffold that pairs **Next.js** on the front end with an **Elysia** API, shared types, authentication via **better-auth**, and modern tooling powered by **Bun** and **Turborepo**.

## What’s inside

- **apps/web** – Next.js 15 application with shadcn/ui styling, authentication screens, and an example marketing page.
- **apps/server** – Elysia server that wires up better-auth and exposes a simple “hello world” API.
- **packages/server-core** – Shared server utilities (Elysia app factory, Prisma setup, env loader, email helper).
- **packages/api-contract** – Shared TypeScript contract consumed by both the web app and server through `@elysiajs/eden`.

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.0
- PostgreSQL instance for local development

## Environment configuration

Create a `.env` file at the repository root (copy `.env.example`) and provide at least:

```
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/app_db"
CORS_ORIGIN="http://localhost:4001"
BETTER_AUTH_SECRET="a-secure-random-string"
BETTER_AUTH_URL="http://localhost:4002"

# Optional email configuration
RESEND_API_KEY=""
RESEND_FROM_EMAIL=""
```

The server automatically loads this file when the Elysia app is created. Additional environment variables can live in `apps/web/.env.local` or other app-specific files as needed.

## Getting started

Install dependencies and generate the Prisma client once:

```bash
bun install
bun run --filter @wara/server-core db:generate
```

Run everything in development mode:

```bash
bun run dev
```

- Web app: <http://localhost:4001>
- API: <http://localhost:4002>

Use the sign-up flow in the web app to create the first account; better-auth handles session management automatically.

### Helpful scripts

| Command | Description |
| --- | --- |
| `bun run dev` | Start both web and server apps with Turbo |
| `bun run dev:web` | Run only the Next.js app |
| `bun run dev:server` | Run only the Elysia API |
| `bun run check-types` | Type-check all workspaces |
| `bun run build` | Build all workspaces |
| `bun run --filter @wara/server-core db:push` | Apply Prisma schema changes |
| `bun run --filter @wara/server-core db:studio` | Launch Prisma Studio |

## Project structure

```
.
├── apps/
│   ├── web/            # Next.js application
│   └── server/         # Elysia application
├── packages/
│   ├── api-contract/   # Shared API contract
│   └── server-core/    # Server utilities & Prisma schema
└── turbo.json          # Turborepo pipeline configuration
```

## Notes

- `packages/server-core` owns the Prisma schema (`prisma/schema.prisma`) and database scripts. Run migrations or pushes through the filtered scripts shown above.
- Type declarations are generated into workspace-specific `.tsbuild` folders when running TypeScript project references; these directories are git-ignored.
- This scaffold intentionally keeps application logic light—extend the API routes, Prisma models, or frontend pages to fit your product’s needs.
- `bun db:migrate`: Run `prisma migrate dev` via `@wara/server-core`
