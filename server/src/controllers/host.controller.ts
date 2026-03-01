import { Request, Response, NextFunction } from "express";
import { hostService } from "../services/host.service";

export async function getDashboard(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hostId = req.user?.sub;
    if (!hostId) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }
    const dashboard = await hostService.getDashboard(hostId);
    res.json(dashboard);
  } catch (e) {
    next(e);
  }
}

export async function listHostEvents(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hostId = req.user?.sub;
    if (!hostId) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }
    const events = await hostService.listHostEvents(hostId);
    res.json(events);
  } catch (e) {
    next(e);
  }
}

export async function getEventRsvps(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const hostId = req.user?.sub;
    if (!hostId) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Not authenticated" } });
      return;
    }
    const { eventId } = req.params;
    const rsvps = await hostService.getEventRsvps(hostId, eventId);
    if (rsvps === null) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: "Event not found" } });
      return;
    }
    res.json(rsvps);
  } catch (e) {
    next(e);
  }
}
