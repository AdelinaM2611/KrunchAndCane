/**
 * Event HTTP handlers: list public, get by id, create/update/cancel (host), delete.
 */
import { Request, Response, NextFunction } from "express";
import { eventsService } from "../services/events.service";

/** GET /api/events — list active events (public). */
export async function getEvents(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const events = await eventsService.listPublicEvents();
    res.json(events);
  } catch (e) {
    next(e);
  }
}

/** GET /api/events/:eventId — one event by id (public). */
export async function getEventById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { eventId } = req.params;
    const event = await eventsService.getById(eventId);
    if (!event) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.json(event);
  } catch (e) {
    next(e);
  }
}

/** POST /api/events — create event (host; req.user from auth middleware). */
export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hostId = req.user?.sub;
    if (!hostId) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }
    const event = await eventsService.create(req.body, hostId);
    res.status(201).json(event);
  } catch (e) {
    next(e);
  }
}

/** PUT /api/events/:eventId — update event (host only; service checks ownership). */
export async function updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hostId = req.user?.sub;
    if (!hostId) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }
    const { eventId } = req.params;
    const event = await eventsService.update(eventId, req.body, hostId);
    if (!event) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.json(event);
  } catch (e) {
    next(e);
  }
}

/** DELETE /api/events/:eventId — remove event (legacy). */
export async function deleteEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { eventId } = req.params;
    const deleted = await eventsService.remove(eventId);
    if (!deleted) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}

/** POST /api/events/:eventId/cancel — set status CANCELLED and send emails to RSVPs (host only). */
export async function cancelEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hostId = req.user?.sub;
    if (!hostId) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }
    const { eventId } = req.params;
    const event = await eventsService.cancel(eventId, hostId);
    if (!event) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.json(event);
  } catch (e) {
    next(e);
  }
}
