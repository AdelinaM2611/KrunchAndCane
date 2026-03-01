import { eventsRepo } from "../repositories/events.repo";
import { rsvpRepo } from "../repositories/rsvp.repo";
import type { CreateEventInput, UpdateEventInput } from "../schemas/events.schemas";
import { mailService } from "../integrations/mail.service";
import { logger } from "../lib/logger";

export const eventsService = {
  async listPublicEvents() {
    return eventsRepo.listActiveEvents();
  },

  async list() {
    return eventsRepo.listActiveEvents();
  },

  async getById(id: string) {
    return eventsRepo.findById(id);
  },

  async listByHostId(hostId: string) {
    return eventsRepo.listByHostId(hostId);
  },

  async create(data: CreateEventInput, hostId: string) {
    const startAt = data.startAt ? new Date(data.startAt) : new Date();
    const endAt = data.endAt ? new Date(data.endAt) : new Date(Date.now() + 60 * 60 * 1000);
    return eventsRepo.create({
      host: { connect: { id: hostId } },
      name: data.name,
      location: data.location ?? "",
      startAt,
      endAt,
      description: data.description ?? "",
      imageUrl: data.imageUrl ?? null,
    });
  },

  async update(id: string, data: UpdateEventInput, hostId: string) {
    const event = await eventsRepo.findByIdAndHostId(id, hostId);
    if (!event) return null;
    const update: Parameters<typeof eventsRepo.update>[1] = {};
    if (data.name != null) update.name = data.name;
    if (data.location != null) update.location = data.location;
    if (data.startAt != null) update.startAt = new Date(data.startAt);
    if (data.endAt != null) update.endAt = new Date(data.endAt);
    if (data.description != null) update.description = data.description;
    if (data.status != null) update.status = data.status;
    if (data.imageUrl !== undefined) update.imageUrl = data.imageUrl;
    return eventsRepo.update(id, update);
  },

  async cancel(id: string, hostId: string) {
    const event = await eventsRepo.findByIdAndHostId(id, hostId);
    if (!event) return null;
    await eventsRepo.update(id, { status: "CANCELLED" });

    try {
      const rsvps = await rsvpRepo.findByEventId(id);
      const startAt = event.startAt instanceof Date ? event.startAt : new Date(event.startAt);
      const endAt = event.endAt instanceof Date ? event.endAt : new Date(event.endAt);
      for (const rsvp of rsvps) {
        try {
          await mailService.sendEventCancellation({
            email: rsvp.email,
            firstName: rsvp.name.trim().split(/\s+/)[0] ?? rsvp.name,
            event: {
              name: event.name,
              location: event.location,
              startAt,
              endAt,
            },
          });
        } catch (e) {
          logger.error("SendGrid cancellation email failed", {
            eventId: id,
            email: rsvp.email,
            err: e instanceof Error ? e.message : String(e),
          });
        }
      }
    } catch (e) {
      logger.error("Failed to send cancellation emails", {
        eventId: id,
        err: e instanceof Error ? e.message : String(e),
      });
    }

    return eventsRepo.findById(id);
  },

  async remove(id: string) {
    return eventsRepo.delete(id);
  },
};
