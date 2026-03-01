import { z } from "zod";

export const createRsvpSchema = z.object({
  eventId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  guests: z.number().int().min(0).optional(),
});

export type CreateRsvpInput = z.infer<typeof createRsvpSchema>;
