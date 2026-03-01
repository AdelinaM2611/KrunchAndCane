# Krunch & Cane

## What's in this project

This RESVP-feature repo includes the features I implemented:

- **Upcoming Events** — Public page listing active events (with date/time on cards) and a link to each event’s detail page.
- **Event detail & RSVP** — Public event page with RSVP form; duplicate email per event is blocked; confirmation email (SendGrid); cancelled events show a message and RSVP is disabled; “Add to calendar” link after a successful RSVP.
- **Host login** — Login/register for event organisers; JWT stored in the browser; protected routes for host-only actions.
- **Host dashboard** — Create, edit, and cancel events; view RSVPs per event; confirm before cancelling (with cancellation emails to RSVPs); link to the public event page; logout; idle timeout; retry on errors.
- **Backend** — Node/Express API, Prisma (PostgreSQL), auth middleware, request validation (Zod), and SendGrid for RSVP and cancellation emails.

Marketing site and host admin for events and RSVPs. Built with React (Vite, Tailwind, MUI), Node/Express, Prisma (PostgreSQL), and SendGrid for emails.

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
