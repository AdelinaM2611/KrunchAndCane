import { Router } from "express";
import * as eventsController from "../controllers/events.controller";
import * as rsvpController from "../controllers/rsvp.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateBody } from "../middleware/validate.middleware";
import { createEventSchema, updateEventSchema } from "../schemas/events.schemas";
import { createRsvpBodySchema, createRsvpSchema } from "../schemas/rsvp.schemas";

const router = Router();

// Public
router.get("/", eventsController.getEvents);
router.get("/:eventId", eventsController.getEventById);
router.post("/:eventId/rsvps", validateBody(createRsvpBodySchema), rsvpController.createRsvp);
router.get("/:eventId/rsvps", rsvpController.listRsvps);

// Protected (host)
router.post("/", authMiddleware, validateBody(createEventSchema), eventsController.createEvent);
router.put("/:eventId", authMiddleware, validateBody(updateEventSchema), eventsController.updateEvent);
router.post("/:eventId/cancel", authMiddleware, eventsController.cancelEvent);

// Legacy (unchanged; still public)
router.post("/rsvps", validateBody(createRsvpSchema), rsvpController.createRsvp);
router.patch("/:eventId", authMiddleware, validateBody(updateEventSchema), eventsController.updateEvent);
router.delete("/:eventId", eventsController.deleteEvent);

export const eventsRoutes = router;
