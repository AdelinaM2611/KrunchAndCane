import { Request, Response, NextFunction } from "express";
import { eventsService } from "../services/events.service";

export async function getEvents(_req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const events = await eventsService.listPublicEvents();
    res.json(events);
  } catch (e) {
    next(e);
  }
}

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

export async function createEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const event = await eventsService.create(req.body);
    res.status(201).json(event);
  } catch (e) {
    next(e);
  }
}

export async function updateEvent(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { eventId } = req.params;
    const event = await eventsService.update(eventId, req.body);
    if (!event) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.json(event);
  } catch (e) {
    next(e);
  }
}

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
