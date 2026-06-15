/**
 * Host dashboard logic: dashboard payload, list host events, list RSVPs for an event (only if event belongs to host).
 */
import { eventsRepo } from "../repositories/events.repo";
import { rsvpRepo } from "../repositories/rsvp.repo";

export const hostService = {
  async getDashboard(hostId: string) {
    const events = await eventsRepo.listByHostId(hostId);
    return { hostId, events, rsvps: [] };
  },

  async listHostEvents(hostId: string) {
    return eventsRepo.listByHostId(hostId);
  },

  /** Return RSVPs for event only if event belongs to host; otherwise null. */
  async getEventRsvps(hostId: string, eventId: string) {
    const event = await eventsRepo.findByIdAndHostId(eventId, hostId);
    if (!event) return null;
    return rsvpRepo.findByEventId(eventId);
  },
};
