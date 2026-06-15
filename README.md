# Krunch & Cane

## What's in this project

This repo includes a public marketing site plus a Node/Express API (host auth and event management remain in `server/` for internal use).

- **Find us** — Static page at `/find-us` with market location (Backyard Market, 146 Brick Lane, London E1 6QL) and a pastel image.
- **Pre-order** — Branded route at `/pre-order` redirects to the SumUp store (navbar and hero link there; Vercel also redirects in production).
- **Backend** — Node/Express API, Prisma (PostgreSQL), auth middleware, request validation (Zod), and SendGrid for emails (used by host/event flows in the API).

Marketing site built with React (Vite, Tailwind, MUI). Backend: Node/Express, Prisma (PostgreSQL), SendGrid.

## Run locally

### Frontend

```bash
npm install
npm run dev
```

Runs at `http://localhost:5173` by default.

Optional: set `VITE_API_URL` if the API is on a different origin (e.g. `VITE_API_URL=http://localhost:4000`). In dev, the app falls back to `http://localhost:4000` when unset.

### Backend

```bash
cd server
npm install
cp .env.example .env
# Edit .env: set DATABASE_URL, JWT_SECRET, and optionally SendGrid keys
npx prisma migrate dev
npm run dev
```

API runs at `http://localhost:4000`. See `server/.env.example` for required and optional variables.

## Production

- Set `NODE_ENV=production` and use a strong `JWT_SECRET` (the server will refuse to start with the default secret in production).
- Configure a production PostgreSQL URL, `CORS_ORIGIN` (your frontend origin), and SendGrid keys for RSVP/cancellation emails.
- Build frontend: `npm run build`. Build server: `cd server && npm run build && npm start`.
