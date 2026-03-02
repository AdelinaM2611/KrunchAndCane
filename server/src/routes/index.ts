/**
 * Mounts all API routes under /api: events, auth, host. Health check at GET /api/health.
 */
import { Router } from "express";
import { eventsRoutes } from "./events.routes";
import { authRoutes } from "./auth.routes";
import { hostRoutes } from "./host.routes";

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ ok: true });
});

router.use("/events", eventsRoutes);
router.use("/auth", authRoutes);
router.use("/host", hostRoutes);

export const routes = router;
