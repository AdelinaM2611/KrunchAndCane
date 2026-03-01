import { rsvpRepo } from "../repositories/rsvp.repo";
import { eventsRepo } from "../repositories/events.repo";
import type { CreateRsvpInput } from "../schemas/rsvp.schemas";

const DUPLICATE_RSVP_CODE = "P2002";

export const rsvpService = {
  async listByEventId(eventId: string) {
    const event = await eventsRepo.findById(eventId);
    if (!event) return null;
    return rsvpRepo.findByEventId(eventId);
  },

  async create(data: CreateRsvpInput) {
    const event = await eventsRepo.findById(data.eventId);
    if (!event) return null;
    if (event.status !== "ACTIVE") return null;

    try {
      return await rsvpRepo.create({
        eventId: data.eventId,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        guests: data.guests ?? null,
      });
    } catch (e: unknown) {
      const prismaError = e as { code?: string };
      if (prismaError?.code === DUPLICATE_RSVP_CODE) {
        const err = new Error("An RSVP with this email already exists for this event.");
        (err as Error & { code: string; statusCode: number }).code = "DUPLICATE_RSVP";
        (err as Error & { code: string; statusCode: number }).statusCode = 409;
        throw err;
      }
      throw e;
    }
  },
};
