/**
 * RSVP logic: list by event, create (only if event ACTIVE; send confirmation email; throw on duplicate email per event).
 */
import { rsvpRepo } from "../repositories/rsvp.repo";
import { eventsRepo } from "../repositories/events.repo";
import type { CreateRsvpInput } from "../schemas/rsvp.schemas";
import { mailService } from "../integrations/mail.service";
import { logger } from "../lib/logger";

const DUPLICATE_RSVP_CODE = "P2002";

export const rsvpService = {
  async listByEventId(eventId: string) {
    const event = await eventsRepo.findById(eventId);
    if (!event) return null;
    return rsvpRepo.findByEventId(eventId);
  },

  /** Create RSVP if event exists and is ACTIVE; send confirmation email; throw DUPLICATE_RSVP (409) if email already RSVPed. */
  async create(data: CreateRsvpInput) {
    const event = await eventsRepo.findById(data.eventId);
    if (!event) return null;
    if (event.status !== "ACTIVE") return null;

    try {
      const rsvp = await rsvpRepo.create({
        eventId: data.eventId,
        name: data.name,
        email: data.email,
        phone: data.phone ?? null,
        guests: data.guests ?? null,
      });

      try {
        await mailService.sendRsvpConfirmation({
          email: data.email,
          firstName: data.name.trim().split(/\s+/)[0] ?? data.name,
          event: {
            name: event.name,
            location: event.location,
            startAt: event.startAt,
            endAt: event.endAt,
          },
        });
        logger.info("SendGrid: sent RSVP confirmation email", {
          eventId: data.eventId,
          email: data.email,
        });
      } catch (e) {
        logger.error("SendGrid RSVP confirmation failed", {
          eventId: data.eventId,
          email: data.email,
          err: e instanceof Error ? e.message : String(e),
        });
      }

      return rsvp;
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
