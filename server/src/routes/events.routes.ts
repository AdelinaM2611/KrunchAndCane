import { Router } from "express";
import * as eventsController from "../controllers/events.controller";
import * as rsvpController from "../controllers/rsvp.controller";
import { validateBody } from "../middleware/validate.middleware";
import { createEventSchema } from "../schemas/events.schemas";
import { createRsvpSchema } from "../schemas/rsvp.schemas";

const router = Router();

router.get("/", eventsController.getEvents);
router.post("/", validateBody(createEventSchema), eventsController.createEvent);
router.post("/rsvps", validateBody(createRsvpSchema), rsvpController.createRsvp);
router.get("/:eventId", eventsController.getEventById);
router.patch("/:eventId", eventsController.updateEvent);
router.delete("/:eventId", eventsController.deleteEvent);
router.get("/:eventId/rsvps", rsvpController.listRsvps);

export const eventsRoutes = router;
