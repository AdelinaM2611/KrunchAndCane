/**
 * RSVP database access: list by event (newest first), create (unique eventId+email enforced by schema).
 */
import { prisma } from "../lib/prisma";

export const rsvpRepo = {
  async findByEventId(eventId: string) {
    return prisma.rsvp.findMany({
      where: { eventId },
      orderBy: { createdAt: "desc" },
    });
  },

  async create(data: { eventId: string; name: string; email: string; phone?: string | null; guests?: number | null }) {
    return prisma.rsvp.create({
      data: {
        event: { connect: { id: data.eventId } },
        name: data.name,
        email: data.email,
        phone: data.phone ?? undefined,
        guests: data.guests ?? undefined,
      },
    });
  },
};
