# wara

This project was created with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack that combines Next.js, Elysia, and more.

## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Elysia** - Type-safe, high-performance framework
- **Bun** - Runtime environment
- **Prisma** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Authentication** - Better-Auth
- **Turborepo** - Optimized monorepo build system

## Getting Started

First, install the dependencies:

```bash
bun install
```
## Database Setup

This project uses PostgreSQL with Prisma. The `@wara/server-core` package owns the Prisma schema, migrations, and generated client.

1. Make sure you have a PostgreSQL database set up.
2. Create a `.env` file in the project root (or configure another path) with at least:
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/wara"
CORS_ORIGIN="http://localhost:4001"
```
   `@wara/server-core` loads this file automatically the first time `createApp()` is invoked.
3. Generate the Prisma client and apply schema changes via the shared package scripts:
```bash
bun run --filter @wara/server-core db:generate
bun run --filter @wara/server-core db:push # or db:migrate
```

Then, run the development server:

```bash
bun dev
```

Open [http://localhost:4001](http://localhost:4001) for the web application.
The API is running at [http://localhost:4002](http://localhost:4002).





## Project Structure

```
wara/
├── apps/
│   ├── web/         # Frontend application (Next.js)
│   └── server/      # Backend API (Elysia)
```

## Available Scripts

- `bun dev`: Start all applications in development mode
- `bun build`: Build all applications
- `bun dev:web`: Start only the web application
- `bun dev:server`: Start only the server
- `bun check-types`: Check TypeScript types across all apps
- `bun db:push`: Run `db:push` via `@wara/server-core`
- `bun db:studio`: Open Prisma Studio via `@wara/server-core`
- `bun db:generate`: Generate Prisma Client via `@wara/server-core`
- `bun db:migrate`: Run `prisma migrate dev` via `@wara/server-core`
