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
