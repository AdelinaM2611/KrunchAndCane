import { rsvpRepo } from "../repositories/rsvp.repo";
import { eventsRepo } from "../repositories/events.repo";
import type { CreateRsvpInput } from "../schemas/rsvp.schemas";

export const rsvpService = {
  async listByEventId(eventId: string) {
    const event = await eventsRepo.findById(eventId);
    if (!event) return null;
    return rsvpRepo.findByEventId(eventId);
  },

  async create(data: CreateRsvpInput) {
    const event = await eventsRepo.findById(data.eventId);
    if (!event) return null;
    return rsvpRepo.create({
      eventId: data.eventId,
      name: data.name,
      email: data.email,
      guests: data.guests,
    });
  },
};
