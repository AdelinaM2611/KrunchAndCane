/**
 * Request validation: validateBody parses req.body with Zod; validateQuery parses req.query. Respond 400 on error.
 */
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

export function validateBody<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      req.body = schema.parse(req.body) as T;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: e.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("; "),
          },
        });
        return;
      }
      next(e);
    }
  };
}

export function validateQuery<T>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      (req as unknown as { query: T }).query = schema.parse(req.query) as T;
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({
          error: {
            code: "VALIDATION_ERROR",
            message: e.errors.map((err) => `${err.path.join(".")}: ${err.message}`).join("; "),
          },
        });
        return;
      }
      next(e);
    }
  };
}
