# Krunch & Cane API

## Setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL` to your PostgreSQL connection string.
2. Run migrations: `npm run db:migrate`
3. Seed the database: `npm run db:seed`
4. Start the server: `npm run dev` (or `npm run build && npm run start`)

## Scripts

- `npm run dev` – start with ts-node-dev (port 4000)
- `npm run build` – compile TypeScript
- `npm run start` – run compiled `dist/server.js`
- `npm run db:migrate` – apply Prisma migrations
- `npm run db:seed` – run seed (Pop Brixton April / May events)

## API

- `GET /api/health` – health check
- `GET /api/events` – list active events (ACTIVE only)
