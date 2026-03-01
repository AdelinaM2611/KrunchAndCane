import { Request, Response, NextFunction } from "express";
import { rsvpService } from "../services/rsvp.service";

export async function listRsvps(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { eventId } = req.params;
    const rsvps = await rsvpService.listByEventId(eventId);
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
    const rsvp = await rsvpService.create(req.body);
    if (!rsvp) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.status(201).json(rsvp);
  } catch (e) {
    next(e);
  }
}
