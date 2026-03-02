/**
 * Auth HTTP handlers: login and register; return { token, user } on success.
 */
import { Request, Response, NextFunction } from "express";
import { authService } from "../services/auth.service";

/** POST /api/auth/login — validate credentials, return JWT. */
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

/** POST /api/auth/register — create host, return JWT; 409 if email exists. */
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
