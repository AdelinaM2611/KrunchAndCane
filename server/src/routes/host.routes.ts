/**
 * /api/host: all routes require JWT. Dashboard, list host events, list RSVPs for an event.
 */
import { Router } from "express";
import * as hostController from "../controllers/host.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/dashboard", authMiddleware, hostController.getDashboard);
router.get("/events", authMiddleware, hostController.listHostEvents);
router.get("/events/:eventId/rsvps", authMiddleware, hostController.getEventRsvps);

export const hostRoutes = router;
