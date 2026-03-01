import { Request, Response, NextFunction } from "express";
import { rsvpService } from "../services/rsvp.service";

export async function listRsvps(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { eventId } = req.params;
    const rsvps = await rsvpService.listByEventId(eventId!);
    if (rsvps === null) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.json(rsvps);
  } catch (e) {
    next(e);
  }
}

export async function createRsvp(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const eventId = req.params.eventId ?? req.body.eventId;
    const body = eventId ? { ...req.body, eventId } : req.body;

    const rsvp = await rsvpService.create(body);
    if (!rsvp) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.status(201).json(rsvp);
  } catch (e: unknown) {
    const err = e as Error & { code?: string; statusCode?: number };
    if (err?.code === "DUPLICATE_RSVP") {
      res.status(409).json({
        error: { code: "CONFLICT", message: err.message ?? "An RSVP with this email already exists for this event." },
      });
      return;
    }
    next(e);
  }
}
