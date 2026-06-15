/**
 * Zod schemas for event create/update and eventId param; used by validateBody middleware.
 */
import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1),
  location: z.string().min(1),
  startAt: z.union([z.string().datetime(), z.date()]),
  endAt: z.union([z.string().datetime(), z.date()]),
  description: z.string(),
  imageUrl: z.string().url().optional().nullable(),
});

export const updateEventSchema = z.object({
  name: z.string().min(1).optional(),
  location: z.string().min(1).optional(),
  startAt: z.union([z.string().datetime(), z.date()]).optional(),
  endAt: z.union([z.string().datetime(), z.date()]).optional(),
  description: z.string().optional(),
  status: z.string().optional(),
  imageUrl: z.string().url().optional().nullable(),
});

export const eventIdParamSchema = z.object({
  eventId: z.string().min(1),
});

export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
