/**
 * Zod schemas for RSVP create (eventId from URL or body); used by validateBody middleware.
 */
import { z } from "zod";

export const createRsvpSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  guests: z.number().int().min(0).optional(),
});

/** Body schema when eventId comes from URL (POST /api/events/:eventId/rsvps) */
export const createRsvpBodySchema = createRsvpSchema.omit({ eventId: true });

export type CreateRsvpInput = z.infer<typeof createRsvpSchema>;
