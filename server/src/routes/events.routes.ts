import { Router } from "express";
import * as eventsController from "../controllers/events.controller";
import * as rsvpController from "../controllers/rsvp.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createEventSchema } from "../schemas/events.schemas";
import { createRsvpBodySchema, createRsvpSchema } from "../schemas/rsvp.schemas";

const router = Router();

router.get("/", eventsController.getEvents);
router.post("/", validateBody(createEventSchema), eventsController.createEvent);
router.post("/rsvps", validateBody(createRsvpSchema), rsvpController.createRsvp);
router.get("/:eventId", eventsController.getEventById);
router.post("/:eventId/rsvps", validateBody(createRsvpBodySchema), rsvpController.createRsvp);
router.get("/:eventId/rsvps", rsvpController.listRsvps);
router.patch("/:eventId", eventsController.updateEvent);
router.delete("/:eventId", eventsController.deleteEvent);

export const eventsRoutes = router;
