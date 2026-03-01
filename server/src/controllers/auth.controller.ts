import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.login(req.body);
    if (!result) {
      res.status(401).json({ error: { code: "UNAUTHORIZED", message: "Invalid email or password" } });
      return;
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export async function register(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await authService.register(req.body);
    if (!result) {
      res.status(409).json({ error: { code: "CONFLICT", message: "Email already registered" } });
      return;
    }
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}
