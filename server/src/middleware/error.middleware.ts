import { Request, Response, NextFunction } from "express";
import { logger } from "../lib/logger";

export type AppError = {
  code: string;
  message: string;
  statusCode?: number;
};

export function errorHandler(
  err: Error & { statusCode?: number; code?: string },
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const code = err.code ?? "INTERNAL_ERROR";
  const message = err.message ?? "An unexpected error occurred";
  const statusCode = err.statusCode ?? 500;

  logger.error(message, { code, statusCode });

  res.status(statusCode).json({
    error: { code, message },
  });
}
