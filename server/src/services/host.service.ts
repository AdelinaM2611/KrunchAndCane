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

  async getEventRsvps(hostId: string, eventId: string) {
    const event = await eventsRepo.findByIdAndHostId(eventId, hostId);
    if (!event) return null;
    return rsvpRepo.findByEventId(eventId);
  },
};
